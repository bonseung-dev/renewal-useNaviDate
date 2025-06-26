import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import TanstackQueryProviders from '@/lib/providers/tanstack-query-provider';

const scoreDream = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  variable: '--font-score-dream',
});

const cal = Inter({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  variable: '--font-cal',
});

export const metadata: Metadata = {
  title: 'useNavidate()',
  description: 'useNavidate()은 커플을 위한 캘린더 앱입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${scoreDream.variable} ${cal.variable}`}>
        <TanstackQueryProviders>{children}</TanstackQueryProviders>
      </body>
    </html>
  );
}
