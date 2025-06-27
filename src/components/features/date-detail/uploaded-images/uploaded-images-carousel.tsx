import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import UploadedImageItems from './uploaded-image-items';

const UploadedImagesCarousel = () => {
  return (
    <section className="flex justify-center items-center w-80 h-44 rounded-[10px] border border-skin3">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="w-44 h-44">
          <UploadedImageItems />
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default UploadedImagesCarousel;
