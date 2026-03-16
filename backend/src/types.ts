interface ProductType {
  title:  string;
  description:JSON | string ;
  msrp: number ;
  price: number ;
  stock: number ;
  variant?: string ;
  images: string[];
}

interface UserType {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface CategoryType {
  id?: string;
  name: string;
  slug:string;
  isDeleted:boolean;
  children?: CategoryType[] | null;
}

export type {ProductType, UserType, CategoryType}