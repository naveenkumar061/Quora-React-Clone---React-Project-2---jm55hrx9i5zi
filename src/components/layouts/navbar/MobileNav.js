import DDNav from './DDNav';
import TDNav from './TDNav';

function MobileNav() {
  return (
    <div className="md:hidden flex flex-col h-fit gap-4">
      <TDNav />
      <DDNav />
    </div>
  );
}

export default MobileNav;
