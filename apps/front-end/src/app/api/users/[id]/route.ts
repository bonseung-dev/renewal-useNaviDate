import { NextRequest, NextResponse } from 'next/server';
import { getBackendUrl } from '@/lib/utils/server-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: '인증 토큰이 필요합니다.' },
        { status: 401 },
      );
    }

    const token = authHeader.substring(7);
    const backendUrl = getBackendUrl();

    const userResponse = await fetch(`${backendUrl}/api/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      throw new Error('사용자 조회 실패');
    }

    const userData = await userResponse.json();

    // 커플 정보도 함께 조회
    let coupleData = null;
    if (userData.coupleId) {
      const coupleResponse = await fetch(
        `${backendUrl}/api/couples/${userData.coupleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (coupleResponse.ok) {
        coupleData = await coupleResponse.json();
      }
    }

    return NextResponse.json({
      success: true,
      ...userData,
      couple: coupleData,
    });
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    return NextResponse.json(
      { success: false, message: '사용자 조회에 실패했습니다.' },
      { status: 500 },
    );
  }
}
