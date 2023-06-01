import React, { useState } from "react";
import {
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  Plate,
  type PlatePlugin,
  Toolbar,
  ToolbarButton,
  type Value,
  createPlugins,
} from "@udecode/plate";

import { Bold, Italic, Underline } from "lucide-react";
import { plateUI } from "./common/plateUi";
import PlateToolbar from "./toolbar/PlateToolbar";

const platePlugins: PlatePlugin[] = [
  createParagraphPlugin(),
  createBlockquotePlugin(),
  createCodeBlockPlugin(),
  createHeadingPlugin(),

  createBoldPlugin(),
  createItalicPlugin(),
  createUnderlinePlugin(),
  createStrikethroughPlugin(),
  createCodePlugin(),
];

const plugins = createPlugins(platePlugins, { components: plateUI });

const PlateEditor = () => {
  const [editorValue, setEditorValue] = useState<Value>();

  return (
    <div className="flex flex-col gap-4">
      <Plate
        onChange={(newValue) => setEditorValue(newValue)}
        initialValue={[
          {
            type: "p",
            children: [
              {
                text: "This is editable plain text with react and history plugins, just like a <textarea>!",
              },
            ],
          },
        ]}
        plugins={plugins}
        editableProps={{
          className: "relative focus:outline-none p-4 mt-4",
        }}
      >
        <div className="absolute ml-2">
          <PlateToolbar />
        </div>
      </Plate>
    </div>
  );
};

export default PlateEditor;
