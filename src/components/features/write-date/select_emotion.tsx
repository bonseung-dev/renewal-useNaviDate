import Image from 'next/image';

const emotions = [
  { key: 'happy', src: '/emotions/emotion_happy.png' },
  { key: 'excited', src: '/emotions/emotion_excited.png' },
  { key: 'usual', src: '/emotions/emotion_usual.png' },
  { key: 'sad', src: '/emotions/emotion_sad.png' },
  { key: 'angry', src: '/emotions/emotion_angry.png' },
];

const SelectEmotion = ({
  emotion,
  setEmotion,
}: {
  emotion: string;
  setEmotion: (emotion: string) => void;
}) => {
  const handleEmotionClick = (emotion: string) => {
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
