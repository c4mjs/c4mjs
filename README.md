# C4Model JS

C4MJS makes it easier to store architecture as code and view it by providing:

2. **@c4mjs/cli** _Command line tool to compile the yaml/json workspace definition_
3. **[c4model.app](https://c4model.app/)** _React App to view your workspace as interactive C4 Diagraphs rendered by [Graphviz](https://graphviz.org/)_

To preview an example workspace visit https://c4model.app/

### Workspace

The Workspace allows us to describe our architecture in YAML/JSON

$ref parsing is done automatically so you can bundle/split your architecture docs as you see fit, see [Swagger](https://swagger.io/docs/specification/using-ref/) for more info.

> See [Big Bank Plc Example](https://github.com/JonathanTurnock/c4mjs/tree/main/examples/big-bank-plc) for an illustrative example of workspace splitting.

### CLI

The CLI reads the workspace and creates a bundle. This bundle is then hosted and c4model.app reads and renders it, all on the client.

## Usage

```shell
mkdir architecture && cd architecture

npx @c4mjs/cli init

npm install && npm run build
```

This will now generate a `workspace.json` file in the folders root. 🚀

Serve it

```shell
npm run serve
```

Visit [c4model.app](https://c4model.app/) to view it, pop the URL `http://localhost:9876/workspace.json` into the bar.

🎉 Tada 🎉

Explore the workspace using the interactive viewer.

## Guides

See the full Docs and Workspace api at https://c4mjs.github.io/c4mjs/#/

## Benefits

Workspace defined in YAML/JSON with hosted Schemas for intellisense:

- https://c4model.app/cli/Workspace.schema.json
- https://c4model.app/cli/Person.schema.json
- https://c4model.app/cli/System.schema.json
- https://c4model.app/cli/Container.schema.json
- https://c4model.app/cli/Component.schema.json

Loosely coupled App allowing you to create your own apps using @c4mjs/graphviz

Completely Open Source Codebase, all in this repo.

All bundling and rendering is performed client side, no hosting required and no schemas sent anywhere!

Take advantage of all your current development practices to manage and maintain your c4 model architecture.

# References

- Check the homepage for the [C4Model](https://c4model.com/)
- Highly recommend watching the [C4Model presentation](https://www.youtube.com/watch?v=x2-rSnhpw0g) to get a solid understanding of the concepts
