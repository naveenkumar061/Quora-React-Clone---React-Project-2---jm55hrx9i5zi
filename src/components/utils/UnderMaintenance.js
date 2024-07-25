import maintainence from '../assets/images/maintenance.svg';

function UnderMaintenance({ children }) {
  return (
    <div className="min-h-screen w-full pb-4 bg-white dark:bg-[#181818] dark:text-[#b1b3b6]">
      <div className="w-full mt-7 md:w-9/12 px-3 mx-auto flex flex-col justify-center items-center gap-4 md:pt-4">
        <div className="text-center text-lg">
          This part of website is under maintainence
        </div>
        <div className="w-full h-full">
          <img src={maintainence} alt="maintainence" className="w-full h-96" />
        </div>
        {children}
      </div>
    </div>
  );
}

export default UnderMaintenance;
