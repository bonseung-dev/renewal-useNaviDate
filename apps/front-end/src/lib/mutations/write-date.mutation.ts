import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path';
import {
  createImage,
  createPost,
  createTag,
} from '../services/write-date.services';

export const useCreatePostMutation = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WRITE_POSTS] });
      resetForm();
      alert('게시글이 성공적으로 등록되었습니다!');
      router.push(PATH.COMMUNITY);
    },
    onError: (error) => {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export const useCreatePostImagesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WRITE_IMAGES] });
    },
  });
};

export const useCreatePostTagsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WRITE_TAGS] });
    },
  });
};
