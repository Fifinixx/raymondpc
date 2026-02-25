"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { Table, TableKit } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./tip-tap-menu";
import { ProductType } from "@/lib/types";

type TipTapPropsType = {
  inputs: ProductType;
  setInputs: React.Dispatch<React.SetStateAction<ProductType>>;
};

const Tiptap = ({ inputs, setInputs }: TipTapPropsType) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: inputs.description,
    onUpdate: ({ editor }) => {
      setInputs((prev) => ({
        ...prev,
        description: editor.isEmpty
          ? ""
          : editor.getJSON(),
      }));
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[150px] p-4",
      },
    },

    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
  });

  return (
    <div className="border-[1px] flex w-full flex-col overflow-hidden">
      <MenuBar editor={editor} />
      <div className="bg-white min-h-[150px]">
        <EditorContent
          className="p-4 text-black outline-none focus:outline-none selection:bg-[#ff6467] selection:text-neutral-200"
          editor={editor}
        />
      </div>
    </div>
  );
};

export default Tiptap;
