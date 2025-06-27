import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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
    <section className="flex justify-center items-center w-80 h-[179px] rounded-[10px] border border-skin3">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className=""
      >
        <CarouselContent>
          <ImageItems imageUrls={imageUrls} />
          <CarouselItem>
            <Card className="w-44 h-44 bg-font5 rounded-none">
              <CardContent className="w-full h-full flex justify-center items-center p-0">
                <label htmlFor="image-upload" className="text-3xl text-skin5">
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
