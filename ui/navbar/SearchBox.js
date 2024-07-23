import { CiSearch } from 'react-icons/ci';
function SearchBox() {
  return (
    <div className="w-60 flex bg-white dark:bg-[#181818] my-2 lg:mx-2 p-2 gap-2 rounded-[3px] border border-[#dee0e1] dark:border-[#393839] hover:border-[#2e69ff] dark:hover:border-[#2e69ff] items-center">
      <CiSearch size={16} className="text-[#939598] dark:text-[#8e9092]" />
      <input
        className="outline-none bg-transparent text-[13px] w-full"
        placeholder="Search Quora"
      />
    </div>
  );
}

export default SearchBox;
