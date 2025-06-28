'use client';

import UploadedImagesCarousel from '@/components/features/date-detail/uploaded-images/uploaded-images-carousel';
import { useQuery } from '@tanstack/react-query';

export type Date = {
  id: number;
  address: string;
  title: string;
  content: string;
  images: string[];
  place: string;
  tags: string[];
};

interface PageProps {
  params: { id: string };
}

const DateDetail = ({ params }: PageProps) => {
  const { id } = params;

  const fetchDate = async () => {
    const response = await fetch(`http://localhost:4000/date/${id}`);
    return response.json();
  };

  const {
    data: date,
    isPending,
    isError,
  } = useQuery<Date>({
    queryKey: ['date', id],
    queryFn: fetchDate,
  });

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>오류 발생!!!</div>;

  return (
    <form className="flex flex-col justify-center items-center px-1">
      {/* 캐러셀 이미지 출력 */}
      <UploadedImagesCarousel date={date} />

      {/* 주소 출력 */}
      <section className="flex flex-col justify-center items-start w-full h-full py-3 px-5">
        <h3 className="text-skin1 text-[10px] font-semibold">주소</h3>
        <p className="text-font2 text-xs font-extralight">{date.address}</p>
      </section>

      <section>
        <p>{/* 제목 출력 */}</p>
        <p>{/* 장소 이름 출력 */}</p>
      </section>

      <section>
        <p>{/* 데이트 기록 일자 출력 */}</p>
        <p>{/* 내용 출력 */}</p>
      </section>

      {/* 태그 출력 */}
      <section>
        <p>#태그1</p>
        <p>#태그2</p>
        <p>#태그3</p>
        <p>#태그4</p>
      </section>

      <section>
        {/* 좋아요 버튼 */}
        <button>좋아요</button>
        {/* 북마크 버튼 */}
        <button>북마크</button>
        {/* 공유 버튼 */}
        <button>공유</button>
      </section>
    </form>
  );
};

export default DateDetail;
