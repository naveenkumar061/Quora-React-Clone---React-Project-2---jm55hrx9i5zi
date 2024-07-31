import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (user) => {
      sessionStorage.setItem('authToken', user.token);
      sessionStorage.setItem('name', user.data.user.name);
      sessionStorage.setItem('email', user.data.user.email);
      toast.success('Logged in successfully.');
      setTimeout(() => {
        navigate('/home');
      }, 5000);
    },
    onError: (err) => {
      if (err.message === 'Unauthorized: Invalid email or password') {
        toast.error('Unauthorized: Invalid email or password');
        navigate('/login');
      } else {
        toast.error(err.message);
        navigate('/login');
      }
    },
  });

  return { login, isLoading };
}
