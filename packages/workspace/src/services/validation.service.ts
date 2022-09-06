import Ajv, { ErrorObject } from "ajv";
import ValidationError from "ajv/dist/runtime/validation_error";
import schema from "../workspace.schema.json";
import { WorkspaceDto } from "../dtos/workspace.dto";

const ajv = new Ajv({ allErrors: true, validateFormats: true });

const validateWorkspace = ajv.compile<WorkspaceDto>(schema);

/**
 * Ancillary validation service to perform validation on a workspace object
 */
export const ValidationService = {
  /**
   * Validate the workspace returning any errors if present
   * @param workspace {WorkspaceDto} workspace to be validated
   */
  validateWorkspace: (workspace: WorkspaceDto): undefined | ErrorObject[] => {
    if (!validateWorkspace(workspace) && validateWorkspace.errors) {
      return validateWorkspace.errors;
    }
  },

  /**
   * Assert that the workspace is valid by throwing a ValidationError if any errors are present
   * @param workspace {WorkspaceDto} workspace to be validated
   */
  assertValidWorkspace: (workspace: WorkspaceDto) => {
    const result = ValidationService.validateWorkspace(workspace);

    if (result) {
      throw new ValidationError(result);
    }
  },
};
