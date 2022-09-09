import { WorkspaceDto } from "@c4mjs/workspace";
import _, { groupBy, uniqBy } from "lodash";
import { debug } from "./debug";
import { Workspace } from "./c4/workspace";
import { digraph, subgraph } from "./dot";
import { render } from "./dot/render";
import { Entity } from "./c4/entity";

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
      const myEntities = entities.filter((entity) => entity.groupId === groupId);

      // Get all entities in groups other than mine
      const otherEntities = entities.filter((entity) => entity.groupId !== groupId);

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
   * @param systemId {string} id of the system to render the context diagram for
   */
  getContainerDiagram(systemId: string) {
    debug("Rendering System Container Diagram for %s", systemId);
    const system = this.workspace.getSystem(systemId);

    // Get Relationships in and out of the group
    let associatedRelationships = this.workspace.getContainerRelationshipsWithSystem(system.groupId, systemId);

    // Replace senders and receivers where they are conainers outside the system with the system
    associatedRelationships.forEach((r) => {
      const isADifferentSoftwareSystem = (entity: Entity) =>
        entity.type === "container" && entity.parentAddress !== system.address;

      // If the sender is from a foreign system and is not the system, convert it to the system
      if (isADifferentSoftwareSystem(r.sender)) {
        debug(`Swapping ${r.sender.id} container for system`);
        r.sender = this.workspace.getEntity(r.sender.parentAddress);
      }

      // If the receiver is from a foreign system and is not the system, convert it to the system
      if (isADifferentSoftwareSystem(r.receiver)) {
        debug(`Swapping ${r.receiver.id} container for system`);
        r.receiver = this.workspace.getEntity(r.receiver.parentAddress);
      }
    });

    // Strip out the system being rendereds relationships
    associatedRelationships = associatedRelationships.filter(
      (r) => !(r.sender.address === system.address || r.receiver.address === system.address)
    );

    const entities = uniqBy(
      associatedRelationships.flatMap(({ sender, receiver }) => [sender, receiver]),
      "id"
    );

    // Get all entities in my system but not me
    const myEntities = entities
      .filter((entity) => systemId === entity.systemId)
      .filter(({ address }) => address !== system.address);

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
