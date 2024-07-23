import DNavbar from './DNavbar';
import MNavbar from './MNavbar';

function Navbar() {
  return (
    <div className="border-b bg-white fixed min-h-20 top-0 left-0 right-0 border-[#dee0e1] shadow-[0 3px 6px rgba(0, 0, 0, .04)] z-10 dark:border-[rgb(17,17,17)] dark:bg-[#262626] md:min-h-fit">
      <MNavbar />
      <DNavbar />
    </div>
  );
}

export default Navbar;
