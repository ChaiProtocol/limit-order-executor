#! /usr/bin/env ts-node

import cluster from "cluster";
import { parseConfig } from "./config";
import { Executor } from "./executor";
import { Manager } from "./manager";
import "dotenv/config";

const main = () => {
  const config = parseConfig();
  if (cluster.isPrimary) {
    new Manager(config).start();
  } else {
    new Executor(config).start();
  }
};

main();
