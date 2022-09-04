import { personalBankingCustomer } from "../personal-banking-customer.person";
import { internetBankingSystem } from "./internet-banking.system";
import { apiApplicationContainer } from "./api-application.container";

export const mobileApplicationContainer = internetBankingSystem.container("Mobile Application", (c) => {
  c.desc = "Provides a limited subset of the internet banking functionality to customers via their mobile device.";
  c.tech = "Xamarmin";

  c.receives(personalBankingCustomer, "Views account balances, and makes payments using");
  c.calls(apiApplicationContainer, "Makes API Calls to");
});
