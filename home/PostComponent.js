import Avatar from 'react-avatar';
import { usePosts } from './usePosts';
import { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import { Link } from 'react-router-dom';
import CreatePost from '../home/CreatePost';
import { IoMdArrowDropupCircle } from 'react-icons/io';
import Loader from '../../ui/Loader';

function PostComponent() {
  const name = localStorage.getItem('name');
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  function showCreatePost() {
    setIsCreatePostVisible(true);
  }
  const { isLoading, posts } = usePosts();

  function handleGoToTop() {
    // window.scroll({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#fff] dark:bg-[#262626] border border-[#dee0e1] dark:border-[#262626] rounded p-4">
        <div className="flex items-center gap-4">
          <Avatar name={name} size={25} round={true} textSizeRatio={2} />
          <div
            onClick={showCreatePost}
            className="rounded-full border border-[#dee0e1] dark:border-[#393839] bg-[#f7f7f8] dark:bg-[#202020] text-[#939598] cursor-pointer flex-grow py-1 px-2 hover:bg-[#f1f2f2] transition duration-200 dark:hover:bg-[rgba(255,255,255,0.04)]"
          >
            What do you want to ask or share?
          </div>
        </div>
        <div className="p-2 flex justify-center items-center">
          <Link
            to="/answer"
            className="w-[40%] flex flex-grow items-center justify-center text-center gap-2 cursor-pointer hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)] rounded-full p-1"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-[#636466] dark:stroke-[#b1b3b6] w-5 h-5"
            >
              <g strokeWidth="1.5" fill="none" fillRule="evenodd">
                <path
                  d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z"
                  // stroke="#666"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  fill="#666"
                  d="m4.429 19.571 2.652-.884-1.768-1.768z"
                ></path>
                <path
                  d="M14.5 19.5h5v-5m-10-10h-5v5"
                  // stroke="#666"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            <div className="text-[13px] text-[#636466] font-medium dark:text-[#b1b3b6]">
              Answer
            </div>
          </Link>
          <div className="h-[25px] w-[2px] bg-[#dee0e1] dark:bg-[#393839] mx-4"></div>
          <button
            className="w-1/2 text-center flex items-center justify-center gap-2 cursor-pointer hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.04)] p-1 rounded-full"
            onClick={showCreatePost}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-[#636466] dark:stroke-[#b1b3b6] w-5 h-5"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9a2 2 0 0 1 2.828 0Z"
                  // stroke="#666"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  fill="#666"
                  d="m4.429 19.571 2.652-.884-1.768-1.768z"
                ></path>
              </g>
            </svg>
            <div className="text-[13px] text-[#636466] font-medium dark:text-[#b1b3b6]">
              Post
            </div>
          </button>
        </div>
      </div>
      {posts?.data.map((data, index) => (
        <QuestionComponent key={index} data={data} />
      ))}
      <button
        onClick={handleGoToTop}
        className="self-center flex gap-3 mt-2 p-2 mb-2 items-center hover:bg-[#00000010] dark:hover:bg-[#ffffff10] transition duration-200 rounded"
      >
        <IoMdArrowDropupCircle size={22} />
        <div>Go To Top</div>
      </button>
      <CreatePost show={isCreatePostVisible} setShow={setIsCreatePostVisible} />
    </div>
  );
}

export default PostComponent;
