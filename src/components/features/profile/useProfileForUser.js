import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/apiHome';

export function useProfileForUser(uid) {
  const { data: profileForUser, isLoading } = useQuery({
    queryKey: ['users', uid],
    queryFn: () => getUser(uid),
  });
  return { profileForUser, isLoading };
}
