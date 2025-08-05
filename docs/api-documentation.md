# API 문서

## 개요
이 문서는 useNaviDate 프로젝트의 백엔드 API 엔드포인트들을 설명합니다.

## 기본 정보

- **Base URL**: `http://localhost:3000` (개발 환경)
- **Content-Type**: `application/json`
- **인증 방식**: JWT Bearer Token

## 인증 (Authentication)

### 로그인
```http
POST /auth/login
```

**요청 본문:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**응답:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "nickname": "사용자",
    "profileImage": "https://example.com/image.jpg"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Google OAuth 로그인
```http
GET /auth/google
```

### Google OAuth 콜백
```http
GET /auth/google/callback
```

### 로그아웃
```http
POST /auth/logout
```

**헤더:**
```
Authorization: Bearer <token>
```

## 사용자 (Users)

### 사용자 프로필 조회
```http
GET /users/profile
```

**헤더:**
```
Authorization: Bearer <token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "nickname": "사용자",
    "profileImage": "https://example.com/image.jpg",
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 사용자 정보 수정
```http
PUT /users/{id}
```

**헤더:**
```
Authorization: Bearer <token>
```

**요청 본문:**
```json
{
  "nickname": "새로운 닉네임",
  "profileImage": "https://example.com/new-image.jpg"
}
```

## 커플 (Couples)

### 커플 생성
```http
POST /couples
```

**헤더:**
```
Authorization: Bearer <token>
```

**요청 본문:**
```json
{
  "user2Id": 2
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userAId": 1,
    "userBId": 2,
    "anniversary": "2024-01-01",
    "name": "우리 커플",
    "status": "confirm",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 커플 정보 조회
```http
GET /couples/{id}
```

**헤더:**
```
Authorization: Bearer <token>
```

### 커플 정보 수정
```http
PUT /couples/{id}
```

**헤더:**
```
Authorization: Bearer <token>
```

**요청 본문:**
```json
{
  "anniversary": "2024-02-14",
  "name": "수정된 커플명"
}
```

## 포스트 (Posts)

### 포스트 목록 조회
```http
GET /posts
```

**쿼리 파라미터:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 10)
- `sort`: 정렬 방식 (`latest`, `likes`, `bookmarks`)
- `visibility`: 공개 여부 (`private`, `public`)

**응답:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "title": "첫 번째 데이트",
        "content": "정말 즐거웠어요!",
        "date": "2024-01-01",
        "emotion": "Joy",
        "visibility": "public",
        "userId": 1,
        "images": [],
        "tags": [],
        "likesCount": 5,
        "bookmarksCount": 2,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 포스트 상세 조회
```http
GET /posts/{id}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "첫 번째 데이트",
    "content": "정말 즐거웠어요!",
    "date": "2024-01-01",
    "emotion": "Joy",
    "visibility": "public",
    "userId": 1,
    "author": {
      "id": 1,
      "nickname": "사용자",
      "profileImage": "https://example.com/image.jpg"
    },
    "images": [
      {
        "id": 1,
        "imageUrl": "https://example.com/post-image.jpg",
        "address": "서울시 강남구",
        "isRepresentative": true
      }
    ],
    "tags": [
      {
        "id": 1,
        "name": "첫데이트"
      }
    ],
    "likesCount": 5,
    "bookmarksCount": 2,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 포스트 생성
```http
POST /posts
```

**헤더:**
```
Authorization: Bearer <token>
```

**요청 본문:**
```json
{
  "title": "새로운 데이트",
  "content": "오늘 정말 즐거웠어요!",
  "date": "2024-01-01",
  "emotion": "Joy",
  "isPublic": true,
  "images": ["image1.jpg", "image2.jpg"],
  "tags": ["데이트", "즐거움"]
}
```

### 포스트 수정
```http
PUT /posts/{id}
```

**헤더:**
```
Authorization: Bearer <token>
```

**요청 본문:**
```json
{
  "title": "수정된 제목",
  "content": "수정된 내용",
  "emotion": "Fun"
}
```

### 포스트 삭제
```http
DELETE /posts/{id}
```

**헤더:**
```
Authorization: Bearer <token>
```

## 기념일 (Anniversaries)

### 기념일 목록 조회
```http
GET /anniversaries
```

**쿼리 파라미터:**
- `coupleId`: 커플 ID
- `year`: 년도

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "첫 만남",
      "date": "2024-01-01",
      "repeat": "YEARLY",
      "memo": "특별한 날",
      "coupleId": 1,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 기념일 생성
```http
POST /anniversaries
```

**헤더:**
```
Authorization: Bearer <token>
```

**요청 본문:**
```json
{
  "coupleId": 1,
  "title": "첫 만남",
  "date": "2024-01-01",
  "repeat": "YEARLY",
  "memo": "특별한 날"
}
```

### 기념일 수정
```http
PUT /anniversaries/{id}
```

**헤더:**
```
Authorization: Bearer <token>
```

**요청 본문:**
```json
{
  "title": "수정된 기념일",
  "memo": "수정된 메모"
}
```

### 기념일 삭제
```http
DELETE /anniversaries/{id}
```

**헤더:**
```
Authorization: Bearer <token>
```

## 좋아요 (Likes)

### 좋아요 추가/제거
```http
POST /likes/{postId}
```

**헤더:**
```
Authorization: Bearer <token>
```

**응답:**
```json
{
  "success": true,
  "message": "좋아요가 추가되었습니다."
}
```

## 북마크 (Bookmarks)

### 북마크 추가/제거
```http
POST /bookmarks/{postId}
```

**헤더:**
```
Authorization: Bearer <token>
```

**응답:**
```json
{
  "success": true,
  "message": "북마크가 추가되었습니다."
}
```

### 북마크 목록 조회
```http
GET /bookmarks
```

**헤더:**
```
Authorization: Bearer <token>
```

**쿼리 파라미터:**
- `page`: 페이지 번호
- `limit`: 페이지당 항목 수

## 이미지 (Images)

### 이미지 업로드
```http
POST /images
```

**헤더:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**요청 본문:**
```
FormData:
- file: [이미지 파일]
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "filename": "uploaded-image.jpg",
    "originalName": "original-image.jpg",
    "mimeType": "image/jpeg",
    "size": 1024000,
    "path": "/uploads/images/",
    "url": "https://example.com/uploads/images/uploaded-image.jpg",
    "userId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 이미지 조회
```http
GET /images/{id}
```

## 채팅 (Chats)

### 채팅방 목록 조회
```http
GET /chats
```

**헤더:**
```
Authorization: Bearer <token>
```

### 채팅 메시지 조회
```http
GET /chats/{id}/messages
```

**헤더:**
```
Authorization: Bearer <token>
```

**쿼리 파라미터:**
- `page`: 페이지 번호
- `limit`: 페이지당 항목 수

### 메시지 전송
```http
POST /chats/{id}/messages
```

**헤더:**
```
Authorization: Bearer <token>
```

**요청 본문:**
```json
{
  "content": "안녕하세요!"
}
```

## 알림 (Notifications)

### 알림 목록 조회
```http
GET /notifications
```

**헤더:**
```
Authorization: Bearer <token>
```

**쿼리 파라미터:**
- `page`: 페이지 번호
- `limit`: 페이지당 항목 수
- `isRead`: 읽음 여부

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "like",
      "message": "사용자가 당신의 포스트에 좋아요를 눌렀습니다.",
      "isRead": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 알림 읽음 처리
```http
PUT /notifications/{id}
```

**헤더:**
```
Authorization: Bearer <token>
```

**요청 본문:**
```json
{
  "isRead": true
}
```

## 설정 (Settings)

### 설정 조회
```http
GET /settings
```

**헤더:**
```
Authorization: Bearer <token>
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": 1,
    "theme": "light",
    "allowPush": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 설정 수정
```http
PUT /settings
```

**헤더:**
```
Authorization: Bearer <token>
```

**요청 본문:**
```json
{
  "theme": "dark",
  "allowPush": false
}
```

## 에러 응답

### 일반적인 에러 응답 형식
```json
{
  "success": false,
  "error": "에러 메시지",
  "message": "사용자에게 보여줄 메시지"
}
```

### HTTP 상태 코드

| 코드 | 설명 |
|------|------|
| 200 | 성공 |
| 201 | 생성됨 |
| 400 | 잘못된 요청 |
| 401 | 인증 실패 |
| 403 | 권한 없음 |
| 404 | 리소스를 찾을 수 없음 |
| 409 | 충돌 (중복 등) |
| 500 | 서버 내부 오류 |

### 일반적인 에러 메시지

#### 인증 관련
- `401 Unauthorized`: 토큰이 없거나 만료됨
- `403 Forbidden`: 권한이 없음

#### 데이터 검증
- `400 Bad Request`: 필수 필드 누락 또는 잘못된 형식
- `409 Conflict`: 중복된 데이터 (이메일, 좋아요 등)

#### 리소스
- `404 Not Found`: 요청한 리소스를 찾을 수 없음

## 웹소켓 (WebSocket)

### 연결
```
ws://localhost:3000/chat
```

**인증:**
```
Authorization: Bearer <token>
```

### 이벤트

#### 메시지 전송
```json
{
  "event": "send_message",
  "data": {
    "chatId": 1,
    "content": "안녕하세요!"
  }
}
```

#### 메시지 수신
```json
{
  "event": "receive_message",
  "data": {
    "id": 1,
    "chatId": 1,
    "userId": 2,
    "content": "안녕하세요!",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 알림 수신
```json
{
  "event": "notification",
  "data": {
    "id": 1,
    "type": "like",
    "message": "사용자가 당신의 포스트에 좋아요를 눌렀습니다.",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 사용 예시

### JavaScript/TypeScript 예시

```typescript
// API 클라이언트 설정
const API_BASE_URL = 'http://localhost:3000';

// 인증 헤더 설정
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

// 포스트 목록 조회
const getPosts = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${API_BASE_URL}/posts?page=${page}&limit=${limit}`,
    {
      headers: getAuthHeaders()
    }
  );
  return response.json();
};

// 포스트 생성
const createPost = async (postData) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(postData)
  });
  return response.json();
};

// 이미지 업로드
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/images`, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeaders().Authorization
    },
    body: formData
  });
  return response.json();
};
```

### cURL 예시

```bash
# 로그인
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# 포스트 목록 조회
curl -X GET http://localhost:3000/posts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# 포스트 생성
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "새로운 데이트",
    "content": "정말 즐거웠어요!",
    "date": "2024-01-01",
    "emotion": "Joy",
    "isPublic": true
  }'
```

## 주의사항

1. **인증**: 대부분의 API는 JWT 토큰이 필요합니다.
2. **요청 제한**: API 호출 횟수에 제한이 있을 수 있습니다.
3. **파일 업로드**: 이미지 업로드 시 multipart/form-data 형식을 사용합니다.
4. **에러 처리**: 항상 응답의 success 필드를 확인하고 적절한 에러 처리를 구현하세요.
5. **페이지네이션**: 목록 조회 시 페이지네이션을 사용하여 성능을 최적화하세요. 