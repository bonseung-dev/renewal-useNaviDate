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
import { Emotion, Post } from '@/types/post.type';
import { Image } from '@/types/image.type';
import {
  useCreatePostImagesMutation,
  useCreatePostMutation,
  useCreatePostTagsMutation,
} from '@/lib/mutations/write-date.mutation';

const WriteDate = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [emotion, setEmotion] = useState<Emotion>('Soso');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tag, setTag] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const resetForm = () => {
    setVisibility(false);
    setEmotion('Soso');
    setTitle('');
    setContent('');
    setInputValue('');
    setImages([]);
    setTag([]);
  };

  const { mutate: createPostMutate } = useCreatePostMutation(resetForm);
  const { mutate: createImageMutate } = useCreatePostImagesMutation();
  const { mutate: createTagMutate } = useCreatePostTagsMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost: Post = {
      id: 1, //임시 postId
      userId: 2, //임시 userId
      visibility,
      emotion,
      date: '2025-01-01',
      title,
      content,
      createdAt: new Date(),
      deletedAt: null,
    };

    createPostMutate(newPost);
    images.forEach((image) => {
      createImageMutate({
        id: 3, //임시 postImageId
        postId: newPost.id,
        postImage: image,
        address: '서울특별시 송파구 잠실 어쩌구 56-1',
        isRepresentative: true,
      });
    });
    tag.forEach((tag) => {
      createTagMutate({
        id: 4, //임시 tagId
        postId: newPost.id,
        name: tag,
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center px-1"
    >
      {/* 캐러셀 이미지 업로드 */}
      <UploadImageCarousel images={images} setImages={setImages} />

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
        tag={tag}
        setTag={setTag}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      {/* 게시글 등록 */}
      <SubmitPost />
    </form>
  );
};

export default WriteDate;
