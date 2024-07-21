import { Link } from 'react-router-dom';
import QuoraLogo from '../../assets/logos/QuoraLogo';
import SearchBox from './SearchBox';
import { useState } from 'react';
import CreatePost from '../../features/post/CreatePost';

function TDNav() {
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  function showCreatePost() {
    setIsCreatePostVisible(true);
  }

  return (
    <div className="flex items-center justify-between px-4 bg-[#b92b27] dark:bg-[#202020]">
      <SearchBox />
      <Link to="home">
        <QuoraLogo className="h-16 w-16 fill-white hover:opacity-50 cursor-pointer" />
      </Link>
      <button
        className="dark:bg-[#f52936] text-[#fff] rounded-full ml-2 py-2 px-2 lg:px-3 font-medium text-[13px] leading-none bg-[#b92b27] hover:bg-[#a82723] transition"
        onClick={showCreatePost}
      >
        Create Post
      </button>
      <CreatePost show={isCreatePostVisible} setShow={setIsCreatePostVisible} />
    </div>
  );
}

export default TDNav;
