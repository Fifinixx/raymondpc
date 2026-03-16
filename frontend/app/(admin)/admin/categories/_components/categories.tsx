"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import CategoryTree from "./category-tree";
import { AddCategoryDialog } from "./add-category-modal";
import { Spinner } from "@/components/ui/spinner";
import { useCategories } from "../../hooks/use-categories";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { fa } from "zod/v4/locales";

export default function Categories() {
  const {
    formatCategories,
    categories,
    setCategories,
    upsertCategory,
    loading,
  } = useCategories();

  const [toggleDeleted, setToggleDeleted] = useState(false);
  return (
    <div className="w-full flex flex-col justify-center items-center p-4 ">
      <h1 className="text-2xl">Categories</h1>
      {loading ? (
        <div className="p-4">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-2xl w-full flex flex-col justify-center gap-4 mt-4 bg-neutral-900 border-[0.1px] p-4 rounded-md">
          <div className="flex justify-end gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={toggleDeleted}
                onCheckedChange={(checked) => {
                  setToggleDeleted(checked ? true : false);
                }}
                name="hide_checkbox"
                id="hide_checkbox"
              />
              <Label htmlFor="hide_checkbox">Hide deleted categories </Label>
            </div>
            <AddCategoryDialog
              buttonText="Add a parent category"
              type="parent"
              upsertCategory={upsertCategory}
              id={nanoid(10)}
            />
          </div>

          {categories.length === 0 ? (
            <div className="text-center">No categories found</div>
          ) : (
            <CategoryTree
              toggleDeleted={toggleDeleted}
              upsertCategory={upsertCategory}
              setCategories={setCategories}
              formattedCategories={formatCategories(categories)}
            />
          )}
        </div>
      )}
    </div>
  );
}
