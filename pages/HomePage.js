import Home from '../features/home/Home';

function HomePage() {
  return (
    <div className="border-t border-gray-300 hover:border-gray-500 transition duration-300 ease-in-out dark:bg-[#171717] dark:text-white bg-black/5">
      <div className="mt-6"></div>
      <Home />
    </div>
  );
}

export default HomePage;
