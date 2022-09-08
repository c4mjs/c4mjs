import { WorkspaceDto } from "@c4mjs/workspace";
import { groupBy, uniqBy } from "lodash";
import { debug } from "./debug";
import { Workspace } from "./c4/workspace";
import { digraph, subgraph } from "./dot";
import { render } from "./dot/render";

export class GraphvizC4 {
  private readonly workspace: Workspace;
  constructor(workspace: WorkspaceDto) {
    this.workspace = new Workspace(workspace);
  }

  /**
   * Render a System Context Dot Diagram for the entire workspace.
   * - Provide a group to limit the systems and people to those inside the group or with relationships.
   *
   * @param groupId {string} optional id of the group to render the context diagram for
   */
  getContextDiagram(groupId?: string) {
    if (groupId) {
      debug("Rendering System Context Diagram for %s", groupId);
      const group = this.workspace.getGroup(groupId);
      const associatedRelationships = this.workspace.relationships.filter(
        ({ sender, receiver }) => sender.groupId === group.id || receiver.groupId === group.id
      );

      const entities = uniqBy(
        associatedRelationships.flatMap(({ sender, receiver }) => [sender, receiver]),
        "id"
      );

      const myEntities = entities.filter((e) => groupId === e.groupId);
      const otherEntities = entities.filter((e) => groupId !== e.groupId);

      return digraph({
        content: render([
          subgraph({ ...group, content: render(myEntities) }),
          render([otherEntities, associatedRelationships]),
        ]),
      });
    }

    const entitiesByGroup = groupBy(this.workspace.entities, "groupId");
    debug("Rendering System Context Diagram for workspace");
    return digraph({
      content: render([
        this.workspace.groups.map((group) => subgraph({ ...group, content: render(entitiesByGroup[group.id]) })),
        entitiesByGroup["undefined"] || [],
        this.workspace.relationships,
      ]),
    });
  }
}
