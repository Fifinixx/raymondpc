import Auth from "../auth-modal/auth";
import Search from "../search/search";
import Logo from "../logo/logo";
import Cart from "../cart/cart";
import WishList from "../wishlist/wishlist";
import Menu from "../menu/desktop/menu";
import MobileMenu from "../menu/mobile/menu";
import StickyMenu from "../sitcky-menu/sticky-menu";
import Link from "next/link";
import {
  SiInstagram,
  SiYoutube,
  SiWhatsapp,
  SiFacebook,
} from "@icons-pack/react-simple-icons";
import { Contact, PhoneCall, Mail } from "lucide-react";

export default function TopHeader() {
  return (
    <>
      <div className="w-full hidden sm:flex justify-end items-center bg-neutral-100 border-[#ff6467]">
        {/* <div className="flex justify-center items-center  gap-4 pt-2 pb-2 [&>*]:cursor-pointer">
          <span>
            <SiInstagram size={15} color="#FF0069" />
          </span>
          <span>
            <SiYoutube size={15} color="#FF0000" />
          </span>
          <span>
            <SiWhatsapp size={15} color="#1a9547" />
          </span>
          <span>
            <SiFacebook size={15} color="#0866FF" />
          </span>
        </div> */}
        <div className="flex justify-center gap-4 items-center text-xs text-neutral-700 p-2">
        {/* <span className="inline-flex gap-1"><PhoneCall size={15} /> +919341652315</span> */}
          <Link href="/">FAQ</Link>
          <Link href="">AFFILIATE</Link>
          <Link href="">CONTACT US</Link>
        </div>
      </div>
      <div className="z-50 sm:sticky sm:top-0 hidden h-34 bg-neutral-100 border-b-[2px] rounded-b-sm border-red-400 w-screen sm:flex gap-6 flex-col justify-around items-center pl-4 pr-4 pb-4 pt-4">
        <div className="w-full max-w-[1500px] flex gap-12  justify-between items-center">
          <Logo />
          <Search />
          <div className="flex flex-col justify-center items-center border-[0.1px] border-[#ff6467] p-2 rounded-md text-xs gap-1">
            <span className="inline-flex w-full gap-2"><PhoneCall size={15}  color="#ff6467"/> +919341652315</span>
            <span className="inline-flex w-full gap-2"><Mail size={15} color="#ff6467"/> hidebmalya@gmail.com</span>
          </div>
          <div className=" border-[0.1px] flex justify-center items-center gap-8 p-2 border-[#ff6467] rounded-md">
            <Cart />
            <WishList />
            <Auth />
          </div>
        </div>
        <Menu />
      </div>
      <MobileMenu />
      <StickyMenu />
    </>
  );
}
