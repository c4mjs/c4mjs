import * as process from "node:process";
import { writeFileSync } from "node:fs";
import { basename } from "node:path";
import { Command } from "commander";
import inquirer from "inquirer";
import Handlebars from "handlebars";
import { debug } from "../debug";

const { version } = require("../../package.json");

const packageJsonTemplate = Handlebars.compile(`{
  "name": "{{name}}",
  "version": "1.0.0",
  "private": true,
  "description": "{{description}}",
  "scripts": {
    "build": "c4mjs build -i workspace.yaml > workspace.json",
    "serve": "npx http-server -p 9876 --cors -c-1"
  },
  "dependencies": {
    "@c4mjs/cli": "^${version}"
  }
}

`);
const workspaceYamlFile =
  Handlebars.compile(`# yaml-language-server: $schema=https://c4model.app/cli/Workspace.schema.json
---
id: bigBankPlc
name: Big Bank PLC
version: 1.0.0
groups:
  - id: internetBanking
    name: Internet Banking System
    people:
      - id: customer
        name: Personal Banking Customer
        desc: A customer of the bank, with personal bank accounts.
        deps: |
          this -> internetBankingSystem : Views account balances, and makes payments using

    systems:
      - id: internetBankingSystem
        name: Internet Banking System
        desc: Allows customers to view information about their bank accounts and make payments.
        deps: |
          this -> mainframeBankingSystem : Gets account information from, and makes payments using
          this -> emailSystem : Sends e-mails using

      - id: mainframeBankingSystem
        name: Mainframe Banking System
        desc: Stores all of the core banking information about customers, accounts, transactions etc
        external: true

      - id: emailSystem
        name: Email System
        desc: The internal Microsoft Exchange e-mail system.
        external: true
        deps: |
          this -> customer : Sends email to
`);

export const init = new Command()
  .name("init")
  .description("creates a new c4mjs workspace project in the current directory")
  .action(async () => {
    const { name, description } = await inquirer.prompt([
      {
        message: "project name",
        name: "name",
        default: basename(process.cwd()),
      },
      {
        message: "version",
        name: "version",
        default: "1.0.0",
      },
      {
        message: "description",
        name: "description",
      },
    ]);

    debug("Generating new C4MJS workspace with args %o", { name, description });

    const { proceed } = await inquirer.prompt([
      {
        message: `Generate new C4MJS workspace '${name}' in '${process.cwd()}'`,
        name: "proceed",
        type: "confirm",
      },
    ]);

    if (proceed) {
      console.log("Generating...");
      debug("Writing package.json");
      writeFileSync("package.json", packageJsonTemplate({ name, description }));
      debug("Writing workspace.yaml");
      writeFileSync("workspace.yaml", workspaceYamlFile({}));
      console.log("Project Generated");
    }
  });
