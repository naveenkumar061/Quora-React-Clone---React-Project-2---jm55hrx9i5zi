import { Link } from 'react-router-dom';
import { dataNavs } from '../../assets/data/navData';
import QuoraLogo from '../../assets/logos/QuoraLogo';
import RouteLI from './RouteLI';
import SearchBox from './SearchBox';
import Avatar from 'react-avatar';
import { useState } from 'react';
import CreatePost from '../../features/post/CreatePost';
import DProfile from './DProfile';

function DesktopNav() {
  const [openPopup, setOpenPopup] = useState(false);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const name = localStorage.getItem('name');

  function showCreatePost() {
    setIsCreatePostVisible(true);
  }

  function handleProfilePopup(e) {
    e.stopPropagation();
    setOpenPopup((prev) => !prev);
  }

  function closePopup(e) {
    setOpenPopup(false);
  }

  return (
    <div className="hidden md:flex justify-center items-center gap-4 h-full">
      <Link to="home">
        <QuoraLogo className="h-16 w-16 fill-red-700 hover:opacity-50 cursor-pointer" />
      </Link>
      {dataNavs.map((item, index) => (
        <RouteLI item={item} key={index} />
      ))}
      <SearchBox />
      <Avatar
        name={name}
        size={25}
        round={true}
        textSizeRatio={2}
        className="cursor-pointer hover:opacity-70"
        onClick={handleProfilePopup}
      />
      <button
        className="dark:bg-[#f52936] text-[#fff] rounded-full ml-2 py-2 px-2 lg:px-3 font-medium text-[13px] leading-none bg-[#b92b27] hover:bg-[#a82723] transition"
        onClick={showCreatePost}
      >
        Create Post
      </button>
      {openPopup && <DProfile closeSideBar={closePopup} />}
      <CreatePost show={isCreatePostVisible} setShow={setIsCreatePostVisible} />
    </div>
  );
}

export default DesktopNav;
