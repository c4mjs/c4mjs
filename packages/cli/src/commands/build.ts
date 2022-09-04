import { isAbsolute, resolve } from "node:path";
import { Command } from "commander";
import { debug } from "../debug";

export const build = new Command()
  .name("build")
  .description("builds the c4mjs workspace file")
  .requiredOption("-i, --input <char>")
  .action((args) => {
    debug("Generating workspace xml with args %o", args);
    debug("Current working directory %s", process.cwd());

    const path = isAbsolute(args.input) ? args.input : resolve(process.cwd(), args.input);

    const workspace = require(path);
    console.log(workspace.buildXml());
  });
