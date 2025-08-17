import { Anniversary } from '@use-navi-date/shared';
import { useState } from 'react';

export const useAnniversaryActions = (
  updateAnniversary: (data: Anniversary) => Promise<Anniversary>,
  deleteAnniversary: (id: number) => Promise<void>,
) => {
  const [editingAnniversary, setEditingAnniversary] =
    useState<Anniversary | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleEdit = (id: number, anniversaries: Anniversary[]) => {
    const anniversaryToEdit = anniversaries.find((a) => a.id === id);
    setEditingAnniversary(anniversaryToEdit || null);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAnniversary(id);
    } catch (error) {
      console.error('Error deleting anniversary:', error);
      alert('기념일 삭제에 실패했습니다.');
    }
  };

  const handleUpdate = async (data: Anniversary) => {
    try {
      await updateAnniversary(data);
      setIsEditorOpen(false);
      setEditingAnniversary(null);
    } catch (error) {
      console.error('Error updating anniversary:', error);
      alert('기념일 수정에 실패했습니다.');
    }
  };

  const handleAddClick = () => {
    setEditingAnniversary(null);
    setIsEditorOpen(true);
  };

  const handleSubmitSuccess = () => {
    setIsEditorOpen(false);
    setEditingAnniversary(null);
  };

  return {
    editingAnniversary,
    isEditorOpen,
    setIsEditorOpen,
    handleEdit,
    handleDelete,
    handleUpdate,
    handleAddClick,
    handleSubmitSuccess,
  };
};
