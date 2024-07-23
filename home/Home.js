import Ads from './Ads';
import CenterSection from './CenterSection';
import SpaceSidebar from './SpaceSidebar';

function Home() {
  return (
    <div className="flex gap-5 justify-around min-h-screen w-full md:w-10/12 mx-auto md:pt-14">
      <div className="hidden md:block">
        <SpaceSidebar />
      </div>
      <CenterSection />
      <div className="hidden lg:block">
        <Ads className="top-[72px]" />
      </div>
    </div>
  );
}

export default Home;
