import useCreateTagMutation, {
  useDeleteTagMutation,
} from '@/lib/mutations/tag.mutataion';
import { PostTag } from '@use-navi-date/shared';
import { XIcon } from 'lucide-react';

const WriteTag = ({
  tags,
  setTags,
  inputValue,
  setInputValue,
}: {
  tags: PostTag[];
  setTags: React.Dispatch<React.SetStateAction<PostTag[]>>;
  inputValue: PostTag['name'];
  setInputValue: (inputValue: PostTag['name']) => void;
}) => {
  const createTagMutation = useCreateTagMutation();
  const deleteTagMutation = useDeleteTagMutation();

  const deleteTag = (id: number) => {
    deleteTagMutation.mutate(id);
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const addTag = async () => {
    const tag = await createTagMutation.mutateAsync({
      id: 1,
      postId: 1,
      name: inputValue,
    });
    console.log(tag);
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    const isDuplicate = tags.some(
      (tag) => tag.name.toLowerCase() === trimmedValue.toLowerCase(),
    );
    if (isDuplicate) {
      alert('이미 존재하는 태그입니다.');
      return;
    }

    const newTag: PostTag = {
      id: 1,
      postId: 1,
      name: inputValue,
      createdAt: new Date(),
    };

    setTags((prevTags: PostTag[]) => [...prevTags, newTag]);
    setInputValue('');
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
      <input
        type="text"
        placeholder="#태그입력"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-14 h-6 bg-skin2 rounded-[50px] text-[10px] text-center text-skin5 font-extralight placeholder:text-center placeholder:text-skin5"
      />
    </section>
  );
};

export default WriteTag;
