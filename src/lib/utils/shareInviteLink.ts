export const shareInviteLink = (coupleId: string): void => {
  const inviteUrl = `${window.location.origin}/couple-space/invite/${coupleId}`;

  if (typeof window !== 'undefined' && navigator.share) {
    navigator
      .share({
        title: 'useNavidate 연인 초대',
        text: '우리만의 추억을 기록할 연인 공간에 초대할게! 💑',
        url: inviteUrl,
      })
      .catch((error: Error) => {
        console.error('공유 실패:', error);
        alert('공유 중 오류가 발생했어요.');
      });
  } else {
    navigator.clipboard.writeText(inviteUrl);
    alert('초대 링크가 클립보드에 복사되었어요!');
  }
};
