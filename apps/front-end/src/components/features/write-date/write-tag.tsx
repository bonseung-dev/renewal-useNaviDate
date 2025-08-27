import useCreateTagMutation, {
  useDeleteTagMutation,
} from '@/lib/mutations/tag.mutation';
import { PostTag, Tag } from '@use-navi-date/shared';
import { XIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';

const WriteTag = ({
  tags,
  setTags,
  inputValue,
  setInputValue,
}: {
  tags: PostTag[];
  setTags: React.Dispatch<React.SetStateAction<PostTag[]>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [uploadingTags, setUploadingTags] = useState<Set<string>>(new Set());
  const createTagMutation = useCreateTagMutation();
  const deleteTagMutation = useDeleteTagMutation();

  const deleteTag = (id: number) => {
    deleteTagMutation.mutate(id);
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const addTag = async () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    // 중복 검사를 먼저 수행
    const isDuplicate = tags.some(
      (tag) => tag.name.toLowerCase() === trimmedValue.toLowerCase(),
    );
    if (isDuplicate) {
      alert('이미 존재하는 태그입니다.');
      return;
    }

    // 업로드 중인 태그를 추적
    setUploadingTags((prev) => new Set([...Array.from(prev), trimmedValue]));

    try {
      // Tag 타입에 맞게 content 필드 사용
      const tagData: Tag = {
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: trimmedValue,
        posts: [],
      };

      const response = await createTagMutation.mutateAsync(tagData);

      if (response?.tag) {
        // API 응답에서 받은 태그 정보로 PostTag 생성
        const newTag: PostTag = {
          id: response.tag.id,
          postId: 0, // 실제 postId는 포스트 생성 후 설정 필요
          name: response.tag.name,
          createdAt: response.tag.createdAt,
        };

        setTags((prevTags: PostTag[]) => [...prevTags, newTag]);
        setInputValue('');
      }
    } catch (error) {
      console.error('태그 생성 실패:', error);
      alert('태그 생성에 실패했습니다.');
    } finally {
      // 업로드 완료된 태그를 추적에서 제거
      setUploadingTags((prev) => {
        const newSet = new Set(Array.from(prev));
        newSet.delete(trimmedValue);
        return newSet;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <section className="flex justify-between items-center gap-1 my-3">
      {tags.map((tag) => (
        <div key={tag.id} className="flex justify-center items-center gap-1">
          <div className="flex items-center justify-center w-auto min-w-14 h-6 px-1 rounded-[50px] border border-skin1 text-skin1 text-[10px] font-extralight overflow-hidden">
            #{tag.name}
          </div>
          <button type="button" onClick={() => deleteTag(tag.id)}>
            <XIcon size={12} />
          </button>
        </div>
      ))}

      {/* 태그 입력 영역 */}
      <div className="flex items-center gap-1">
        <input
          type="text"
          placeholder="#태그입력"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-14 h-6 bg-skin2 rounded-[50px] text-[10px] text-center text-skin5 font-extralight placeholder:text-center placeholder:text-skin5"
          disabled={uploadingTags.size > 0}
        />

        {/* 업로드 중 표시 */}
        {uploadingTags.size > 0 && (
          <div className="flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin text-skin4" />
            <span className="text-xs text-skin4">업로드 중...</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default WriteTag;
