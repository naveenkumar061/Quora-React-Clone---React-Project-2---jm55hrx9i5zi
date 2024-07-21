import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { RxCross2 } from 'react-icons/rx';
import SpinnerMini from '../../utils/SpinnerMini';
import { useSignup } from './useSignup';

const input =
  'outline-none border-2 border-[#dee0e1] py-3 px-2 rounded hover:border-[rgba(45,105,255,0.6)] dark:hover:border-[rgba(45,105,255,0.4)] focus:border-[rgb(46,105,255)] dark:focus:border-[rgb(46,105,255)] focus:shadow-[rgb(235,240,255)0px0px0px2px] transition-colors placeholder:text-[10px] md:placeholder:text-[12px] dark:bg-[#181818] dark:border-[#393839] cursor-pointer dark:text-[rgb(213,214,214)]';

function SignupForm({ show, setShow }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const nameInputRef = useRef(null);

  const { mutate, isCreating } = useSignup();

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [show]);

  function onSubmit(data) {
    mutate(data);
    reset();
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }

  return (
    show &&
    createPortal(
      <div className="absolute w-full h-full flex justify-center items-center bg-black/75 top-0 left-0 px-10">
        <div className="bg-white border border-[#dee0e1] rounded-xl md:w-[600px] w-full flex flex-col md:text-[14px] text-[12px] dark:bg-[#181818] dark:border-[#393839]">
          <button
            type="button"
            className="rounded-full w-fit p-2 hover:bg-slate-700/5 mt-2 ml-4 dark:text-[rgb(213,214,214)]"
            onClick={() => setShow(false)}
          >
            <RxCross2 size={24} />
          </button>
          <div className="px-6 pb-5 border-b dark:border-[#393839] flex flex-col gap-3">
            <div className="font-bold text-[18px] dark:text-[rgb(213,214,214)]">
              Sign Up
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <label
                htmlFor="name"
                className="font-bold text-[13px] mb-1 dark:text-[rgb(213,214,214)]"
              >
                Name
              </label>
              <input
                className={input}
                type="text"
                placeholder="What would you like to be called?"
                id="name"
                ref={nameInputRef}
                {...register('name', {
                  required: 'Name is required',
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: 'Invalid Name; provide only letters',
                  },
                })}
              />
              {errors.name && (
                <div className="text-red-500 mt-1 text-[12px]">
                  {errors.name.message}
                </div>
              )}
            </form>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-bold text-[13px] mb-1 dark:text-[rgb(213,214,214)]"
              >
                Email
              </label>
              <input
                className={input}
                type="email"
                placeholder="Your email"
                id="email"
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
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="font-bold text-[13px] mb-1 dark:text-[rgb(213,214,214)]"
              >
                Password
              </label>
              <input
                className={input}
                type="password"
                placeholder="Create a password"
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  validate: {
                    hasDigit: (value) =>
                      /\d/.test(value) ||
                      'Password must contain at least one digit',
                    hasLetter: (value) =>
                      /[a-zA-Z]/.test(value) ||
                      'Password must contain at least one letter',
                    hasUppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      'Password must contain at least one uppercase letter',
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      'Password must contain at least one special character',
                  },
                })}
              />
              {errors.password && (
                <div className="text-red-500 text-[12px] mt-1">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
          <button
            className="px-5 font-medium bg-[#2e69ff] w-fit self-center text-[#fff] h-10 rounded-full hover:bg-[rgb(26,90,255)] disabled:opacity-40 disabled:bg-blue-500 disabled:text-slate-300 my-3"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isCreating}
          >
            {isCreating ? <SpinnerMini /> : 'Signup'}
          </button>
        </div>
      </div>,
      document.getElementById('portal')
    )
  );
}

export default SignupForm;
