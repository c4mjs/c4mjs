import { personalBankingCustomer } from "../personal-banking-customer.person";
import { internetBankingSystem } from "./internet-banking.system";
import { singlePageApplicationContainer } from "./single-page-application.container";

export const webApplicationContainer = internetBankingSystem.container("Web Application", (c) => {
  c.desc = "Delivers the static content and the Internet Banking single page application.";
  c.tech = "Java and Spring MVC";

  c.receives(personalBankingCustomer, "Visits bigbank.com/ib using");
  c.calls(singlePageApplicationContainer, "Delivers to the customers web browser");
});
