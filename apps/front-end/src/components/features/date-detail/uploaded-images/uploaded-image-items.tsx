import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { PostImage } from '@use-navi-date/shared';
import Image from 'next/image';

const UploadedImageItems = ({ images }: { images: PostImage[] }) => {
  return (
    <>
      {images.map((image, index) => (
        <CarouselItem key={image.id + index} className="w-full h-full">
          <Card className="w-full h-full">
            <CardContent className="w-full h-full p-0">
              <Image
                src={image.imageUrl}
                alt={`${index + 1}번째 이미지`}
                width={100}
                height={100}
                priority
                className="w-full h-full object-cover"
              />
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </>
  );
};

export default UploadedImageItems;
