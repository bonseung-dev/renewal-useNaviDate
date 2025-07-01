import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (success === 'true' && token) {
      // 성공 시 토큰을 쿠키에 저장하고 메인 페이지로 리다이렉트
      const response = NextResponse.redirect(new URL('/', request.url));
      
      // HttpOnly 쿠키로 토큰 저장 (보안 강화)
      response.cookies.set('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7일
        path: '/',
      });

      return response;
    } else {
      // 실패 시 로그인 페이지로 리다이렉트
      const errorMessage = error || '로그인에 실패했습니다.';
      return NextResponse.redirect(
        new URL(`/sign-in?error=${encodeURIComponent(errorMessage)}`, request.url)
      );
    }
  } catch (error) {
    console.error('Google OAuth 콜백 처리 오류:', error);
    return NextResponse.redirect(
      new URL('/sign-in?error=인증 처리 중 오류가 발생했습니다.', request.url)
    );
  }
} 