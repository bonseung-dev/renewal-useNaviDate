'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const SettingsSwitches = () => {
  const [theme, setTheme] = useState(true);
  const [event, setEvent] = useState(true);
  const [anniversary, setAnniversary] = useState(false);
  const [post, setPost] = useState(true);

  return (
    <div className="flex flex-col mt-[20px] px-[20px]">
      {[
        {
          label: '테마',
          checked: theme,
          setChecked: setTheme,
          text: theme ? '라이트' : '다크',
        },
        {
          label: '이벤트 알림',
          checked: event,
          setChecked: setEvent,
          text: event ? 'ON' : 'OFF',
        },
        {
          label: '기념일 알림',
          checked: anniversary,
          setChecked: setAnniversary,
          text: anniversary ? 'ON' : 'OFF',
        },
        {
          label: '게시물 알림',
          checked: post,
          setChecked: setPost,
          text: post ? 'ON' : 'OFF',
        },
      ].map(({ label, checked, setChecked, text }) => (
        <div
          key={label}
          className="flex items-center justify-between mb-[16px]"
        >
          <span className="text-m-h3 text-font2">{label}</span>
          <div className="flex items-center gap-[12px]">
            <span className="text-b-h4 font-bold text-skin1">{text}</span>
            <Switch
              checked={checked}
              onCheckedChange={(val) => {
                setChecked(val);
                alert('현재는 UI 시연용으로 기능은 구현되어 있지 않습니다.');
              }}
              className={cn(
                'w-[40px] h-[20px]',
                'data-[state=checked]:bg-skin1', // ON / 라이트 모드
                'data-[state=unchecked]:bg-skin6', // OFF / 다크 모드
              )}
              thumbClassName="h-[16px] w-[16px] data-[state=checked]:translate-x-[21px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsSwitches;
