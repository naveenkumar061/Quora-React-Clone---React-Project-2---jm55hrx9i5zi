function Loader() {
  return (
    <div className="flex flex-col gap-1 mt-1 animate-pulse">
      <div className="flex gap-2 items-center">
        <div className="h-8 w-8 relative flex-shrink-0 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
        <div className="flex flex-col sm:flex-row gap-2 flex-grow sm:items-center">
          <div className="w-full h-6 mx-2 rounded-full border dark:border-[#393839] flex-grow bg-slate-300 dark:bg-[#1b1b1b]"></div>
          <div className="hidden sm:block w-20 h-6 flex-shrink-0 sm:flex-grow-0 font-semibold mx-3 my-2 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <div key={i} className="flex gap-2 my-1 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
            <div className="flex flex-col flex-grow gap-2">
              <div className="w-8/12 h-4 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
              <div className="w-full h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
              <div className="w-full h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
              <div className="w-7/12 h-3 rounded-full bg-slate-300 dark:bg-[#1b1b1b]"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Loader;
