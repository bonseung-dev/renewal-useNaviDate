import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { userId, coupleId, anniversary } = await req.json();

  // 필수 값 검증
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  // 쿠키 설정 (7일 유지)
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax' as const,
  };

  cookies().set('userId', userId, cookieOptions);

  if (coupleId) {
    cookies().set('coupleId', coupleId, cookieOptions);
  }

  if (anniversary) {
    cookies().set('anniversary', anniversary, cookieOptions);
  }

  return NextResponse.json({ success: true });
}
