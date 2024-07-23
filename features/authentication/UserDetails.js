import { useEffect, useState } from 'react';
import Avatar from 'react-avatar';

function UserDetails() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(localStorage.getItem('name'));
    setEmail(localStorage.getItem('email'));
  }, []);

  return (
    <div className="dark:bg-[#171717] dark:text-white border-t border-gray-300 hover:border-gray-500 transition duration-300 ease-in-out h-screen flex flex-col justify-center items-center">
      <div className="mt-16"></div>
      <div className="flex flex-col items-center p-4 justify-center gap-2 dark:border-white">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-white text-2xl transform hover:scale-110 transition duration-300 ease-in-out">
          <Avatar
            name={name}
            size={25}
            round={true}
            textSizeRatio={2}
            className="cursor-pointer hover:opacity-70"
          />
        </div>
        <h1 className="text-2xl font-bold">Account Details</h1>
        <div className="flex w-full justify-center">
          <span className="font-medium">Name:</span>
          <span className="ml-2">{name}</span>
        </div>
        <div className="flex w-full justify-center">
          <span className="font-medium">Email:</span>
          <span className="ml-2">{email}</span>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
