function FooterList({ footerItem }) {
  const { name, href } = footerItem;

  return (
    <div className="flex items-center gap-1">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline hover:underline dark:text-gray-400"
      >
        <div className="text-xs text-gray-600 dark:text-gray-400">{name}</div>
      </a>
      <div className="bg-gray-600 w-px h-px rounded-full dark:bg-gray-400" />
    </div>
  );
}

export default FooterList;
