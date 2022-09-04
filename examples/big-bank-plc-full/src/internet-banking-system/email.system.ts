import { internetBankingGroup } from "./internet-banking.group";
import { personalBankingCustomer } from "./personal-banking-customer.person";

export const emailSystem = internetBankingGroup.system("E-mail System", (s) => {
  s.desc = "The internal Microsoft Exchange e-mail system.";
  s.external = true;

  s.calls(personalBankingCustomer, "Sends e-mail to");
});
