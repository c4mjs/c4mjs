import { isAbsolute, resolve } from "node:path";
import { Command } from "commander";
import { debug } from "../debug";

export const build = new Command()
  .name("build")
  .description("builds the c4mjs workspace file")
  .requiredOption("-i, --input <char>", "Path to the workspace entry file")
  .action(({ input }) => {
    debug("Generating workspace xml with args %o", { input });
    debug("Current working directory %s", process.cwd());

    const path = isAbsolute(input) ? input : resolve(process.cwd(), input);

    const workspace = require(path);
    console.log(workspace.buildXml());
  });
