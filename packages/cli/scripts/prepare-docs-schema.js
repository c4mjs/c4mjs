const { join, dirname } = require("path");
const { ensureDir, writeJsonSync, readJsonSync } = require("fs-extra");

const schemaFile = join(__dirname, "../src/source-workspace.schema.json");
const dest = join(__dirname, "../", ".schema", "source-workspace.schema.json");

ensureDir(dirname(dest));

let schema = readJsonSync(schemaFile);

schema = {
  id: "C4MJS",
  title: "C4MJS Schema",
  description: "C4MJS Schema Definition",
  ...schema,
};

writeJsonSync(dest, schema);
