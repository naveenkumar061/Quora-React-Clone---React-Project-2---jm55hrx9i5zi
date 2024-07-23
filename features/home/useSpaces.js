import { useQuery } from '@tanstack/react-query';
import { getSpaces } from '../../services/apiHome';

export function useSpaces() {
  const {
    isLoading,
    data: spaces,
    error,
  } = useQuery({
    queryKey: ['spaces'],
    queryFn: getSpaces,
  });
  return { isLoading, spaces, error };
}
