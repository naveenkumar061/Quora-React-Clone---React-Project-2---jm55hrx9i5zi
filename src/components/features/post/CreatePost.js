import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { addPost } from '../../services/apiHome';
import toast from 'react-hot-toast';
import Spinner from '../../utils/Spinner';
import Modal from '../../utils/Modal';
import { RxCross2 } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegImages } from 'react-icons/fa';

function CreatePost({ show, setShow }) {
  const [files, setFiles] = useState([]);
  const imagesInput = useRef();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      toast.success('New Post created successfully');
      queryClient.invalidateQueries('spaces');
      setTimeout(() => {
        navigate(`/posts/${data.data._id}`);
      }, 1000);
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      closeModal();
    },
  });

  function closeModal() {
    setShow(false);
    setFiles([]);
    reset();
  }

  function filesBtnHandler(e) {
    setFiles([...e.target.files]);
  }

  function handleRemoveFile(index) {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  }

  function onSubmit(data) {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) {
      formData.append('content', data.description);
    }
    if (files.length > 0) {
      for (let file of files)
        formData.append('images', URL.createObjectURL(file));
      setFiles([]);
    }
    mutate(formData);
    closeModal();
  }

  if (isCreating) <Spinner />;
  return (
    <Modal open={show} close={closeModal}>
      <form
        className="h-screen w-screen md:h-fit md:max-h-screen md:max-w-[600px] bg-white dark:bg-[#181818] rounded-lg p-6 flex flex-col items-start gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={closeModal}
              className="rounded-full p-2 hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[#ffffff15] transition duration-300 dark:text-[rgb(213,214,214)]"
            >
              <RxCross2 size={24} />
            </button>
            <button
              disabled={!isValid}
              type="submit" // Ensure the correct type for form submission
              className="hidden sm:block bg-[#2e69ff] hover:bg-[#1a1aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white text-[13px] sm:text-[15px] font-medium p-2 sm:p-3 rounded-full transition duration-300"
            >
              Add Post
            </button>
          </div>
          <div className="flex gap-4 justify-center items-center dark:text-[rgb(213,214,214)]">
            <div>
              {files.length === 0 && <div>No File Chosen</div>}
              {files.length > 0 &&
                files.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
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
            </div>
            <label className="relative cursor-pointer">
              <input
                ref={imagesInput}
                type="file"
                className="absolute w-0 h-0"
                accept="image/*"
                id="images"
                {...register('images')}
                onChange={filesBtnHandler} // Call filesBtnHandler on file selection
              />
              <FaRegImages size={24} />
            </label>
          </div>
        </div>
        <div className="w-full border-b-4  border-[#2e69ff] text-center font-semibold pb-4 text-lg dark:text-[rgb(213,214,214)]">
          Create post
        </div>
        <div className="p-3 w-full bg-[#ebf0ff] dark:bg-[#282d41] text-[#2e69ff] dark:text-[#4894fd] rounded-md text-[12px] sm:text-[15px]">
          <div className="font-bold">Tips on getting good answers quickly</div>
          <ul className="list-disc list-inside">
            <li>Make sure your question has not been asked already</li>
            <li>Keep your question short and to the point</li>
            <li>Double-check grammar and spelling</li>
          </ul>
        </div>
        <div className="w-full">
          <label
            htmlFor="title"
            className="font-semibold dark:text-[rgb(213,214,214)]"
          >
            Post Title <span className="font-normal">(required)</span>:
          </label>
          <input
            id="title"
            className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff] transition-all duration-300 dark:text-[rgb(213,214,214)] dark:bg-[#181818]"
            placeholder="Enter The Post Title"
            {...register('title', { required: 'Post Title is required' })}
          />
          {errors.title && (
            <div className="text-red-500 mt-1 text-[12px]">
              {errors.title.message}
            </div>
          )}
          <label
            htmlFor="description"
            className="font-semibold dark:text-[rgb(213,214,214)] "
          >
            Post Description :
          </label>
          <textarea
            id="description"
            rows={10}
            placeholder="Enter Description"
            className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff]  transition-all duration-300 dark:text-[rgb(213,214,214)] dark:bg-[#181818]"
            {...register('description')}
          />
          <button
            type="submit" // Ensure the correct type for form submission
            className="sm:hidden w-full mt-4 bg-[#2e69ff] hover:bg-[#1a5aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white text-[15px] font-medium p-2 rounded-full transition duration-300"
            disabled={!isValid}
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreatePost;
