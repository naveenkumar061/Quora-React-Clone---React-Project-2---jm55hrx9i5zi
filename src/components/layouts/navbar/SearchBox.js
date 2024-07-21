import { FiSearch } from 'react-icons/fi';

export default function SearchBox() {
  return (
    <div>
      <div className="w-[90%] md:w-60 flex bg-white dark:bg-[#181818] my-2 lg:mx-2 p-2 gap-2 rounded-[3px] border border-[#dee0e1] dark:border-[#393839] hover:border-[#2e69ff] dark:hover:border-[#2e69ff]">
        <FiSearch size={16} className="text-[#939598] dark:text-[#8e9092]" />
        <input
          className="outline-none bg-transparent text-[13px] w-full"
          placeholder="Search Quora"
        />
      </div>
    </div>
  );
}
