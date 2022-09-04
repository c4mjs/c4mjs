import { resolve } from "node:path";
import { workspace } from "@c4mjs/dsl";

export const ws = workspace("Big Bank PLC", "1.0.0");
ws.importAll(resolve(__dirname, "./internet-banking-system/**/*.js"));

module.exports = ws;
