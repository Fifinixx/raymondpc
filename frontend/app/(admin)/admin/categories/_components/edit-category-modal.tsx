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
import { Edit2 } from "lucide-react";
import { CategoryType } from "@/lib/types";

export function EditCategoryDialog({
  id,
  type,
  upsertCategory,
  category
}: {
  id: string;
  type?: string;
  category:CategoryType,
  upsertCategory: (category: CategoryType, id: string) => Promise<void>;
}) {
  const [name, setName] = useState(category.name);
  const [loading, setLoading] = useState(false);
  return (
    <Dialog >
      <form className="flex justify-end">
        <DialogTrigger asChild>
          <Button
            className={`${type === "parent" && "cursor-pointer bg-[#ff6467] text-white hover:bg-[#ff6467] hover:opacity-95"} cursor-pointer`}
            variant="secondary"
          >
           <Edit2 size={16}/>
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
                    ...category,
                    name:name
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
