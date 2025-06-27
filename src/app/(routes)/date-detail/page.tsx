import UploadedImagesCarousel from '@/components/features/date-detail/uploaded-images/uploaded-images-carousel';

const DateDetail = () => {
  return (
    <form className="flex flex-col justify-center items-center px-1">
      {/* 캐러셀 이미지 출력 */}
      <UploadedImagesCarousel />

      <section>
        <p>{/* 주소 출력 */}</p>
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
