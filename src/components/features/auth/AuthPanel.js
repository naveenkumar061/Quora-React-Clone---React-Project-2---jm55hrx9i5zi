import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import Footer from '../../layouts/Footer';

function AuthPanel() {
  return (
    <div className="bg-white border-[.8px] block pt-4 max-w-2xl rounded">
      <AuthHeader />
      <AuthForm />
      <Footer />
    </div>
  );
}

export default AuthPanel;
