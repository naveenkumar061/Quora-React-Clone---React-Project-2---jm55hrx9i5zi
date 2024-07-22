import { useQuery } from '@tanstack/react-query';
import { getComments } from '../../services/apiHome';

export function useComments(postId) {
  const { data: comments, isLoading: isCommenting } = useQuery({
    queryKey: ['comment', postId],
    queryFn: () => getComments(postId),
  });
  return { comments, isCommenting };
}
