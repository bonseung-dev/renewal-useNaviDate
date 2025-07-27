import { PostImage } from '@/types/post.type';

const SearchedAddress = ({ images }: { images: PostImage[] }) => {
  return (
    <section className="flex flex-col justify-center items-start w-full h-full py-3 px-5 gap-1">
      <h3 className="text-skin1 text-[10px] font-semibold">주소</h3>
      {images.map((image) => (
        <p key={image.id} className="text-font2 text-xs font-extralight">
          {image.address}
        </p>
      ))}
    </section>
  );
};

export default SearchedAddress;
