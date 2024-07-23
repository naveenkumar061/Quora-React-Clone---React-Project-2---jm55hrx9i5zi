import { CiSearch } from 'react-icons/ci';
import { SlArrowLeft } from 'react-icons/sl';

function SearchMobileBox({ close }) {
  return (
    <div className="flex p-2 items-center justify-center bg-[#b92b27] gap-2">
      <button onClick={close}>
        <SlArrowLeft size={24} className="text-white" />
      </button>
      <div className="flex gap-2 items-center">
        <CiSearch size={16} className="text-[#939598] dark:text-[#8e9092]" />
        <input
          className="outline-none bg-transparent text-[13px] w-full"
          placeholder="Search Quora"
        />
      </div>
    </div>
  );
}

export default SearchMobileBox;
