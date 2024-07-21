import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

function Navbar() {
  return (
    <div className="border-b bg-white fixed top-0 left-0 right-0 border-[#dee0e1] shadow-[0 3px 6px rgba(0, 0, 0, .04)] z-10 dark:border-[rgb(17,17,17)] dark:bg-[#262626] dark:text-[rgb(213,214,214)]">
      <MobileNav />
      <DesktopNav />
    </div>
  );
}

export default Navbar;
