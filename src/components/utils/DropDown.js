import React, { useState } from 'react';
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';
import EditPost from '../features/post/EditPost';
import { useParams } from 'react-router-dom';
import { usePostsForUser } from '../features/post/usePostsForUser';
import DeletePost from '../features/post/DeletePost';

function Dropdown({ closeDropdown, type }) {
  const [showEditPost, setShowEditPost] = useState(false);
  const [showDeletePost, setShowDeletePost] = useState(false);
  const { id } = useParams();

  const { postForUser } = usePostsForUser(id);

  console.log(postForUser);

  function openEditPost() {
    setShowEditPost(true);
  }

  function openDeletePost() {
    setShowDeletePost(true);
  }

  function handleEditType() {
    if (type === 'Post') openEditPost();
  }

  function handleDeleteType() {
    if (type === 'Post') openDeletePost();
  }

  return (
    <div className="absolute z-10 right-0 mt-2 pb-2 bg-white border border-gray-200 shadow-lg">
      <button
        onClick={handleEditType}
        className="transition-all p-2 duration-200 text-[#636466] dark:text-[#e2e2e2] hover:bg-[#0000000d] dark:hover:bg-[#00000052] hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-1"
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
      <EditPost
        show={showEditPost}
        setShow={setShowEditPost}
        oldTitle={postForUser.data.title}
        oldContent={postForUser.data.content}
        postID={id}
        images={postForUser.data.images}
      />
      <DeletePost
        show={showDeletePost}
        setShow={setShowDeletePost}
        postID={id}
      />
    </div>
  );
}

export default Dropdown;
