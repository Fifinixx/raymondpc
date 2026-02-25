import Slider from "@/components/home/slider/slider";
import SideShowCaseComponent from "@/components/home/side-showcase-component/side-showcase-component";
import SideShowCaseMobile from "@/components/home/side-showcase-component/side-showcase-m";
import NewArrivals from "@/components/home/new-arrivals/new-arrivals";
import SectionHeading from "@/components/section-heading/section-heading";
import TopBanner from "@/components/home/top-banner/top-banner";
export default async function Home() {
  return (
    <div className="w-full flex justify-center mt-4 mb-4">
      <div className="w-[1200px] flex flex-col justify-center items-center gap-8">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <TopBanner />
          <div className="w-full gap-2 flex flex-col md:flex-row">
            <div className="w-full md:w-[70%] h-full">
              <Slider />
            </div>
            <div className="hidden md:block w-[30%] h-full">
              <SideShowCaseComponent />
            </div>
            <div className="w-full block md:hidden">
              <SideShowCaseMobile />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SectionHeading title="New Arrivals" />
          <NewArrivals />
        </div>
      </div>
    </div>
  );
}
