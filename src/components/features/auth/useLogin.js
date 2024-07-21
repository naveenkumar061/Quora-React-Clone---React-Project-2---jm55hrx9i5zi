import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (user) => {
      localStorage.setItem('authToken', user.token);
      localStorage.setItem('name', user.data.user.name);
      localStorage.setItem('email', user.data.user.email);
      toast.success('Logged in successfully.');
      setTimeout(() => {
        navigate('/home');
      }, 5000);
    },
    onError: (err) => {
      if (err.message === 'Unauthorized: Invalid email or password') {
        toast.error('Unauthorized: Invalid email or password');
      } else {
        toast.error(err.message);
      }
    },
  });

  return { login, isLoading };
}
