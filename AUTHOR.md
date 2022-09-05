# C4Model JS - Authoring

The main goal of the Authoring workflow is to produce a workspace in XML format, see the [XML ref](XML_REF.md) for more information on this.

For now we will dive straight into generating a workspace file using the JS DSL.

## Getting Started

Inside your new project folder run the init command using the c4mjs cli.

```shell
npx @c4mjs/cli init
```

This will bootstrap a new project, alternativly copy one of the examples 

https://github.com/JonathanTurnock/c4mjs/tree/main/examples

The run install and test the project with make

```shell
npm install && npm run make
```

This will now generate a workspace.xml file in the folders root.

## Making Changes

Make changes inside the `workspace.js` file and re-run the make operation to update the `workspace.xml` file.

See the [@c4mjs/dsl Readme](packages/dsl/README.md) or just get started with the API or read the jsdoc comments as you go.

Happy Hacking 🚀

## A Note about the code first Internal DSL

We did contemplate writing an External DSL for documenting the architecture and providing a CLI to parse it, however when it
comes to managing complex system architectures Objects,Variables and References are your best friend.

So we decided to use a collection of constructs in typescript to give great type hinting and IntelliSense to smooth the process
and leave it up to you how to manage those code files. See the full example to see how powerful this concept can be when it comes
to modularising the fragments.

Benefits:
- Take advantage of JS ecosystem of build tools 🦺
- Take advantage of JS import/export & publishing promoting re-usable blocks 🧱
- Get IntelliSense along the way 🤗

## References

See the [Big Bank plc](https://github.com/JonathanTurnock/c4mjs/tree/main/examples/big-bank-plc) example for any further assistance

