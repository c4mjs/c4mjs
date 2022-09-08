import { ContainerDto } from "./container.dto";
import { Taggable } from "../interfaces/taggable";
import { Relateable } from "../interfaces/relateable";
import { Identifiable } from "../interfaces/identifiable";
import { Describable } from "../interfaces/describable";
import { Externalable } from "../interfaces/externalable";

export interface SystemDto extends Identifiable, Describable, Externalable, Taggable, Relateable {
  containers: ContainerDto[];
}
