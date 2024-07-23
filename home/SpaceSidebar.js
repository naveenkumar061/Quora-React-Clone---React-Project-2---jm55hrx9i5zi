import { useState } from 'react';
import { useSpaces } from './useSpaces';
import { GoPlus } from 'react-icons/go';
import CreateSpace from './CreateSpace';
import { Link } from 'react-router-dom';
import noChannelImg from '../../assets/images/channel-no-profile.webp';
import Footer from '../../ui/Footer';
import Loader from '../../ui/Loader';

function SpaceSidebar() {
  const { isLoading, spaces, error } = useSpaces();
  const [showCreateSpace, setShowCreateSpace] = useState(false);
  const topTenSpaces = spaces?.data.slice(0, 10);

  if (isLoading) return <Loader />;
  return (
    <div className="sticky top-[72px] w-[145px]">
      <div
        onClick={() => setShowCreateSpace(true)}
        className="p-2 bg-[#eceded] dark:bg-[#1b1b1b] rounded flex items-center cursor-pointer transition hover:bg-[#e4e6e6] dark:hover:bg-[#ffffff0b]"
      >
        <div className="flex items-center gap-2 mx-auto w-fit">
          <div className="bg-[#e6e7e8] dark:bg-[#262626] p-1 rounded">
            <GoPlus size={15} className="fill-[#636466] dark:fill-[#b1b3b6]" />
          </div>
          <div className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
            Create Space
          </div>
        </div>
        <CreateSpace show={showCreateSpace} setShow={setShowCreateSpace} />
      </div>
      {!isLoading && !error && (
        <div className="border-b pb-2 dark:border-[#393839]">
          {topTenSpaces.map((item, index) => (
            <Link
              key={item._id}
              to={`/spaces/${item._id}`}
              className="flex p-2 hover:bg-[#E4E6E6] dark:hover:bg-[#1D1D1D] transition duration-200 gap-4"
            >
              <img
                src={item.image || noChannelImg}
                width={20}
                height={20}
                alt={item.name}
                className="rounded"
              />
              <p className="text-ellipsis overflow-hidden whitespace-nowrap w-24 text-[13px] text-[#636466] dark:text-[#b1b3b6]">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default SpaceSidebar;
