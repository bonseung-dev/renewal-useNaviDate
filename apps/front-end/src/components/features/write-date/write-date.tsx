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
import { Emotion, Image, Post, PostTag } from '@use-navi-date/shared';
import {
  useCreatePostImagesMutation,
  useCreatePostMutation,
  useCreatePostTagsMutation,
} from '@/lib/mutations/write-date.mutation';

const WriteDate = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [visibility, setVisibility] = useState<Post['visibility']>('private');
  const [emotion, setEmotion] = useState<Emotion>('Soso');
  const [title, setTitle] = useState<Post['title']>('');
  const [content, setContent] = useState<Post['content']>('');
  const [tags, setTags] = useState<PostTag[]>([]);
  const [inputValue, setInputValue] = useState<PostTag['name']>('');

  const resetForm = () => {
    setVisibility('private');
    setEmotion('Soso');
    setTitle('');
    setContent('');
    setInputValue('');
    setImages([]);
    setTags([]);
  };

  const { mutate: createPostMutate } = useCreatePostMutation(resetForm);
  const { mutate: createImageMutate } = useCreatePostImagesMutation();
  const { mutate: createTagMutate } = useCreatePostTagsMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost: Post = {
      id: '1', //임시 postId
      userId: '2', //임시 userId
      visibility,
      emotion,
      date: '2025-01-01',
      title,
      content,
      createdAt: new Date().toISOString(),
      deletedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    createPostMutate(newPost);
    images.forEach((image) => {
      createImageMutate({
        id: '3', //임시 postImageId
        postId: newPost.id,
        imageUrl: image.url,
        address: '서울특별시 송파구 잠실 어쩌구 56-1',
        isRepresentative: true,
      });
    });
    tags.forEach((tag) => {
      createTagMutate({
        id: '4', //임시 tagId
        postId: newPost.id,
        name: tag.name,
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
