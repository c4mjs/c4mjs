import { personalBankingCustomer } from "../personal-banking-customer.person";
import { internetBankingSystem } from "./internet-banking.system";
import { apiApplicationContainer } from "./api-application.container";

export const singlePageApplicationContainer = internetBankingSystem.container("Single-Page Application", (c) => {
  c.desc = "Provides all of the Internet Banking functionality to the customers via their web browser";
  c.tech = "Javascript and Angular";

  c.receives(personalBankingCustomer, "Views account balances, and makes payments using");
  c.calls(apiApplicationContainer, "Makes API Calls to");
});
