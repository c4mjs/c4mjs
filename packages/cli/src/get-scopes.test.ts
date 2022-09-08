import { getScopes } from "./get-scopes";

describe("getScopes", () => {
  const scenarios = [
    {
      scope: "ib.ibms.agent",
      scopes: ["ib.ibms.agent", "ib.ibms", "ib"],
    },
    {
      scope: "ib",
      scopes: ["ib"],
    },
  ];

  it.each(scenarios)("should transform to scopes", ({ scopes, scope }) => {
    expect(getScopes(scope)).toEqual(scopes);
  });
});
