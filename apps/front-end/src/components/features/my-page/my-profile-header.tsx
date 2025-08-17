'use client';

import Image from 'next/image';
import { PencilLine, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UserService } from '@/lib/api/services';
import { User } from '@use-navi-date/shared';

type MyProfileHeaderProps = {
  userId: number;
  token: string;
};

const MyProfileHeader = ({ userId, token }: MyProfileHeaderProps) => {
  const [nickname, setNickname] = useState('사용자 이름');
  const [profileImageSrc, setProfileImageSrc] = useState(
    '/placeholder-image.png',
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState(nickname);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await UserService.getUser(String(userId), token);
        // 실제 API는 User를 반환하지만, 서비스에서 { user: User } 타입으로 선언되어 있음
        // 그래서 타입 단언(as unknown as User)을 사용하여 타입 오류를 회피
        const user = res.data as unknown as User;

        setNickname(user?.nickname ?? '사용자 이름');
        setEditedNickname(user?.nickname ?? '사용자 이름');
        setProfileImageSrc(
          typeof user?.profileImage === 'string'
            ? user.profileImage
            : '/placeholder-image.png',
        );
      } catch (error) {
        console.error('유저 정보 조회 실패:', error);
      }
    };

    fetchUserInfo();
  }, [userId, token]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNickname(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCheckClick = () => {
    setNickname(editedNickname);
    setIsEditing(false);
    // 서버에 저장하는 로직
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleCheckClick();
  };

  return (
    <div className="w-[284px] h-[44px] flex items-center">
      {/* 프로필 이미지 */}
      <figure className="w-[44px] h-[44px] rounded-full overflow-hidden">
        <Image
          src={profileImageSrc}
          alt={`${nickname}의 프로필 이미지`}
          width={44}
          height={44}
          className="object-cover"
        />
      </figure>

      {/* 닉네임 */}
      <div
        className={`ml-[12px] w-[200px] h-[40px] flex items-center justify-center rounded-full ${
          isEditing ? 'bg-skin3' : 'bg-skin1'
        }`}
      >
        {isEditing ? (
          <input
            type="text"
            value={editedNickname}
            onChange={handleNicknameChange}
            onKeyDown={handleInputKeyDown}
            className="w-full h-full text-font2 text-m-h4 text-center bg-transparent outline-none"
            autoFocus
          />
        ) : (
          <span className="text-skin5 text-m-h4">{nickname}</span>
        )}
      </div>

      {/* 버튼 */}
      <button
        aria-label={isEditing ? '닉네임 저장' : '닉네임 수정'}
        className="ml-[8px] w-[20px] h-[20px] flex items-center justify-center"
        onClick={isEditing ? handleCheckClick : handleEditClick}
      >
        {isEditing ? (
          <Check size={20} className="text-font4" />
        ) : (
          <PencilLine size={20} className="text-font4" />
        )}
      </button>
    </div>
  );
};

export default MyProfileHeader;
