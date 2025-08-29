import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImageService } from '../api/services';
import { getClientAuthToken } from '../utils/api';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

/**
 * 이미지 업로드
 */
export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      // 토큰이 있으면 사용하고, 없으면 인증 없이 업로드
      const token = getClientAuthToken() ?? undefined;

      const response = await ImageService.uploadImage(file, token);
      if (!response.success) {
        throw new Error(response.message || '이미지 업로드에 실패했습니다.');
      }

      return response.data;
    },
    onSuccess: () => {
      // 이미지 업로드 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WRITE_IMAGES] });
    },
  });
};

/**
 * 이미지 삭제
 */
export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      // 토큰이 있으면 사용하고, 없으면 인증 없이 삭제
      const token = getClientAuthToken() ?? undefined;

      const response = await ImageService.deleteImage(id, token);
      if (!response.success) {
        throw new Error(response.message || '이미지 삭제에 실패했습니다.');
      }

      return response.data;
    },
    onSuccess: () => {
      // 이미지 삭제 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WRITE_IMAGES] });
    },
  });
};
