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
          this -> mainframeBankingSystem : Stores all of the core banking information about customers, accounts, transactions etc
          this -> emailSystem : Sends e-mails using

        containers:
          - id: webApp
            name: Web Application
            desc: Delivers the static content and the Internet Banking single page application.
            tech: Java and Spring MVC
            deps: |
              this <- customer : Visits bigbank.com/ib using : HTTPS
              this -> singlePageApp : Delivers to the customers web browser

          - id: singlePageApp
            name: Single-Page Application
            desc: Provides all of the Internet Banking functionality to the customers via their web browser
            tech: Javascript and Angular
            deps: |
              this <- customer : Views account balances, and makes payments using
              this -> apiApp : Delivers to the customers web browser

          - id: mobileApp
            name: Mobile Application
            desc: Provides a limited subset of the internet banking functionality to customers via their mobile device.
            tech: Xamarmin
            deps: |
              this <- customer : Views account balances, and makes payments using
              this -> apiApp : Delivers to the customers web browser

          - id: apiApp
            name: Api Application
            desc: Provides internet banking functionality via a JSON/HTTPS api.
            tech: Java and Spring MVC
            deps: |
              this <- customer : Views account balances, and makes payments using
              this -> apiApp : Delivers to the customers web browser

          - id: database
            name: Database
            desc: Stores user registration information, hashed authentication credentials, access logs etc.
            tech: Oracle Database Schema


      - id: mainframeBankingSystem
        name: Mainframe Banking System
        desc: Stores all of the core banking information about customers, accounts, transactions etc

      - id: emailSystem
        name: Email System
        desc: The internal Microsoft Exchange e-mail system.
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
