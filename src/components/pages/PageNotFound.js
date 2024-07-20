import { FaArrowLeft } from 'react-icons/fa';
import { useMoveBack } from '../hooks/useMoveBack';

function PageNotFound() {
  const moveback = useMoveBack();

  return (
    <div className="h-screen bg-gray-200 flex items-center justify-center dark:bg-gray-800">
      <div className="bg-gray-100 dark:bg-gray-900 flex flex-col items-center gap-10 dark:text-white p-4 text-5xl rounded-lg">
        <h1>The page you are looking for could not be found 😢</h1>
        <button
          className="text-lg flex items-center gap-4 text-white dark:text-black dark:bg-blue-600 bg-blue-800 rounded hover:bg-blue-600 outline-none dark:hover:bg-blue-800 p-4"
          onClick={moveback}
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
