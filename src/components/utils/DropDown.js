import React, { useState } from 'react';
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';
import EditPost from '../features/post/EditPost';
import { useParams } from 'react-router-dom';
import { usePostsForUser } from '../features/post/usePostsForUser';

function Dropdown({ closeDropdown, type }) {
  const [showEditPost, setShowEditPost] = useState(false);
  const { id } = useParams();

  const { postForUser, isPosting } = usePostsForUser(id);

  console.log(postForUser);

  function openEditPost() {
    setShowEditPost(true);
  }

  function handleType() {
    if (type === 'Post') openEditPost();
  }

  return (
    <div className="absolute z-10 right-0 mt-2 pb-2 bg-white border border-gray-200 shadow-lg">
      <div
        onClick={handleType}
        className="transition-all p-2 duration-200 text-[#636466] dark:text-[#e2e2e2] hover:bg-[#0000000d] dark:hover:bg-[#00000052] hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-1"
      >
        <MdOutlineModeEdit className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
        Edit {type}
      </div>
      {/* <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-1"
          onClick={closeDropdown}
        >
          <MdDelete className="fill-red-700" />
          Delete {type}
        </li>
      </ul> */}
      <EditPost
        show={showEditPost}
        setShow={setShowEditPost}
        oldTitle={postForUser.data.title}
        oldContent={postForUser.data.content}
        postID={id}
        images={postForUser.data.images}
        isPostsPage={true}
      />
    </div>
  );
}

export default Dropdown;
