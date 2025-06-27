import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';

const uploadedImages = [
  '/emotions/emotion_angry.png',
  '/emotions/emotion_sad.png',
];

const UploadedImageItems = () => {
  return (
    <>
      {uploadedImages.map((image, index) => (
        <CarouselItem key={index} className="w-full h-full">
          <Card className="w-full h-full">
            <CardContent className="w-full h-full p-0">
              <Image
                src={image}
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
