"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  List,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  UserRoundCog,
} from "lucide-react";
import { useAppDispatch } from "@/app/(storefront)/hooks";
import { toast } from "sonner";
import { clearUser } from "@/store/slices/auth-slice";
import Link from "next/link";

export default function UserDropDown({
  firstName,
  role,
}: {
  firstName: string | null;
  role: string | null;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const dispatch = useAppDispatch();
  async function SignOut() {
    try {
      const res = await fetch(`${baseUrl}/auth/signout`, {
        credentials: "include",
      });
      if (!res.ok) {
        toast.error("Failed to sign out user");
      } else {
        dispatch(clearUser());
      }
    } catch (e) {
      console.error("Server error, please try again. ", e);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer bg-red-400 p-4 rounded-full w-3 h-3">
          {firstName?.split("")[0].toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <span className="cursor-pointer">
              <UserIcon /> Account
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <span className="cursor-pointer">
              <List /> Orders
            </span>
          </DropdownMenuItem>
          {role === "ADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <span className="inline-flex gap-2  cursor-pointer text-blue-900 font-bold">
                  <UserRoundCog /> ADMIN
                </span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild variant="destructive">
            <span className="cursor-pointer" onClick={SignOut}>
              <LogOutIcon />
              Sign Out
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
