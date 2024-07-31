import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from '../../utils/Modal';
import { editSpace } from '../../services/apiHome';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegImages } from 'react-icons/fa';

function EditSpace({
  channelID,
  show,
  setShow,
  oldTitle,
  oldContent,
  oldImage,
}) {
  const [files, setFiles] = useState([]);

  const imagesInput = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: oldTitle,
      description: oldContent,
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation((formData) => editSpace(formData, channelID), {
    onSuccess: (data) => {
      console.log(data);
      setShow(false);
      if (data.status === 'success') {
        toast.success(data.message);
        queryClient.invalidateQueries('spaces');
        reset({
          title: data.data.name,
          description: data.data.description,
        });
      } else {
        toast.error('OOPS! Some error occurred.');
      }
    },
    onError: () => {
      toast.error('OOPS! Some error occurred.');
    },
  });

  function onSubmit(data) {
    const formData = new FormData();
    formData.append('name', data.title);
    formData.append('description', data.description);
    if (files.length > 0) {
      for (let file of files) {
        console.log(file);
        formData.append('images', URL.createObjectURL(file));
      }
      setFiles([]);
    }
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

  function closeModal() {
    setShow(false);
    setFiles([]);
    reset();
  }

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
              type="submit"
              className="hidden sm:block bg-[#2e69ff] hover:bg-[#1a1aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white text-[13px] sm:text-[15px] font-medium p-2 sm:p-3 rounded-full transition duration-300"
            >
              Save Space
            </button>
          </div>
          <div className="flex gap-4 justify-center items-center dark:text-[rgb(213,214,214)]">
            <div>
              {files?.length === 0 && <div>No File Chosen</div>}
              {files.length > 0 &&
                files.map((file, index) => (
                  <div key={index} className="relative">
                    <img src={file} alt="" className="w-10 h-10 object-cover" />
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
                multiple
                accept="image/*"
                onChange={filesBtnHandler}
              />
              <FaRegImages size={24} />
            </label>
          </div>
        </div>
        <div className="w-full border-b-4  border-[#2e69ff] text-center font-semibold pb-4 text-lg dark:text-[rgb(213,214,214)]">
          Save Space
        </div>
        <div className="w-full">
          <label
            htmlFor="title"
            className="font-semibold dark:text-[rgb(213,214,214)]"
          >
            Space Title <span className="font-normal">(required)</span>:
          </label>
          <input
            id="title"
            className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff] transition-all duration-300 dark:text-[rgb(213,214,214)] dark:bg-[#181818]"
            placeholder="Enter The Space Title"
            {...register('title', { required: 'Space Title is required' })}
          />
          {errors.title && (
            <div className="text-red-500 mt-1 text-[12px]">
              {errors.title.message}
            </div>
          )}
          <label
            htmlFor="description"
            className="font-semibold dark:text-[rgb(213,214,214)]"
          >
            Space Description :
          </label>
          <textarea
            id="description"
            rows={10}
            placeholder="Enter Description"
            className="w-full outline-none border-2 dark:border-[#393839] p-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff]  transition-all duration-300 dark:text-[rgb(213,214,214)] dark:bg-[#181818]"
            {...register('description')}
          />
          <button
            type="submit"
            className="sm:hidden w-full mt-4 bg-[#2e69ff] hover:bg-[#1a5aff] disabled:opacity-35 disabled:hover:bg-[#2e69ff] text-white text-[15px] font-medium p-2 rounded-full transition duration-300"
            disabled={!isValid}
          >
            Save Space
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditSpace;
