import { exit } from "node:process";
import RefParser from "@apidevtools/json-schema-ref-parser";
import { Command } from "commander";
import { EntityDto, GroupDto, RelationshipDto, ValidationService, WorkspaceDto } from "@c4mjs/workspace";
import { debug } from "../debug";
import { SourceWorkspaceDto } from "../dtos/source-workspace.dto";
import { SourceValidationService } from "../services/source-validation.service";
import { SourceIngestionService } from "../services/source-ingestion.service";
import { GroupRepository } from "../dao/group.repository";
import { EntityRepository } from "../dao/entity.repository";
import { RelationshipRepository } from "../dao/relationship.repository";
import { close, setup } from "../dao/database";

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

    await setup();
    await SourceIngestionService.ingestWorkspace(sourceWorkspace);

    const { id, name, version, css } = sourceWorkspace;

    const groups: GroupDto[] = (await GroupRepository.findAll()).map((it) => ({
      ...it,
      address: it.id,
      tags: it.tags ? it.tags.split(",") : [],
    }));

    const entities: EntityDto[] = (await EntityRepository.findAll()).map((it) => ({
      ...it,
      tags: it.tags ? it.tags.split(",") : [],
    }));
    const relationships: RelationshipDto[] = await RelationshipRepository.findAll();

    const workspace: WorkspaceDto = { id, name, version, css, groups, entities, relationships };

    const workspaceErrors = ValidationService.validateWorkspace(workspace);
    if (workspaceErrors) {
      debug("Validation Failed for Transformed Workspace");
      console.error("Validation of Transformed Source Files Failed!");
      console.error(workspaceErrors);
      // eslint-disable-next-line unicorn/no-process-exit
      exit(1);
    }

    await close();
    console.log(JSON.stringify(workspace, undefined, 2));
  });
