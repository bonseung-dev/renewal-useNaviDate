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
  isRepresentative: boolean;
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
  repeat: 'NONE' | 'YEARLY';
  memo?: string;
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

const getImageByIndex = (index: number) => imageUrls[index % imageUrls.length];

const getDateByIndex = (index: number, coupleIndex: number) => {
  // 각 커플당 10개 포스트: 4월(4개), 5월(3개), 6월(3개)
  const postsPerCouple = 10;
  const postsPerMonth = [4, 3, 3]; // 4월, 5월, 6월
  const daysInMonth = [30, 31, 30]; // 4월, 5월, 6월
  const monthOffsets = [0, 30, 61]; // 4월 1일=0, 5월 1일=30, 6월 1일=61

  // 커플별로 고유한 오프셋 적용
  const localIndex = index % postsPerCouple;
  let month = 0;
  let postsAssigned = 0;

  // 월 결정
  if (localIndex < postsPerMonth[0]) {
    month = 0; // 4월
  } else if (localIndex < postsPerMonth[0] + postsPerMonth[1]) {
    month = 1; // 5월
    postsAssigned = postsPerMonth[0];
  } else {
    month = 2; // 6월
    postsAssigned = postsPerMonth[0] + postsPerMonth[1];
  }

  // 월 내 날짜 계산
  const postInMonth = localIndex - postsAssigned; // 해당 월의 몇 번째 포스트
  const dayOffset =
    Math.floor((postInMonth * daysInMonth[month]) / postsPerMonth[month]) + 1; // 균등 분배
  const totalOffset = monthOffsets[month] + (dayOffset - 1) + coupleIndex; // 커플별 오프셋 추가

  const startDate = new Date('2025-04-01');
  const date = new Date(
    startDate.getTime() + totalOffset * 24 * 60 * 60 * 1000,
  );
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

const getAnniversaryDateByIndex = (index: number) => {
  const month = index % 3 === 0 ? '04' : index % 3 === 1 ? '05' : '06';
  const day = (index % 30) + 1;
  return `2025-${month}-${day.toString().padStart(2, '0')}`;
};

let idCounter = 0;
const generateFixedId = () => {
  idCounter++;
  return `fixed-id-${idCounter.toString().padStart(6, '0')}`;
};

let tokenCounter = 0;
const generateTokenId = () => {
  tokenCounter++;
  return `token-fixed-id-${tokenCounter.toString().padStart(6, '0')}`;
};

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
  users: [],
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

// 사용자 생성
dummyData.users = [
  {
    id: generateFixedId(),
    email: 'user1@example.com',
    password: '$2b$10$hashedpassword1',
    nickname: 'Sunny',
    profileImage: getImageByIndex(0),
    createdAt: new Date('2025-01-01'),
    tempToken: generateTokenId(),
  },
  {
    id: generateFixedId(),
    email: 'user2@example.com',
    password: '$2b$10$hashedpassword2',
    nickname: 'Moony',
    profileImage: getImageByIndex(1),
    createdAt: new Date('2025-01-02'),
    tempToken: generateTokenId(),
  },
  {
    id: generateFixedId(),
    email: 'user3@example.com',
    password: '$2b$10$hashedpassword3',
    nickname: 'Starry',
    profileImage: getImageByIndex(2),
    createdAt: new Date('2025-01-03'),
    tempToken: generateTokenId(),
  },
  {
    id: generateFixedId(),
    email: 'user4@example.com',
    password: '$2b$10$hashedpassword4',
    nickname: 'Cloudy',
    profileImage: getImageByIndex(3),
    createdAt: new Date('2025-01-04'),
    tempToken: generateTokenId(),
  },
  {
    id: generateFixedId(),
    email: 'user5@example.com',
    password: '$2b$10$hashedpassword5',
    nickname: 'Rainy',
    profileImage: getImageByIndex(4),
    createdAt: new Date('2025-01-05'),
    tempToken: generateTokenId(),
  },
];

// 커플 생성
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
  anniversary: new Date('2024-04-01'),
  name,
  status: 'confirm',
  createdAt: new Date('2025-01-10'),
}));

function generateId(type: string): string {
  const timestamp = Date.now().toString(36).slice(-6); // 6자리 시간값
  const random = Math.floor(Math.random() * 1679616) // 36^4
    .toString(36)
    .padStart(4, '0');
  return `${type}-${timestamp}-${random}`; // 예: post-a1b2c3-defg
}

// 포스트 생성
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
  '와인 바 데이트',
  '수영장 데이트',
  '캠핑',
  '등산 데이트',
  '스키장 데이트',
  '스케이트장 데이트',
  '북카페 데이트',
  '만화카페 데이트',
  '코인노래방',
  '보드게임 카페',
  '플라워 클래스',
  '요가 클래스',
  '쿠킹 클래스',
  '도자기 공방',
  '드라이브 데이트',
  '야경 감상',
  '불꽃놀이 구경',
  '박물관 데이트',
  '수족관 데이트',
  '동물원 데이트',
  '식물원 데이트',
  '테마파크 데이트',
  '워터파크 데이트',
  '스파 데이트',
  '마사지 데이트',
  '쇼핑 데이트',
  '빈티지 샵 탐방',
  '레코드 샵 데이트',
  '핫플 체크',
  '감성 사진 촬영',
  '낭만적인 선물',
  '서프라이즈 이벤트',
  '추억의 장소 재방문',
  '첫 만남 기념일',
  '100일 기념 데이트',
  '1주년 기념일',
  '발렌타인 데이',
  '화이트 데이',
  '크리스마스 데이트',
  '새해 첫 데이트',
  '가을 단풍 데이트',
  '봄꽃 구경',
  '여름 해변 데이트',
  '겨울 눈꽃 데이트',
  '비 오는 날 데이트',
  '새벽 데이트',
  '야식 데이트',
  '브런치 데이트',
  '디너 쇼',
  '칵테일 바',
  '미술관 데이트',
  '콘서트 데이트',
  '연극 관람',
  '뮤지컬 데이트',
  '클래식 공연',
  '재즈 바 데이트',
  '스트리트 푸드 투어',
  '미션 임파서블 데이트',
  '서로의 취미 체험',
  '역사 탐방',
  '고궁 데이트',
  '전통 찻집',
  '한복 데이트',
  '테이스팅 메뉴',
  '파티룸 데이트',
  'VR 체험',
  '방탈출 카페',
  '오락실 데이트',
  '당구장 데이트',
  '볼링 데이트',
  '스크린 골프',
  '야구 관람',
  '축구 관람',
  '서핑 체험',
  '패들보드',
  '카약 데이트',
  '스노클링',
  '스쿠버 다이빙',
  '승마 체험',
  '글램핑',
  '차박 데이트',
  '별빛 캠핑',
  '텐트 데이트',
];
const emotions: ('Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad')[] = [
  'Joy',
  'Fun',
  'Soso',
  'Sad',
  'Mad',
];

dummyData.posts = [];
dummyData.couples.forEach((couple, coupleIndex) => {
  postTitles.forEach((title, titleIndex) => {
    const userId = titleIndex % 2 === 0 ? couple.userAId : couple.userBId;
    dummyData.posts.push({
      id: generateId('post'),
      userId,
      title: title.slice(0, 15),
      content: `오늘 ${title} 하면서 너무 즐거웠어요! ${
        titleIndex % 2 === 0
          ? '다시 가고 싶어요!'
          : '좀 아쉬웠지만 그래도 좋았어요.'
      }`.slice(0, 1000),
      visibility: titleIndex % 2 === 0 ? 'public' : 'private',
      date: getDateByIndex(titleIndex, coupleIndex),
      emotion: emotions[titleIndex % emotions.length],
      createdAt: new Date(getDateByIndex(titleIndex, coupleIndex)),
      deletedAt: null,
    });
  });
});

// 포스트 태그 생성
const tagNames = ['데이트', '여행', '맛집', '기념일', '일상'];
dummyData.postTags = [];
dummyData.posts.forEach((post, postIndex) => {
  const tagCount = (postIndex % 3) + 1; // 1~3개 태그
  for (let i = 0; i < tagCount; i++) {
    dummyData.postTags.push({
      id: generateId('tag'),
      postId: post.id,
      name: tagNames[(postIndex + i) % tagNames.length],
    });
  }
});

// 포스트 이미지 생성
dummyData.postImages = [];
dummyData.posts.forEach((post, postIndex) => {
  const imageCount = 1 + (postIndex % 2);
  for (let i = 0; i < imageCount; i++) {
    dummyData.postImages.push({
      id: generateId('img'),
      postId: post.id,
      imageUrl: getImageByIndex(postIndex + i),
      address:
        postIndex % 2 === 0
          ? `서울시 강남구 ${(postIndex % 100) + 1}번길`
          : null,
      isRepresentative: imageCount > 1 && i === 0,
    });
  }
});

// 좋아요 생성
dummyData.likes = [];
dummyData.posts.forEach((post, postIndex) => {
  const likeCount = postIndex % 5; // 0~4개 좋아요
  for (let i = 0; i < likeCount; i++) {
    dummyData.likes.push({
      id: generateId('like'),
      postId: post.id,
      userId: dummyData.users[(postIndex + i) % 5].id,
      createdAt: new Date('2025-06-15'),
    });
  }
});

// 북마크 생성
dummyData.bookmarks = [];
dummyData.posts.forEach((post, postIndex) => {
  const bookmarkCount = postIndex % 3; // 0~2개 북마크
  for (let i = 0; i < bookmarkCount; i++) {
    dummyData.bookmarks.push({
      id: generateId('book'),
      postId: post.id,
      userId: dummyData.users[(postIndex + i) % 5].id,
      createdAt: new Date('2025-06-15'),
    });
  }
});

// 기념일 생성
const anniversaryTitles = [
  '첫 데이트',
  '여친생일',
  '첫 키스',
  '남친생일',
  '첫 해외여행',
];
dummyData.anniversaries = anniversaryTitles.map((title, index) => {
  const couple = dummyData.couples[index % 5];
  return {
    id: generateId('anni'),
    coupleId: couple.id,
    title,
    date: getAnniversaryDateByIndex(index),
    repeat: index % 2 === 0 ? 'YEARLY' : 'NONE',
    memo: `우리의 ${title}! 잊지 못할 순간이에요.`,
    createdBy: index % 2 === 0 ? couple.userAId : couple.userBId,
  };
});

// 알림 생성
dummyData.notifications = [];
dummyData.users.forEach((user, userIndex) => {
  const notificationCount = userIndex % 6;
  for (let i = 0; i < notificationCount; i++) {
    const type = i % 2 === 0 ? 'like' : 'anniversary';
    dummyData.notifications.push({
      id: generateId('noti'),
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

// 채팅 생성
dummyData.chats = [];
dummyData.couples.forEach((couple, coupleIndex) => {
  const chatCount = coupleIndex % 6;
  for (let i = 0; i < chatCount; i++) {
    dummyData.chats.push({
      id: generateId('chat'),
      userAId: couple.userAId,
      userBId: couple.userBId,
      message: `오늘 어땠어? ${i % 2 === 0 ? '너무 좋았지!' : '다음엔 더 재밌게 놀자!'}`,
      createdAt: new Date('2025-06-20'),
    });
  }
});

// 설정 생성
dummyData.settings = dummyData.users.map((user, userIndex) => ({
  id: generateId('set'),
  userId: user.id,
  theme: userIndex % 2 === 0 ? 'light' : 'dark',
  allowPush: userIndex % 2 === 1,
  createdAt: new Date('2025-01-10'),
}));

// console.log('생성된 커플 데이터:', dummyData.couples);
// console.log('생성된 포스트 데이터:', dummyData.posts);
// console.log('생성된 포스트 태그 데이터:', dummyData.postTags);

export default dummyData;
