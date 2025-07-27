import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { PostImage } from '@/types/post.type';
import NextImage from 'next/image';
import React from 'react';

const ImageItems = ({
  images,
  setImages,
}: {
  images: PostImage[];
  setImages: (images: PostImage[]) => void;
}) => {
  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <>
      {images.map((image, index) => (
        <CarouselItem key={image.id + index} className="w-44 h-44">
          <Card className="w-full h-full flex justify-center items-center rounded-none">
            <CardContent className="w-full h-full p-0">
              <NextImage
                src={image.imageUrl}
                alt={`업로드 이미지`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => deleteImage(index)}
                className="absolute top-1 right-1 text-font4"
              >
                삭제
              </button>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </>
  );
};

export default ImageItems;
