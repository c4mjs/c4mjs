# C4Model JS

The aim of this repository is to make it easier to store architecture as code and view it dynmaically by providing:

2. **@c4mjs/cli** _Command line utility to build the yaml/json workspace definition to a converted `workspace.json`_
3. **[c4model.app](https://c4model.app/)** _React App to view your `workspace.json` as interactive C4 Diagraphs rendered by [Graphviz](https://graphviz.org/)_

The stored workspace files accept some shortcuts to make common activities easier.

### Workspace

The Workspace allows us to describe our architecture in YAML/JSON 😄

$ref parsing is done automatically so you can aggregate your architecture docs as you see fit, see [Swagger](https://swagger.io/docs/specification/using-ref/) for more info.

> See [Basic Example](https://github.com/JonathanTurnock/c4mjs/tree/main/examples/big-bank-plc) where we create **context** and **container**
> levels as a single source file.
>
> See [Full Example](https://github.com/JonathanTurnock/c4mjs/tree/main/examples/big-bank-plc-full) where we create **context**, **container** 
> and **component** diagrams for an entire system broken into multiple files to ease merge conflicts and cross reference containers and components.

### CLI

Theres a CLI 🤤

```shell
mkdir my-super-architecture && cd my-super-architecture

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

See the [Author](./AUTHOR.md) guide on how to create a Workspace.

See the [Viewer](./VIEWER.md) guide on how to view the C4 Model Diagrams.

# References

- Check the homepage for the [C4Model](https://c4model.com/)
- Highly recommend watching the [C4Model presentation](https://www.youtube.com/watch?v=x2-rSnhpw0g) to get a solid understanding of the concepts