'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

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
              onCheckedChange={setChecked}
              className="w-[40px] h-[20px]"
              thumbClassName="h-[16px] w-[16px] data-[state=checked]:translate-x-[20px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsSwitches;
