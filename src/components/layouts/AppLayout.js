import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';

function AppLayout() {
  return (
    <div>
      <Navbar />
      <div className="mt-32 md:mt-20"></div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
