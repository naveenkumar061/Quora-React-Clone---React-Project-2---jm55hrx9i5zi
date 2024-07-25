import { useParams } from 'react-router-dom';
import { usePostsForUser } from './usePostsForUser';
import Loader from '../../utils/Loader';
import Ads from '../ads/Ads';
import QuestionComponent from './QuestionComponent';

function SinglePost() {
  const { id } = useParams();

  const { postForUser, isPosting } = usePostsForUser(id);

  return (
    <div className="w-full gap-2 flex bg-white dark:bg-[#181818]">
      <div className="w-full mx-auto flex gap-16 mb-4 justify-center mt-20">
        <div className="w-full md:max-w-[550px] border border-[#dee0e1] dark:border-[#262626] h-fit">
          {isPosting && <Loader />}
          {!isPosting && <QuestionComponent data={postForUser.data} />}
        </div>
        <Ads />
      </div>
    </div>
  );
}

export default SinglePost;
