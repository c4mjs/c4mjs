# Authoring

The goal of the Authoring workflow is to produce a bundled workspace file which is hosted.

[c4model.app](https://c4model.app) then fetches this when loaded and renders its contents.

## Getting Started

Create a new folder and hop into it to get started

```shell
mkdir big-bank-plc && cd big-bank-plc
```

### Using the CLI

Inside your new project folder run the init command using the c4mjs cli.

```shell
npm i -g @c4mjs/cli && c4mjs init
```

Or run it directly with npx

```shell
npx @c4mjs/cli init
```

This will bootstrap a new project.

Install the project dependencies before moving on:

```shell
npm install
```

### Copying an example

Alternatively copy one of the examples

https://github.com/c4mjs/c4mjs/tree/main/examples

## Workspace

The workspace is composed of the `package.json` and `workspace.yaml`

The `workspace.yaml` defines the workspace, for a detailed breakdown of its configuration see the [Workspace](./source-workspace-definitions-workspace) guide

### IntelliSense

To get IntelliSense add the yaml-language-server definition if your IDE supports it.

```yaml
# yaml-language-server: $schema=https://c4model.app/cli/Workspace.schema.json
---
```

The following schemas exist to help with breaking up files

- https://c4model.app/cli/Workspace.schema.json
- https://c4model.app/cli/Group.schema.json
- https://c4model.app/cli/Person.schema.json
- https://c4model.app/cli/System.schema.json
- https://c4model.app/cli/Container.schema.json
- https://c4model.app/cli/Component.schema.json

## Building

Once you have a new project folder setup run install and build to compile it

```shell
npm run build
```

This will now generate a `workspace.json` file in the folders root.
