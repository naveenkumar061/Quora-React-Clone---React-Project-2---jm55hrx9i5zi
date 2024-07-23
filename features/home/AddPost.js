import { useState } from 'react';

import { GoPlusCircle } from 'react-icons/go';

import CreatePost from './CreatePost';
import Modal from '../../ui/others/Modal';

function AddPost() {
  const [openAddPost, setOpenAddPost] = useState(false);

  function openPost() {
    setOpenAddPost(true);
  }

  function closePost() {
    setOpenAddPost(false);
  }

  return (
    <>
      <div className="text-white flex items-center gap-1" onClick={openPost}>
        <GoPlusCircle size={20} />
        AddPost
      </div>
      <Modal open={openAddPost} close={closePost}>
        <CreatePost />
      </Modal>
    </>
  );
}

export default AddPost;
