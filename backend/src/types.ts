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

export type {ProductType, UserType}