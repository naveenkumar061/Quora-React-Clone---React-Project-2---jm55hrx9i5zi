import { format } from 'date-fns';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

function CommentListChild({ postAuthorName, date, content, postAuthorId }) {
  return (
    <div className="flex justify-start gap-4 pl-10">
      <Avatar name={postAuthorName} size={25} round={true} textSizeRatio={2} />
      <div className="flex flex-col">
        <div>
          <Link
            to={`/profile/${postAuthorId}`}
            className="text-sm font-semibold hover:underline pr-4"
          >
            {postAuthorName}
          </Link>
          <span className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
            {format(date, 'MMM yyyy')}
          </span>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
}

export default CommentListChild;
