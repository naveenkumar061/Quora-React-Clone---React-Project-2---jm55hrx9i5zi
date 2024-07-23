import { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { searchData } from '../../services/apiHome';
import Avatar from 'react-avatar';

function MSearchBox({ close }) {
  const [resultsDropDown, setResultsDropDown] = useState(false);
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const containerRef = useRef();
  const resultsContainer = useRef();

  const navigate = useNavigate();

  function openDropDown() {
    setResultsDropDown(true);
  }

  function closeDropDown() {
    setResultsDropDown(false);
  }

  function focusHandler(e) {
    containerRef.current.classList.add('focused');
    openDropDown();
  }

  function handleKeyDown(e) {
    if (e.code === 'Enter' && query !== '') {
      setQuery('');
      navigateToSearch(e);
    }
  }

  function navigateToSearch(e) {
    e.stopPropagation();
    inputRef.current.blur();
    closeDropDown();
    close();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function blurHandler(e) {
    containerRef.current.classList.remove('focused');
  }

  async function getResults() {
    setLoading(true);
    const data = await searchData(query, true);
    if (data.message === 'success') {
      setPosts(data.posts || []);
      setProfiles(data.users || []);
    } else {
      setPosts([]);
      setProfiles([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    getResults();
  }, [query]);

  function handleClick(e) {
    e.stopPropagation();
    inputRef.current.blur();
    closeDropDown();
  }
  return (
    <div className="p-2 flex gap-2 bg-[#b92b27] items-center justify-center dark:text-[#b1b3b6]">
      <button onClick={close}>
        <IoIosArrowBack size={24} className="text-white flex-shrink-0" />
      </button>
      <div
        ref={containerRef}
        onClick={() => inputRef.current.focus()}
        className="w-52 sm:w-80 flex bg-white dark:bg-[#262626] my-2 lg:mx-2 p-2 gap-2 rounded-[3px] border border-[#dee0e1] dark:border-[#393839] hover:border-[#2e69ff] dark:hover:border-[#2e69ff]"
      >
        <FiSearch size={16} className="text-[#939598] dark:text-[#8e9092]" />
        <input
          className="outline-none bg-transparent text-[13px] w-full"
          placeholder="Search Quora"
          ref={inputRef}
          value={query}
          onFocus={focusHandler}
          onKeyDown={handleKeyDown}
          onChange={handleQueryChange}
          onBlur={blurHandler}
        />
        {resultsDropDown && (
          <div
            ref={resultsContainer}
            className="absolute w-screen bg-white dark:bg-[#262626] border dark:border-[#393839] left-0 top-16 -translate-x-2 translate-y-[2px]"
          >
            {query !== '' && (
              <>
                <div
                  className="z-[10000] p-3 px-5 border-b dark:border-[#393839] cursor-pointer"
                  onClick={navigateToSearch}
                >
                  Search:{' '}
                  <span className="overflow-x-hidden overflow-ellipsis whitespace-nowrap">
                    {query}
                  </span>
                </div>
                {loading && (
                  <div className="my-2 mx-5 flex flex-col gap-[6px] items-center animate-pulse">
                    <div className="w-full h-[6px] rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
                    <div className="w-full h-[6px] rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
                    <div className="w-full h-[6px] rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
                  </div>
                )}
                {!loading &&
                  posts.length > 0 &&
                  posts.map((item) => {
                    const { _id, title = '', content = '' } = item;
                    return (
                      <Link to={`/posts/${_id}`} key={_id}>
                        <div
                          className="py-2 px-5 border-b dark:border-[#393839]"
                          onClick={handleClick}
                        >
                          <div className="font-semibold text-[13px] overflow-x-hidden overflow-ellipsis whitespace-nowrap">
                            {title}
                          </div>
                          <div className="text-[13px] overflow-x-hidden overflow-ellipsis whitespace-nowrap">
                            {content}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                {!loading &&
                  profiles.length > 0 &&
                  profiles.map((item) => {
                    const { _id, name } = item;
                    return (
                      <Link key={_id} to={`/profile/${_id}`}>
                        <div
                          onClick={handleClick}
                          className="py-2 px-5 border-b dark:border-[#393839] flex gap-2"
                        >
                          <div className="w-5 h-5 relative">
                            <Avatar
                              name={name}
                              size={25}
                              round={true}
                              textSizeRatio={2}
                            />
                          </div>
                          <div className="capitalize font-bold overflow-x-hidden overflow-ellipsis whitespace-nowrap">
                            {name}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MSearchBox;
