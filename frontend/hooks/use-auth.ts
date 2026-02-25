import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/(storefront)/hooks";
import { setUser, clearUser } from "@/store/slices/auth-slice";
import { userSchema, signInSchema } from "../../shared/schemas";
import { UserType } from "@/lib/types";
import { z } from "zod";

import { signInService, registerService } from "@/lib/services/auth.service";
import { toast } from "sonner";

export function useAuthForm() {
  const [tab, setTab] = useState(0);
  const [signInInputs, setSignInInputs] = useState({ email: "", password: "" });
  const [registerInputs, setRegisterInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signInError, setSignInError] = useState("");
  const [registerErrors, setRegisterErrors] = useState<Partial<UserType>>({});
  const [dialogStatus, setDialogStatus] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);

  const [labelFocusPositions, setLabelFocusPositions] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function resetInputs(type: string) {
    if (type === "register") {
      setRegisterInputs({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
    if (type === "signin") {
      setSignInInputs({ email: "", password: "" });
    }
  }


  function validateInputs(
    validate: string,
    inputs: UserType | Pick<UserType, "email" | "password">
  ) {
    if (validate === "signin") {
      setSignInError("");
      const checkSignInInputs = signInSchema.safeParse(inputs);
      if (!checkSignInInputs.success) {
        setSignInError("Please check your credentials!");
        return false;
      }
    }
    
    if (validate === "register") {
      setRegisterErrors({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
      const checkRegisterInputs = userSchema.safeParse(inputs);
      if (!checkRegisterInputs.success) {
        const fieldErrors = Object.fromEntries(
          checkRegisterInputs.error.issues.map((issue) => [
            issue.path[0],
            issue.message,
          ])
        );
        setRegisterErrors(fieldErrors);
        return false;
      }
    }
    return true;
  }


  async function handleSignIn() {
    //if (validateInputs("signin", signInInputs)) {
      try {
        const res = await signInService(signInInputs);
        const data = await res.json();
        if (!res.ok) {
          setSignInError(data.message)
          toast.error(data.message);
        } else {
          toast.success("User signed in");
          setDialogStatus(false);
          dispatch(setUser(data.user));
        }
      } catch (e) {
        console.error("Network error");
        toast.error("Network error. Please check your connection.");
      }
   // }
  }

  async function handleRegister() {
    if (validateInputs("register", registerInputs)) { // client side validation
      try {
        const res = await registerService(registerInputs);
        const data = await res.json();
        if (res.ok) {
          toast.success("Registration succesfull");
          console.log(data.user)
          dispatch(setUser(data.user));
          resetInputs("register")
          setDisplaySuccess(true);
          setTimeout(() => {
            setDialogStatus(false);
            setDisplaySuccess(false);
          }, 2000);
        } else if (res.status === 400 || res.status === 409) {
          // server validation
          const fieldErrors = Object.fromEntries(
            data.errors.map((issue: z.core.$ZodIssue) => [
              issue.path[0],
              issue.message,
            ])
          );
          setRegisterErrors(fieldErrors);
        } else {
          toast.error(data.message);
        }
      } catch (e) {
        console.error("Network error", e);
        toast.error("Network error. Please check your connection.");
      }
    }
  }
  return {
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
    setLabelFocusPositions,
  };
}
