import { WorkspaceDto } from "@c4mjs/workspace";
import _, { groupBy, uniqBy } from "lodash";
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

      // Get All Relationships that are related to the group
      const associatedRelationships = this.workspace.getContextRelationshipsWithGroup(group.id);

      // Get all entities on either side of the relationships, flatten it and ensure the list is unique
      const entities = _(associatedRelationships)
        .flatMap(({ sender, receiver }) => [sender, receiver])
        .uniqBy("id")
        .value();

      // Get all entities in my group
      const myEntities = entities.filter((entity) => groupId === entity.groupId);

      // Get all entities in groups other than mine
      const otherEntities = entities.filter((entity) => groupId !== entity.groupId);

      // Render the Dot Digraph
      return digraph({
        content: render([
          // Render my groups inside the subgraph
          subgraph({ ...group, content: render(myEntities) }),

          // Render other entities and all relationships outside the subgraph
          render([otherEntities, associatedRelationships]),
        ]),
      });
    }

    debug("Rendering System Context Diagram for workspace");
    // Get all Entities
    const entitiesByGroup = groupBy(this.workspace.getContextEntities(), "groupId");
    return digraph({
      content: render([
        this.workspace.getGroups().map((group) => subgraph({ ...group, content: render(entitiesByGroup[group.id]) })),
        this.workspace.getContextRelationships(),
      ]),
    });
  }

  /**
   * Render a Container Dot Diagram for the system.
   *
   * @param groupId {string} id of the group to render the context diagram for
   * @param systemId {string} id of the system to render the context diagram for
   */
  getContainerDiagram(groupId: string, systemId: string) {
    debug("Rendering System Container Diagram for %s/%s", groupId, systemId);
    const system = this.workspace.getSystem(systemId);

    const associatedRelationships = this.workspace.getContainerRelationshipsWithSystem(groupId, systemId);

    const entities = uniqBy(
      associatedRelationships.flatMap(({ sender, receiver }) => [sender, receiver]),
      "id"
    );

    // Get all entities in my system
    const myEntities = entities.filter((entity) => systemId === entity.systemId);

    // Get all entities in groups other than mine
    const otherEntities = entities.filter((entity) => systemId !== entity.systemId);

    return digraph({
      content: render([
        subgraph({ ...system, content: render(myEntities) }),
        render([otherEntities, associatedRelationships]),
      ]),
    });
  }
}
