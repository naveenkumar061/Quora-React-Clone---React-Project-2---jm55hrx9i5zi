import { dataFooter } from '../../assets/footer-data/DataFooter';
import FooterList from './FooterList';

function Footer() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4 px-2 w-full bg-black/5 self-end mt-4">
      {dataFooter.map((footerItem, index) => (
        <FooterList footerItem={footerItem} key={index} />
      ))}
      <div className="text-xs dark:text-gray-400">© Quora, Inc. 2024</div>
    </div>
  );
}

export default Footer;
