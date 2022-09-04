import { internetBankingGroup } from "./internet-banking.group";
import { emailSystem } from "./email.system";

export const mainframeBankingSystem = internetBankingGroup.system("Mainframe Banking System", (s) => {
  s.desc = "Stores all of the core banking information about customers, accounts, transactions etc";
  s.external = true;

  s.calls(emailSystem, "Sends e-mail using");
});
