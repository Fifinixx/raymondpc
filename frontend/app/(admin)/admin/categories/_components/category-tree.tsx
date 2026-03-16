"use client";

import { useState, useEffect } from "react";
import type { CategoryType } from "@/lib/types";
import { Plus, Edit, Trash2, ChevronDown } from "lucide-react";
import { AddCategoryDialog } from "./add-category-modal";
import { EditCategoryDialog } from "./edit-category-modal";
import { DeleteCategoryAlert } from "./delete-category-alert";

function toggleCollapse(
  category: CategoryType,
  setToggles: React.Dispatch<React.SetStateAction<CategoryType[]>>,
) {
  setToggles((prev) => {
    return prev.map((item) => {
      return item.id === category.id
        ? { ...item, collapsed: !item.collapsed }
        : item;
    });
  });
}

export default function CategoryTree({
  toggleDeleted,
  upsertCategory,
  formattedCategories,
  setCategories,
}: {
  toggleDeleted: boolean,
  upsertCategory: (category: CategoryType, id: string) => Promise<void>;
  formattedCategories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}) {
  const [toggles, setToggles] = useState(formattedCategories);

  useEffect(() => {
    setToggles((prev) => {
      return formattedCategories.map(item => {
        const prevToggle = prev.find(t => t.id === item.id);
        return prevToggle
          ? { ...item, collapsed: prevToggle.collapsed }
          : item;
      });
    });
  }, [formattedCategories]);
  return toggles.map((category: CategoryType) => {
    return (
      <div
        key={category.id}
        className={` cursor-pointer border-l-[0.1px] border-[#ff6467] pl-4 pt-2`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleCollapse(category, setToggles);
          }}
          className={`${category.isDeleted === true && toggleDeleted === true ? "hidden": "flex"}  justify-between items-center ${category.isDeleted && "opacity-50 text-red-500"}`}
        >
          <span className="inline-flex items-center">
            {category?.name}
            {category?.children && category.children.length > 0 && (
              <ChevronDown size={18} />
            )}
          </span>
          <span
            onClick={(e) => e.stopPropagation()}
            className="flex gap-2 items-center justify-center"
          >
            <AddCategoryDialog
              type="child"
              buttonText={<Plus size={12} />}
              id={category.id}
              upsertCategory={upsertCategory}
            />
            <EditCategoryDialog
              id={category.id}
              category={category}
              upsertCategory={upsertCategory}
            />
            <DeleteCategoryAlert
              type={category.isDeleted ? "activate" : "deactivate"}
              id={category.id}
              category={category}
              upsertCategory={upsertCategory}
            />
          </span>
        </div>
        {category.children &&
          category.children.length > 0 &&
          category.collapsed === false && (
            <CategoryTree
            toggleDeleted={toggleDeleted}
              upsertCategory={upsertCategory}
              setCategories={setCategories}
              formattedCategories={category.children}
            />
          )}
      </div>
    );
  });
}
