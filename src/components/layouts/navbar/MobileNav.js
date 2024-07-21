import DDNav from './DDNav';
import TDNav from './TDNav';

function MobileNav() {
  return (
    <div className="md:hidden flex flex-col h-full max-h-20 gap-4 p-2">
      <TDNav />
      <DDNav />
    </div>
  );
}

export default MobileNav;
