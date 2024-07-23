import { useNavigate } from 'react-router-dom';
import { useToggleThemeContext } from '../context/ToggleThemeContext';
import { useRef } from 'react';
import { useEffect } from 'react';

function ProfileMainMenu({ closeSideBar }) {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useToggleThemeContext();
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref);
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) closeSideBar();
    }
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [closeSideBar]);

  function handleAccount() {
    navigate('/userdetails');
    closeSideBar();
  }

  function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
    closeSideBar();
  }

  return (
    <div
      className="absolute left-[60%] top-16 bg-white dark:bg-[#262626] transition-transform ease-in flex flex-col w-52 border border-[#dee0e1] dark:border-[#393839] rounded shadow-[0_1px_2px_rgba(0,0,0,.03),0_3px_8px_rgba(0,0,0,.05)] dark:text-white m-4"
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <div
        onClick={handleAccount}
        className="w-full text-center p-4 cursor-pointer hover:bg-black/5 hover:dark:bg-white/5 flex flex-col border-b dark:border-[#393839]"
      >
        Account Details
      </div>
      <div
        className="w-full text-center p-4 cursor-pointer hover:bg-black/5 hover:dark:bg-white/5 flex flex-col border-b dark:border-[#393839]"
        onClick={() => {
          toggleDarkMode();
          closeSideBar();
        }}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </div>
      <div
        onClick={handleLogout}
        className="w-full text-center p-4 cursor-pointer hover:bg-black/5 hover:dark:bg-white/5 flex flex-col border-b dark:border-[#393839]"
      >
        Logout
      </div>
    </div>
  );
}

export default ProfileMainMenu;
