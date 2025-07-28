import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: '로그아웃 성공' });

  // 쿠키 삭제
  res.cookies.set('userId', '', {
    maxAge: 0,
    path: '/',
  });
  res.cookies.set('coupleId', '', {
    maxAge: 0,
    path: '/',
  });
  res.cookies.set('anniversary', '', {
    maxAge: 0,
    path: '/',
  });

  return res;
}
