import Ajv, { ErrorObject } from "ajv";
import schema from "../source-workspace.schema.json";
import { SourceWorkspaceDto } from "../dtos/source-workspace.dto";

const ajv = new Ajv({ allErrors: true, validateFormats: true });

const validateSourceWorkspace = ajv.compile<SourceWorkspaceDto>(schema);

/**
 * Ancillary validation service to perform validation on a source workspace object
 */
export const SourceValidationService = {
  /**
   * Validate the source workspace returning any errors if present
   * @param workspace {SourceWorkspaceDto} workspace to be validated
   */
  validateWorkspace: (workspace: SourceWorkspaceDto): undefined | ErrorObject[] => {
    if (!validateSourceWorkspace(workspace) && validateSourceWorkspace.errors) {
      return validateSourceWorkspace.errors;
    }
  },
};
