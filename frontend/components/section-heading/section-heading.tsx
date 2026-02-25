export default function SectionHeading({ title }: { title: string }) {
  return (
    <>
      <div className="w-full relative mb-4">
          <span className="relative left-[2%] z-20 text-2xl p-1 bg-white text-[#ff6467]">
            {title}
          </span>
        <div className="z-0 absolute top-1/2 -translate-y-1/2 w-full border-[0.1px] border-[#ff6467]"></div>
      </div>
    </>
  );
}
