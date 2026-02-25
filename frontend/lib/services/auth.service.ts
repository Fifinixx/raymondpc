import { UserType } from "@/lib/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function signInService(data: Pick<UserType, "email" | "password">) {
  const res = await fetch(`${baseUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    body:JSON.stringify(data)
  });
  return res;
}

async function registerService(data:UserType) {
    const res = await fetch(`${baseUrl}/auth/register`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(data)
    })
    return res;
}

export {signInService, registerService}
