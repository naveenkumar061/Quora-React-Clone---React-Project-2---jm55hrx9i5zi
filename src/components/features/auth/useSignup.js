import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('New User created successfully');
      queryClient.invalidateQueries('user');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isCreating };
}
