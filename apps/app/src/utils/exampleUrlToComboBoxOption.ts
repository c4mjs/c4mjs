import { flow, replace, startCase } from "lodash";
import { IComboBoxOption } from "@fluentui/react/lib/components/ComboBox/ComboBox.types";

export const exampleUrlToComboBoxOption = (exampleUrl: string): IComboBoxOption => ({
  key: exampleUrl,
  text: flow(
    (it) => replace(it, "/examples/", ""),
    (it) => replace(it, ".json", ""),
    startCase
  )(exampleUrl),
});
