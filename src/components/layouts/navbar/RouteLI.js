import { NavLink, useLocation } from 'react-router-dom';

function RouteLI({ item }) {
  const { name, path, icon, iconFilled } = item;
  const { pathname } = useLocation();

  return (
    <NavLink to={path} className="relative flex flex-col items-center group">
      {pathname === path ? iconFilled : icon}
      <span className="absolute hidden group-hover:block text-sm mt-1 transition dark:text-gray-700 bg-white px-4 py-1 top-12 border border-gray-400 rounded-full">
        {name}
      </span>
    </NavLink>
  );
}

export default RouteLI;
