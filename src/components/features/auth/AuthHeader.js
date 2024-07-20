import QuoraLogo from '../../assets/logos/QuoraLogo';

function AuthHeader() {
  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <QuoraLogo width="200px" height="100px" />
      <p className="text-[#636466] font-bold dark:text-[#E6E7E8]">
        A place to share knowledge and better understand the world
      </p>
    </div>
  );
}

export default AuthHeader;
