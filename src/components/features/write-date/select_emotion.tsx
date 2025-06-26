import Image from 'next/image';
import React from 'react';

const emotions = [
  { key: 'happy', src: '/emotions/emotion_happy_100x100.png' },
  { key: 'excited', src: '/emotions/emotion_excited_100x100.png' },
  { key: 'usual', src: '/emotions/emotion_usual_100x100.png' },
  { key: 'sad', src: '/emotions/emotion_sad_100x100.png' },
  { key: 'angry', src: '/emotions/emotion_angry_100x100.png' },
];

const SelectEmotion = () => {
  return (
    <div className="flex gap-5 items-center justify-center my-2">
      {emotions.map((emotion) => {
        return (
          <button key={emotion.key}>
            <Image
              src={emotion.src}
              alt={emotion.key}
              unoptimized
              width={40}
              height={40}
              className="rounded border border-skin2"
            />
          </button>
        );
      })}
    </div>
  );
};

export default SelectEmotion;
