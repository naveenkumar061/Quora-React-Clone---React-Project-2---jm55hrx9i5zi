import AuthPanel from '../features/auth/AuthPanel';
import welcome from '../assets/images/welome.webp';

function Welcome() {
  return (
    <div
      className="h-screen w-screen bg-no-repeat bg-cover bg-center flex items-center justify-center box-border text-sm text-[#282829] dark:text-[#D5D6D6]"
      style={{ backgroundImage: `url(${welcome})` }}
    >
      <AuthPanel />
    </div>
  );
}

export default Welcome;
