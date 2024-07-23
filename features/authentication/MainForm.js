import Footer from '../../ui/Footer';
import Header from './Header';
import LoginForm from './LoginForm';
import Policies from './Policies';

function MainForm() {
  return (
    <div className="flex flex-col rounded bg-white dark:bg-[#262626] md:w-[45%] justify-between">
      <Header />
      <div className="w-full flex flex-col gap-4 sm:flex-row sm:gap-0">
        <Policies />
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export default MainForm;
