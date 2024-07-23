import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children, close, open }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  function handleModalClick(e) {
    e.stopPropagation(); // Prevent event propagation to parent elements
    close(); // Call the close function passed via props
  }

  return (
    !loading &&
    createPortal(
      open && (
        <div
          className="z-50 fixed w-screen h-screen top-0 left-0 bg-black/80 flex justify-center items-center"
          onClick={handleModalClick}
        >
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
      ),
      document.getElementById('portal')
    )
  );
}

export default Modal;
