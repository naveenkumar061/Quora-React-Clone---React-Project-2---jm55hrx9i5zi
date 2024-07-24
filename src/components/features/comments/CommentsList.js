import { format } from 'date-fns';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import CommentListChild from './CommentListChild';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import Dropdown from '../../utils/DropDown'; // Import the Dropdown component

function CommentsList({
  name,
  date,
  content,
  authorId,
  children,
  postAuthorName,
  postAuthorId,
  id,
}) {
  const authorised = localStorage.getItem('name');
  const [openComment, setOpenComment] = useState(false);

  function handleComment() {
    setOpenComment(!openComment);
  }

  function closeComment() {
    setOpenComment(false);
  }

  return (
    <>
      <div className="flex justify-between relative">
        <div className="flex justify-start gap-4">
          <Avatar name={name} size={25} round={true} textSizeRatio={2} />
          <div className="flex flex-col">
            <div>
              <Link
                to={`/profile/${authorId}`}
                className="text-sm font-semibold hover:underline pr-4"
              >
                {name}
              </Link>
              <span className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
                {format(date, 'MMM yyyy')}
              </span>
            </div>
            <div>{content}</div>
          </div>
        </div>
        {authorised === name && (
          <div className="text-right self-center cursor-pointer">
            <BsThreeDotsVertical onClick={handleComment} />
            {openComment && (
              <Dropdown
                closeDropdown={closeComment}
                type="Comment"
                commentId={id}
              />
            )}
          </div>
        )}
      </div>
      {children.length > 0 &&
        children.map((commentItem) => (
          <CommentListChild
            key={commentItem._id}
            date={commentItem.createdAt}
            content={commentItem.content}
            postAuthorName={postAuthorName}
            postAuthorId={postAuthorId}
            authorId={commentItem.author_details._id}
          />
        ))}
    </>
  );
}

export default CommentsList;
