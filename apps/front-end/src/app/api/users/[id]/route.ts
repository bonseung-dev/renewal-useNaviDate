import { NextRequest, NextResponse } from 'next/server';
import { extractTokenFromRequest, getBackendUrl } from '@/lib/utils/server-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = extractTokenFromRequest(request);
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }

    const backendUrl = getBackendUrl();
    
    const response = await fetch(`${backendUrl}/users/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('사용자 조회 실패');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    return NextResponse.json(
      { success: false, message: '사용자 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
} 