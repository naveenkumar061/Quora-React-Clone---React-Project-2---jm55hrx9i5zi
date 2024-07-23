import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Modal from '../../utils/Modal';
import MSearchBox from './MSearchBox';

function MSearch() {
  const [showSearchBox, setShowSearchBox] = useState(false);
  function openSearchBox() {
    setShowSearchBox(true);
  }
  function closeSearchBox() {
    setShowSearchBox(false);
  }
  return (
    <div className="text-white self-center lg:hidden block">
      <button
        onClick={openSearchBox}
        className="flex gap-2 text-[14px] font-medium items-center"
      >
        <FiSearch size={22} />
        Search
      </button>
      <Modal open={showSearchBox} close={closeSearchBox}>
        <div className="w-screen h-screen">
          <MSearchBox close={closeSearchBox} />
        </div>
      </Modal>
    </div>
  );
}

export default MSearch;
