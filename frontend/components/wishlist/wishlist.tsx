import { HeartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WishList() {
  return (
    <div className="relative inline-flex">
      <HeartIcon
        className="h-6 w-6"
        // color="oklch(70.4% 0.191 22.216)"
        // fill="oklch(70.4% 0.191 22.216)"
      />

      <Badge
        variant="secondary"
        className="
          absolute
          -top-2
          -right-2
          h-3
          min-w-[1rem]
          flex items-center justify-center
          rounded-full
          bg-red-400
          text-white
          text-xs
          px-1
          py-2
        "
      >
        0
      </Badge>
    </div>
  );
}
