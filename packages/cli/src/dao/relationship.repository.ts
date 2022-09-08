import _, { isNil, omitBy } from "lodash";
import { RelationshipEntity } from "../entity/relationship.entity";
import { database } from "./database";

export const RelationshipRepository = {
  findAll: (): Promise<RelationshipEntity[]> =>
    new Promise((resolve, reject) =>
      database.all(`select sender, receiver, desc, tech from "relationship"`, (error, rows) => {
        if (error) reject(error);
        resolve(
          _(rows)
            .map((it) => omitBy(it, isNil))
            .value() as RelationshipEntity[]
        );
      })
    ),
  save: (relationship: RelationshipEntity): Promise<RelationshipEntity> =>
    new Promise((resolve, reject) =>
      database.run(
        `insert into "relationship" (sender, receiver, desc, tech) values (?, ?, ?, ?)`,
        [relationship.sender, relationship.receiver, relationship.desc, relationship.tech],
        (error) => {
          if (error) reject(error);
          resolve(relationship);
        }
      )
    ),
};
