const { join, dirname } = require("node:path");
const { ensureDir, writeJsonSync, readJsonSync } = require("fs-extra");

const schemaFile = join(__dirname, "../src/source-workspace.schema.json");
const destination = join(__dirname, "../", ".schema", "source-workspace.schema.json");

ensureDir(dirname(destination));

let schema = readJsonSync(schemaFile);

schema = {
  id: "C4MJS",
  title: "C4MJS Schema",
  description: "C4MJS Schema Definition",
  ...schema,
};

writeJsonSync(destination, schema);
