import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, message: '인증 코드가 필요합니다.' },
        { status: 400 },
      );
    }

    // 백엔드로 인증 코드 전송
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
    const response = await fetch(
      `${backendUrl}/auth/google/callback?code=${code}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        access_token: data.access_token,
        user: data.user,
        message: data.message,
      });
    } else {
      return NextResponse.json(
        { success: false, message: data.message || '인증에 실패했습니다.' },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error('Google OAuth 콜백 처리 오류:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
