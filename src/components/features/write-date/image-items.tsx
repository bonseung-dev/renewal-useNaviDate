import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import React from 'react';

const ImageItems = ({ imageUrls }: { imageUrls: string[] }) => {
  return (
    <>
      {imageUrls.map((url, index) => (
        <CarouselItem key={index} className="w-full h-full">
          <Card className="w-full h-full flex justify-center items-center relative">
            <CardContent>
              <Image
                src={url}
                alt={`업로드 이미지${index + 1}`}
                width={100}
                height={100}
                className="w-56 h-48 object-cover"
              />
              {/* 이미지 삭제 버튼 */}
              <button type="button">삭제</button>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </>
  );
};

export default ImageItems;
