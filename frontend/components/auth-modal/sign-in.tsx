"use client";

import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { UserType } from "@/lib/types";


type labelFocusPositionsType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
type SignInProps = {
  inputs: Pick<UserType, "email" | "password">;
  setInputs: React.Dispatch<React.SetStateAction<Pick<UserType, "email" | "password">>>;
  signInError: string;
  handleSignIn: () => Promise<void>;
  labelFocusPositions: Omit<labelFocusPositionsType, "firstName" | "lastName">;
  setLabelFocusPositions: React.Dispatch<
    React.SetStateAction<labelFocusPositionsType>
  >;
};

export default function SignIn({
  inputs,
  setInputs,
  handleSignIn,
  signInError,
  labelFocusPositions,
  setLabelFocusPositions,
}: SignInProps) {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement | null >(null);
  const passwordRef = useRef<HTMLInputElement | null>(null)
  return (
    <>
      <AnimatePresence>
        <div className="w-full p-2 sm:p-0  flex flex-col justify-center items-center gap-4">
          <form className=" sm:text-sm md:text-md gap-6 flex flex-col justify-center items-center w-full">
            <div className="w-full">
              <motion.div
                layout
                className="w-full flex relative flex-col justify-center items-start gap-2 p-1"
              >
                <motion.label
                  layout
                  transition={{ duration: 0.2 }}
                  className={`ml-4 cursor-text font-bold absolute ${
                    labelFocusPositions.email === "focused"
                      ? "mt-1 top-1 text-[11px]"
                      : ""
                  }`}
                  htmlFor="email"
                  onClick={() => {
                    emailRef.current?.focus();
                    setLabelFocusPositions((prev) => ({
                      ...prev,
                      email: "focused",
                    }));
                  }}
                >
                  Email
                </motion.label>
                <Input
                  autoComplete="username"
                  required
                  ref={emailRef}
                  name="email"
                  type="email"
                  id="email"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  onFocus={() =>
                    setLabelFocusPositions((prev) => ({
                      ...prev,
                      email: "focused",
                    }))
                  }
                  onBlur={() => {
                    inputs.email === "" &&
                      setLabelFocusPositions((prev) => ({
                        ...prev,
                        email: "",
                      }));
                  }}
                  className=" pt-8 pl-4 pb-4 w-full border-red-200 focus-visible:ring-red-200 focus-visible:border-red-400"
                />
              </motion.div>
            </div>
            <div className="w-full">
              <motion.div
                layout
                className="flex p-1 relative flex-col justify-center items-start gap-2"
              >
                <motion.label
                  layout
                  transition={{ duration: 0.2 }}
                  className={`ml-4 cursor-text font-bold absolute ${
                    labelFocusPositions.password === "focused"
                      ? "mt-1 top-1 text-[11px]"
                      : ""
                  }`}
                  onClick={() => {
                    emailRef.current?.focus();
                    setLabelFocusPositions((prev) => ({
                      ...prev,
                      email: "focused",
                    }));
                  }}
                  htmlFor="password"
                >
                  Password
                </motion.label>
                <Input
                  ref={passwordRef}
                  autoComplete="new-password"
                  required
                  name="password"
                  type="password"
                  id="password"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  onFocus={() =>
                    setLabelFocusPositions((prev) => ({
                      ...prev,
                      password: "focused",
                    }))
                  }
                  onBlur={() => {
                    inputs.password === "" &&
                      setLabelFocusPositions((prev) => ({
                        ...prev,
                        password: "",
                      }));
                  }}
                  className=" pt-8 pl-4 pb-4 w-full border-red-200 focus-visible:ring-red-200 focus-visible:border-red-400"
                />
              </motion.div>
            </div>
            <div
                className={`text-red-700 w-full text-center ${
                  signInError ? "block" : "hidden"
                }`}
              >
                {signInError && signInError}
              </div>
            <Button
              disabled={loading}
              type="button"
              onClick={async () => {
                setLoading(true);
                await handleSignIn();
                setLoading(false);
              }}
              className="w-full bg-red-400 cursor-pointer"
            >
              <span className="font-bold">
                {loading ? <Spinner /> : "SIGN IN"}
              </span>
            </Button>
            <Button
              disabled={loading}
              className="relative w-full border-red-300 cursor-pointer"
              variant="outline"
            >
              <CldImage
                width={25}
                height={25}
                src="Google_logo"
                alt="Google Logo"
                className="object-fit"
              />
              Sign In With Google
            </Button>
          </form>
        </div>
      </AnimatePresence>
    </>
  );
}
