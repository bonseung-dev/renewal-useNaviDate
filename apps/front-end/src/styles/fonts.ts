import localFont from 'next/font/local';

export const scoreDream = localFont({
  src: [
    {
      path: '../../public/fonts/SCDream1.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SCDream4.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SCDream7.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SCDream9.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-score-dream',
});
