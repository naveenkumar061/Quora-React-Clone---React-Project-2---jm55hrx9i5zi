import { useParams } from 'react-router-dom';
import { usePostsForUser } from '../features/home/usePostsForUser';
import Loader from '../ui/Loader';
import QuestionComponentWithoutDate from '../features/home/QuestionComponentWithoutDate';
import Ads from '../features/home/Ads';

function Posts() {
  const { id } = useParams();

  console.log(id);

  const { postForUser, isPosting } = usePostsForUser(id);

  console.log(postForUser?.data);

  return (
    <div className="w-full gap-2 flex">
      {/* <div className="mt-[80px] md:mt-[70px]"></div> */}
      <div className="w-full mx-auto flex gap-16 mb-4 justify-center mt-20">
        <div className="w-full md:max-w-[550px] border border-[#dee0e1] dark:border-[#262626] h-fit">
          {isPosting && <Loader />}
          {!isPosting && (
            <QuestionComponentWithoutDate data={postForUser.data} />
          )}
        </div>
        <div className="hidden lg:block sticky top-[72px]">
          <Ads className={'top-[78px]'} />
        </div>
      </div>
    </div>
  );
}

export default Posts;
