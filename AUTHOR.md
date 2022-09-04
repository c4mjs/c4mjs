# C4Model JS - Authoring

The main goal of the Authoring workflow is to produce a workspace in XML format, see the [XML ref](XML_REF.md) for more information on this.

For now we will dive straight into generating a workspace file using the JS DSL.

## Getting Started

We will need to create a new NodeJS project with the following 2 dependecies installed

```shell
npm i @c4mjs/dsl @c4mjs/cli
```

## Creating a workspace file

Create a new JS file in the project, i.e. `workspace.js` with the following content changing values as required.

```javascript
const { workspace } = require("@c4mjs/dsl");

const ws = workspace("Big Bank PLC", "1.0.0");

ws.group("Internet Banking System", (g) => {
  // Do Something with Group
});

module.exports = ws;
```

NOTE: We must export the workspace as a module.export for the cli to be able to find it later.

## Setup Callback

One of the most important parts of the entire DSL is the arrow function provided to the factory, this is known as the setup function and 
is lazily called just before the library renders the XML. 

The setup function is passed the instance, allowing you to perform operations on it, such as setting values.

This means Variables referenced in the arrow function should exist meaning foward and backwards lookups work fine.

The Setup callback is always optional and its only purpose is to neatly allow code folding, feel free to perform actions inline after declaring a variable which
works just the same.

Its worth studying the 2 examples and deciding which style suits best for your workspace scale.

Examples can be found at https://github.com/JonathanTurnock/c4mjs/tree/main/examples.

## Generating a Workspace XML file

With the simple example snippet we can start to generate our XML

Run the following to generate a new XML file

```shell
c4mjs build -i ./workspace.js > workspace.xml
```

Which will produce the following result

```xml
// workspace.xml 
<Workspace name="Big Bank PLC" version="1.0.0">
	<Group name="Internet Banking System">
	</Group>
</Workspace>
```

It may be useful at this point to add a script to the package.json to simplify the process of running the cli

```json
{
  "name": "@c4mjs/bbplc-example",
  "version": "1.0.0",
  "private": true,
  "description": "Big Bank PLC Example",
  "scripts": {
    "make": "c4mjs build -i ./workspace/workspace.js > workspace.xml"
  },
  "dependencies": {
    "@c4mjs/dsl": "^0.1.0",
    "@c4mjs/cli": "^0.1.0"
  }
}
```

See the [Big Bank plc](https://github.com/JonathanTurnock/c4mjs/tree/main/examples/big-bank-plc) example for any further assistance

See the [@c4mjs/dsl Readme](packages/dsl/README.md) or just get started with the API or read the jsdoc comments as you go.