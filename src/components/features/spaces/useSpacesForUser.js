import { useQuery } from '@tanstack/react-query';
import { getUserSpaces } from '../../services/apiHome';

export function useSpacesForUser(spaceId) {
  const { data: spaceForUser, isLoading: isSpacing } = useQuery({
    queryKey: ['spaces', spaceId],
    queryFn: () => getUserSpaces(spaceId),
  });
  return { spaceForUser, isSpacing };
}
