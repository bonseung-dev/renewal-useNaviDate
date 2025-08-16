import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { PostImage } from '@/types/post.type';
import NextImage from 'next/image';
import React from 'react';
import { useDeleteImage } from '@/lib/queries/imageQueries';
import { useState } from 'react';

const ImageItems = ({
  images,
  setImages,
}: {
  images: PostImage[];
  setImages: (images: PostImage[]) => void;
}) => {
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const deleteImageMutation = useDeleteImage();

  const deleteImage = async (id: number) => {
    setDeletingIds(prev => new Set([...Array.from(prev), id]));
    
    try {
      await deleteImageMutation.mutateAsync(id);
      // 로컬 상태에서 이미지 제거
      setImages(images.filter(img => img.id !== id));
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
      // 에러 처리 (사용자에게 알림 등)
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(Array.from(prev));
        newSet.delete(id);
        return newSet;
      });
    }
  };

  return (
    <>
      {images.map((image, index) => (
        <CarouselItem key={image.id + index} className="w-44 h-44">
          <Card className="w-full h-full flex justify-center items-center rounded-none relative">
            <CardContent className="w-full h-full p-0">
              <NextImage
                src={image.postImage.url}
                alt={`업로드 이미지`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => deleteImage(image.id)}
                disabled={deletingIds.has(image.id)}
                className="absolute top-4 right-4 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="이미지 삭제"
              >
                {deletingIds.has(image.id) ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  '×'
                )}
              </button>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </>
  );
};

export default ImageItems;
