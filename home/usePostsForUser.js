import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '../../services/apiHome';

export function usePostsForUser(postId) {
  const { data: postForUser, isLoading: isPosting } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getUserPosts(postId),
  });
  return { postForUser, isPosting };
}
