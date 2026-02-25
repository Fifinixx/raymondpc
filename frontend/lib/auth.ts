export async function getCurrentUser(token?: string | undefined) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!token) return null;
  try {
    const res = await fetch(`${baseUrl}/me`, {
      headers:{
        Cookie: `auth_token=${token}`
      }
    });
    if (!res.ok) {
        console.log(res)
      const data = await res.json();
      console.log(data);
      return false;
    } else {
      const user = await res.json();
      return user.user;
    }
  } catch (e: any) {
    console.error("Network error, please try again", e);
  }
}
