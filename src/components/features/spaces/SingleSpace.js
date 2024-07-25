import { Link, useParams } from 'react-router-dom';
import { useSpacesForUser } from './useSpacesForUser';
import Loader from '../../utils/Loader';
import { spaceCovers } from '../../assets/data/SpacesCovers';
import noChannelImg from '../../assets/images/channel-no-profile.webp';
import { useState } from 'react';
import Ads from '../ads/Ads';
import { format } from 'date-fns';
import { MdEditNote } from 'react-icons/md';
import EditSpace from './EditSpace';
import { RiDeleteBinLine } from 'react-icons/ri';
import DeleteSpace from './DeleteSpace';
import { usePosts } from '../post/usePosts';
import noPosts from '../../assets/images/end-of-page.webp';
import PostComponent from '../post/PostComponent';

function SingleSpace() {
  const { id } = useParams();
  const authorisedName = localStorage.getItem('name');
  const [coverIndex] = useState(Math.floor(Math.random() * 5));
  const [showEditBox, setShowEditBox] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { spaceForUser, isSpacing } = useSpacesForUser(id);
  const { image, name, description, owner, createdAt } =
    spaceForUser?.data || {};
  const { _id, name: ownName } = owner || {};

  console.log(spaceForUser?.data);

  const { posts } = usePosts();
  const postsForASpace = posts?.data?.filter(
    (post) => post.channel?._id === id
  );

  function openEditModal() {
    setShowEditBox(true);
  }

  function openDeleteConfirmation() {
    setShowDeleteConfirmation(true);
  }
  function closeDeleteConfirmation() {
    setShowDeleteConfirmation(false);
  }

  return (
    <>
      {isSpacing && <Loader />}
      {!isSpacing && (
        <div className="pt-[88px] md:pt-12 min-h-screen w-full bg-white dark:bg-[#181818] pb-4">
          <div
            className="w-full bg-no-repeat bg-cover "
            style={{
              backgroundImage: `url(${require(`../../assets/images/${spaceCovers[coverIndex]}`)})`,
            }}
          >
            <div className="w-full md:w-9/12 mx-auto relative pb-4">
              <div
                className="w-full h-20 md:h-52 bg-no-repeat bg-cover bg-center rounded-b-2xl"
                style={{
                  backgroundImage: `url(${require(`../../assets/images/${spaceCovers[coverIndex]}`)})`,
                }}
              >
                <div className="absolute top-12 left-5 md:top-32 md:left-5 h-20 w-20 md:w-32 md:h-32">
                  <img
                    src={image || noChannelImg}
                    alt={'Profile picture for space' + { name }}
                    sizes="80px"
                    className=" rounded-[30px]"
                  />
                </div>
              </div>
              <div className="px-5 flex flex-col gap-2 mt-12 md:mt-14">
                <div className="flex w-full justify-between">
                  <div className="text-white font-bold text-[18px] md:text-[27px]">
                    {name}
                  </div>
                  {ownName === authorisedName && (
                    <div className="flex gap-4">
                      <button onClick={openEditModal}>
                        <div className="transition-all p-[6px] md:p-2 duration-200 text-white bg-[#0000000d] hover:bg-[#080809] rounded-full">
                          <MdEditNote className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                        </div>
                      </button>
                      <EditSpace
                        channelID={id}
                        show={showEditBox}
                        setShow={setShowEditBox}
                        oldTitle={name}
                        oldContent={description}
                        oldImage={image}
                      />
                      <button onClick={openDeleteConfirmation}>
                        <div className="transition-all p-[6px] md:p-2 duration-200 text-white bg-[#0000000d] hover:bg-[#080809] rounded-full">
                          <RiDeleteBinLine className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                        </div>
                      </button>
                      <DeleteSpace
                        closeDeleteSpaceModal={closeDeleteConfirmation}
                        showDeleteSpaceModal={showDeleteConfirmation}
                        channelID={id}
                      />
                    </div>
                  )}
                </div>
                <div className="text-white text-[13px]">{description}</div>
                <div className="text-white text-[13px]">
                  Created By{' '}
                  <Link
                    to={`/profile/${_id}`}
                    className="capitalize font-semibold hover:underline"
                  >
                    {ownName}
                  </Link>{' '}
                  at {format(createdAt, 'MMMM, yyyy')}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-9/12 flex gap-8 justify-center mx-auto items-start">
            <div className="flex flex-col gap-3 mt-4 w-full md:w-[550px] mb-4 mx-auto">
              {postsForASpace?.length > 0 &&
                postsForASpace.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className=" dark:border-[#262626] shadow-[0_0_10px_rgba(0,0,0,0.15)]"
                    >
                      <PostComponent data={data} />
                    </div>
                  );
                })}
              {!postsForASpace ||
                (postsForASpace.length === 0 && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-28 h-28">
                      <img
                        src={noPosts}
                        alt="no posts found"
                        fill
                        sizes="112px"
                      />
                    </div>
                    <div className="mx-4 text-center text-[#636466] dark:text-[#B1B3B6] font-bold text-[18px]">
                      No stories
                    </div>
                    <div className="mx-4 text-center text-[#636466] dark:text-[#B1B3B6]">
                      There are no stories in this Space yet.
                    </div>
                  </div>
                ))}
            </div>
            <Ads />
          </div>
        </div>
      )}
    </>
  );
}

export default SingleSpace;
