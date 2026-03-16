import type { CategoryType } from "@/lib/types";

export default function CategoryItem(item:CategoryType){
    return <>
        <div>
            {item.name}
        </div>
        </>
}