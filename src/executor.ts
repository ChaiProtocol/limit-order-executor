import { JsonHelper } from "./utils";
import pino, { Logger } from "pino";
import PQueue from "p-queue";
import { Config } from "./config";
import {
  Contract,
  ContractTransaction,
  providers,
  utils,
  Wallet,
} from "ethers";
import LimitOrdersAbi from "./abis/LimitOrders.json";

export class Executor {
  private logger: Logger;
  private queue: PQueue;
  private config: Config;
  private wallet: Wallet | undefined;

  constructor(config: Config) {
    this.logger = pino({
      transport: {
        target: "pino-pretty",
      },
    });
    this.queue = new PQueue({
      concurrency: 1,
    });
    this.config = config;
    this.wallet = undefined;
  }

  start() {
    this.queue.start();
    process.on("message", (ev: string) => {
      this.logger.info("message received");
      const { command, data } = JsonHelper.parse(ev);
      switch (command) {
        case "init": {
          this.init(data.wallet, data.wid);
          break;
        }
        case "task": {
          this.queue.add(async () => {
            await this.execute(data);
          });
          break;
        }
        default: {
        }
      }
    });
  }

  private init(wallet: string, wid: number) {
    this.wallet = new Wallet(wallet);
    this.logger.setBindings({
      wid: wid,
    });
  }

  private async execute(task: any) {
    const order = task?.order;
    const paths = task?.paths;
    const provider = new providers.JsonRpcProvider(this.config.rpc);
    const signer = this.wallet?.connect(provider);
    const limitOrders = new Contract(
      this.config.limitOrder,
      LimitOrdersAbi,
      signer
    );
    try {
      const fee = 0;
      const abiCoder = new utils.AbiCoder();
      const data = abiCoder.encode(
        [
          "address",
          "address",
          "uint256",
          "uint256",
          "address",
          "address",
          "address[]",
          "uint256",
        ],
        [
          order?.outputToken.id,
          order?.recipient,
          order?.inputAmount,
          order?.outputAmount,
          signer?.address,
          this.config.swapRouter,
          paths,
          fee,
        ]
      );
      //TODO: calculate fee
      const tx: ContractTransaction = await limitOrders.executeOrder(
        order.id,
        this.config.executor,
        data
      );
      process.send!(
        JsonHelper.stringify({
          msg: "complete",
        })
      );
      await tx.wait();
      console.log("success");
    } catch (ex) {
      console.log("err: ", ex);
    }
  }
}
