#!/usr/bin/env node
import { Command } from "commander";
import { build } from "./commands/build";

export const program = new Command();

program.name("C4M JS CLI").description("C4Model JS Command Line Utility").version("0.1.0");

program.addCommand(build);

program.parse(process.argv);
