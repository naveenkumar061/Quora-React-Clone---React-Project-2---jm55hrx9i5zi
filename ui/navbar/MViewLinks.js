import { useState } from 'react';
import Avatar from 'react-avatar';

import MVLItem from './MVLItem';
import ProfileMenu from '../ProfileMenu';

import { dataNavs } from '../../assets/nav-data/navData';

function MViewLinks() {
  const name = localStorage.getItem('name');

  const [openSidebar, setOpenSidebar] = useState(false);

  function handleProfileOpenSidebar() {
    setOpenSidebar((prev) => !prev);
  }

  function hideProfileSidebar() {
    setOpenSidebar(false);
  }

  return (
    <>
      <div className="dark:bg-[#202020] flex justify-between items-center px-4 py-1">
        {dataNavs.map((item, index) => (
          <MVLItem item={item} key={index} />
        ))}
        <Avatar
          name={name}
          size={25}
          round={true}
          textSizeRatio={2}
          className="cursor-pointer hover:opacity-70"
          onClick={handleProfileOpenSidebar}
        />
      </div>
      <ProfileMenu
        closeSideBar={hideProfileSidebar}
        isSideBarVisible={openSidebar}
        toggleSideBar={handleProfileOpenSidebar}
      />
    </>
  );
}

export default MViewLinks;
