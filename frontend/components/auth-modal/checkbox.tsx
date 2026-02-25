"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

type CheckBoxStatusProps = {
  checkBoxStatus: boolean;
  setCheckBoxStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TermsAndConditionCheckbox({
  checkBoxStatus,
  setCheckBoxStatus,
}: CheckBoxStatusProps) {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        checked={checkBoxStatus}
        onCheckedChange={(checked) => setCheckBoxStatus(!!checked)}
        className="border-red-500 bg-red-200"
        id="terms-checkbox-2"
        name="terms-checkbox-2"
      />
      <div>
        Accept{" "}
        <Link href="/terms-conditions" target="_blank">
          <span className="text-red-500 font-bold">terms and conditions</span>
        </Link>
        .
      </div>
    </div>
  );
}
