import { Link } from 'react-router-dom';
import AddPost from '../features/home/AddPost';
import MViewLinks from './MViewLinks';

import QuoraIcon from '../assets/nav-icons/QuoraIcon';

function MNavbar() {
	const [showSearchBox, setShowSearchBox] = useState(false);

  function openSearchBox() {
    setShowSearchBox(true);
  }
  function closeSearchBox() {
    setShowSearchBox(false);
  }
	
  return (
    <div className="md:hidden flex flex-col h-full max-h-[40px]">
      <div className="flex items-center justify-between px-4 bg-[#b92b27] dark:bg-[#202020]">
        <div className="text-white">
      <button className="flex items-center gap-4" onClick={openSearchBox}>
        <CiSearch size={22} />
        Search
      </button>
      <Modal open={showSearchBox} close={closeSearchBox}>
        <div className="w-screen h-screen">
          <SearchMobileBox close={closeSearchBox} />
        </div>
      </Modal>
    </div>
        <Link to="/home">
          <QuoraIcon className="fill-white h-10" />
        </Link>
        <AddPost />
      </div>
      <MViewLinks />
    </div>
  );
}

export default MNavbar;
