import React from 'react';
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';

function Dropdown({ closeDropdown, type }) {
  return (
    <div className="absolute z-10 right-0 mt-2 pb-2 bg-white border border-gray-200 rounded shadow-lg">
      <ul>
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-1"
          onClick={closeDropdown}
        >
          <MdOutlineModeEdit />
          Edit {type}
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between gap-1"
          onClick={closeDropdown}
        >
          <MdDelete className="fill-red-700" />
          Delete {type}
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
