'use client';

import Divider from '@/components/features/write-date/divider';
import PostVisibility from '@/components/features/write-date/post-visibility/post-visibility';
import SearchAddress from '@/components/features/write-date/search-address/search-address';
import SelectEmotion from '@/components/features/write-date/select_emotion';
import SubmitPost from '@/components/features/write-date/submit-post/submit-post';
import WriteTag from '@/components/features/write-date/write-tag';
import UploadImageCarousel from '@/components/features/write-date/upload-image-carousel';
import WriteContent from '@/components/features/write-date/write-content';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Date } from '../date-detail/[dateId]/page';

const WriteDate = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [emotion, setEmotion] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const queryClient = useQueryClient();

  const addDate = async (newDate: Date) => {
    await fetch('http://localhost:4000/dates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDate),
    });
  };

  const { mutate } = useMutation({
    mutationFn: addDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['date'] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDate = {
      images: imageUrls,
      visibility,
      address: '서울특별시 송파구 잠실 어쩌구 56-1',
      emotion,
      date: '2025-01-01',
      title,
      content,
      tags,
    };

    mutate(newDate);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center px-1"
    >
      {/* 캐러셀 이미지 업로드 */}
      <UploadImageCarousel imageUrls={imageUrls} setImageUrls={setImageUrls} />

      {/* 게시글 공개 여부 */}
      <PostVisibility visibility={visibility} setVisibility={setVisibility} />

      {/* 주소 검색 */}
      <SearchAddress />

      {/* 기분 선택 */}
      <SelectEmotion emotion={emotion} setEmotion={setEmotion} />

      {/* 구분선 */}
      <Divider />

      {/* 내용 입력 */}
      <WriteContent
        content={content}
        setContent={setContent}
        title={title}
        setTitle={setTitle}
      />

      {/* 구분선 */}
      <Divider />

      {/* 태그 입력 */}
      <WriteTag
        tags={tags}
        setTags={setTags}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      {/* 게시글 등록 */}
      <SubmitPost />
    </form>
  );
};

export default WriteDate;
