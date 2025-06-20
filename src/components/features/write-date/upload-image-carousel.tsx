import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import React from 'react';
import ImageItems from './image-items';

const UploadImageCarousel = ({
  imageUrls,
  setImageUrls,
}: {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // 새로 추가된 파일만 URL 생성
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  return (
    <section className="flex justify-center items-center">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="w-40 h-24">
          <ImageItems imageUrls={imageUrls} />
          <CarouselItem className="w-full h-full">
            <Card className="w-full h-full flex justify-center items-center">
              <CardContent className="w-full h-full flex justify-center items-center">
                <label
                  htmlFor="image-upload"
                  className="flex justify-center items-center font-bold text-4xl w-full h-full cursor-pointer"
                >
                  +
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default UploadImageCarousel;
