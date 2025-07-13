import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ImageItems from './image-items';
import { Image } from '@/types/image.type';

const UploadImageCarousel = ({
  images,
  setImages,
}: {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const imageFiles = Array.from(files).map((file) => ({
        id: 1, // 임시 Id
        filename: file.name,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path: file.webkitRelativePath || '',
        url: URL.createObjectURL(file),
        userId: 2, // 임시 Id
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      setImages((prev) => [...prev, ...imageFiles]);
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
