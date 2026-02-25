import { User2Icon } from "lucide-react";
import UserDropDown from "./user-dropdown";
import { Button } from "@/components/ui/button";

export default function User({
  role,
  firstName,
}: {
  firstName: string | null;
  email: string | null;
  userId: string | null;
  role: string | null;
}) {
  return (
    <>
        <UserDropDown  firstName={firstName} role={role}/>
    </>
  );
}
