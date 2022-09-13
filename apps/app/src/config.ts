const workspaceExamples = ["/workspace.json", "http://localhost:9876/workspace.json"];

export const config = {
  defaultWorkspaceUrl: workspaceExamples[0],
  workspaceExamples,
  isDev: window.location.href.startsWith("http://localhost:3000/"),
  c4: {
    fontname: "Arial",
    headingSize: "18",
    detailSize: "12",
    bodySize: "16",
    person: {
      color: "#0b4884",
      color_ext: "#5a5a5a",
      fillcolor: "#1C4177",
      fillcolor_ext: "#999999",
      fontcolor: "#ffffff",
    },
    softwareSystem: {
      color: "#0b4884",
      color_ext: "#5a5a5a",
      fillcolor: "#1168bd",
      fillcolor_ext: "#999999",
      fontcolor: "#ffffff",
    },
    container: {
      color: "#42699b",
      color_ext: "#5a5a5a",
      fillcolor: "#568BCF",
      fillcolor_ext: "#999999",
      fontcolor: "#ffffff",
    },
    relationship: {
      color: "#707070",
      fontcolor: "#707070",
    },
  },
};
