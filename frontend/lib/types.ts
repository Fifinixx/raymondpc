import { type LucideIcon } from "lucide-react";
import { JSONContent } from "@tiptap/react";
interface UserType {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

// Admin dashboard
interface ProductThumbType {
  previousPrice?: number;
  price: number;
  title: string;
  discount?: string;
  arrival?: string;
  image: string;
  alt: string;
}

interface ProductType {
  title:  string;
  description:JSONContent | string ;
  msrp: number ;
  price: number ;
  stock: number ;
  variant?: string ;
  images: (File | string)[];
}



interface SidebarItemsGroupType {
  group: string;
  items: {
    icon: LucideIcon;
    title: string;
    link: string;
    subitems?: {
      title: string;
      link: string;
    }[];
  }[];
}



export type { UserType, ProductThumbType, SidebarItemsGroupType, ProductType };
