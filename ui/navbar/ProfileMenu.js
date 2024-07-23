import { createPortal } from 'react-dom';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { useToggleThemeContext } from '../context/ToggleThemeContext';

function ProfileMenu({ closeSideBar, isSideBarVisible, toggleSideBar }) {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useToggleThemeContext();

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

  return createPortal(
    isSideBarVisible && (
      <div
        className="z-50 fixed w-screen h-screen top-0 left-0 bg-black/80 md:hidden dark:text-white"
        onClick={closeSideBar}
      >
        <div
          className="h-screen w-64 bg-white dark:bg-[#262626]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex p-4 pl-6 border-b dark:border-[#393839] bg-[#f7f7f8] dark:bg-[#202020] justify-between items-center">
            <div className="text-[20px] font-semibold">Your Account</div>
            <button onClick={closeSideBar}>
              <RxCross2 size={24} />
            </button>
          </div>
          <div
            onClick={handleAccount}
            className="border-b dark:border-[#393839]"
          >
            Account Details
          </div>
          <div
            className="border-b dark:border-[#393839]"
            onClick={() => {
              toggleDarkMode();
              closeSideBar();
            }}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      </div>
    ),
    document.getElementById('portal')
  );
}

export default ProfileMenu;
