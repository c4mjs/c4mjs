import { Versioned } from "../interfaces/versioned";
import { Identifiable } from "../interfaces/identifiable";
import { GroupDto } from "./group.dto";

export interface WorkspaceDto extends Identifiable, Versioned {
  groups: GroupDto[];
}
