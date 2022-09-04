import { mainframeBankingSystem } from "../mainframe-banking.system";
import { emailSystem } from "../email.system";
import { internetBankingSystem } from "./internet-banking.system";
import { databaseContainer } from "./database.container";

export const apiApplicationContainer = internetBankingSystem.container("API Application", (c) => {
  c.desc = "Provides internet banking functionality via a JSON/HTTPS api.";
  c.tech = "Java and Spring MVC";

  c.calls(databaseContainer, "Read from and Writes to");
  c.calls(mainframeBankingSystem, "Makes API Calls to");
  c.calls(emailSystem, "Sends emails using");

  const signInController = c.component("Sign in Controller", (c) => {
    c.desc = "Allows users to sign into the Internet Banking System.";
    c.tech = "Spring MVC Rest Controller";

    c.calls(securityComponent, "Uses");
  });

  const resetPasswordController = c.component("Reset Password Controller", (c) => {
    c.desc = "Allows users to reset their passwords with a single use URL.";
    c.tech = "Spring MVC Rest Controller";

    c.calls(securityComponent, "Uses");
    c.calls(emailComponent, "Uses");
  });

  const accountsSummaryController = c.component("Accounts Summary Controller", (c) => {
    c.desc = "Provices customers with a summary of their bank accounts.";
    c.tech = "Spring MVC Rest Controller";

    c.calls(securityComponent, "Uses");
    c.calls(mainframeBankingSystem, "Uses");
  });

  const emailComponent = c.component("Email Component", (c) => {
    c.desc = "Sends e-mails to users.";
    c.tech = "Spring Bean";

    c.calls(emailSystem, "Sends e-mail using");
  });

  const securityComponent = c.component("Security Component", (c) => {
    c.desc = "Provides functionality related to signing in, changing passwords, etc.";
    c.tech = "Spring Bean";

    c.calls(databaseContainer, "Reads from and writes to");
  });

  const mainframeBankingSystemFacade = c.component("Mainframe Banking System Facade", (c) => {
    c.desc = "A facade onto the mainframe banking system";
    c.tech = "Spring Bean";

    c.calls(mainframeBankingSystem, "Uses");
  });
});
