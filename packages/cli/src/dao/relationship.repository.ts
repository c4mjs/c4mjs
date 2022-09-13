import _, { isNil, omitBy } from "lodash";
import { RelationshipEntity } from "../entity/relationship.entity";
import { database } from "./database";

export const RelationshipRepository = {
  findAll: (): Promise<RelationshipEntity[]> =>
    new Promise((resolve, reject) =>
      database.all(`select * from "relationship"`, (error, rows) => {
        if (error) reject(error);
        resolve(
          _(rows)
            .map((it) => ({ ...omitBy(it, isNil), deprecated: Boolean(it.deprecated) }))
            .value() as RelationshipEntity[]
        );
      })
    ),
  save: (relationship: RelationshipEntity): Promise<RelationshipEntity> =>
    new Promise((resolve, reject) =>
      database.run(
        `insert into "relationship" (sender, receiver, desc, notes, tech, deprecated) values (?, ?, ?, ?, ?, ?)`,
        [
          relationship.sender,
          relationship.receiver,
          relationship.desc,
          relationship.notes,
          relationship.tech,
          relationship.deprecated,
        ],
        (error) => {
          if (error) reject(error);
          resolve(relationship);
        }
      )
    ),
};
