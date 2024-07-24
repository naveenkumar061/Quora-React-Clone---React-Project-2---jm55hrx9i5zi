import { Link } from 'react-router-dom';
import noChannelImg from '../../assets/images/channel-no-profile.webp';
import { spaceCovers } from '../../assets/data/SpacesCovers';

function SpaceCard({ space, index }) {
  const { _id, name, image, description } = space;
  console.log(spaceCovers[0]);
  return (
    <Link to={`/spaces/${_id}`}>
      <div className="bg-white dark:bg-[#262626] rounded-2xl w-44 h-56 overflow-hidden text-center">
        <div
          className="w-full h-10 rounded-t-2xl relative"
          style={{
            backgroundImage: `url(${require(`../../assets/images/${
              spaceCovers[index % 5]
            }`)})`,
          }}
        >
          <div className="w-8 h-8 absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2">
            <img
              src={image || noChannelImg}
              alt={'Profile picture for space' + { name }}
              fill
              sizes="32px"
              className="rounded-lg border-2 border-white dark:border-[#262626]"
            />
          </div>
        </div>
        <div className="pt-5 text-[13px] font-bold px-3">{space.name}</div>
        <div className="text-[13px] px-3 h-[112px] overflow-hidden text-ellipsis">
          {description}
        </div>
      </div>
    </Link>
  );
}

export default SpaceCard;
