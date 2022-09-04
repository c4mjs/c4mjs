import { internetBankingSystem } from "./internet-banking.system";

export const databaseContainer = internetBankingSystem.container("Database", (c) => {
  c.desc = "Stores user registration information, hashed authentication credentials, access logs etc.";
  c.tech = "Oracle Database Schema";
});
