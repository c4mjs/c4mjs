import React, { createRef } from "react";
import {
  ComboBox,
  DefaultButton,
  IComboBox,
  Image,
  SelectableOptionMenuItemType,
  Stack,
  StackItem,
  Text,
  useTheme,
} from "@fluentui/react";
import { config } from "../config";
import { uniqBy } from "lodash";
import { exampleUrlToComboBoxOption } from "../utils/exampleUrlToComboBoxOption";

export type IAppBarCtr = {
  onLoadSchema: (url: string) => void;
  schemaLoading: boolean;
  url: string;
};
export const AppBar: React.FC<IAppBarCtr> = ({ onLoadSchema, schemaLoading, url }) => {
  const { spacing, palette } = useTheme();
  const urlInputRef = createRef<IComboBox>();

  return (
    <Stack
      id="app-bar"
      horizontal
      verticalAlign="center"
      horizontalAlign="space-between"
      styles={{
        root: { padding: spacing.s1, backgroundColor: palette.themeLighter, height: "48px" },
      }}
    >
      <Stack horizontal tokens={{ childrenGap: spacing.m }} verticalAlign="center">
        <StackItem>
          <Image src={"/logo128.png"} height={32} width={32} />
        </StackItem>
        <StackItem onClick={() => window.open("https://c4mjs.github.io/c4mjs/#/")}>
          <Text
            styles={{ root: { color: palette.neutralPrimary, userSelect: "none", fontSize: 24, cursor: "pointer" } }}
          >
            <span style={{ whiteSpace: "nowrap", fontFamily: "Montserrat Subrayada" }}>C4 Model</span>
            <span style={{ paddingLeft: 4, fontFamily: "Shadows Into Light" }}>.js</span>
          </Text>
        </StackItem>
      </Stack>
      <Stack horizontal tokens={{ childrenGap: spacing.s1 }}>
        <ComboBox
          allowFreeform
          componentRef={urlInputRef}
          styles={{ root: { width: "25em" } }}
          options={uniqBy(
            [
              { key: url, text: url },
              {
                key: "examples",
                text: "Examples",
                itemType: SelectableOptionMenuItemType.Header,
              },
              ...config.workspaceExamples.map(exampleUrlToComboBoxOption),
            ],
            "text"
          )}
          defaultSelectedKey={url}
        />
        <DefaultButton
          onClick={() =>
            urlInputRef.current?.selectedOptions[0].key &&
            onLoadSchema(urlInputRef.current?.selectedOptions[0].key as string)
          }
          disabled={schemaLoading}
        >
          Load
        </DefaultButton>
      </Stack>
    </Stack>
  );
};
