"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Undo } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { type CategoryType } from "@/lib/types";
import { useState } from "react";

export function DeleteCategoryAlert({
  type,
  id,
  category,
  upsertCategory,
}: {
  type: string;
  id: string;
  category: CategoryType;
  upsertCategory: (category: CategoryType, id: string) => Promise<void>;
}) {
  const [openAlert, setopenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <AlertDialog open={openAlert} onOpenChange={(open) => setopenAlert(open)}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          {category.isDeleted ? <Undo size={18} /> : <Trash2 size={18} />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{category.isDeleted ? "Activate category" : "Deactivate Category"}</AlertDialogTitle>
          <AlertDialogDescription>
            {category.isDeleted ? "Are you sure you want to activate this category?" : "Are you sure you want to activate this category? It can lead to unforseen issues."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={async () => {
              setLoading(true);
              await upsertCategory(
                { ...category, isDeleted: type === "deactivate" ? true : false },
                id,
              );
              setLoading(false);
              setopenAlert(false); 
            }}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
