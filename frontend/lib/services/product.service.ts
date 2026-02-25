export async function addProduct(inputs: FormData) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/product/add`, {
        method:"POST",
        body:inputs,
        credentials:"include"
      });
      return res;
}

export async function getProduct(slug: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
      {
        next: { revalidate: 60 }, // ISR (optional)
      }
    )
  
    if (!res.ok) {
      throw new Error("Failed to fetch product")
    }
  
    return res.json()
  }
  