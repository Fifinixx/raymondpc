import { ShoppingBag, Plus, Edit, Delete } from "lucide-react"
import { SidebarGroup, SidebarGroupLabel,  SidebarMenu, SidebarMenuItem, SidebarMenuButton} from "../ui/sidebar"
import { Collapsible } from "../ui/collapsible"

const items = {
    label:"Manage products",
    menu: "Products",
    link: "/products",
    icon: <ShoppingBag size={18} />,
    submenus: {
      menu: ["Add", "Edit", "Delete"],
      icons: [<Plus size={18} />, <Edit size={18} />, <Delete size={18} />],
      links: ["/add", "/edit", "/delete"],
    },
  }


export default function ManageProducts(){
    <>
        <SidebarGroup>
            <SidebarGroupLabel>{items.label}</SidebarGroupLabel>
            <SidebarMenu>
                {/* {items.} */}
            </SidebarMenu>
        </SidebarGroup>
    </>
}