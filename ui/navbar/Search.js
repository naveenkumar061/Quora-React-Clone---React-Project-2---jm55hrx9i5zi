import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

import Modal from './Modal';
import SearchMobileBox from './SearchMobileBox';

function Search() {
  const [showSearchBox, setShowSearchBox] = useState(false);

  function openSearchBox() {
    setShowSearchBox(true);
  }
  function closeSearchBox() {
    setShowSearchBox(false);
  }

  return (
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
  );
}

export default Search;
