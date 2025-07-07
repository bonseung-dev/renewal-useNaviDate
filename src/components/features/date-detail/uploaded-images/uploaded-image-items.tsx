import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import { Date } from '@/app/(routes)/date-detail/[dateId]/page';

const UploadedImageItems = ({ date }: { date: Date }) => {
  return (
    <>
      {date.images.map((image, index) => (
        <CarouselItem key={image} className="w-full h-full">
          <Card className="w-full h-full">
            <CardContent className="w-full h-full p-0">
              <Image
                src={image}
                alt={`업로드 이미지${image[index]}`}
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
