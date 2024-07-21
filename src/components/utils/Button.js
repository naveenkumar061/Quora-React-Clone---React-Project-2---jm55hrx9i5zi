import { useForm } from 'react-hook-form';

function Button({ type }) {
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <button
      className="px-5 font-medium bg-[#2e69ff] w-fit self-center text-[#fff] h-10 rounded-full hover:bg-[rgb(26,90,255)] disabled:opacity-40 disabled:bg-blue-500 disabled:text-slate-300 transition sm:self-end"
      onClick={handleSubmit(onSubmit)}
      disabled={!isValid}
    >
      {type}
    </button>
  );
}

export default Button;
