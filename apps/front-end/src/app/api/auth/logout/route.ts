import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // 1. HTTP-only 쿠키 삭제
    cookies().delete('access_token');

    // 2. 클라이언트 측 쿠키도 삭제
    const response = NextResponse.json({ success: true });
    response.cookies.set('access_token', '', { expires: new Date(0) });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
