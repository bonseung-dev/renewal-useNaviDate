import { CommunityPost } from '@use-navi-date/shared';
import Image from 'next/image';

type PostImageProps = {
  images: CommunityPost['images'];
  title: string;
};

const PostImage = ({ images, title }: PostImageProps) => {
  if (images.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-font4">
        <span className="text-font5">이미지가 없습니다</span>
      </div>
    );
  }

  const representativeImage = images.find((image) => image.isRepresentative);
  const displayImage = representativeImage || images[0];

  return (
    <>
      <Image
        src={displayImage.postImage?.url || ''}
        alt={`"${title}" 포스트의 대표 이미지`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
    </>
  );
};

export default PostImage;
