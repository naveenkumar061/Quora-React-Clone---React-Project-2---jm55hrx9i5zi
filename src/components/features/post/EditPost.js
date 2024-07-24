import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { editPost } from '../../services/apiHome';
import toast from 'react-hot-toast';
import Modal from '../../utils/Modal';
import { RxCross2 } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegImages } from 'react-icons/fa';

export default function EditPost({
  show,
  setShow,
  oldTitle,
  oldContent,
  postID,
  images,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: oldTitle,
      content: oldContent,
      images: [],
    },
  });

  const imagesInput = useRef(null);
  const queryClient = useQueryClient();

  const mutation = useMutation((formData) => editPost(formData, postID), {
    onSuccess: (data) => {
      setShow(false);
      if (data.status === 'success') {
        toast.success(data.message);
        queryClient.invalidateQueries('posts');
        reset({
          title: data.data.title,
          content: data.data.content,
        });
      } else {
        toast.error('OOPS! Some error occurred.');
      }
      reset();
    },
    onError: () => {
      toast.error('OOPS! Some error occurred.');
    },
  });

  function onSubmit(data) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.images.length > 0) {
      for (let file of data.images) {
        formData.append('images', file);
      }
    }
    mutation.mutate(formData);
  }

  function handleRemoveFile(index) {
    if (imagesInput.current?.files) {
      const filesArray = Array.from(imagesInput.current?.files);
      filesArray.splice(index, 1);
      const dataTransfer = new DataTransfer();
      filesArray.forEach((file) => dataTransfer.items.add(file));
      imagesInput.current.files = dataTransfer.files;
    }
  }

  return (
    <Modal open={show} close={() => setShow(false)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-screen w-screen md:h-fit md:max-h-screen md:max-w-[600px] bg-white dark:bg-[#181818] rounded-lg p-6 flex flex-col items-start gap-2"
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShow(false)}
              className="rounded-full p-2 hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[#ffffff15] transition duration-300"
            >
              <RxCross2 size={24} />
            </button>
            <button
              type="submit"
              disabled={oldTitle === '' || oldTitle.length < 2}
              className="bg-[#2e69ff] hover:bg-[#1a5aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white text-[13px] sm:text-[15px] font-medium p-2 sm:p-3 rounded-full transition duration-300"
            >
              Save Post
            </button>
          </div>
          <div className="px-3 sm:px-5 flex justify-between items-center ">
            <div className="flex gap-5 items-center w-full">
              <div className="flex gap-4 flex-wrap max-h-[100px] w-full">
                {images.length === 0 && <div>No File Chosen</div>}
                {images.length > 0 &&
                  images.map((file, index) => (
                    <div key={index} className="flex gap-1">
                      <div className="relative w-10 sm:w-14 h-10">
                        {file instanceof File ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div>Invalid File</div>
                        )}
                      </div>
                      <button onClick={() => handleRemoveFile(index)}>
                        <RiDeleteBin6Line size={18} />
                      </button>
                    </div>
                  ))}
              </div>
              <label className="relative cursor-pointer">
                <input
                  ref={imagesInput}
                  type="file"
                  className="absolute w-0 h-0"
                  multiple
                  accept="image/*"
                  {...register('images')}
                />
                <FaRegImages size={24} />
              </label>
            </div>
          </div>
        </div>

        <div className="text-[18px] font-semibold mx-auto text-center">
          Edit Post
        </div>
        <div className="w-full h-1 bg-[#2e69ff] rounded-t"></div>

        <label htmlFor="post-title" className="font-semibold mt-2">
          Post Title <span className="font-normal">(required)</span>:
        </label>
        <input
          {...register('title', { required: true })}
          id="title"
          className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff] transition-all duration-300"
          placeholder="Enter The Question or Title"
        />
        <label htmlFor="post-content" className="font-semibold">
          Post Description :
        </label>
        <textarea
          {...register('content')}
          id="content"
          rows={10}
          placeholder="Enter Description or Answer"
          className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff] transition-all duration-300"
        />
      </form>
    </Modal>
  );
}
