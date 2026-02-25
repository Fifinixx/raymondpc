
import { Monitor } from "lucide-react";

export default function Logo() {
  return (
    <>
      <div className="flex relative justify-center items-center gap-1">
        {/* <CldImage
          src="logo"
          alt="Logo Image"
          fill
          className="object-cover"
          sizes="100vw"
          /> */}
        <span className="text-[#ff6467]">
            <Monitor size={48}/>
        </span>
        <div className="border-[1px] h-10 border-[#ff6467]"></div>
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-lg whitespace-nowrap font-bold">RAYMOND PC</h1>
          <p className="text-[10px] font-bold text-[#ff6467]  rounded-md whitespace-nowrap">
            SHOP SMART. SHOP ONLINE
          </p>
        </div>
      </div>
    </>
  );
}
