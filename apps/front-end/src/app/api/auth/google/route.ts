import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

    // 백엔드의 Google OAuth 시작 엔드포인트로 리다이렉트
    const googleAuthUrl = `${backendUrl}/auth/google`;

    console.log('Google OAuth 시작:', googleAuthUrl);

    return NextResponse.redirect(googleAuthUrl);
  } catch (error) {
    console.error('Google OAuth 시작 오류:', error);
    return NextResponse.json(
      { success: false, message: 'Google 로그인을 시작할 수 없습니다.' },
      { status: 500 },
    );
  }
}
