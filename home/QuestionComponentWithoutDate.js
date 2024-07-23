import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import Upvote from './Upvote';
import DislikeVote from './DislikeVote';
import SpinnerMini from '../../ui/SpinnerMini';
import Comments from './Comments';
import {
  deletePost,
  toggleDownvote,
  toggleUpvote,
} from '../../services/apiHome';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';

function QuestionComponentWithoutDate({ data }) {
  const {
    author,
    commentCount,
    content,
    dislikeCount,
    images,
    likeCount,
    title,
    _id,
  } = data;

  const { name: postAuthorName, _id: authorId } = author;
  const name = localStorage.getItem('name');

  const finalImage = images[0];

  const queryClient = useQueryClient();

  const [showCommentSection, setShowCommentSection] = useState(false);
  const [popup, setPopup] = useState(false);

  const [localIsLiked, setLocalIsLiked] = useState(() => {
    const storedValue = localStorage.getItem(`localIsLiked_${_id}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [localIsDisliked, setLocalIsDisliked] = useState(() => {
    const storedValue = localStorage.getItem(`localIsDisliked_${_id}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const addCommentRef = useRef();

  useEffect(() => {
    localStorage.setItem(`localIsLiked_${_id}`, JSON.stringify(localIsLiked));
  }, [localIsLiked, _id]);

  useEffect(() => {
    localStorage.setItem(
      `localIsDisliked_${_id}`,
      JSON.stringify(localIsDisliked)
    );
  }, [localIsDisliked, _id]);

  useEffect(() => {
    if (showCommentSection) {
      addCommentRef.current?.focus();
    }
  }, [showCommentSection]);

  const { mutate: upvoting, isLoading: up } = useMutation({
    mutationFn: ({ shouldUpVote, postId }) =>
      toggleUpvote(shouldUpVote, postId),
    onSuccess: (data) => {
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
      toast.success(
        localIsLiked
          ? 'Added Upvote Successfully'
          : 'Removed Upvote Successfully'
      );
      queryClient.invalidateQueries('posts');
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });

  const { mutate: downvoting, isLoading: down } = useMutation({
    mutationFn: ({ shouldDownVote, postId }) =>
      toggleDownvote(shouldDownVote, postId),
    onSuccess: (data) => {
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
      toast.success(
        localIsDisliked
          ? 'Added Downvote Successfully'
          : 'Removed Downvote Successfully'
      );
      queryClient.invalidateQueries('posts');
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });

  function handleUpvoteButton() {
    console.log(_id);
    upvoting({ shouldUpVote: !localIsLiked, postId: _id });
    if (localIsDisliked) downvoting({ shouldDownVote: false, postId: _id });
    setLocalIsLiked(!localIsLiked);
    setLocalIsDisliked(false);
  }

  function handleDownvoteButton() {
    if (localIsLiked) upvoting({ shouldUpVote: false, postId: _id });
    downvoting({ shouldDownVote: !localIsDisliked, postId: _id });
    setLocalIsDisliked(!localIsDisliked);
    setLocalIsLiked(false);
  }

  function toggleComments() {
    setShowCommentSection(!showCommentSection);
  }

  function handlePopup() {
    setPopup(!popup);
  }

  function handleDelete() {}

  return (
    <>
      <div className="bg-[#fff] md:w-[75vw] lg:w-auto dark:bg-[#262626] border border-[#dee0e1] dark:border-[#393839] rounded p-4 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Avatar
            name={postAuthorName}
            size={25}
            round={true}
            textSizeRatio={2}
            className="cursor-pointer hover:opacity-70"
          />
          <div className="flex items-start gap-2">
            <div>
              <div className="text-sm font-semibold dark:text-[#b1b3b6]">
                {postAuthorName}
              </div>
            </div>
            <span className="bg-[#636466] w-[2px] h-[2px] rounded-full mt-3"></span>
            <Link
              className="text-[#2e69ff] hover:underline font-medium"
              to={`/profile/${authorId}`}
            >
              View Profile
            </Link>
          </div>
        </div>
        <div>
          <Link
            to={`posts/${_id}`}
            className="text-base font-bold underline-offset-1 hover:underline dark:text-[#b1b3b6]"
          >
            {title}
          </Link>
          <div className="dark:text-[#b1b3b6]">{content}</div>
        </div>
        {finalImage && (
          <img
            src={finalImage}
            alt="img"
            className="w-full border border-gray-400 dark:border-[#393839] rounded-sm"
          />
        )}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="flex rounded-full border dark:border-[#393839] bg-[#00000108] dark:bg-[#ffffff0d]">
              <button
                className="flex gap-2 px-2 py-1 items-center hover:bg-[#00000008] dark:hover:bg-[#ffffff0a] transition border-r dark:border-[#393839]"
                onClick={handleUpvoteButton}
              >
                <Upvote
                  className={
                    'w-5 h-5 stroke-[#2e69ff] transition-all ' +
                    (localIsLiked ? 'fill-[#2e69ff]' : 'fill-none')
                  }
                />
                <span
                  className={`text-[#636466] dark:text-[#b1b3b6] font-medium text-[13px]`}
                >
                  Upvote
                </span>
                <span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>
                <span
                  className={
                    'text-[13px] ' +
                    (localIsLiked
                      ? 'text-[#2e69ff] '
                      : 'text-[#636466] dark:text-[#b1b3b6]')
                  }
                >
                  {up ? <SpinnerMini /> : likeCount}
                </span>
              </button>
              <div className="h-full border dark:border-[#393839]"></div>
              <button
                className="flex gap-2 px-2 py-1 items-center hover:bg-[#00000008] dark:hover:bg-[#ffffff0a] transition"
                onClick={handleDownvoteButton}
              >
                <DislikeVote
                  className={
                    'w-5 h-5 dark:stroke-[#b1b3b6] ' +
                    (localIsDisliked
                      ? 'fill-[#cb4b10] stroke-[#cb4b10] dark:stroke-[#cb4b10]'
                      : 'fill-none stroke-[#636466]')
                  }
                />
                <span className="hidden sm:block text-[#636466] dark:text-[#b1b3b6] font-medium text-[13px]">
                  Downvote
                </span>
                <span className="bg-[#636466] dark:bg-[#b1b3b6] w-[2px] h-[2px] rounded-full"></span>
                <span
                  className={
                    'text-[13px] ' +
                    (localIsDisliked
                      ? 'text-[#cb4b10]'
                      : 'text-[#636466] dark:text-[#b1b3b6]')
                  }
                >
                  {down ? <SpinnerMini /> : dislikeCount}
                </span>
              </button>
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={toggleComments}
            >
              <FiMessageCircle className="w-5 h-5 stroke-[#636466] dark:stroke-[#b1b3b6]" />
              <div className="text-[13px] text-[#636466] dark:text-[#b1b3b6]">
                {commentCount}
              </div>
            </div>
          </div>
          {name === postAuthorName && (
            <div
              className="cursor-pointer hover:text-black/50 dark:hover:text-white/50"
              onClick={handlePopup}
            >
              <BsThreeDots />
            </div>
          )}
        </div>
        {showCommentSection && (
          <div>
            <Comments postId={_id} ref={addCommentRef} />
          </div>
        )}
      </div>
      {popup && (
        <div className="absolute lg:right-[45%] mt-2 w-fit right-0 bg-white dark:bg-[#262626] border border-[#dee0e1] dark:border-[#393839] p-2">
          <div className="flex items-center gap-2 hover:underline cursor-pointer">
            <MdOutlineModeEdit />
            <div>Edit Post</div>
          </div>
          <div
            className="flex items-center gap-2 hover:underline text-red-800 cursor-pointer"
            onClick={handleDelete}
          >
            <RiDeleteBin6Line />
            <div>Delete Post</div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionComponentWithoutDate;
