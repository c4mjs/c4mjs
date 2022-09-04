import { internetBankingGroup } from "../internet-banking.group";
import { emailSystem } from "../email.system";

export const internetBankingSystem = internetBankingGroup.system("Internet Banking System", (s) => {
  s.desc = "Allows customers to view information about their bank accountsm and make payments.";

  s.calls(emailSystem, "Sends e-mails using");
  s.calls(emailSystem, "Gets account information from, and makes payments using");
});
