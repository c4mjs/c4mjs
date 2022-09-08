import { Database } from "sqlite3";

export const database = new Database(":memory:");

const exec = (sql) =>
  new Promise((resolve, reject) =>
    database.exec(sql, (error) => {
      if (error) reject(error);
      resolve(true);
    })
  );

export const close = async () =>
  new Promise((resolve, reject) =>
    database.close((error) => {
      if (error) reject(error);
      resolve(true);
    })
  );

export const setup = async () => {
  await exec(`PRAGMA foreign_keys = ON;`);

  await exec(`
  create table "group"
  (
    id   string not null
      constraint group_pk primary key,
    name string not null,
    desc string,
    tags string
  );

  create unique index group_id_uindex on "group" (id);
`);

  await exec(`
  create table "entity"
  (
    id       string  not null,
    address  string not null
      constraint group_pk primary key,
    name     string  not null,
    desc     string,
    tech     string,
    type     string  not null,
    tags     string,
    external boolean not null default false
  );

  create unique index entity_address_uindex on "entity" (address);
`);

  await exec(`
  create table "relationship"
  (
    sender   string not null,
    receiver string not null,
    desc     string,
    tech     string,

    foreign key (sender) references entity (address) on delete set null,
    foreign key (receiver) references entity (address) on delete set null
  );
`);
};
