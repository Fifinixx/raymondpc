import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

type SubMenuItemProps = {
  icon: LucideIcon;
  label: string;
  subLabel: string[];
};

type SubMenuItemPropsArray = {
  items: SubMenuItemProps[];
};

const hoverMenuVariant = {
  init: { color: "#404952" },
  hover: {
    color: "#ff6467",
    transition: {
      duration: 0.2,
      staggerChildren: 0.05,
    },
  },
};
const hoverMenuIconVariant = {
  init: {
    color: "#404952",
    backgroundColor: "#e5e5e5",
  },
  hover: {
    color: "#e5e5e5",
    backgroundColor: "#ff6467",
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
};

export default function SubMenu({ items }: SubMenuItemPropsArray) {
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -2 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -2 }}
        className="border-t-6 border-transparent absolute top-full left-0 w-full "
      >
        <ul className="w-full bg-neutral-200 rounded-sm z-20 grid grid-cols-4 p-6 gap-4 ">
          {items.map((item) => {
            return (
              <li key={item.label}>
                <motion.span
                  variants={hoverMenuVariant}
                  initial="init"
                  whileHover="hover"
                  className="inline-flex cursor-pointer justify-center items-start gap-4 text-xs whitespace-nowrap"
                >
                  <motion.span
                    variants={hoverMenuIconVariant}
                    className=" border-[0.1px] p-2 border-red-400   rounded-sm"
                  >
                    <item.icon size={12} />
                  </motion.span>
                  <span className="flex flex-col items-start justify-center">
                    <span>{item.label}</span>
                    <span className="flex justify-start gap-1 items-center flex-wrap">
                      {item.subLabel.map((item) => {
                        return (
                          <motion.span
                            whileHover={{ color: "#000" }}
                            className="text-[8px] text-[#ff6467] underline underline-offset-1"
                            key={item}
                          >
                            <Link href="#">{item}</Link>
                          </motion.span>
                        );
                      })}
                    </span>
                  </span>
                </motion.span>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
}
