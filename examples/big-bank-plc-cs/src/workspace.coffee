import { workspace } from "@c4mjs/dsl"

ws = workspace("Big Bank PLC", "1.0.0");

ws.group("Internet Banking System", (g) ->

  customer = g.person("Personal Banking Customer", (p) ->
    p.desc = "A customer of the bank, with personal bank accounts."
    p.calls(ibSystem, "Views account balances, and makes payments using")
  )

  ibSystem = g.system("Internet Banking System", (s) ->
    s.desc = "Allows customers to view information about their bank accountsm and make payments."
  )

)

module.exports = ws;
