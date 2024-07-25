import { useNavigate } from 'react-router-dom';
import Modal from '../../utils/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSpace } from '../../services/apiHome';
import toast from 'react-hot-toast';

function DeleteSpace({
  closeDeleteSpaceModal,
  showDeleteSpaceModal,
  channelID,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteSpace,
    onSuccess: () => {
      closeDeleteSpaceModal();
      queryClient.invalidateQueries('spaces');
      toast.success('Space is deleted successfully');
      navigate('/home');
    },
    onError: () => {
      toast.error('OOPS! Some error occurred.');
    },
  });

  function handleDeleteSpace() {
    mutate(channelID);
  }
  return (
    <Modal open={showDeleteSpaceModal} close={closeDeleteSpaceModal}>
      <div className="p-6 rounded-lg bg-white dark:bg-[#181818] flex flex-col gap-3 items-center">
        <div className="font-semibold text-[20px]">
          Do you want to delete this post?
        </div>
        <div className="flex gap-2 w-full justify-end">
          <button
            onClick={closeDeleteSpaceModal}
            className="rounded-full border-2 dark:border-[#262626] px-4 py-2 font-medium text-[#636466] dark:text-[#e2e2e2] hover:bg-[#00000010] dark:hover:bg-[#00000050] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteSpace}
            className="rounded-full border-2 border-[#2e69ff] px-4 py-2 font-medium bg-[#2e69ff] hover:bg-[#1a5aff] text-[#fff] transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteSpace;
