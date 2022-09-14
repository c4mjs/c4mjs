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

## Building

Once you have a new project folder setup run install and build to compile it

```shell
npm run build
```

This will now generate a `workspace.json` file in the folders root.

## Serving

You need to serve the `workspace.json` file, so that it can be read by the app.

The App will call out to the configured address to fetch the workspace file.

For local development we use `http-server` which can serve up the `workspace.json` from the local file system, serve it by
running

```shell
npx http-server -p 9876 --cors -c-1
```

or from a templated project run the following

```shell
npm run serve
```

And visiting http://localhost:9876/workspace.json to confirm its loading correctly.

If all is setup go ahead and render it by visiting the app.

https://c4model.app/#/?url=http%253A%252F%252Flocalhost%253A9876%252Fworkspace.json

> NOTE: Here we have pre-loaded the url to point to `http://localhost:9876/workspace.json`

## Serving for Sharing

Once local development is complete the workspace.json will need to be placed somewhere it can be accessed by others.

Github is particularly good as you can use the raw content address https://raw.githubusercontent.com/

Alternatively host it on a pages site of choice that intended consumers would have access to.

> TIP: watch out for CORS issues
