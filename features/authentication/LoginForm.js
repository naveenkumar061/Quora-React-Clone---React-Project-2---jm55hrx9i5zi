import toast from 'react-hot-toast';
import { useState } from 'react';
import { useLogin } from './useLogin';
import SpinnerMini from '../../ui/SpinnerMini';

const label = 'text-[13px] font-bold w-fit mb-2 dark:text-[rgb(213,214,214)]';
const input =
  'outline-none border-2 border-[#dee0e1] py-3 px-2 rounded hover:border-[#2d69ff99] dark:hover:border-[rgba(45,105,255,0.4)] focus:border-[#2e69ff] dark:focus:border-[#2e69ff] focus:shadow-[rgb(235,240,255)0px0px0px2px] transition-colors dark:bg-[#181818] dark:border-[#393839] w-[90%] dark:text-[rgb(213,214,214)]';
const btn =
  'px-5 font-medium bg-[#2e69ff] w-fit self-center text-[#fff] h-10 rounded-full hover:bg-[rgb(26,90,255)] disabled:opacity-40 disabled:bg-blue-500 disabled:text-slate-300 transition sm:self-end';
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email);
    console.log(password);
    if (!email && !password) {
      toast.error('Please provide email and password');
      return null;
    } else if (!email) {
      toast.error('Please provide email');
      return null;
    } else if (!password) {
      toast.error('Please provide password');
      return null;
    }
    login({ email, password });
  }

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  function handleEmailChange(e) {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (emailValue && !validateEmail(emailValue)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  }

  function handlePasswordChange(e) {
    const newPassword = e.target.value;
    setPassword(newPassword);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 sm:px-4 sm:w-1/2 sm:border-l border-[#dee0e1] dark:border-[#393839]">
      <div className="border-b border-[#dee0e1] pb-3 font-medium dark:border-[#393839] w-full text-center sm:text-left">
        <p className="dark:text-[rgb(213,214,214)]">Login</p>
      </div>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-4 w-full sm:flex-col sm:items-start">
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            className={input}
            onChange={handleEmailChange}
          />
          {emailError && (
            <div className="text-red-500 mt-1 text-[12px]">{emailError}</div>
          )}
        </div>
        <div className="flex justify-between items-center gap-4 sm:flex-col sm:items-start">
          <label htmlFor="password" className={label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            className={input}
            onChange={handlePasswordChange}
          />
        </div>
        <button className={btn} onClick={handleSubmit} disabled={isLoading}>
          {!isLoading ? 'Login' : <SpinnerMini />}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
