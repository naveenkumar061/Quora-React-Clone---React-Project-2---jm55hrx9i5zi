import { useMutation } from '@tanstack/react-query';
import Modal from '../../utils/Modal';
import { deletePost } from '../../services/apiHome';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function DeletePost({ show, setShow, postID, closeDropdown }) {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      setShow(false);
      toast.success('Post is deleted successfully');
      navigate('/home');
      closeDropdown();
    },
    onError: () => {
      toast.error('OOPS! Some error occurred.');
    },
  });

  function handleDeletePost() {
    mutate(postID);
  }

  return (
    <Modal open={show} close={() => setShow(false)}>
      <div className="p-6 rounded-lg bg-white dark:bg-[#181818] flex flex-col gap-3 items-center">
        <div className="font-semibold text-[20px]">
          Do you want to delete this post?
        </div>
        <div className="flex gap-2 w-full justify-end">
          <button
            onClick={() => {
              setShow(false);
              closeDropdown();
            }}
            className="rounded-full border-2 dark:border-[#262626] px-4 py-2 font-medium text-[#636466] dark:text-[#e2e2e2] hover:bg-[#00000010] dark:hover:bg-[#00000050] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDeletePost}
            className="rounded-full border-2 border-[#2e69ff] px-4 py-2 font-medium bg-[#2e69ff] hover:bg-[#1a5aff] text-[#fff] transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeletePost;
