import { Identifiable } from "../interfaces/identifiable";
import { Describable } from "../interfaces/describable";
import { Externalable } from "../interfaces/externalable";
import { Taggable } from "../interfaces/taggable";
import { Relateable } from "../interfaces/relateable";
import { ComponentDto } from "./component.dto";

export interface ContainerDto extends Identifiable, Describable, Externalable, Taggable, Relateable {
  tech?: string;
  components: ComponentDto[];
}
