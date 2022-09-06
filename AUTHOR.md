# C4Model JS - Authoring

The main goal of the Authoring workflow is to produce a workspace in JSON format, see the for more information on this.

For now we will dive straight into generating a workspace file.

## Getting Started

Inside your new project folder run the init command using the c4mjs cli.

```shell
npx @c4mjs/cli init
```

This will bootstrap a new project, alternativly copy one of the examples 

https://github.com/JonathanTurnock/c4mjs/tree/main/examples

The run install and test the project with build

```shell
npm install && npm run build
```

This will now generate a `workspace.json` file in the folders root.

## Making Changes

Make changes inside the `workspace.yaml` file and re-run the make operation to update the `workspace.json` file.

> TODO: Docs about API Spec

## Breaking up Code

We fully support the $ref usage in `yaml` and `json`, rather than re-write the docs checkout the [Swagger Docs](https://swagger.io/docs/specification/using-ref/) on using ref

Or see the "full" example to see it in action.

## References

See the [Big Bank plc](https://github.com/JonathanTurnock/c4mjs/tree/main/examples/big-bank-plc) example
See the [Big Bank plc - Full](https://github.com/JonathanTurnock/c4mjs/tree/main/examples/big-bank-plc-full) example for $ref usage

