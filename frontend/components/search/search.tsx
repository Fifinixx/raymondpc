import { Input } from "../ui/input";

export default function Search() {
  return (
    <>
      <Input
      name="search"
        placeholder="Search products..."
        className=" border-[#ff6467] border-[0.1px] focus-visible:ring-red-200 focus-visible:border-red-400 h-12 "
      />
    </>
  );
}
