import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import { CalendarPost } from '@/types/post.type';

const UploadedImageItems = ({ date }: { date: CalendarPost }) => {
  return (
    <>
      {date.images.map((image, index) => (
        <CarouselItem key={image.id} className="w-full h-full">
          <Card className="w-full h-full">
            <CardContent className="w-full h-full p-0">
              <Image
                src={image.imageUrl}
                alt={`업로드 이미지${index + 1}`}
                width={100}
                height={100}
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
