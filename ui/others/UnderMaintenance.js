import maintainence from '../assets/images/maintenance.svg';

function UnderMaintenance({ children }) {
  return (
    <div className="pt-[88px] md:pt-14 min-h-screen w-full pb-4">
      <div className="w-full mt-7 md:w-9/12 px-3 mx-auto flex flex-col justify-center items-center gap-4 md:pt-4">
        <div className="text-center text-lg">
          This part of website is under maintainence
        </div>
        <div className="w-full h-screen">
          <img src={maintainence} alt="maintainence" className="h-3/4 w-full" />
        </div>
        {children}
      </div>
    </div>
  );
}

export default UnderMaintenance;
