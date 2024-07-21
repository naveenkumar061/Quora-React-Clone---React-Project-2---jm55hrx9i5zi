import { useState } from 'react';
import Facebook from '../../assets/logos/Facebook';
import Google from '../../assets/logos/Google';
import SignupForm from './SignupForm';

function Signup() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="block px-6 w-full sm:w-1/2 sm:border-r border-[#DEE0E1] dark:border-[#393839]">
      <p className="py-2">
        By continuing you indicate that you agree to Quora’s Terms of Service
        and Privacy Policy.
      </p>
      <div className="mb-2 pb-2 pt-4">
        <Google />
        <Facebook />
        <div
          onClick={() => setShowSignUp(true)}
          className="dark:border-[#393839] dark:hover:bg-[rgba(255,255,255,.04)] dark:hover:border-white cursor-pointer border-[#DEE0E1] border dark:bg-[#181818] rounded mb-4 hover:bg-[rgba(0,0,0,0.03)] text-center p-1"
        >
          Sign up with email
        </div>
      </div>
      {showSignUp && <SignupForm show={showSignUp} setShow={setShowSignUp} />}
    </div>
  );
}

export default Signup;
