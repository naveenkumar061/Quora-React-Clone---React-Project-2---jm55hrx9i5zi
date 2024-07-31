import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useComments } from './useComments';
import { addComments } from '../../services/apiHome';
import toast from 'react-hot-toast';
import Loader from '../../utils/Loader';
import Avatar from 'react-avatar';
import SpinnerMini from '../../utils/SpinnerMini';
import CommentsList from './CommentsList';

const btn =
  'px-5 py-2 bg-[#2e69ff] self-center text-[#fff] rounded-full hover:bg-[rgb(26,90,255)] disabled:opacity-40 disabled:bg-blue-500 disabled:text-slate-300 transition sm:self-end text-xs w-[180px]';

function Comments({ data, addCommentRef }) {
  const { _id, author: postAuthor } = data;

  const name = sessionStorage.getItem('name');

  const queryClient = useQueryClient();

  const { register, reset, handleSubmit, watch } = useForm();

  const commentValue = watch('content');

  const { isCommenting, comments } = useComments(_id);

  console.log(comments?.data.slice().reverse());

  const { mutate: postComments, isLoading: comment } = useMutation({
    mutationFn: ({ comment, postId }) => addComments(comment, postId),
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.message);
      queryClient.invalidateQueries('posts');
      reset({ content: '' });
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    postComments({ comment: data.content, postId: _id });
  }

  if (comment && isCommenting) <Loader />;

  return (
    !isCommenting && (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Avatar
            name={name}
            size={25}
            round={true}
            textSizeRatio={2}
            className="cursor-pointer"
          />
          <input
            type="text"
            placeholder="Add comments..."
            ref={addCommentRef}
            id="content"
            className="outline-none bg-transparent text-[13px] w-full border border-[#dee0e1] dark:border-[#393839] hover:border-[#2e69ff] dark:hover:border-[#2e69ff] rounded-full py-1 px-2 focus:border-[#2e69ff] dark:focus:border-[#2e69ff]"
            {...register('content')}
          />
          <button
            className={btn}
            disabled={!commentValue || comment}
            onClick={handleSubmit(onSubmit)}
          >
            {!comment ? 'Add Comment' : <SpinnerMini />}
          </button>
        </div>
        {comments.data
          .slice()
          .reverse()
          .map((commentItem) => (
            <CommentsList
              key={commentItem._id}
              id={commentItem._id}
              name={commentItem.author_details.name}
              date={commentItem.createdAt}
              content={commentItem.content}
              authorId={commentItem.author_details._id}
              postAuthorName={postAuthor.name}
              postAuthorId={postAuthor._id}
              children={commentItem.children}
            />
          ))}
      </div>
    )
  );
}

export default Comments;
