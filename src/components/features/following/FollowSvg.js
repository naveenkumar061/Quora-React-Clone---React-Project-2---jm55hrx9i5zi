function FollowSvg({ className }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g strokeWidth="1.5" fill="none" fillRule="evenodd">
        <path d="M12 12.5A2.25 2.25 0 1 0 12 8a2.25 2.25 0 0 0 0 4.5zm3 4a3 3 0 1 0-6 0"></path>
        <path
          d="M13.5 19.5h-6a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v6m-2.5 6h5M19.5 17v5"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
}

export default FollowSvg;
