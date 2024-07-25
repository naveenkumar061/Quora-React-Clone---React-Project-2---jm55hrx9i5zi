import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useRef } from 'react';
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
  closeDropdown,
}) {
  const [files, setFiles] = useState(images);
  const imagesInput = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: oldTitle,
      content: oldContent,
    },
  });

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
      closeDropdown();
    },
    onError: () => {
      toast.error('OOPS! Some error occurred.');
    },
  });

  function onSubmit(data) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('images', files[0]);

    mutation.mutate(formData);
    setShow(false);
  }

  function filesBtnHandler(e) {
    setFiles([...e.target.files]);
  }
  function handleRemoveFile(index) {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  }

  return (
    <Modal open={show} close={() => setShow(false)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-screen w-screen md:h-fit md:max-h-screen md:max-w-[600px] bg-white dark:bg-[#181818] rounded-lg p-6 flex flex-col items-start gap-2 dark:text-[#e2e2e2]"
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => {
                setShow(false);
                closeDropdown();
              }}
              className="rounded-full p-2 hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[#ffffff15] transition duration-300"
            >
              <RxCross2 size={24} />
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="bg-[#2e69ff] hover:bg-[#1a5aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white text-[13px] sm:text-[15px] font-medium p-2 sm:p-3 rounded-full transition duration-300"
            >
              Save Post
            </button>
          </div>
          <div className="px-3 sm:px-5 flex justify-between items-center gap-5">
            <div className="flex items-center w-full">
              <div className="flex flex-wrap max-h-[100px] w-full gap-2">
                {files?.length === 0 && <div>No File Chosen</div>}
                {files?.length > 0 &&
                  files.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={file}
                        alt=""
                        className="w-10 h-10 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <RiDeleteBin6Line size={18} />
                      </button>
                    </div>
                  ))}
                <label className="relative cursor-pointer">
                  <input
                    ref={imagesInput}
                    type="file"
                    className="absolute w-0 h-0"
                    multiple
                    accept="image/*"
                    onChange={filesBtnHandler}
                  />
                  <FaRegImages size={24} />
                </label>
              </div>
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
          className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff] transition-all duration-300 dark:text-[rgb(213,214,214)] dark:bg-[#181818]"
          placeholder="Enter The Question or Title"
        />
        {errors.title && (
          <div className="text-red-500 mt-1 text-[12px]">
            {errors.title.message}
          </div>
        )}
        <label htmlFor="post-content" className="font-semibold">
          Post Description :
        </label>
        <textarea
          {...register('content')}
          id="content"
          rows={10}
          placeholder="Enter Description or Answer"
          className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff] transition-all duration-300 dark:text-[rgb(213,214,214)] dark:bg-[#181818]"
        />
      </form>
    </Modal>
  );
}
