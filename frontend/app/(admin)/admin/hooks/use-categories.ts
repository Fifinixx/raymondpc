import { CategoryType } from "@/lib/types";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { nanoid } from "nanoid";

export function useCategories() {
  // I feel these two functions are just just brute forcing the category nesting.
  //Needs refinement, may break in production
  function recursiveChildrenFormat(
    category: CategoryType,
    categoriesArr: CategoryType[],
  ): CategoryType[] | [] {
    const childrens = categoriesArr.filter(
      (item) => item.parentId === category.id,
    );
    if (childrens.length > 0) {
      return childrens.map((item) => {
        return {
          ...item,
          children: recursiveChildrenFormat(item, categoriesArr),
        };
      });
    } else {
      return [];
    }
  }
  function formatCategories(categories: CategoryType[]): CategoryType[] {
    return categories
      .map((category: CategoryType) => {
        if (category.parentId === null) {
          return {
            ...category,
            children: recursiveChildrenFormat(category, categories),
          };
        } else {
          return category;
        }
      })
      .filter((item) => item.parentId === null);
  }

 
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCategories() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/categories`,
        {
          credentials: "include",
        },
      );
      if (!res.ok) {
        toast.error("Error while fetching categories");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setCategories(data.categories);
      setLoading(false);
    } catch (e) {
      console.error("Server error while fetching categories", e);
      toast.error("Server error while fetching categories");
    }
  }

async function upsertCategory(category: CategoryType, id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify({ category: category, id: id }),
        credentials: "include",
      },
    );

    if (!res.ok) {
      const error = await res.json();
      console.log(error)
      toast.error(error.errors[0].message);
      return;
    }

    const data = await res.json();
    await fetchCategories();
    toast.success(data.message);

  } catch (e) {
    console.log(e)
    console.error("Server error while updating category");
    toast.error("Server error while updating category");
  }
}
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    formatCategories,
    fetchCategories,
    categories,
    setCategories,
    loading,
    setLoading,
    upsertCategory,
  };
}
