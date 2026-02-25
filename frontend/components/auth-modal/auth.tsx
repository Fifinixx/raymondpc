"use client";

import SignIn from "./sign-in";
import Register from "./register";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import SuccessTick from "./succes-tick";
import User from "../user/user";
import { useAuthForm } from "@/hooks/use-auth";
import { User2Icon } from "lucide-react";

export default function Auth() {
  const {
    tab,
    setTab,
    displaySuccess,
    setDisplaySuccess,
    dialogStatus,
    setDialogStatus,
    handleSignIn,
    handleRegister,
    resetInputs,
    user,
    signInInputs,
    setSignInInputs,
    registerInputs,
    setRegisterInputs,
    signInError,
    setSignInError,
    registerErrors,
    setRegisterErrors,
    labelFocusPositions,
    setLabelFocusPositions
  } = useAuthForm();
  

  if (user?.firstName) {
    return <User {...user} />;
  }
  return (
    <Dialog open={dialogStatus} onOpenChange={setDialogStatus}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer bg-red-400 w-8 h-8 rounded-full">
          <User2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col items-center sm:max-w-md overflow-hidden">
        {displaySuccess && <SuccessTick />}
        <motion.div layout className="flex flex-col items-center w-full">
          <motion.div className="relative flex w-64 mb-4">
            <motion.div
              className="absolute bottom-0 h-[2px] w-1/2 bg-red-400"
              animate={{ x: tab === 0 ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              className="flex-1 cursor-pointer text-center pb-1"
              onClick={() => {
                resetInputs("register");
                setLabelFocusPositions({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                });
                setTab(0);
              }}
            >
              SIGN IN
            </button>
            <button
              className="flex-1 cursor-pointer text-center pb-1"
              onClick={() => {
                setLabelFocusPositions({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                });
                resetInputs("signin");
                setTab(1);
              }}
            >
              REGISTER
            </button>
          </motion.div>

          <DialogHeader>
            <DialogTitle className="sr-only">Authentication</DialogTitle>
            <DialogDescription className="sr-only">
              Sign in or Register
            </DialogDescription>
          </DialogHeader>
          <motion.div
            layout
            className="w-full h-full overflow-hidden"
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {tab === 0 ? (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <SignIn
                    inputs={signInInputs}
                    setInputs={setSignInInputs}
                    handleSignIn={handleSignIn}
                    signInError={signInError}
                    labelFocusPositions={labelFocusPositions}
                    setLabelFocusPositions={setLabelFocusPositions}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <Register
                    setDialogStatus={setDialogStatus}
                    inputs={registerInputs}
                    setInputs={setRegisterInputs}
                    handleRegister={handleRegister}
                    registerErrors={registerErrors}
                    labelFocusPositions={labelFocusPositions}
                    setLabelFocusPositions={setLabelFocusPositions}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
