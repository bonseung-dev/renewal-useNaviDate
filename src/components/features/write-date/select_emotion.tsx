import Image from 'next/image';

const emotions = [
  { key: 'happy', src: '/emotions/emotion_happy.png' },
  { key: 'excited', src: '/emotions/emotion_excited.png' },
  { key: 'usual', src: '/emotions/emotion_usual.png' },
  { key: 'sad', src: '/emotions/emotion_sad.png' },
  { key: 'angry', src: '/emotions/emotion_angry.png' },
];

const SelectEmotion = () => {
  return (
    <section className="flex gap-5 items-center justify-center my-2">
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
    </section>
  );
};

export default SelectEmotion;
