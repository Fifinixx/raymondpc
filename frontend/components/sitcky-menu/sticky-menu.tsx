import { Home } from "lucide-react"
import WishList from "../wishlist/wishlist"
import Auth from "../auth-modal/auth"
import Cart from "../cart/cart"

export default function StickyMenu(){
    return <>
        <div className="z-50 flex fixed bottom-0 sm:hidden h-12 justify-around items-center bg-neutral-200 mt-16 w-full border-t-[2px] border-[#ff6427]">
            <Home /> 
            <WishList />
            <Cart />
            <Auth />
        </div>
    </>
}