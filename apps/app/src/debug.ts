export const debug = require("debug")("c4mjs");

export const getDebug = (namespace: string) => debug.extend(namespace);
