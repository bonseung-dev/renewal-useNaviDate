import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import UploadedImageItems from './uploaded-image-items';
import { PostImage } from '@/types/post.type';

const UploadedImagesCarousel = ({ images }: { images: PostImage[] }) => {
  return (
    <section className="flex justify-center items-center w-80 h-44 rounded-[10px] border border-skin3">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="w-44 h-44">
          <UploadedImageItems images={images} />
        </CarouselContent>
        <CarouselPrevious type="button" />
        <CarouselNext type="button" />
      </Carousel>
    </section>
  );
};

export default UploadedImagesCarousel;
