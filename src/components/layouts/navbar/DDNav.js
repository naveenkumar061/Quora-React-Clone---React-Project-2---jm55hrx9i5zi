import Avatar from 'react-avatar';
import { dataNavs } from '../../assets/data/navData';
import RouteLI from './RouteLI';
import { useState } from 'react';
import MProfile from './MProfile';

function DDNav() {
  const name = sessionStorage.getItem('name');

  const [openSidebar, setOpenSidebar] = useState(false);

  function handleProfileOpenSidebar() {
    setOpenSidebar((prev) => !prev);
  }

  function hideProfileSidebar() {
    setOpenSidebar(false);
  }

  return (
    <>
      <div className="flex pb-4 px-4 justify-between">
        {dataNavs.map((item, index) => (
          <RouteLI item={item} key={index} />
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
      <MProfile
        closeSideBar={hideProfileSidebar}
        isSideBarVisible={openSidebar}
        toggleSideBar={handleProfileOpenSidebar}
      />
    </>
  );
}

export default DDNav;
