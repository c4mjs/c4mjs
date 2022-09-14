import { omit } from "lodash";
import { SourceWorkspaceDto } from "../dtos/source-workspace.dto";
import { SourceValidationService } from "./source-validation.service";

describe("SourceValidationService", () => {
  const workspace: SourceWorkspaceDto = {
    id: "bigBankPlc",
    groups: [],
    name: "Big Bank PLC",
    version: "1.0.0",
  };

  const invalidWorkspace: any = omit(workspace, ["name"]);

  describe("validateWorkspace", () => {
    it("should return undefined if valid", () => {
      expect(SourceValidationService.validateWorkspace(workspace)).toBeUndefined();
    });

    it("should return errors if invalid", () => {
      expect(SourceValidationService.validateWorkspace(invalidWorkspace)).toEqual([
        {
          instancePath: "",
          keyword: "required",
          message: "must have required property 'name'",
          params: {
            missingProperty: "name",
          },
          schemaPath: "#/required",
        },
      ]);
    });
  });
});
