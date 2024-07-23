import { useEffect, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { searchData } from '../../services/apiHome';
import Loader from '../../utils/Loader';
import Avatar from 'react-avatar';

export default function SearchBox() {
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
    <ClickAwayListener onClickAway={closeDropDown}>
      <div className="relative w-60 h-12 z-10 bg-white dark:bg-[#262626] dark:text-[#b1b3b6]">
        <div className="w-[90%] md:w-60 flex bg-white dark:bg-[#181818] my-2 lg:mx-2 p-2 gap-2 rounded-[3px] border border-[#dee0e1] dark:border-[#393839] hover:border-[#2e69ff] dark:hover:border-[#2e69ff]">
          <div
            ref={containerRef}
            onClick={() => inputRef?.current?.focus()}
            className="absolute top-0 left-0 w-60 flex bg-white dark:bg-[#181818] my-2 lg:mx-2 p-2 gap-2 rounded-[3px] border border-[#dee0e1] dark:border-[#393839] hover:border-[#2e69ff] dark:hover:border-[#2e69ff]"
          >
            <FiSearch
              size={16}
              className="text-[#939598] dark:text-[#8e9092]"
            />
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
                className="absolute w-72 bg-white dark:bg-[#262626] border dark:border-[#393839] top-full -translate-x-2 translate-y-[2px]"
                ref={resultsContainer}
              >
                {query !== '' && (
                  <>
                    <div
                      className="p-3 border-b dark:border-[#393839] cursor-pointer hover:bg-[#f2f2f2] dark:hover:bg-[#ffffff0a] transition"
                      onClick={navigateToSearch}
                    >
                      Search: <span>{query}</span>
                    </div>
                    {loading && <Loader />}
                    {!loading &&
                      posts.length > 0 &&
                      posts.map((item) => {
                        const { _id, title = '', content = '' } = item;
                        return (
                          <Link
                            to={`/posts/${_id}`}
                            key={_id}
                            onClick={handleClick}
                          >
                            <div className="py-2 px-3 border-b dark:border-[#393839] hover:bg-[#f2f2f2] dark:hover:bg-[#ffffff0a] transition">
                              <div className="font-semibold text-[13px]">
                                {title.length > 40
                                  ? title.slice(0, 40) + '...'
                                  : title}
                              </div>
                              <div className="text-[13px]">
                                {content.length > 40
                                  ? content.slice(0, 40) + '...'
                                  : content}
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
                          <Link
                            key={_id}
                            to={`/profile/${_id}`}
                            onClick={handleClick}
                          >
                            <div className="p-2 border-b dark:border-[#393839] flex gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#ffffff0a] transition">
                              <div className="w-5 h-5 relative">
                                <Avatar
                                  name={name}
                                  size={25}
                                  round={true}
                                  textSizeRatio={2}
                                />
                              </div>
                              <div className="capitalize font-bold">
                                {name.length > 20 ? name.slice(0, 20) : name}
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
      </div>
    </ClickAwayListener>
  );
}
