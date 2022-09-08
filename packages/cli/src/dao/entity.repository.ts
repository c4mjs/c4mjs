import _, { isNil, omitBy } from "lodash";
import { EntityEntity } from "../entity/entity.entity";
import { database } from "./database";

export const EntityRepository = {
  findAll: (): Promise<EntityEntity[]> =>
    new Promise((resolve, reject) =>
      database.all(`select id, address, name, desc, external, type, tags from "entity"`, (error, rows) => {
        if (error) reject(error);
        resolve(
          _(rows)
            .map((it) => ({ ...omitBy(it, isNil), external: Boolean(it.external) }))
            .value() as EntityEntity[]
        );
      })
    ),

  findByAddress: async (address): Promise<EntityEntity | undefined> => {
    return new Promise((resolve, reject) => {
      database.get(`select * from entity where address = ?`, [address], (error, row) => {
        if (error) reject(error);

        resolve(row);
      });
    });
  },

  save: async (entity: EntityEntity) => {
    return new Promise((resolve, reject) =>
      database.run(
        `insert into "entity" (id, address, name, desc, external, type, tags) values (?, ?, ?, ?, ?, ?, ?)`,
        [entity.id, entity.address, entity.name, entity.desc, entity.external, entity.type, entity.tags],
        (error) => {
          if (error) reject(error);
          resolve(entity);
        }
      )
    );
  },
};
