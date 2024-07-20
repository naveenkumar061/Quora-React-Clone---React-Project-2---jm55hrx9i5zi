import AuthPanel from '../features/auth/AuthPanel';
import welcome from '../images/welome.webp';

function Welcome() {
  return (
    <div
      className="h-screen w-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${welcome})` }}
    >
      <AuthPanel />
    </div>
  );
}

export default Welcome;
