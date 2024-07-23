import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Avatar from 'react-avatar';

import MVLItem from './MVLItem';
import SearchBox from './SearchBox';
import ProfileMainMenu from '../ProfileMainMenu';

import QuoraIcon from '../../assets/nav-icons/QuoraIcon';
import CreatePost from '../../features/home/CreatePost';
import { dataNavs } from './assets/data/navData';

function DNavbar() {
  const name = localStorage.getItem('name');

  const [openPopup, setOpenPopup] = useState(false);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

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
  const { pathname } = useLocation();

  return (
    <div className="hidden md:flex md:justify-center md:items-center gap-4">
      <Link to="/home" className="hover:opacity-70">
        <QuoraIcon className="fill-red-700 h-16 w-16" />
      </Link>
      <div className="flex items-center gap-3">
        {dataNavs.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              className="relative flex flex-col items-center group"
            >
              {pathname === item.path ? item.iconFilled : item.icon}
              <span className="absolute hidden group-hover:block text-sm mt-1 transition bg-white px-4 py-1 top-12 border border-gray-400 rounded-full">
                {name}
              </span>
            </NavLink>
          );
        })}
      </div>
      <SearchBox />
      <Avatar
        name={name}
        size={25}
        round={true}
        textSizeRatio={2}
        className="cursor-pointer hover:opacity-70"
        onClick={handleProfilePopup}
      />
      {openPopup && <ProfileMainMenu closeSideBar={closePopup} />}
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

export default DNavbar;
