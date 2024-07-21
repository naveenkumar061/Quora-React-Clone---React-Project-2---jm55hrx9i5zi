import { dataNavs } from '../../assets/data/navData';
import RouteLI from './RouteLI';

function DDNav() {
  return (
    <div className="flex pb-4 px-4 justify-between">
      {dataNavs.map((item, index) => (
        <RouteLI item={item} key={index} />
      ))}
    </div>
  );
}

export default DDNav;
