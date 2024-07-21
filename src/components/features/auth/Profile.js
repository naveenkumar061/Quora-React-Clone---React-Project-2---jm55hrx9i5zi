import Avatar from 'react-avatar';

function Profile() {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  return (
    <div className="dark:bg-[#171717] dark:text-white flex flex-col justify-center items-center px-4 py-8 md:px-16 md:py-12">
      <div className="flex flex-col items-center p-4 justify-center gap-2 dark:border-white rounded-lg shadow-md ">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-white text-2xl transform hover:scale-110 transition duration-300 ease-in-out">
          <Avatar
            name={name}
            size={25}
            round={true}
            textSizeRatio={2}
            className="cursor-pointer hover:opacity-70"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4 md:mt-0">
          <h1 className="text-2xl font-bold">Account Details</h1>
          <div className="flex w-full justify-between md:justify-start">
            <span className="font-medium">Name:</span>
            <span className="ml-2">{name}</span>
          </div>
          <div className="flex w-full justify-between md:justify-start">
            <span className="font-medium">Email:</span>
            <span className="ml-2">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
