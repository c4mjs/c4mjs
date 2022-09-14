const { resolve, dirname } = require("node:path");
const { ensureDir, writeJsonSync } = require("fs-extra");
const $RefParser = require("@apidevtools/json-schema-ref-parser");

const schemaFile = resolve(__dirname, "../src/source-workspace.schema.json");
const destination = resolve(__dirname, "../", ".schema", "source-workspace.schema.json");

const main = async () => {
  ensureDir(dirname(destination));

  let schema = await $RefParser.bundle(schemaFile);

  schema = {
    $id: "C4MJS",
    title: "C4MJS Schema",
    description: "C4MJS Schema Definition",
    ...schema,
  };

  writeJsonSync(destination, schema);
};

main();
