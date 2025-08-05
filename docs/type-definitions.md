# 타입 정의 문서

## 개요
이 문서는 useNaviDate 프로젝트의 shared 패키지에서 정의된 타입들을 설명합니다.

## 기본 인터페이스

### BaseEntity
모든 엔티티의 기본 구조를 정의하는 인터페이스입니다.

```typescript
interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
```

## 핵심 엔티티 인터페이스

### User
사용자 정보를 정의하는 인터페이스입니다.

```typescript
interface User extends BaseEntity {
  email: string;
  password?: string;
  nickname?: string;
  profileImage?: Image | string;
  googleId?: string;
  isVerified?: boolean;
  tempToken?: string;
}
```

**필드 설명:**
- `email`: 사용자 이메일 (필수)
- `password`: 비밀번호 (OAuth 사용 시 null)
- `nickname`: 사용자 닉네임
- `profileImage`: 프로필 이미지 (Image 객체 또는 URL 문자열)
- `googleId`: Google OAuth ID
- `isVerified`: 이메일 인증 여부
- `tempToken`: 임시 토큰

### Couple
커플 관계를 정의하는 인터페이스입니다.

```typescript
interface Couple extends BaseEntity {
  userAId: number;
  userBId: number | null;
  anniversary: string;
  name: string;
  status: 'pending' | 'confirm' | 'delete';
}
```

**필드 설명:**
- `userAId`: 첫 번째 사용자 ID
- `userBId`: 두 번째 사용자 ID (초대 대기 중일 때 null)
- `anniversary`: 기념일
- `name`: 커플 이름
- `status`: 커플 상태
  - `pending`: 초대 대기 중
  - `confirm`: 확정됨
  - `delete`: 삭제됨

### Post
데이트 기록을 정의하는 인터페이스입니다.

```typescript
interface Post extends BaseEntity {
  userId: number;
  title: string;
  content: string;
  visibility: 'private' | 'public' | boolean;
  date: Date | string;
  emotion: Emotion;
  deletedAt: Date | null;
}
```

**필드 설명:**
- `userId`: 작성자 ID
- `title`: 포스트 제목
- `content`: 포스트 내용
- `visibility`: 공개 여부 (백엔드: enum, 프론트엔드: boolean)
- `date`: 데이트 날짜 (백엔드: Date, 프론트엔드: string)
- `emotion`: 감정 상태
- `deletedAt`: 삭제일시 (소프트 삭제)

### Anniversary
기념일을 정의하는 인터페이스입니다.

```typescript
interface Anniversary extends BaseEntity {
  coupleId: number;
  title: string;
  date: Date | string;
  repeat: RepeatOption;
  memo?: string;
  createdBy: number | Date;
}
```

**필드 설명:**
- `coupleId`: 커플 ID
- `title`: 기념일 제목
- `date`: 기념일 날짜
- `repeat`: 반복 옵션
- `memo`: 메모
- `createdBy`: 생성자 ID 또는 생성일시

## 미디어 관련 인터페이스

### Image
이미지 파일 정보를 정의하는 인터페이스입니다.

```typescript
interface Image extends BaseEntity {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  userId?: number;
}
```

**필드 설명:**
- `filename`: 저장된 파일명
- `originalName`: 원본 파일명
- `mimeType`: 파일 MIME 타입
- `size`: 파일 크기 (bytes)
- `path`: 서버 내 파일 경로
- `url`: 외부 접근 URL
- `userId`: 업로드한 사용자 ID

### PostImage
포스트와 이미지의 연결 정보를 정의하는 인터페이스입니다.

```typescript
interface PostImage extends BaseEntity {
  postId: number;
  postImage?: Image;
  imageUrl?: string;
  address: string | null;
  isRepresentative: boolean;
}
```

**필드 설명:**
- `postId`: 포스트 ID
- `postImage`: 이미지 객체 (프론트엔드)
- `imageUrl`: 이미지 URL (백엔드)
- `address`: 이미지 주소 정보
- `isRepresentative`: 대표 이미지 여부

### PostTag
포스트 태그를 정의하는 인터페이스입니다.

```typescript
interface PostTag extends BaseEntity {
  postId: number;
  name: string;
}
```

## 상호작용 인터페이스

### Like
좋아요 정보를 정의하는 인터페이스입니다.

```typescript
interface Like extends BaseEntity {
  postId: number;
  userId: number;
}
```

### Bookmark
북마크 정보를 정의하는 인터페이스입니다.

```typescript
interface Bookmark extends BaseEntity {
  postId: number;
  userId: number;
}
```

## 커뮤니케이션 인터페이스

### Chat
채팅방 정보를 정의하는 인터페이스입니다.

```typescript
interface Chat extends BaseEntity {
  userAId: number;
  userBId: number;
  message: string;
}
```

### ChatMessage
채팅 메시지를 정의하는 인터페이스입니다.

```typescript
interface ChatMessage extends BaseEntity {
  chatId: number;
  userId: number;
  content: string;
}
```

## 설정 및 알림 인터페이스

### Setting
사용자 설정을 정의하는 인터페이스입니다.

```typescript
interface Setting extends BaseEntity {
  userId: number;
  theme: 'light' | 'dark';
  allowPush: boolean;
}
```

### Notification
알림을 정의하는 인터페이스입니다.

```typescript
interface Notification extends BaseEntity {
  userId: number;
  type: 'like' | 'event' | 'anniversary';
  message: string;
  isRead: boolean;
}
```

## 확장 인터페이스

### CalendarPost
캘린더에서 사용하는 포스트 인터페이스입니다.

```typescript
interface CalendarPost extends Post {
  images: PostImage[];
}
```

### CommunityPost
커뮤니티에서 사용하는 포스트 인터페이스입니다.

```typescript
interface CommunityPost extends Post {
  author?: User;
  partner?: User;
  tags?: PostTag[];
  images: PostImage[];
  likesCount: number;
  bookmarksCount: number;
  likes?: Like[];
  bookmarks?: Bookmark[];
}
```

## 응답 인터페이스

### AuthResponse
인증 응답을 정의하는 인터페이스입니다.

```typescript
interface AuthResponse {
  success: boolean;
  user?: User;
  access_token?: string;
  message?: string;
}
```

### ApiResponse
일반 API 응답을 정의하는 제네릭 인터페이스입니다.

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

### PaginatedResponse
페이지네이션 응답을 정의하는 제네릭 인터페이스입니다.

```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

## 열거형 (Enums)

### Emotion
감정 상태를 정의하는 열거형입니다.

```typescript
type Emotion = 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';
```

### RepeatOption
반복 옵션을 정의하는 열거형입니다.

```typescript
type RepeatOption = 'NONE' | 'YEARLY';
```

### SortOption
정렬 옵션을 정의하는 열거형입니다.

```typescript
type SortOption = 'latest' | 'likes' | 'bookmarks';
```

## 상수

### EMOTIONS
감정 상수를 정의합니다.

```typescript
const EMOTIONS = {
  HAPPY: 'happy',
  SAD: 'sad',
  EXCITED: 'excited',
  ANGRY: 'angry',
  USUAL: 'usual'
} as const;
```

### EMOTION_LABELS
감정 라벨을 정의합니다.

```typescript
const EMOTION_LABELS = {
  [EMOTIONS.HAPPY]: '행복',
  [EMOTIONS.SAD]: '슬픔',
  [EMOTIONS.EXCITED]: '신남',
  [EMOTIONS.ANGRY]: '화남',
  [EMOTIONS.USUAL]: '보통'
} as const;
```

### DEFAULT_PAGE_SIZE
기본 페이지 크기를 정의합니다.

```typescript
const DEFAULT_PAGE_SIZE = 10;
```

## DTO 인터페이스

### 인증 관련 DTO

#### CreateUserDto
사용자 생성 DTO입니다.

```typescript
interface CreateUserDto {
  email: string;
  password?: string;
  nickname: string;
  profileImage?: string;
}
```

#### LoginDto
로그인 DTO입니다.

```typescript
interface LoginDto {
  email: string;
  password: string;
}
```

### 포스트 관련 DTO

#### CreatePostDto
포스트 생성 DTO입니다.

```typescript
interface CreatePostDto {
  title: string;
  content: string;
  date: Date;
  location?: string;
  emotion: Emotion;
  images?: string[];
  tags?: string[];
  isPublic: boolean;
  coupleId?: number;
}
```

#### UpdatePostDto
포스트 수정 DTO입니다.

```typescript
interface UpdatePostDto {
  title?: string;
  content?: string;
  date?: Date;
  location?: string;
  emotion?: Emotion;
  images?: string[];
  tags?: string[];
  isPublic?: boolean;
}
```

### 커플 관련 DTO

#### CreateCoupleDto
커플 생성 DTO입니다.

```typescript
interface CreateCoupleDto {
  user2Id: number;
}
```

#### UpdateCoupleDto
커플 수정 DTO입니다.

```typescript
interface UpdateCoupleDto {
  userBId?: number;
  anniversary?: string;
  name?: string;
  status?: 'pending' | 'confirm' | 'delete';
}
```

### 기념일 관련 DTO

#### CreateAnniversaryDto
기념일 생성 DTO입니다.

```typescript
interface CreateAnniversaryDto {
  coupleId: number;
  title: string;
  date: Date | string;
  repeat?: RepeatOption;
  memo?: string;
  createdBy?: number;
}
```

#### UpdateAnniversaryDto
기념일 수정 DTO입니다.

```typescript
interface UpdateAnniversaryDto {
  title?: string;
  date?: Date;
  description?: string;
  repeat?: RepeatOption;
}
```

### 알림 관련 DTO

#### CreateNotificationDto
알림 생성 DTO입니다.

```typescript
interface CreateNotificationDto {
  userId: number;
  type: string;
  title: string;
  message: string;
}
```

#### UpdateNotificationDto
알림 수정 DTO입니다.

```typescript
interface UpdateNotificationDto {
  type?: string;
  title?: string;
  message?: string;
  isRead?: boolean;
}
```

### 설정 관련 DTO

#### UpdateSettingDto
설정 수정 DTO입니다.

```typescript
interface UpdateSettingDto {
  notificationPreference?: string;
  themePreference?: string;
  emailNotification?: boolean;
  pushNotification?: boolean;
  privacySettings?: {
    showProfile: boolean;
    showStatus: boolean;
    showLastSeen: boolean;
  };
}
```

### 사용자 관련 DTO

#### UpdateUserDto
사용자 수정 DTO입니다.

```typescript
interface UpdateUserDto {
  email?: string;
  password?: string;
  nickname?: string;
  profileImage?: string;
}
```

## 사용법

### 타입 가져오기
```typescript
import { User, Post, Emotion, CreatePostDto } from '@use-navi-date/shared';
```

### 인터페이스 구현
```typescript
import { BaseEntity } from '@use-navi-date/shared';

class CustomEntity implements BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
```

### 열거형 사용
```typescript
import { Emotion, EMOTION_LABELS } from '@use-navi-date/shared';

const emotion: Emotion = 'Joy';
const label = EMOTION_LABELS[emotion]; // '행복'
```

## 주의사항

1. **타입 호환성**: 백엔드와 프론트엔드 간의 타입 호환성을 위해 일부 필드는 유니온 타입으로 정의되어 있습니다.
2. **옵셔널 필드**: 대부분의 필드는 옵셔널로 정의되어 있어 유연한 데이터 구조를 지원합니다.
3. **제네릭 사용**: API 응답과 페이지네이션은 제네릭을 사용하여 재사용성을 높였습니다.
4. **상수 활용**: 자주 사용되는 값들은 상수로 정의하여 일관성을 유지합니다. 