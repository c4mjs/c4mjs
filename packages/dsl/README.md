# `@c4mjs/dsl`

> TODO: description

## Usage

### Single Workspace

The most important file is the system entrypoint, this is where the workspace is defined.

All definitions can be in a single file, for example:

```js
const { workspace } = require("@c4mjs/dsl");

const ws = workspace("Big Bank PLC", "1.0.0");

ws.group("Internet Banking System", (g) => {
    ...
});

module.exports = ws;
```

### Split Workspace

Or definitions can be split across multiple files.

Here we have typescript examples making imports and exports more succinct and better safety for arguments during the compile phase.

Great if people are not good at reading docs but still expected to contribute!!

```typescript
// workspace.ts
import { resolve } from "node:path";
import { workspace } from "@c4mjs/dsl";

export const ws = workspace("Big Bank PLC", "1.0.0");
ws.importAll(resolve(__dirname, "./internet-banking-system/**/*.js"));

module.exports = ws;
```

```typescript
// internet-banking-system/internet-banking.group.ts
import { ws } from "../workspace";

export const internetBankingGroup = ws.group("Internet Banking System");
```

If files are split, please note that as a top level file (i.e. `workspace.ts`) does not import the file that depends on it
(i.e. `internet-banking-system/internet-banking.group.ts`) its not going to run the code!

We added a handy function to glob a folder and require all files so make sure its used or the workspace will be empty.

```typescript
ws.importAll(resolve(__dirname, "./internet-banking-system/**/*.js"));
```

[See the example project to see this in action](https://github.com/JonathanTurnock/c4mjs/tree/main/examples/big-bank-plc-full)

## Groups, People, Systems, Containers and Components 

With the workspace defined lets talk about the API.

### Setup Function

All items can take a setup function `(p) => {...}`, this is the last argument to the factory `g.person`

```typescript
ws.group("Internet Banking System", (g) => {
  const pbc = g.person("Personal Banking Customer", (p) => {
    p.desc = "A customer of the bank, with personal bank accounts.";

    p.calls(ibs, "Views account balances, and makes payments using");
  });
});
```

This is exactly the same as a more traditional programming flow, but you might have a hard time arranging the order to ensure variables
are not referenced before they are declared.

The Lazy Execution of the setup function mitigates this.

```typescript
const group = ws.group("Internet Banking System");
const personalBankingCustomer = group.person("Personal Banking Customer");
personalBankingCustomer.desc = "A customer of the bank, with personal bank accounts."
personalBankingCustomer.calls(internetBankingSystem);

const internetBankingSystem = group.system("Internet Banking System");
```

The best bet if you like this API is to use individual files and import/export as needed.

## API

Beyond whats talked about above the API should be self documenting using any modern IDE, API docs are also available.