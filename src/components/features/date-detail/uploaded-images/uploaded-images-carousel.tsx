import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import UploadedImageItems from './uploaded-image-items';
import { Date } from '@/app/(routes)/date-detail/[id]/page';

export type UploadedImagesCarouselProps = {
  date: Date;
};

const UploadedImagesCarousel = ({ date }: UploadedImagesCarouselProps) => {
  return (
    <section className="flex justify-center items-center w-80 h-44 rounded-[10px] border border-skin3">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="w-44 h-44">
          <UploadedImageItems date={date} />
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default UploadedImagesCarousel;
