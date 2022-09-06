import * as process from "node:process";
import { writeFileSync, mkdirSync } from "node:fs";
import { basename } from "node:path";
import { Command } from "commander";
import inquirer from "inquirer";
import Handlebars from "handlebars";
import { debug } from "../../debug";

const packageJsonTemplate = Handlebars.compile(`{
  "name": "{{name}}",
  "version": "1.0.0",
  "private": true,
  "description": "{{description}}",
  "scripts": {
    "build": "c4mjs build -i workspace.yaml > workspace.json",
    "build:watch": "npx watch \\"npm run build\\" workspace",
    "serve": "npx http-server -p 9876 --cors -c-1"
  },
  "dependencies": {
    "@c4mjs/cli": "^0.1.0"
  }
}

`);
const workspaceYamlFile = Handlebars.compile(`---
name: Big Bank PLC
version: 1.0.0
groups:
  - id: internet-banking
    name: Internet Banking System
    people:
      - id: customer
        name: Personal Banking Customer
        desc: A customer of the bank, with personal bank accounts.
        deps: |
          this -> internet-banking-system : Views account balances, and makes payments using

    systems:
      - id: internet-banking-system
        name: Internet Banking System
        desc: Allows customers to view information about their bank accounts and make payments.
        deps: |
          this -> mainframe-banking-system : Stores all of the core banking information about customers, accounts, transactions etc

        containers:
          - id: web-app
            name: Web Application
            desc: Delivers the static content and the Internet Banking single page application.
            tech: Java and Spring MVC
            deps: |
              this <- customer : Visits bigbank.com/ib using : HTTPS
              this -> single-page-app : Delivers to the customers web browser

          - id: single-page-app
            name: Single-Page Application
            desc: Provides all of the Internet Banking functionality to the customers via their web browser
            tech: Javascript and Angular
            deps: |
              this <- customer : Views account balances, and makes payments using
              this -> api-app : Delivers to the customers web browser

          - id: mobile-app
            name: Mobile Application
            desc: Provides a limited subset of the internet banking functionality to customers via their mobile device.
            tech: Xamarmin
            deps: |
              this <- customer : Views account balances, and makes payments using
              this -> api-app : Delivers to the customers web browser

          - id: api-app
            name: Api Application
            desc: Provides internet banking functionality via a JSON/HTTPS api.
            tech: Java and Spring MVC
            deps: |
              this <- customer : Views account balances, and makes payments using
              this -> api-app : Delivers to the customers web browser

          - id: database
            name: Database
            desc: Stores user registration information, hashed authentication credentials, access logs etc.
            tech: Oracle Database Schema


      - id: mainframe-banking-system
        name: Mainframe Banking System
        desc: Stores all of the core banking information about customers, accounts, transactions etc
        deps: |
          this -> mainframe-banking-system : Stores all of the core banking information about customers, accounts, transactions etc

      - id: email-system
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
