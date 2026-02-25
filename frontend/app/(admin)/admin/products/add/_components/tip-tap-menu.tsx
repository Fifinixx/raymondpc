import {
  Bold,
  ItalicIcon,
  List,
  Table,
  Columns,
  Rows,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent, Editor } from "@tiptap/react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="p-2 w-full flex gap-2 justify-start items-center bg-neutral-600">
      <Button
        type="button"
        variant={editor.isActive("bold") ? "default" : "ghost"}
        className={
          editor.isActive("bold")
            ? "bg-white text-black hover:bg-white"
            : "text-white"
        }
        onClick={() => editor.chain().focus().toggleBold().run()}
        size="sm"
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={editor.isActive("italic") ? "default" : "ghost"}
        className={
          editor.isActive("italic")
            ? "bg-white text-black hover:bg-white"
            : "text-white"
        }
        onClick={() => editor.chain().focus().toggleItalic().run()}
        size="sm"
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={editor.isActive("bulletList") ? "default" : "ghost"}
        className={
          editor.isActive("bulletList")
            ? "bg-white text-black hover:bg-white"
            : "text-white"
        }
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        size="sm"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("table") ? "default" : "ghost"}
        className={
          editor.isActive("table")
            ? "bg-white text-black hover:bg-white"
            : "text-white"
        }
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 1, cols: 2, withHeaderRow: false })
            .run()
        }
        size="sm"
      >
        <Table className="h-4 w-4" />
      </Button>
      {editor.isActive("table") && (
        <>
          <Button
            type="button"
            variant="ghost"
            className="text-white"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
          >
            <Columns className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="text-white"
            onClick={() => editor.chain().focus().addRowAfter().run()}
          >
            <Rows className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="text-white "
            onClick={() => editor.chain().focus().deleteTable().run()}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default MenuBar;
