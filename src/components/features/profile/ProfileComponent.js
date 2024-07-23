import { format } from 'date-fns';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

function ProfileComponent({ data }) {
  console.log(data);
  const { name, _id: aid, createdAt } = data;
  return (
    <div className="bg-[#fff] dark:bg-[#262626] border border-[#dee0e1] dark:border-[#262626] rounded p-4 flex items-center gap-4">
      <Avatar size={25} name={name} round={true} textSizeRatio={2} />
      <div className="flex gap-2 flex-col font-bold text-[13px]">
        <div className="text-[#282829] dark:text-[#d5d6d6] capitalize hover:underline">
          <Link to={`/profile/${aid}`}>{name}</Link>
        </div>
        {createdAt && (
          <div className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
            {format(createdAt, 'dd MMMM, yyyy')}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileComponent;
