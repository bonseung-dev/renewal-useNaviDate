'use client';

import UploadedImagesCarousel from '@/components/features/date-detail/uploaded-images/uploaded-images-carousel';
import Divider from '@/components/features/write-date/divider';
import PlaceName from '@/components/features/date-detail/place-name';
import SearchedAddress from '@/components/features/date-detail/searched-address';
import WrittenContent from '@/components/features/date-detail/written-content';
import WrittenTags from '@/components/features/date-detail/written-tags';
import { useQuery } from '@tanstack/react-query';
import Buttons from '@/components/features/date-detail/buttons/buttons';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { Post, PostImage, PostTag } from '@/types/post.type';
import {
  fetchImages,
  fetchPost,
  fetchTags,
} from '@/lib/services/date-detail.services';

type PageProps = {
  params: { postId: string };
};

const DateDetail = ({ params }: PageProps) => {
  const { postId } = params;

  const {
    data: post,
    isPending,
    isError,
  } = useQuery<Post>({
    queryKey: [QUERY_KEYS.WRITE_POSTS, postId],
    queryFn: () => fetchPost(postId),
  });

  const { data: images } = useQuery<PostImage[]>({
    queryKey: [QUERY_KEYS.WRITE_IMAGES, postId],
    queryFn: () => fetchImages(postId),
  });

  const { data: tags } = useQuery<PostTag[]>({
    queryKey: [QUERY_KEYS.WRITE_TAGS, postId],
    queryFn: () => fetchTags(postId),
  });

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>오류 발생!!!</div>;

  return (
    <div className="flex flex-col justify-center items-center px-1">
      {/* 캐러셀 이미지 출력 */}
      {images && <UploadedImagesCarousel images={images} />}

      {/* 주소 출력 */}
      {images && <SearchedAddress images={images} />}

      {/* 구분선 */}
      <Divider />

      {/* 장소 이름 출력 */}
      <PlaceName post={post} />

      {/* 구분선 */}
      <Divider />

      {/* 게시글 제목 및 내용 출력 */}
      <WrittenContent post={post} />

      {/* 구분선 */}
      <Divider />

      {/* 태그 출력 */}
      {tags && <WrittenTags tags={tags} />}

      {/* 좋아요, 북마크, 공유 버튼 */}
      <Buttons post={post} />
    </div>
  );
};

export default DateDetail;
