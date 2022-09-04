import { internetBankingSystem } from "./internet-banking.system/internet-banking.system";
import { internetBankingGroup } from "./internet-banking.group";

export const personalBankingCustomer = internetBankingGroup.person("Personal Banking Customer", (p) => {
  p.desc = "A customer of the bank, with personal bank accounts.";

  p.calls(internetBankingSystem, "Views account balances, and makes payments using");
});
