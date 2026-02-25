import Logo from "../logo/logo";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="flex flex-col  bg-neutral-200 text-sm border-t-[2px]  border-[#ff6467] rounded-t-sm">
      <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-6  p-6 ">
        <div className="flex flex-col justify-center items-center ">
          <Logo />
          <p>© 2026 RAYMONDPC. All rights reserved.</p>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2 text-left">Shop</h1>
          <ul className="flex flex-col justify-center items-start space-y-3  text-neutral-700 list-outside [&>*]:hover:text-[#ff6467] [&>*]:cursor-pointer [&>*]:flex [&>*]:justify-start [&>*]:items-center">
            <li>
              <ChevronRight size={18} />
              <Link href="/">Shop All</Link>
            </li>
            <li>
              <ChevronRight size={18} />
              <Link href="/">New Arrivals</Link>
            </li>
            <li>
              <ChevronRight size={18} />
              <Link href="/">Best Sellers</Link>
            </li>
            <li>
              <ChevronRight size={18} />
              <Link href="/">Deals & offers</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2  text-left">About</h1>
          <ul className="flex flex-col justify-center items-start space-y-3  text-neutral-700 list-outside [&>*]:hover:text-[#ff6467] [&>*]:cursor-pointer [&>*]:flex [&>*]:justify-start [&>*]:items-center">
            <li>
              <ChevronRight size={18} />
              About Us
            </li>
            <li>
              <ChevronRight size={18} />
              Contact Us
            </li>
            <li>
              <ChevronRight size={18} />
              Blog
            </li>
            <li>
              <ChevronRight size={18} />
              Bank details
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2  text-left">Account</h1>
          <ul className="flex flex-col justify-center items-start space-y-3  text-neutral-700 list-outside [&>*]:hover:text-[#ff6467] [&>*]:cursor-pointer [&>*]:flex [&>*]:justify-start [&>*]:items-center">
            <li>
              <ChevronRight size={18} />
              My Account
            </li>
            <li>
              <ChevronRight size={18} />
              Orders
            </li>
            <li>
              <ChevronRight size={18} />
              Wishlist
            </li>
            <li>
              <ChevronRight size={18} />
              Saved Addresses
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2  text-left">Legal</h1>
          <ul className="flex flex-col justify-center items-start space-y-3  text-neutral-700 list-outside [&>*]:hover:text-[#ff6467] [&>*]:cursor-pointer [&>*]:flex [&>*]:justify-start [&>*]:items-center">
            <li>
              <ChevronRight size={18} />
              Terms & Conditions
            </li>
            <li>
              <ChevronRight size={18} />
              Privacy Policy
            </li>
            <li>
              <ChevronRight size={18} />
              Return & Refund Policy
            </li>
            <li>
              <ChevronRight size={18} />
              Shipping Policy
            </li>
          </ul>
        </div>
      </div>
      <p className="bg-[#ff6467] text-xs text-neutral-800 p-1 w-full text-center">
        Created and maintained by Debmalya Maity{" "}
        <span className="font-bold">9341652315</span>
      </p>
    </footer>
  );
}
