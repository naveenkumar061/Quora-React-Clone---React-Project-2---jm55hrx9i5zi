import Login from './Login';
import Signup from './Signup';

function AuthForm() {
  return (
    <div className="flex flex-col sm:flex-row max-w-2xl mb-6">
      <Signup />
      <Login />
    </div>
  );
}

export default AuthForm;
