import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: '인증 토큰이 필요합니다.' },
        { status: 401 },
      );
    }

    const token = authHeader.substring(7);
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

    const response = await fetch(`${backendUrl}/anniversaries`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('기념일 목록 조회 실패');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('기념일 목록 조회 오류:', error);
    return NextResponse.json(
      { success: false, message: '기념일 목록 조회에 실패했습니다.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: '인증 토큰이 필요합니다.' },
        { status: 401 },
      );
    }
    const token = authHeader.substring(7);
    const body = await request.json();
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

    const response = await fetch(`${backendUrl}/anniversaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('기념일 생성 실패');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('기념일 생성 오류:', error);
    return NextResponse.json(
      { success: false, message: '기념일 생성에 실패했습니다.' },
      { status: 500 },
    );
  }
}
