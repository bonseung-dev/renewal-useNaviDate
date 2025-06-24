// 제공된 이미지 URL
const imageUrls = [
  'https://cdn.pixabay.com/photo/2013/03/19/23/07/easter-bunny-95096_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/10/22/07/06/shoes-9138796_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/03/16/02/10/couple-7855777_1280.jpg',
  'https://cdn.pixabay.com/photo/2024/03/12/13/13/couple-8628796_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/10/28/21/16/couple-1779066_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/03/21/15/01/couple-6112296_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/19/12/09/couple-1838940_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/12/16/03/14/wedding-6873668_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/10/26/14/06/couple-8342763_1280.jpg',
  'https://cdn.pixabay.com/photo/2022/04/12/04/57/couple-7127168_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/29/09/56/couple-1868866_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/10/28/18/01/engagement-6750226_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/10/02/08/58/wedding-6674650_1280.jpg',
  'https://cdn.pixabay.com/photo/2013/07/27/13/56/couple-168191_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/10/16/09/55/love-6714607_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/03/11/10/37/regurgitation-bridge-4921742_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/29/11/31/couple-1869206_1280.jpg',
];

// 타입 정의
type User = {
  id: string;
  email: string;
  password: string;
  nickname: string;
  profileImage: string;
  createdAt: Date;
  tempToken?: string;
};

type Couple = {
  id: string;
  userAId: string;
  userBId: string;
  anniversary: Date;
  name: string;
  status: 'pending' | 'confirm' | 'delete';
  createdAt: Date;
};

type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  visibility: 'private' | 'public';
  date: string;
  emotion: 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';
  createdAt: Date;
  deletedAt: Date | null;
};

type PostTag = {
  id: string;
  postId: string;
  name: string;
};

type PostImage = {
  id: string;
  postId: string;
  imageUrl: string;
  address: string | null;
  isRepresentative: boolean; // 대표 이미지 여부
};

type Bookmark = {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
};

type Like = {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
};

type Anniversary = {
  id: string;
  coupleId: string;
  title: string;
  date: string;
  repeat: 'none' | 'yearly';
  memo: string;
  createdBy: string;
};

type Notification = {
  id: string;
  userId: string;
  type: 'like' | 'event' | 'anniversary';
  message: string;
  isRead: boolean;
  createdAt: Date;
};

type Chat = {
  id: string;
  userAId: string;
  userBId: string;
  message: string;
  createdAt: Date;
};

type Setting = {
  id: string;
  userId: string;
  theme: 'light' | 'dark';
  allowPush: boolean;
  createdAt: Date;
};

// 인덱스 기반으로 고정된 선택을 하는 함수들
const getImageByIndex = (index: number) => imageUrls[index % imageUrls.length];

// 6월 날짜를 인덱스 기반으로 생성
const getJuneDateByIndex = (index: number) => {
  const day = (index % 30) + 1;
  return `2025-06-${day.toString().padStart(2, '0')}`;
};

// 기념일 날짜를 인덱스 기반으로 생성
const getAnniversaryDateByIndex = (index: number) => {
  const month = index % 2 === 0 ? '05' : '06';
  const day = (index % 30) + 1;
  return `2025-${month}-${day.toString().padStart(2, '0')}`;
};

// 고정된 UUID 생성을 위한 시드 기반 ID 생성
let idCounter = 0;
const generateFixedId = () => {
  idCounter++;
  return `fixed-id-${idCounter.toString().padStart(6, '0')}`;
};

// 더미 데이터 - 모든 랜덤 요소를 고정값으로 변경
export const dummyData: {
  users: User[];
  couples: Couple[];
  posts: Post[];
  postTags: PostTag[];
  postImages: PostImage[];
  bookmarks: Bookmark[];
  likes: Like[];
  anniversaries: Anniversary[];
  notifications: Notification[];
  chats: Chat[];
  settings: Setting[];
} = {
  users: [
    {
      id: generateFixedId(),
      email: 'user1@example.com',
      password: '$2b$10$hashedpassword1',
      nickname: 'Sunny',
      profileImage: getImageByIndex(0),
      createdAt: new Date('2025-01-01'),
      tempToken: `token_${generateFixedId()}`,
    },
    {
      id: generateFixedId(),
      email: 'user2@example.com',
      password: '$2b$10$hashedpassword2',
      nickname: 'Moony',
      profileImage: getImageByIndex(1),
      createdAt: new Date('2025-01-02'),
      tempToken: `token_${generateFixedId()}`,
    },
    {
      id: generateFixedId(),
      email: 'user3@example.com',
      password: '$2b$10$hashedpassword3',
      nickname: 'Starry',
      profileImage: getImageByIndex(2),
      createdAt: new Date('2025-01-03'),
      tempToken: `token_${generateFixedId()}`,
    },
    {
      id: generateFixedId(),
      email: 'user4@example.com',
      password: '$2b$10$hashedpassword4',
      nickname: 'Cloudy',
      profileImage: getImageByIndex(3),
      createdAt: new Date('2025-01-04'),
      tempToken: `token_${generateFixedId()}`,
    },
    {
      id: generateFixedId(),
      email: 'user5@example.com',
      password: '$2b$10$hashedpassword5',
      nickname: 'Rainy',
      profileImage: getImageByIndex(4),
      createdAt: new Date('2025-01-05'),
      tempToken: `token_${generateFixedId()}`,
    },
  ],
  couples: [],
  posts: [],
  postTags: [],
  postImages: [],
  bookmarks: [],
  likes: [],
  anniversaries: [],
  notifications: [],
  chats: [],
  settings: [],
};

// 커플 데이터 생성
const coupleNames = [
  'SunMoon',
  'MoonStar',
  'StarCloud',
  'CloudRain',
  'RainSun',
];
dummyData.couples = coupleNames.map((name, index) => ({
  id: generateFixedId(),
  userAId: dummyData.users[index].id,
  userBId: dummyData.users[(index + 1) % 5].id,
  anniversary: new Date(`2024-${(index % 12) + 1}-${(index % 28) + 1}`),
  name,
  status: 'confirm',
  createdAt: new Date('2025-01-10'),
}));

// 포스트 데이터 생성
const postTitles = [
  '카페 데이트',
  '영화관 나들이',
  '공원 산책',
  '맛집 탐방',
  '바다 여행',
  '별 보러 갔어요',
  '놀이공원 데이트',
  '집콕 데이트',
  '자전거 타기',
  '피크닉',
  '전시회 관람',
  '드라이브',
  '캠핑',
  '책방 방문',
  '요리 데이트',
  '쇼핑 데이트',
  '운동 같이',
  '게임 데이트',
  '공기놀이',
  '산책로 탐험',
];
const emotions: ('Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad')[] = [
  'Joy',
  'Fun',
  'Soso',
  'Sad',
  'Mad',
];

dummyData.posts = postTitles.map((title, index) => {
  const user = dummyData.users[index % 5]; // 고정된 유저 선택
  return {
    id: generateFixedId(),
    userId: user.id,
    title: title.slice(0, 15),
    content:
      `오늘 ${title} 하면서 너무 즐거웠어요! ${index % 2 === 0 ? '다시 가고 싶어요!' : '좀 아쉬웠지만 그래도 좋았어요.'}`.slice(
        0,
        1000,
      ),
    visibility: index % 2 === 0 ? 'public' : 'private', // 고정된 패턴
    date: getJuneDateByIndex(index),
    emotion: emotions[index % emotions.length], // 고정된 감정 선택
    createdAt: new Date(`2025-06-${(index % 30) + 1}`),
    deletedAt: null,
  };
});

// 포스트 태그 데이터 생성 (고정된 패턴)
const tagNames = [
  '데이트',
  '맛집',
  '여행',
  '추억',
  '즐거움',
  '휴식',
  '모험',
  '로맨스',
];
dummyData.postTags = [];
dummyData.posts.forEach((post, postIndex) => {
  const tagCount = postIndex % 4; // 0~3개 태그
  for (let i = 0; i < tagCount; i++) {
    dummyData.postTags.push({
      id: generateFixedId(),
      postId: post.id,
      name: tagNames[(postIndex + i) % tagNames.length].slice(0, 8),
    });
  }
});

// 포스트 이미지 데이터 생성 (고정된 패턴, 최소 1개 이미지 보장)
dummyData.postImages = [];
dummyData.posts.forEach((post, postIndex) => {
  const imageCount = 1 + (postIndex % 2); // 1~2개 이미지 (최소 1개)
  for (let i = 0; i < imageCount; i++) {
    dummyData.postImages.push({
      id: generateFixedId(),
      postId: post.id,
      imageUrl: getImageByIndex(postIndex + i),
      address:
        postIndex % 2 === 0
          ? `서울시 강남구 ${(postIndex % 100) + 1}번길`
          : null,
      isRepresentative: imageCount > 1 && i === 0, // 여러 이미지일 경우 첫 번째를 대표 이미지로 설정
    });
  }
});

// 북마크 데이터 생성 (고정된 패턴)
dummyData.bookmarks = [];
dummyData.users.forEach((user, userIndex) => {
  const bookmarkCount = userIndex % 6; // 0~5개 북마크
  for (let i = 0; i < bookmarkCount; i++) {
    const postIndex = (userIndex * 3 + i) % dummyData.posts.length;
    dummyData.bookmarks.push({
      id: generateFixedId(),
      postId: dummyData.posts[postIndex].id,
      userId: user.id,
      createdAt: new Date('2025-06-15'),
    });
  }
});

// 좋아요 데이터 생성 (고정된 패턴)
dummyData.likes = [];
dummyData.users.forEach((user, userIndex) => {
  const likeCount = userIndex % 11; // 0~10개 좋아요
  for (let i = 0; i < likeCount; i++) {
    const postIndex = (userIndex * 2 + i) % dummyData.posts.length;
    dummyData.likes.push({
      id: generateFixedId(),
      postId: dummyData.posts[postIndex].id,
      userId: user.id,
      createdAt: new Date('2025-06-15'),
    });
  }
});

// 기념일 데이터 생성 (고정된 패턴)
const anniversaryTitles = [
  '1주년',
  '첫 데이트',
  '100일',
  '생일',
  '2주년',
  '첫 키스',
];
dummyData.anniversaries = anniversaryTitles.map((title, index) => {
  const couple = dummyData.couples[index % 5];
  return {
    id: generateFixedId(),
    coupleId: couple.id,
    title,
    date: getAnniversaryDateByIndex(index),
    repeat: index % 2 === 0 ? 'yearly' : 'none',
    memo: `우리의 ${title}! 잊지 못할 순간이에요.`,
    createdBy: index % 2 === 0 ? couple.userAId : couple.userBId,
  };
});

// 알림 데이터 생성 (고정된 패턴)
dummyData.notifications = [];
dummyData.users.forEach((user, userIndex) => {
  const notificationCount = userIndex % 6; // 0~5개 알림
  for (let i = 0; i < notificationCount; i++) {
    const type = i % 2 === 0 ? 'like' : 'anniversary';
    dummyData.notifications.push({
      id: generateFixedId(),
      userId: user.id,
      type,
      message:
        type === 'like'
          ? `${dummyData.users[(userIndex + i) % 5].nickname}님이 당신의 포스트를 좋아합니다.`
          : `기념일 '${anniversaryTitles[i % anniversaryTitles.length]}'이 다가오고 있어요!`,
      isRead: i % 2 === 0,
      createdAt: new Date('2025-06-20'),
    });
  }
});

// 채팅 데이터 생성 (고정된 패턴)
dummyData.chats = [];
dummyData.couples.forEach((couple, coupleIndex) => {
  const chatCount = coupleIndex % 6; // 0~5개 메시지
  for (let i = 0; i < chatCount; i++) {
    dummyData.chats.push({
      id: generateFixedId(),
      userAId: couple.userAId,
      userBId: couple.userBId,
      message: `오늘 어땠어? ${i % 2 === 0 ? '너무 좋았지!' : '다음엔 더 재밌게 놀자!'}`,
      createdAt: new Date('2025-06-20'),
    });
  }
});

// 설정 데이터 생성 (고정된 패턴)
dummyData.settings = dummyData.users.map((user, userIndex) => ({
  id: generateFixedId(),
  userId: user.id,
  theme: userIndex % 2 === 0 ? 'light' : 'dark',
  allowPush: userIndex % 2 === 1,
  createdAt: new Date('2025-01-10'),
}));

export default dummyData;
