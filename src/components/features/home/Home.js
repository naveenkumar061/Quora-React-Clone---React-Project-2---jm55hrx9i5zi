import Ads from '../ads/Ads';
import Posts from '../post/Posts';
import SpaceSidebar from '../spaces/SpaceSidebar';

function Home() {
  return (
    <div className="flex gap-5 justify-around min-h-screen w-full md:w-10/12 mx-auto md:pt-14">
      <SpaceSidebar />
      <Posts />
      <Ads />
    </div>
  );
}

export default Home;
