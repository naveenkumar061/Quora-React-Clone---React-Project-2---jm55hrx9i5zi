import { Link, useParams } from 'react-router-dom';
import Loader from '../../utils/Loader';
import Modal from '../../utils/Modal';
import { useProfileForUser } from './useProfileForUser';
import userImg from '../../assets/images/default_user.webp';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFollow } from '../../services/apiHome';
import toast from 'react-hot-toast';
import FollowingSvg from '../following/FollowingSvg';
import FollowSvg from '../following/FollowSvg';
import { useState } from 'react';
import MoreSkills from './MoreSkills';
import Skills from './Skills';
import Ads from '../ads/Ads';
import { usePosts } from '../post/usePosts';
import PostComponent from '../post/PostComponent';
import noPosts from '../../assets/images/end-of-page.webp';

function SingleProfile() {
  const { id } = useParams();
  const authorised = localStorage.getItem('name');
  const [showMoreHighlights, setShowMoreHighlights] = useState(false);

  const { profileForUser, isLoading } = useProfileForUser(id);

  const {
    address,
    createdAt,
    education,
    email,
    isFollowed,
    name,
    profileImage,
    workExperience,
  } = profileForUser?.data || {};

  console.log(profileForUser?.data);

  const { posts } = usePosts();

  console.log(posts?.data.filter((post) => post.author._id === id));

  const filterData = posts?.data.filter((post) => post.author._id === id);

  const queryClient = useQueryClient();

  const { mutate: following, isLoading: follow } = useMutation({
    mutationFn: ({ follow, id }) => toggleFollow(follow, id),
    onSuccess: (data) => {
      toast.success(
        (!isFollowed ? `You are now following ` : `You unfollowed `) +
          (name.slice(0, 1).toUpperCase() + name.slice(1))
      );
      queryClient.invalidateQueries('users', id);
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });

  function handleFollowButtons() {
    following({
      follow: !isFollowed,
      id: id,
    });
  }

  function closeMoreHighlights() {
    setShowMoreHighlights(false);
  }

  return (
    <div className="pt-[88px] md:pt-14 min-h-screen w-full bg-white dark:bg-[#181818] dark:text-[#b1b3b6] ">
      <div className="w-full md:w-9/12 mx-auto mt-5">
        {isLoading && <Loader />}
        {!isLoading && (
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex gap-3 sm:gap-8 items-center flex-grow p-4">
                <div className="relative">
                  <img
                    src={profileImage ?? userImg}
                    width={120}
                    height={120}
                    priority
                    className="object-cover rounded-full min-w-20"
                    alt={'Profile Image for' + { name }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-xl sm:text-3xl capitalize">
                    {name}
                  </div>
                  <div className="text-[14px] text-[#939598]">{email}</div>
                  {authorised === name && (
                    <div>
                      {isFollowed ? (
                        <button
                          disabled={follow}
                          onClick={handleFollowButtons}
                          className="px-3 py-2 flex gap-1 items-center rounded-full transition border-[#2e69ff] text-[#2e69ff] dark:text-[#4894FD] shadow-[rgb(46,105,255)_0px_0px_0px_1px_inset] hover:bg-[#ebf0ff] dark:hover:bg-[#282d41] disabled:opacity-35 disabled:hover:bg-white"
                        >
                          <div>
                            <FollowingSvg className="stroke-[#2e69ff] fill-[#2e69ff] dark:stroke-[#4894FD] dark:fill-[#4894FD]" />
                          </div>
                          <div>Following</div>
                        </button>
                      ) : (
                        <button
                          disabled={follow}
                          className="px-3 py-2 text-white flex gap-1 items-center bg-[#2e69ff] hover:bg-[#1a5aff] rounded-full transition disabled:opacity-35 disabled:hover:bg-[#2e69ff]"
                          onClick={handleFollowButtons}
                        >
                          <div>
                            <FollowSvg className="stroke-white h-5 w-5" />
                          </div>
                          <div>Follow</div>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-grow">
                <div className="border-b-2 dark:border-[#393839] pb-2 p-3 flex justify-between items-center">
                  <div className="font-medium text-[#282829] dark:text-[#d5d6d6]">
                    Credentials & Highlights
                  </div>
                  <button
                    onClick={() => setShowMoreHighlights(true)}
                    className="text-[13px] text-[#939598] dark:text-[#b1b3b6] hover:underline"
                  >
                    More
                  </button>
                  <Modal open={showMoreHighlights} close={closeMoreHighlights}>
                    <MoreSkills
                      {...{
                        closeMoreHighlights,
                        workExperience,
                        education,
                        address,
                        createdAt,
                      }}
                    />
                  </Modal>
                </div>
                <Skills
                  {...{
                    workExperience,
                    education,
                    address,
                    createdAt,
                  }}
                />
              </div>
            </div>
            <div className="w-full mx-auto flex gap-16 mb-4 justify-center">
              <div className="flex flex-col gap-3 mt-4 w-full md:w-[550px] mb-4">
                <div className="text-xl font-semibold ml-3">Posts</div>
                {filterData &&
                  filterData.length > 0 &&
                  filterData.map((data, i) => (
                    <PostComponent key={i} data={data} type="single" />
                  ))}
                {(!filterData || filterData.length === 0) && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-28 h-28">
                      <img
                        src={noPosts}
                        alt="no posts found"
                        fill
                        sizes="112px"
                      />
                    </div>
                    {authorised === name && (
                      <>
                        <div className="mx-4 text-center text-[#636466] dark:text-[#B1B3B6]">
                          You haven't shared, answered or posted anything yet.
                        </div>
                        <Link
                          to={'/answer'}
                          className="px-3 py-2 rounded-full text-white bg-[#2e69ff] hover:bg-[#1a5aff] transition"
                        >
                          Answer questions
                        </Link>
                      </>
                    )}
                    {authorised !== name && (
                      <div>
                        <div className="mx-4 text-center text-[#636466] dark:text-[#B1B3B6]">
                          <span className="capitalize">{name}</span> hasn't
                          shared, answered or posted anything yet.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Ads />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleProfile;
