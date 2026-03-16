"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { CategoryType } from "@/lib/types";

export function AddCategoryDialog({
  id,
  type,
  buttonText,
  upsertCategory,
}: {
  id: string;
  type: string;
  buttonText?: ReactNode;
  upsertCategory: (category: CategoryType, id: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Dialog >
      <form className="flex justify-end">
        <DialogTrigger asChild>
          <Button
            className={`${type === "parent" && "cursor-pointer bg-[#ff6467] text-white hover:bg-[#ff6467] hover:opacity-95"} cursor-pointer`}
            variant="secondary"
          >
            {buttonText && buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add a category</DialogTitle>
            <DialogDescription className="sr-only">
              Create a new Category
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={name}
                onChange={(e) => {
                  e.stopPropagation();
                  setName(e.target.value);
                }}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={async () => {
                setLoading(true);
                await upsertCategory(
                  {
                    id: nanoid(10),
                    name: name,
                    collapsed: true,
                    parentId: type === "parent" ? null : id,
                  },
                  id,
                );
                setLoading(false);
              }}
              disabled={loading}
              type="button"
            >
              {loading ? <Spinner /> : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
