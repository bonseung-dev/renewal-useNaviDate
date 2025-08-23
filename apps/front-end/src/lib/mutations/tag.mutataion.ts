import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TagService } from '../api/services';
import { getClientAuthToken } from '../utils/api';
import { Tag } from '@use-navi-date/shared';

const useCreateTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tag: Tag) => {
      const token = getClientAuthToken() || '';

      const response = await TagService.addTag(tag, token);
      if (!response.success) {
        throw new Error(response.message || '이미지 업로드에 실패했습니다.');
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};

export default useCreateTagMutation;

export const useDeleteTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const token = getClientAuthToken() || '';
      const response = await TagService.deleteTag(id, token);
      if (!response.success) {
        throw new Error(response.message || '태그 삭제에 실패했습니다.');
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};
