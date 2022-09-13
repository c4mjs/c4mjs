import _, { isNil, omitBy } from "lodash";
import { EntityEntity } from "../entity/entity.entity";
import { database } from "./database";
import { debug } from "../debug";

export const EntityRepository = {
  findAll: (): Promise<EntityEntity[]> =>
    new Promise((resolve, reject) =>
      database.all(`select * from "entity"`, (error, rows) => {
        if (error) reject(error);
        resolve(
          _(rows)
            .map((it) => ({ ...omitBy(it, isNil), external: Boolean(it.external), deprecated: Boolean(it.deprecated) }))
            .value() as EntityEntity[]
        );
      })
    ),

  findByAddress: async (address): Promise<EntityEntity | undefined> => {
    return new Promise((resolve, reject) => {
      debug(`Fetching Entity by address %s`, address);
      database.get(`select * from entity where address = ?`, [address], (error, row) => {
        if (error) reject(error);

        resolve(row);
      });
    });
  },

  save: async (entity: EntityEntity) => {
    debug(`Saving New Entity %O`, entity);
    return new Promise((resolve, reject) =>
      database.run(
        `insert into "entity" (id, address, name, desc, notes, tech, external, deprecated, type, tags) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          entity.id,
          entity.address,
          entity.name,
          entity.desc,
          entity.notes,
          entity.tech,
          entity.external,
          entity.deprecated,
          entity.type,
          entity.tags,
        ],
        (error) => {
          if (error) reject(error);
          resolve(entity);
        }
      )
    );
  },
};
