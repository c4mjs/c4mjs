# C4Model JS

Architecture Documentation as code **LITERALLY**

The aim of this repository is to make it easier to store architecture as code and view it dynmaically by providing:

1. **@c4mjs/dsl** _Javascript Library to describe your architecture_
2. **@c4mjs/cli** _Command line utility to build the js workspace definition to a `workspace.xml`_
3. **[c4model.app](https://c4model.app/)** _React App to view your `workspace.xml` as interactive C4 Diagraphs rendered by [Graphviz](https://graphviz.org/)_

### DSL

The DSL allows us to describe our architecture in Js 😄

A simple context diagram might look like this 😌

Along the way we get built in intellisense 😍

```javascript
// workspace.js
const { workspace } = require("@c4mjs/dsl");

const ws = workspace("Big Bank PLC", "1.0.0");

ws.group("Internet Banking System", (group) => {
  const personalBankingCustomer = group.person("Personal Banking Customer", (person) => {
    person.desc = "A customer of the bank, with personal bank accounts.";
    person.calls(internetBankingSystem, "Views account balances, and makes payments using");
  });

  const internetBankingSystem = group.system("Internet Banking System", (system) => {
    system.desc = "Allows customers to view information about their bank accountsm and make payments.";
  });
});

module.exports = ws;
```

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

npm install && npm run make
```

This will now generate a `workspace.xml` file in the folders root. 🚀

Serve it

```shell
npm run serve
```

Visit [c4model.app](https://c4model.app/) to view it, pop the URL `http://localhost:9876/workspace.xml` into the bar.

🎉 Tada 🎉

Explore the workspace using the interactive viewer.

## Guides

See the [Author](./AUTHOR.md) guide on how to create Workspace files using the JS DSL.

See the [Viewer](./VIEWER.md) guide on how to view the C4 Model Diagrams.

Alternatively see the [XML Ref](./XML_REF.md) guide to author it yourself or build custom tooling.

# References

- Check the homepage for the [C4Model](https://c4model.com/)
- Highly recommend watching the [C4Model presentation](https://www.youtube.com/watch?v=x2-rSnhpw0g) to get a solid understanding of the concepts