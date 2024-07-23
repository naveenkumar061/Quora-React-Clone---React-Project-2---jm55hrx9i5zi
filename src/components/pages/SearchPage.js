import { useEffect, useState } from 'react';
import { searchData } from '../services/apiHome';
import { useSearchParams } from 'react-router-dom';
import Ads from '../features/ads/Ads';
import Loader from '../utils/Loader';
import PostComponent from '../features/post/PostComponent';
import ProfileComponent from '../features/profile/ProfileComponent';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setQuery(queryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (query !== '') {
      getResults();
    }
  }, [query]);

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

  return (
    <div className="flex justify-center min-h-screen bg-[#f7f7f8] dark:bg-[#202020] gap-4 dark:border-[#262626] dark:text-[#b1b3b6]">
      {loading && <Loader />}
      {!loading && (
        <div className="mt-2 w-[90%] md:w-[40%] mb-8 flex flex-col gap-6">
          <div className="bg-[#fff] dark:bg-[#262626] border-b p-4 border-[#dee0e1] dark:border-gray-700 font-medium">
            Results for <span className="font-bold">{query}</span>
          </div>
          {posts.length === 0 && profiles.length === 0 && (
            <p>We couldn't find any results for '{query}'.</p>
          )}
          <div className="flex flex-col gap-4">
            {posts.length === 0 && profiles.length !== 0 && (
              <p>We couldn't find any posts for '{query}'.</p>
            )}
            {posts.length > 0 && <div>Posts:</div>}
            {posts.length > 0 &&
              posts.map((item) => <PostComponent data={item} key={item._id} />)}
          </div>
          <div className="flex flex-col gap-4">
            {posts.length !== 0 && profiles.length === 0 && (
              <p>We couldn't find any profiles for '{query}'.</p>
            )}
            {profiles.length > 0 && <div>Users:</div>}
            {profiles.length > 0 &&
              profiles.map((item) => (
                <ProfileComponent data={item} key={item._id} />
              ))}
          </div>
        </div>
      )}
      <Ads />
    </div>
  );
}

export default SearchPage;
