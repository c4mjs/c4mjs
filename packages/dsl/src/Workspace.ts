import { resolve } from "node:path";
import { instanceToPlain } from "class-transformer";
import xml, { XmlObject } from "xml";
import glob from "glob";
import { Group } from "./Group";
import { addLazySetup, runLazySetups } from "./LazySetup";

export class Workspace {
  readonly name;

  readonly version;

  readonly groups: Group[] = [];

  constructor(name: string, version: string) {
    this.name = name;
    this.version = version;
  }

  group(name: string, setup?: (group: Group) => void): Group {
    const group = new Group(name);
    setup && addLazySetup(() => setup(group));
    this.groups.push(group);
    return group;
  }

  /**
   * Build the Workspace into a plain Json Object
   */
  build() {
    runLazySetups();
    return instanceToPlain(this);
  }

  buildXml(): XmlObject {
    runLazySetups();
    return xml(
      {
        [Workspace.name]: [
          { _attr: { name: this.name, version: this.version } },
          ...this.groups.map((it) => it.toXmlObject()),
        ],
      },
      { indent: "\t", declaration: true }
    );
  }

  /**
   * Imports all files matching the provided glob pattern
   *
   * This is required otherwise the operations defined in those files will not be run
   */
  importAll(path: string) {
    for (const file of glob.sync(path)) {
      require(resolve(file));
    }
  }
}

export const workspace = (name: string, version: string) => new Workspace(name, version);
