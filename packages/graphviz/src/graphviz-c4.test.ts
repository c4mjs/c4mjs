import { resolve } from "node:path";
import { writeFileSync } from "node:fs";
import { WorkspaceDto } from "@c4mjs/workspace";
import { keys } from "lodash";
import { GraphvizC4 } from "./graphviz-c4";
import workspace from "./__stubs__/workspace.json";

describe("GraphvizC4", () => {
  const graphviz = new GraphvizC4(workspace as WorkspaceDto);

  describe("no group limit", () => {
    const shouldInclude = [
      `id="customer",`,
      `id="internetBankingSystem",`,
      `id="mainframeBankingSystem",`,
      `id="emailSystem",`,
      "customer -> internetBankingSystem",
      "internetBankingSystem -> mainframeBankingSystem",
      "internetBankingSystem -> emailSystem",
      "emailSystem -> customer",

      `id="agent",`,
      `id="internetBankingManagementSystem",`,
      "agent -> internetBankingManagementSystem",
    ];

    const dotDiagram = graphviz.getContextDiagram();
    writeFileSync(resolve(__dirname, `./__stubs__/workspace.c1.dot`), dotDiagram);

    it("should render and match snapshot", () => {
      expect(dotDiagram).toMatchSnapshot();
    });

    it.each(shouldInclude)("should contain: %s", (include) => {
      expect(dotDiagram.includes(include)).toBeTruthy();
    });
  });

  describe("limited to group", () => {
    const shouldInclude = {
      ["internetBanking"]: [
        `id="customer",`,
        `id="internetBankingSystem",`,
        `id="mainframeBankingSystem",`,
        `id="emailSystem",`,
        "customer -> internetBankingSystem",
        "internetBankingSystem -> mainframeBankingSystem",
        "internetBankingSystem -> emailSystem",
        "emailSystem -> customer",
      ],
      ["internetBankingAgent"]: [
        `id="agent",`,
        `id="internetBankingManagementSystem",`,
        "agent -> internetBankingManagementSystem",
      ],
    };

    describe.each(keys(shouldInclude))("context: %s", (group) => {
      const dotDiagram = graphviz.getContextDiagram(group);
      writeFileSync(resolve(__dirname, `./__stubs__/${group}.c1.dot`), dotDiagram);

      it("should render and match snapshot", () => {
        expect(dotDiagram).toMatchSnapshot();
      });

      it.each(shouldInclude[group])("should contain: %s", (include) => {
        expect(dotDiagram.includes(include)).toBeTruthy();
      });
    });
  });
});
