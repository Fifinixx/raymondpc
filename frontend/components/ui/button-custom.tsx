"use client";

import React from "react";

import {HTMLMotionProps, motion } from "motion/react";

type ButtonProps = HTMLMotionProps<"button"> & {
  buttonType?: string;
  width?: string
};
export default function Button({ buttonType, width, ...props }: ButtonProps) {
  return (
    <motion.button
    
      {...props}
      className={`border-[0.1px] ${ width === "full" ? "w-full" : ""
      } ${
        buttonType === "outline"
          ? "text-red-700  border-red-700  hover:bg-red-100"
          : "bg-red-700 text-neutral-200  hover:bg-red-600 hover:border-[0.1px] hover:border-red-700"
      } cursor-pointer rounded-sm p-2 `}
    >
      {props.children}
    </motion.button>
  );
}
