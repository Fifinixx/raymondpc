"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu } from "lucide-react";
import Search from "@/components/search/search";
import Logo from "@/components/logo/logo";
import Cart from "@/components/cart/cart";

export default function MobileMenu() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <motion.div className=" sm:hidden z-50 sticky top-0 flex flex-col w-full  bg-neutral-100 p-2 border-b-[2px] rounded-b-sm border-red-400 ">
      <div className="flex flex-col justify-center gap-4 items-center w-full">
        <div className="flex justify-between items-center w-full pl-2 pr-2">
            <Logo />
            <Cart />
        </div>
        <div className="flex gap-1 justify-center items-center w-full">
          <Search />
          <motion.span
            layout
            className={`p-2 rounded-md ${openMenu && "bg-neutral-200 "}`}
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <Menu color={openMenu ? "#ff6467" : undefined} />
          </motion.span>
        </div>
      </div>

      <AnimatePresence>
        {openMenu && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden  flex  flex-col justify-center items-center [&>*]:p-2 [&>*]:text-center [&>*]:w-full [&>*]:border-b-[0.1px] [&>*]:border-b-red-700"
          >
            <li>COMPONENTS</li>
            <li>PERIPHERALS</li>
            <li>ACCESSORIES</li>
            <li className="border-none pb-0!">GAMING ZONE</li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
