"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  ChevronDown,
  Cpu,
  CircuitBoard,
  LucideMemoryStick,
  Gpu,
  Power,
  HardDrive,

  Keyboard,
  Mouse,
  Monitor,
  Printer,
  LucideHardDrive,

  Home

  
} from "lucide-react";

import SubMenu from "./submenus/submenus";

const menuVariants = {
  init: {},
  hover: {rotate: 0},
};
const subMenuVariants = {
  init: {},
  hover: {
    rotate: -180,
  },
};
const COMPONENTS_SUBMENU = [
    {
      icon: Cpu,
      label: "CPU",
      subLabel: ["AMD", "INTEL"]
    },
    {
      icon: CircuitBoard,
      label: "MOTHERBOARD",
      subLabel: ["MSI", "GIGABYTE", "ASUS"]
    },
    {
      icon: LucideMemoryStick,
      label: "MEMORY",
      subLabel:["CORSAIR", "CRUCIAL", "KINGSTON"]
    },
    {
      icon: Gpu,
      label: "GRAPHICS CARD",
      subLabel: ["MSI", "GIGABYTE", "ASUS"]
    },
    {
      icon: Power,
      label: "POWER SUPPLY",
      subLabel: ["SEASONIC", "ASUS", "CORSAIR"]
    },
    {
      icon: HardDrive,
      label: "STORAGE",
      subLabel: ["SEAGATE", "WD", "TOSHIBA"]
    },
  ];

  const PERIPHERALS_SUBMENU = [
    {
      icon: Keyboard ,
      label: "KEYBOARD",
      subLabel: ["SEAGATE", "WD", "TOSHIBA"]
    },
    {
      icon: Mouse,
      label: "MOUSE",
      subLabel: ["SEAGATE", "WD", "TOSHIBA"]
    },
    {
      icon: Monitor,
      label: "MONITOR",
      subLabel: ["SEAGATE", "WD", "TOSHIBA"]
    },
    {
      icon: Printer,
      label: "PRINTER",
      subLabel: ["SEAGATE", "WD", "TOSHIBA"]
    },
    {
      icon: LucideHardDrive,
      label: "EXTERNAL DRIVES",
      subLabel: ["SEAGATE", "WD", "TOSHIBA"]
    },
  ];


export default function Menu() {
  const [dropdowns, setDropdowns] = useState({ components: false, peripherals:false });
  return (
    <>
      <nav className="relative mb-4">
        <ul className="w-full flex justify-center items-center text-sm gap-2">
          <li className="p-2"><Home color="#ff6467"/></li>
          <motion.li
            variants={menuVariants}
            initial="init"
            whileHover="hover"
            className={`flex cursor-pointer p-2 justify-center items-center ${
              dropdowns.components && "bg-neutral-200 rounded-sm"
            }`}
            onMouseLeave={() =>
              setDropdowns((prev) => ({ ...prev, components: false }))
            }
            onMouseEnter={() =>
              setDropdowns((prev) => ({ ...prev, components: true }))
            }
          >
            <Link href="#">COMPONENTS</Link>
            <motion.span  variants={subMenuVariants}>
              <ChevronDown size={20} color="#ff6467" />
            </motion.span>
            <AnimatePresence>
              {dropdowns.components && <SubMenu items={COMPONENTS_SUBMENU} />}
            </AnimatePresence>
          </motion.li>

          <motion.li
            variants={menuVariants}
            initial="init"
            whileHover="hover"
            className={` flex  p-2 justify-center items-center ${
              dropdowns.peripherals && "bg-neutral-200 rounded-sm"
            }`}
            onMouseLeave={() =>
              setDropdowns((prev) => ({ ...prev, peripherals: false }))
            }
            onMouseEnter={() =>
              setDropdowns((prev) => ({ ...prev, peripherals: true }))
            }
          >
            <Link href="#">PERIPHERALS</Link>
            <motion.span className="cursor-pointer" variants={subMenuVariants}>
              <ChevronDown size={20} color="#ff6467" />
            </motion.span>
            <AnimatePresence>
            {dropdowns.peripherals && <SubMenu items={PERIPHERALS_SUBMENU} />}
            </AnimatePresence>
          </motion.li>
          <li className="p-2 cursor-pointer"><Link href="#">ACCESSORIES</Link></li>
          <li className="p-2 cursor-pointer"><Link href="#">NETWORKING</Link></li>
          <li className="p-2 cursor-pointer"><Link href="#">GAMING ZONE</Link></li>
        </ul>
      </nav>
    </>
  );
}
