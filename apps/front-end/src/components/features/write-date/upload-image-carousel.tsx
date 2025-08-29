import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ImageItems from './image-items';
import { PostImage } from '@use-navi-date/shared';
import { useUploadImage } from '@/lib/mutations/image.mutation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const UploadImageCarousel = ({
  images,
  setImages,
}: {
  images: PostImage[];
  setImages: (images: PostImage[]) => void;
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const uploadImageMutation = useUploadImage();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileArray = Array.from(files);

      // 파일 크기 검증 (50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB
      const oversizedFiles = fileArray.filter((file) => file.size > maxSize);

      if (oversizedFiles.length > 0) {
        alert(
          `다음 파일들이 너무 큽니다 (최대 50MB): ${oversizedFiles.map((f) => f.name).join(', ')}`,
        );
        return;
      }

      // 업로드 중인 파일들을 추적
      const fileNames = fileArray.map((file) => file.name);
      setUploadingFiles((prev) => new Set([...Array.from(prev), ...fileNames]));

      try {
        // 각 파일을 백엔드에 업로드
        const uploadPromises = fileArray.map(async (file) => {
          const uploadedImage = await uploadImageMutation.mutateAsync(file);

          if (!uploadedImage) {
            throw new Error('이미지 업로드에 실패했습니다.');
          }

          // PostImage 형태로 변환
          const postImage: PostImage = {
            id: uploadedImage.id,
            postId: 0, // 포스트 생성 시 설정
            createdAt: uploadedImage.createdAt || new Date(),
            updatedAt: uploadedImage.updatedAt || new Date(),
            postImage: {
              id: uploadedImage.id,
              filename: uploadedImage.filename,
              originalName: uploadedImage.originalName,
              mimeType: uploadedImage.mimeType,
              size: uploadedImage.size,
              path: uploadedImage.path,
              url: `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}${uploadedImage.url}`,
              userId: uploadedImage.userId,
              createdAt: uploadedImage.createdAt || new Date(),
              updatedAt: uploadedImage.updatedAt || new Date(),
            },
            address: '서울특별시 송파구 잠실 어쩌구 56-1',
            isRepresentative: true,
          };

          return postImage;
        });

        const uploadedImages = await Promise.all(uploadPromises);
        setImages([...images, ...uploadedImages]);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        // 에러 처리 (사용자에게 알림 등)
      } finally {
        // 업로드 완료된 파일들을 추적에서 제거
        setUploadingFiles((prev) => {
          const newSet = new Set(Array.from(prev));
          fileNames.forEach((name) => newSet.delete(name));
          return newSet;
        });
      }
    }
  };

  return (
    <section className="flex justify-center items-center w-80 h-44 rounded-[10px] border border-skin3">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-44 h-44"
      >
        <CarouselContent>
          <ImageItems images={images} setImages={setImages} />
          <CarouselItem>
            <Card className="w-44 h-44 bg-font5 rounded-none">
              <CardContent className="w-full h-full flex justify-center items-center p-0">
                <label className="text-3xl text-skin5 cursor-pointer hover:text-skin4 transition-colors">
                  {uploadingFiles.size > 0 ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-sm">업로드 중...</span>
                    </div>
                  ) : (
                    '+'
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingFiles.size > 0}
                  />
                </label>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious type="button" />
        <CarouselNext type="button" />
      </Carousel>
    </section>
  );
};

export default UploadImageCarousel;
