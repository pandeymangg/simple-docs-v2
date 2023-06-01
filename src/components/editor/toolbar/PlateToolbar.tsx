import {
  HeadingToolbar,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MarkToolbarButton,
  getPluginType,
  usePlateEditorRef,
} from "@udecode/plate";
import { Bold, Italic, Underline } from "lucide-react";
import React from "react";

const PlateToolbar = () => {
  const editor = usePlateEditorRef();

  return (
    <HeadingToolbar
      styles={{
        root: {
          border: "none",
          color: "var(--text)",
        },
      }}
    >
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<Bold />}
        className="hover:!text-primary"
        styles={{
          active: { color: "var(--flamingo) !important" },
        }}
      />

      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<Underline />}
        className="hover:!text-primary"
        styles={{
          active: { color: "var(--flamingo) !important" },
        }}
      />

      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<Italic />}
        className="hover:!text-primary"
        styles={{
          active: { color: "var(--flamingo) !important" },
        }}
      />
    </HeadingToolbar>
  );
};

export default PlateToolbar;
