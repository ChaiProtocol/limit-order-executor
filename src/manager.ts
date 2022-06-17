import cluster, { Worker } from "cluster";
import { BigNumber, Contract, providers } from "ethers";
import request, { gql } from "graphql-request";
import { Config } from "./config";
import { findRoute, JsonHelper } from "./utils";
import { chunk } from "lodash";
import { Token } from "@uniswap/sdk-core";
import swapRouterAbi from "./abis/IUniswapV2Router02.json";
import JSBI from "jsbi";

type Task = any;

type Order = {
  id: string;
  inputAmount: string;
  inputToken: {
    id: string;
    name: string;
    symbol: string;
    decimals: string;
  };
  outputToken: {
    id: string;
    name: string;
    symbol: string;
    decimals: string;
  };
  outputAmount: string;
  actualOutputAmount: string;
  expiryTimestamp: string;
  createdAt: string;
  recipient: string;
  submitTimestamp: string;
};

class WorkerRobin {
  private workers: Worker[] = [];
  private current: number = 0;

  constructor(wallets: string[]) {
    wallets.forEach((t, i) => {
      const worker = cluster.fork();
      worker.send(
        JsonHelper.stringify({
          command: "init",
          data: {
            wallet: t,
            wid: i,
          },
        })
      );
      worker.on("message", this.onWorkerCallback);
      this.workers.push(worker);
    });
  }

  enqueue(task: Task) {
    this.current = (this.current + 1) % this.workerCount;
    this.workers[this.current].send(
      JsonHelper.stringify({
        command: "task",
        data: task,
      })
    );
  }

  // parse worker message and set task as done or something
  private onWorkerCallback = (message: string) => {};

  private get workerCount() {
    return this.workers.length;
  }
}

const GET_ORDER_NOT_EXECUTE = gql`
  query getOrderNotExecute($excludeOrderIds: [String!]) {
    orders(
      first: 500
      orderBy: submitTimestamp
      orderDirection: asc
      where: { status: created }
    ) {
      blockNumber
      cancelledTxHash
      createdTxHash
      createdAt
      executedTxHash
      id
      submitTimestamp
      inputAmount
      inputToken {
        id
        decimals
        name
        symbol
      }
      outputAmount
      outputToken {
        id
        decimals
        symbol
        name
      }
      recipient
      owner
      status
      expiryTimestamp
      actualOutputAmount
    }
  }
`;

export class Manager {
  private workers: WorkerRobin;
  private config: Config;

  constructor(config: Config) {
    this.workers = new WorkerRobin(config.wallets);
    this.config = config;
  }

  start() {
    // fetch newly order from graphql
    // then check if any order match
    // then send to worker
    const provider = new providers.JsonRpcProvider(this.config.rpc);
    const swapRouter = new Contract(
      this.config.swapRouter,
      swapRouterAbi,
      provider
    );
    setInterval(() => {
      request(this.config.graphql, GET_ORDER_NOT_EXECUTE).then(
        async ({ orders }: { orders: Order[] }) => {
          if (orders.length) {
            await Promise.all(
              chunk(orders, 100).map((orders) => {
                orders.forEach(async (order) => {
                  const tokenA = new Token(
                    this.config.chainId,
                    order.inputToken.id,
                    !order.inputToken.decimals
                      ? 18
                      : parseInt(order.inputToken.decimals)
                  );
                  const tokenB = new Token(
                    this.config.chainId,
                    order.outputToken.id,
                    !order.outputToken.decimals
                      ? 18
                      : parseInt(order.outputToken.decimals)
                  );
                  const bestTradeSoFar = await findRoute(
                    this.config.chainId,
                    tokenA,
                    tokenB,
                    JSBI.BigInt(order.inputAmount)
                  );
                  if (bestTradeSoFar) {
                    const paths = bestTradeSoFar.route.path.map(
                      (t) => t.address
                    );
                    const amountsOut = await swapRouter.getAmountsOut(
                      order.inputAmount,
                      paths
                    );
                    if (amountsOut.length > 0) {
                      const amountOut = amountsOut[amountsOut.length - 1];
                      if (amountOut >= order.outputAmount) {
                        this.workers.enqueue({
                          order,
                          paths,
                        });
                      }
                    }
                  }
                });
              })
            );
          }
        }
      );
    }, 5000);
  }
}
