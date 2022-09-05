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
    "make": "c4mjs build -i ./src/workspace.js > workspace.xml"
    "serve": "npx http-server -p 9876 --cors -c-1"
  },
  "dependencies": {
    "@c4mjs/dsl": "^0.1.0",
    "@c4mjs/cli": "^0.1.0"
  }
}
`);
const workspaceJsFileTemplate = Handlebars.compile(`const { workspace } = require("@c4mjs/dsl");

const ws = workspace("Big Bank PLC", "1.0.0");

ws.group("Internet Banking System", (g) => {
  const personalBankingCustomer = g.person("Personal Banking Customer", (p) => {
    p.desc = "A customer of the bank, with personal bank accounts.";

    p.calls(internetBankingSystem, "Views account balances, and makes payments using");
  });

  const internetBankingSystem = g.system("Internet Banking System", (s) => {
    s.desc = "Allows customers to view information about their bank accountsm and make payments.";

    s.calls(emailSystem, "Sends e-mails using");
    s.calls(mainframeBankingSystem, "Gets account information from, and makes payments using");

    const webApp = s.container("Web Application", (c) => {
      c.desc = "Delivers the static content and the Internet Banking single page application.";
      c.tech = "Java and Spring MVC";

      c.receives(personalBankingCustomer, "Visits bigbank.com/ib using");
      c.calls(singlePageApp, "Delivers to the customers web browser");
    });
    const singlePageApp = s.container("Single-Page Application", (c) => {
      c.desc = "Provides all of the Internet Banking functionality to the customers via their web browser";
      c.tech = "Javascript and Angular";

      c.receives(personalBankingCustomer, "Views account balances, and makes payments using");
      c.calls(apiApp, "Makes API Calls to");
    });
    const mobileApp = s.container("Mobile Application", (c) => {
      c.desc = "Provides a limited subset of the internet banking functionality to customers via their mobile device.";
      c.tech = "Xamarmin";

      c.receives(personalBankingCustomer, "Views account balances, and makes payments using");
      c.calls(apiApp, "Makes API Calls to");
    });
    const apiApp = s.container("API Application", (c) => {
      c.desc = "Provides internet banking functionality via a JSON/HTTPS api.";
      c.tech = "Java and Spring MVC";

      c.calls(database, "Read from and Writes to");
      c.calls(mainframeBankingSystem, "Makes API Calls to");
      c.calls(emailSystem, "Sends emails using");
    });
    const database = s.container("Database", (c) => {
      c.desc = "Stores user registration information, hashed authentication credentials, access logs etc.";
      c.tech = "Oracle Database Schema";
    });
  });

  const mainframeBankingSystem = g.system("Mainframe Banking System", (s) => {
    s.desc = "Stores all of the core banking information about customers, accounts, transactions etc";
    s.external = true;

    s.calls(emailSystem, "Sends e-mail using");
  });

  const emailSystem = g.system("E-mail System", (s) => {
    s.desc = "The internal Microsoft Exchange e-mail system.";
    s.external = true;

    s.calls(personalBankingCustomer, "Sends e-mail to");
  });
});

// MUST BE EXPORTED FOR THE \`build\` command to work
module.exports = ws;
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
      debug("Writing src/workspace.js");
      mkdirSync("src");
      writeFileSync("src/workspace.js", workspaceJsFileTemplate({}));
      console.log("Project Generated");
    }
  });
