'use client';

import UploadedImagesCarousel from '@/components/features/date-detail/uploaded-images/uploaded-images-carousel';
import Divider from '@/components/features/write-date/divider';
import PlaceName from '@/components/features/write-date/place-name';
import SearchedAddress from '@/components/features/write-date/searched-address';
import WrittenContent from '@/components/features/write-date/written-content';
import WrittenTags from '@/components/features/write-date/written-tags';
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
      <SearchedAddress date={date} />

      {/* 구분선 */}
      <Divider />

      {/* 장소 이름 출력 */}
      <PlaceName date={date} />

      {/* 구분선 */}
      <Divider />

      {/* 게시글 제목 및 내용 출력 */}
      <WrittenContent date={date} />

      {/* 구분선 */}
      <Divider />

      {/* 태그 출력 */}
      <WrittenTags date={date} />

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
