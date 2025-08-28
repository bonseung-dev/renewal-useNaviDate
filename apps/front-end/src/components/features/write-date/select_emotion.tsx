import { Emotion } from '@use-navi-date/shared';
import Image from 'next/image';

const emotions: { key: Emotion; src: string }[] = [
  { key: 'Joy', src: '/emotions/emotion_happy.png' },
  { key: 'Fun', src: '/emotions/emotion_excited.png' },
  { key: 'Soso', src: '/emotions/emotion_usual.png' },
  { key: 'Sad', src: '/emotions/emotion_sad.png' },
  { key: 'Mad', src: '/emotions/emotion_angry.png' },
];

const SelectEmotion = ({
  emotion,
  setEmotion,
}: {
  emotion: Emotion;
  setEmotion: (emotion: Emotion) => void;
}) => {
  const handleEmotionClick = (emotion: Emotion) => {
    setEmotion(emotion);
  };

  return (
    <section className="flex gap-5 items-center justify-center my-2">
      {emotions.map((emotionItem) => {
        return (
          <button
            type="button"
            key={emotionItem.key}
            onClick={() => handleEmotionClick(emotionItem.key)}
          >
            <Image
              src={emotionItem.src}
              alt={emotionItem.key}
              unoptimized
              width={40}
              height={40}
              className={`rounded  ${emotionItem.key === emotion ? 'border-4 border-skin3' : 'border border-skin2'}`}
            />
          </button>
        );
      })}
    </section>
  );
};

export default SelectEmotion;
