import PostComponent from './PostComponent';

function CenterSection() {
  return (
    <div className="w-full gap-2 flex flex-col">
      <div className="mt-[54px] md:hidden"></div>
      <PostComponent />
    </div>
  );
}

export default CenterSection;
