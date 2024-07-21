import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import SpinnerMini from '../../utils/SpinnerMini';

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const { login, isLoading } = useLogin();

  function onSubmit(data) {
    login(data);
    reset();
  }

  return (
    <div className="px-6 text-sm sm:w-1/2 flex flex-col">
      <div className="border-b border-[#DEE0E1] w-full pb-2 font-medium mb-4">
        Login
      </div>
      <div className="mb-4 flex flex-col gap-4 dark:text-[rgb(213,214,214)]">
        <label className="font-bold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          placeholder="Your email"
          className="outline-none border-2 border-[#dee0e1] p-2 rounded hover:border-[#2d69ff99] dark:hover:border-[rgba(45,105,255,0.4)] focus:border-[#2e69ff] dark:focus:border-[#2e69ff] focus:shadow-[rgb(235,240,255)0px0px0px2px] transition-colors dark:bg-[#181818] dark:border-[#393839] w-full dark:text-[rgb(213,214,214)]"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <div className="text-red-500 text-[12px] mt-1">
            {errors.email.message}
          </div>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-4 dark:text-[rgb(213,214,214)]">
        <label className="font-bold" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Your password"
          className="outline-none border-2 border-[#dee0e1] p-2 rounded hover:border-[#2d69ff99] dark:hover:border-[rgba(45,105,255,0.4)] focus:border-[#2e69ff] dark:focus:border-[#2e69ff] focus:shadow-[rgb(235,240,255)0px0px0px2px] transition-colors dark:bg-[#181818] dark:border-[#393839] w-full dark:text-[rgb(213,214,214)]"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && (
          <div className="text-red-500 text-[12px] mt-1">
            {errors.password.message}
          </div>
        )}
      </div>
      <button
        className="px-5 font-medium bg-[#2e69ff] w-fit self-center text-[#fff] h-10 rounded-full hover:bg-[rgb(26,90,255)] disabled:opacity-40 disabled:bg-blue-500 disabled:text-slate-300 transition sm:self-end"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid || isLoading}
      >
        {!isLoading ? 'Login' : <SpinnerMini />}
      </button>
    </div>
  );
}

export default Login;
