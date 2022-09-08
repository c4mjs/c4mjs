import Ajv, { ErrorObject as EO } from "ajv";
import AjvValidationError from "ajv/dist/runtime/validation_error";
import isSemVer from "validator/lib/isSemVer";

export const ajv = new Ajv({ allErrors: true, validateFormats: true });
ajv.addFormat("semver", {
  type: "string",
  validate: isSemVer,
});

export interface ErrorObject extends EO {}
export class ValidationError extends AjvValidationError {}
