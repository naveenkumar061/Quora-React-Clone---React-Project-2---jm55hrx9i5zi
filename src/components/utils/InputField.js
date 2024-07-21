import { useForm } from 'react-hook-form';

function InputField({ type }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  function submitRegister(type) {
    const validationConfig = {
      email: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Invalid email address',
        },
      },
      password: {
        required: 'Provide correct password',
      },
    };

    return {
      ...register(type, validationConfig[type] || {}), // Default to empty object for unsupported types
    };
  }

  return (
    <div className="mb-4 flex flex-col gap-4 dark:text-[rgb(213,214,214)]">
      <label className="font-bold" htmlFor={type}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </label>
      <input
        type={type}
        id={type}
        placeholder={`Your ${type}`}
        className="outline-none border-2 border-[#dee0e1] p-2 rounded hover:border-[#2d69ff99] dark:hover:border-[rgba(45,105,255,0.4)] focus:border-[#2e69ff] dark:focus:border-[#2e69ff] focus:shadow-[rgb(235,240,255)0px0px0px2px] transition-colors dark:bg-[#181818] dark:border-[#393839] w-full dark:text-[rgb(213,214,214)]"
        {...submitRegister(type)}
      />
      {errors[type] && ( // Access errors by type
        <div className="text-red-500 text-[12px] mt-1">
          {errors[type].message}
        </div>
      )}
    </div>
  );
}

export default InputField;
