import React, { useMemo } from "react";
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
  type Value,
  createPlugins,
} from "@udecode/plate";

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

const PlateEditor: React.FC<{
  editorValue: string;
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (newValue: string) => void;
  isReadOnly?: boolean;
}> = ({ editorValue, setEditorValue, onChange, isReadOnly }) => {
  const onEditorValueChange = (newValue: Value) => {
    setEditorValue(JSON.stringify(newValue));

    onChange(JSON.stringify(newValue));
  };

  const editorInitialValue = useMemo(() => {
    if (editorValue) {
      return JSON.parse(editorValue) as Value;
    }

    return undefined;
  }, [editorValue]);

  return (
    <div className="flex flex-col gap-4">
      <Plate
        onChange={(newValue) => {
          if (isReadOnly) return;

          onEditorValueChange(newValue);
        }}
        initialValue={editorInitialValue}
        plugins={plugins}
        editableProps={{
          className: "relative focus:outline-none p-4 mt-4",
          placeholder: "Start typing...",
          readOnly: isReadOnly,
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
