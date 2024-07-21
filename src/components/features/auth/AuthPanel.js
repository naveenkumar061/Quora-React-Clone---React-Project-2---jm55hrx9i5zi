import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import Footer from '../../layouts/Footer';

function AuthPanel() {
  return (
    <div className="bg-white block pt-4 max-w-2xl rounded dark:bg-neutral-800">
      <AuthHeader />
      <AuthForm />
      <Footer />
    </div>
  );
}

export default AuthPanel;
