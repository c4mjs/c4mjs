const { resolve } = require("node:path");
const $RefParser = require("@apidevtools/json-schema-ref-parser");
const { values } = require("lodash");
const { writeJsonSync } = require("fs-extra");

const main = async () => {
  let deref = await $RefParser.dereference(resolve(__dirname, "../src/source-workspace.schema.json"));

  values(deref.definitions).forEach((definition) => {
    writeJsonSync(resolve(__dirname, `../../../apps/app/public/cli/${definition["title"]}.schema.json`), {
      $schema: deref.$schema,
      ...definition,
    });
  });
};

main();
