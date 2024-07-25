import React, { useEffect, useRef, useState } from 'react';
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';
import EditPost from '../features/post/EditPost';
import { useParams } from 'react-router-dom';
import { usePostsForUser } from '../features/post/usePostsForUser';
import DeletePost from '../features/post/DeletePost';
import DeleteComment from '../features/comments/DeleteComment';

function Dropdown({ closeDropdown, type, commentId }) {
  const [showEditPost, setShowEditPost] = useState(false);
  const [showDeletePost, setShowDeletePost] = useState(false);
  const [showDeleteComment, setShowDeleteComment] = useState(false);
  const { id } = useParams();

  const dropdownRef = useRef(null);
  const { postForUser } = usePostsForUser(id);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);

  function openEditPost() {
    setShowEditPost(true);
  }

  function openDeletePost() {
    setShowDeletePost(true);
  }

  function openDeleteComment() {
    setShowDeleteComment(true);
  }

  function handleEditType() {
    if (type === 'Post') openEditPost();
  }

  function handleDeleteType() {
    if (type === 'Post') openDeletePost();
    if (type === 'Comment') openDeleteComment();
  }

  return (
    <>
      <div className="absolute z-10 right-0 mt-2 pb-2 bg-white border border-gray-200 shadow-lg">
        {type === 'Post' && (
          <>
            <button
              onClick={handleEditType}
              className="transition-all p-2 w-full duration-200 text-[#636466] dark:text-[#e2e2e2] hover:bg-[#0000000d] dark:hover:bg-[#00000052] hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-1"
            >
              <MdOutlineModeEdit className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
              Edit {type}
            </button>
            <button
              className="transition-all p-2 duration-200 text-[#636466] dark:text-[#e2e2e2] hover:bg-[#0000000d] dark:hover:bg-[#00000052] hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-1"
              onClick={handleDeleteType}
            >
              <MdDelete className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] fill-red-700" />
              Delete {type}
            </button>
          </>
        )}
        {type === 'Comment' && (
          <button
            className="transition-all p-2 duration-200 text-[#636466] dark:text-[#e2e2e2] hover:bg-[#0000000d] dark:hover:bg-[#00000052] hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-1"
            onClick={handleDeleteType}
          >
            <MdDelete className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] fill-red-700" />
            Delete {type}
          </button>
        )}
      </div>
      <EditPost
        show={showEditPost}
        setShow={setShowEditPost}
        oldTitle={postForUser?.data?.title}
        oldContent={postForUser?.data?.content}
        postID={id}
        images={postForUser?.data?.images}
        closeDropdown={closeDropdown}
      />
      <DeletePost
        show={showDeletePost}
        setShow={setShowDeletePost}
        postID={id}
        closeDropdown={closeDropdown}
      />
      <DeleteComment
        show={showDeleteComment}
        setShow={setShowDeleteComment}
        closeDropdown={closeDropdown}
        commentId={commentId}
      />
    </>
  );
}

export default Dropdown;
