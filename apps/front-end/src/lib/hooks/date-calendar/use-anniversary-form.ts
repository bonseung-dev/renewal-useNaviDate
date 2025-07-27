import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Anniversary, RepeatOption } from '@/types/anniversary.type';

export const useAnniversaryForm = (
  editingAnniversary: Anniversary | null | undefined,
  repeat: RepeatOption,
  onRepeatChange: (value: RepeatOption) => void,
) => {
  const today = dayjs();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(today.year());
  const [month, setMonth] = useState(today.month() + 1);
  const [day, setDay] = useState(today.date());

  useEffect(() => {
    if (editingAnniversary) {
      setTitle(editingAnniversary.title || '');
      const dateObj = dayjs(editingAnniversary.date);
      if (dateObj.isValid()) {
        setYear(dateObj.year());
        setMonth(dateObj.month() + 1);
        setDay(dateObj.date());
      }
      onRepeatChange(editingAnniversary.repeat as RepeatOption);
    } else {
      setTitle('');
      const today = dayjs();
      setYear(today.year());
      setMonth(today.month() + 1);
      setDay(today.date());
      onRepeatChange('YEARLY');
    }
  }, [editingAnniversary, onRepeatChange]);

  const isYearly = repeat === 'YEARLY';
  const handleSwitch = (checked: boolean) => {
    onRepeatChange(checked ? 'YEARLY' : 'NONE');
  };

  return {
    title,
    setTitle,
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    isYearly,
    handleSwitch,
    today,
  };
};
