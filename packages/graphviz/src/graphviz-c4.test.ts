import { resolve } from "node:path";
import { writeFileSync } from "node:fs";
import { WorkspaceDto } from "@c4mjs/workspace";
import { keys } from "lodash";
import { GraphvizC4 } from "./graphviz-c4";
import workspace from "./__stubs__/workspace.json";

describe("GraphvizC4", () => {
  const graphviz = new GraphvizC4(workspace as unknown as WorkspaceDto);

  describe("getContextDiagram", () => {
    describe("no group limit", () => {
      const shouldInclude = [
        `id="internetBanking__customer",`,
        `id="internetBanking__internetBankingSystem",`,
        `id="internetBanking__mainframeBankingSystem",`,
        `id="internetBanking__emailSystem",`,
        `id="internetBankingAgent__agent",`,
        `id="internetBankingAgent__internetBankingManagementSystem",`,
        "internetBanking__customer -> internetBanking__internetBankingSystem",
        "internetBanking__internetBankingSystem -> internetBanking__mainframeBankingSystem",
        "internetBanking__internetBankingSystem -> internetBanking__emailSystem",
        "internetBanking__emailSystem -> internetBanking__customer",
        "internetBankingAgent__agent -> internetBankingAgent__internetBankingManagementSystem",
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
          `id="internetBanking__customer",`,
          `id="internetBanking__internetBankingSystem",`,
          `id="internetBanking__mainframeBankingSystem",`,
          `id="internetBanking__emailSystem",`,
          `id="internetBankingAgent__internetBankingManagementSystem",`,
          "internetBanking__customer -> internetBanking__internetBankingSystem",
          "internetBanking__internetBankingSystem -> internetBanking__mainframeBankingSystem",
          "internetBanking__internetBankingSystem -> internetBanking__emailSystem",
          "internetBanking__emailSystem -> internetBanking__customer",
          "internetBankingAgent__internetBankingManagementSystem -> internetBanking__internetBankingSystem",
        ],
        ["internetBankingAgent"]: [
          `id="internetBankingAgent__agent",`,
          `id="internetBankingAgent__internetBankingManagementSystem",`,
          `id="internetBanking__internetBankingSystem",`,
          "internetBankingAgent__agent -> internetBankingAgent__internetBankingManagementSystem",
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

  describe("getContainerDiagram", () => {
    const shouldInclude = {
      ["internetBankingSystem"]: [
        `id="internetBanking__customer",`,
        `id="internetBanking__internetBankingSystem__webApp",`,
        `id="internetBanking__internetBankingSystem__mobileApp",`,
        `id="internetBanking__internetBankingSystem__singlePageApp",`,
        `id="internetBanking__internetBankingSystem__database",`,
        `id="internetBanking__internetBankingSystem__apiApp",`,
        `id="internetBanking__mainframeBankingSystem",`,
        `id="internetBanking__emailSystem",`,
        `id="internetBankingAgent__internetBankingManagementSystem",`,
        "internetBanking__customer -> internetBanking__internetBankingSystem__webApp",
        "internetBanking__customer -> internetBanking__internetBankingSystem__mobileApp",
        "internetBanking__customer -> internetBanking__internetBankingSystem__singlePageApp",
        "internetBanking__internetBankingSystem__webApp -> internetBanking__internetBankingSystem__singlePageApp",
        "internetBanking__internetBankingSystem__singlePageApp -> internetBanking__internetBankingSystem__apiApp",
        "internetBanking__internetBankingSystem__mobileApp -> internetBanking__internetBankingSystem__apiApp",
        "internetBanking__internetBankingSystem__apiApp -> internetBanking__internetBankingSystem__database",
        "internetBanking__internetBankingSystem__apiApp -> internetBanking__mainframeBankingSystem",
        "internetBanking__internetBankingSystem__apiApp -> internetBanking__emailSystem",
        "internetBanking__emailSystem -> internetBanking__customer",
        "internetBankingAgent__internetBankingManagementSystem -> internetBanking__internetBankingSystem__apiApp",
      ],
      // ["internetBankingManagementSystem"]: [
      //   `id="internetBankingAgent__agent",`,
      //   `id="internetBankingAgent__internetBankingManagementSystem__agentPortal",`,
      //   `internetBankingAgent__agent -> internetBankingAgent__internetBankingManagementSystem__agentPortal`,
      //   `internetBankingAgent__internetBankingManagementSystem__agentPortal -> internetBanking__internetBankingSystem`,
      // ],
    };

    describe.each(keys(shouldInclude))("container: %s", (system) => {
      const dotDiagram = graphviz.getContainerDiagram(system);
      writeFileSync(resolve(__dirname, `./__stubs__/${system}.c2.dot`), dotDiagram);

      it("should render and match snapshot", () => {
        expect(dotDiagram).toMatchSnapshot();
      });

      it.each(shouldInclude[system])("should contain: %s", (include) => {
        expect(dotDiagram.includes(include)).toBeTruthy();
      });
    });
  });
});
