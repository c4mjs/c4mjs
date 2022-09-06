import { exit } from "node:process";
import RefParser from "@apidevtools/json-schema-ref-parser";
import { Command } from "commander";
import { ValidationService, WorkspaceDto } from "@c4mjs/workspace";
import { debug } from "../debug";
import { SourceWorkspaceDto } from "../dtos/source-workspace.dto";
import { SourceDtoTransformer } from "../transformers/source-dto.transformer";
import { SourceValidationService } from "../services/source-validation.service";

export const build = new Command()
  .name("build")
  .description("builds the c4mjs workspace file")
  .requiredOption("-i, --input <char>", "Path to the workspace entry file")
  .action(async ({ input }) => {
    debug("Generating workspace xml with args %o", { input });
    debug("Current working directory %s", process.cwd());

    debug("Reading Workspace Files");
    const sourceWorkspace: SourceWorkspaceDto = (await RefParser.dereference(input)) as SourceWorkspaceDto;
    const sourceWorkspaceErrors = SourceValidationService.validateWorkspace(sourceWorkspace);
    debug("Validating Workspace");
    if (sourceWorkspaceErrors) {
      debug("Validation Failed for Source Workspace");
      console.error("Validation of Workspace Source Files Failed!");
      console.error(sourceWorkspaceErrors);
      exit(1);
    }

    const workspace: WorkspaceDto = SourceDtoTransformer.transformWorkspace(sourceWorkspace);
    const workspaceErrors = ValidationService.validateWorkspace(workspace);
    if (workspaceErrors) {
      debug("Validation Failed for Transformed Workspace");
      console.error("Validation of Transformed Source Files Failed!");
      console.error(workspaceErrors);
      // eslint-disable-next-line unicorn/no-process-exit
      exit(1);
    }

    console.log(JSON.stringify(workspace, undefined, 2));
  });
