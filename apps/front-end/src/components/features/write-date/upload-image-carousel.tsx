import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ImageItems from './image-items';
import { PostImage } from '@/types/post.type';

const UploadImageCarousel = ({
  images,
  setImages,
}: {
  images: PostImage[];
  setImages: (images: PostImage[]) => void;
}) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const imageFiles = Array.from(files).map((file) => ({
        id: 'aaa', // 임시 Id
        postId: 'bbb', // 임시 Id
        imageUrl: URL.createObjectURL(file),
        address: '서울특별시 송파구 잠실 어쩌구 56-1',
        isRepresentative: true,
      }));
      setImages([...images, ...imageFiles]);
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
                <label className="text-3xl text-skin5">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
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
