import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    
    // 백엔드의 Google OAuth 엔드포인트로 리다이렉트
    return NextResponse.redirect(`${backendUrl}/auth/google`);
  } catch (error) {
    console.error('Google OAuth 시작 오류:', error);
    return NextResponse.json(
      { success: false, message: 'Google 로그인을 시작할 수 없습니다.' },
      { status: 500 }
    );
  }
} 