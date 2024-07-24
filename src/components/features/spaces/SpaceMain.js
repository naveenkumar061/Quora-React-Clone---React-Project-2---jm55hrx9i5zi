import { GoPlusCircle } from 'react-icons/go';
import Loader from '../../utils/Loader';
import { useSpaces } from './useSpaces';
import { useState } from 'react';
import CreateSpace from './CreateSpace';
import Ads from '../ads/Ads';
import SpaceCard from './SpaceCard';

function SpaceMain() {
  const { isLoading, spaces } = useSpaces();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const name = localStorage.getItem('name');
  console.log(spaces?.data);

  return (
    <div className="pt-[88px] md:pt-14 min-h-screen w-full pb-4 dark:text-[#b1b3b6] bg-[#f7f7f8] dark:bg-[#202020] dark:border-[#262626]">
      <div className="w-full md:w-9/12 mx-auto flex gap-4">
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <div className="w-full md:w-9/12 mx-auto flex flex-col gap-4">
              <div className="pt-4 pb-4 bg-white dark:bg-[#262626] border dark:border-[#262626] rounded-sm flex flex-col items-start gap-2 md:mt-7">
                <div className="font-bold text-[18px] px-4">Your Spaces</div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="border-2 rounded-full flex items-center gap-1 px-2 mx-4 py-1 text-[#2e69ff] dark:text-[#4894fd] border-[#2e69ff] dark:border-[#4894fd] hover:bg-[#ebf0ff] dark:hover:bg-[#282d41] transition"
                >
                  <GoPlusCircle size={20} />
                  <div className="text-[13px] font-medium">Create Space</div>
                </button>
                <CreateSpace
                  show={showCreateModal}
                  setShow={setShowCreateModal}
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center px-4">
                {spaces?.data
                  .filter((space) => space.owner.name === name)
                  .map((space, index) => (
                    <SpaceCard space={space} key={space._id} index={index} />
                  ))}
              </div>
              <div className="font-bold text-xl px-4">Discover Spaces</div>
              <div className="font-medium  px-4">Spaces you might like</div>
              <div className="flex flex-wrap gap-2 justify-center px-4">
                {spaces?.data
                  .filter((space) => space.owner.name !== name)
                  .map((space, index) => (
                    <SpaceCard space={space} key={space._id} index={index} />
                  ))}
              </div>
            </div>
            <Ads />
          </>
        )}
      </div>
    </div>
  );
}

export default SpaceMain;
