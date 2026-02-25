"use client";

import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CldImage } from "next-cloudinary";
import { useState, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { UserType } from "@/lib/types";
import { TermsAndConditionCheckbox } from "./checkbox";
import { toast } from "sonner";

interface labelFocusPositionsType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterProps {
  inputs: UserType;
  setInputs: React.Dispatch<React.SetStateAction<UserType>>;
  setDialogStatus: React.Dispatch<React.SetStateAction<boolean>>;

  registerErrors: Partial<UserType>;
  handleRegister: () => Promise<void>;
  labelFocusPositions: labelFocusPositionsType;
  setLabelFocusPositions: React.Dispatch<
    React.SetStateAction<labelFocusPositionsType>
  >;
}

export default function Register({
  inputs,
  setInputs,
  handleRegister,
  registerErrors,
  labelFocusPositions,
  setLabelFocusPositions,
}: RegisterProps) {
  const [loading, setLoading] = useState(false);
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <AnimatePresence>
        <div className="w-full p-2 sm:p-0  flex flex-col justify-center items-center gap-4">
          <form
            autoComplete="off"
            onSubmit={handleRegister}
            className=" sm:text-sm md:text-md gap-6 flex flex-col justify-center items-center w-full"
          >
            <div className="w-full">
              <motion.div
                layout
                className="w-full flex relative flex-col justify-center items-start gap-2 p-1"
              >
                <motion.label
                  layout
                  transition={{ duration: 0.2 }}
                  className={`ml-4 cursor-text font-bold absolute ${
                    labelFocusPositions.firstName === "focused" ||
                    inputs.firstName !== ""
                      ? "mt-1 top-1 text-[11px]"
                      : ""
                  }`}
                  htmlFor="firstName"
                  onClick={() => {
                    firstNameRef.current?.focus();
                    setLabelFocusPositions((prev) => ({
                      ...prev,
                      firstName: "focused",
                    }));
                  }}
                >
                  First Name
                </motion.label>
                <Input
                  required
                  autoComplete="given-name"
                  ref={firstNameRef}
                  name="firstName"
                  type="text"
                  id="firstName"
                  value={inputs.firstName}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  onFocus={() =>
                    setLabelFocusPositions((prev) => ({
                      ...prev,
                      firstName: "focused",
                    }))
                  }
                  onBlur={() => {
                    inputs.email === "" &&
                      setLabelFocusPositions((prev) => ({
                        ...prev,
                        firstName: "",
                      }));
                  }}
                  className=" pt-8 pl-4 pb-4 w-full border-red-200 focus-visible:ring-red-200 focus-visible:border-red-400"
                />
              </motion.div>
              <span
                className={`text-red-700  ${
                  registerErrors.firstName ? "inline" : "hidden"
                }`}
              >
                {registerErrors.firstName && registerErrors.firstName}
              </span>
            </div>
            <div className="w-full">
              <motion.div
                layout
                className="w-full flex relative flex-col justify-center items-start gap-2 p-1"
              >
                <motion.label
                  layout
                  transition={{ duration: 0.2 }}
                  className={`ml-4 cursor-text font-bold absolute ${
                    labelFocusPositions.lastName === "focused" ||
                    inputs.lastName !== ""
                      ? "mt-1 top-1 text-[11px]"
                      : ""
                  }`}
                  htmlFor="lastName"
                  onClick={() => {
                    lastNameRef.current?.focus();
                    setLabelFocusPositions((prev) => ({
                      ...prev,
                      lastName: "focused",
                    }));
                  }}
                >
                  Last Name
                </motion.label>
                <Input
                  required
                  autoComplete="family-name"
                  ref={lastNameRef}
                  name="lastName"
                  type="text"
                  id="lastName"
                  value={inputs.lastName}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  onFocus={() =>
                    setLabelFocusPositions((prev) => ({
                      ...prev,
                      lastName: "focused",
                    }))
                  }
                  onBlur={() => {
                    inputs.email === "" &&
                      setLabelFocusPositions((prev) => ({
                        ...prev,
                        lastName: "",
                      }));
                  }}
                  className=" pt-8 pl-4 pb-4 w-full border-red-200 focus-visible:ring-red-200 focus-visible:border-red-400"
                />
              </motion.div>
              <span
                className={`text-red-700 ${
                  registerErrors.lastName ? "inline" : "hidden"
                }`}
              >
                {registerErrors.lastName && registerErrors.lastName}
              </span>
            </div>
            <div className="w-full">
              <motion.div
                layout
                className="w-full flex relative flex-col justify-center items-start gap-2 p-1"
              >
                <motion.label
                  layout
                  transition={{ duration: 0.2 }}
                  className={`ml-4 cursor-text font-bold absolute ${
                    labelFocusPositions.email === "focused" ||
                    inputs.email !== ""
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
                  required
                  autoComplete="email"
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
              <span
                className={`text-red-700 ${
                  registerErrors.email ? "inline" : "hidden"
                }`}
              >
                {registerErrors.email && registerErrors.email}
              </span>
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
              <span
                className={`text-red-700  ${
                  registerErrors.password ? "inline" : "hidden"
                }`}
              >
                {registerErrors.password && registerErrors.password}
              </span>
            </div>
            <div className="p-1 w-full flex flex-col gap-4 justify-center items-center">
              <TermsAndConditionCheckbox
                checkBoxStatus={checkBoxStatus}
                setCheckBoxStatus={setCheckBoxStatus}
              />
              <Button
                disabled={loading || !checkBoxStatus}
                
                onClick={async () => {
                  setLoading(true);
                  await handleRegister();
                  setLoading(false);
                }}
                type="button"
                className="w-full font-bold bg-red-400 cursor-pointer focus-visible:ring-red-200 focus-visible:border-red-400"
              >
                {loading ? <Spinner /> : "REGISTER"}
              </Button>
            </div>
            <div className="p-1 w-full">
              <Button
                disabled={loading || !checkBoxStatus}
                className="relative w-full border-red-300 cursor-pointer focus-visible:ring-red-200 focus-visible:border-red-400"
                variant="outline"
                onClick={() => !checkBoxStatus && toast.error("You must agree to the terms and conditions!")}
              >
                <CldImage
                  width={25}
                  height={25}
                  src="Google_logo"
                  alt="Google Logo"
                  className="object-fit"
                />
                Register With Google
              </Button>
            </div>
          </form>
        </div>
      </AnimatePresence>
    </>
  );
}
