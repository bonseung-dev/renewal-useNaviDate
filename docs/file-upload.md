# 파일 업로드 기능 문서

## 개요
이 문서는 게시글 이미지 업로드 기능에 대한 설명을 담고 있습니다.

## 엔티티 구조

### PostImage 엔티티
```typescript
@Entity('post_images')
export class PostImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  post_id: string;

  @Column()
  original_name: string;

  @Column()
  file_name: string;

  @Column()
  file_path: string;

  @Column()
  file_type: string;

  @Column()
  file_size: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  order?: number;

  @ManyToOne(() => Post, post => post.images)
  post: Post;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
```

## API 엔드포인트

### 1. 이미지 업로드
- **URL**: `POST /post-images/:postId`
- **인증**: JWT 토큰 필요
- **요청 형식**: multipart/form-data
- **파라미터**:
  - `file`: 이미지 파일
  - `address`: (선택) 이미지 주소 정보
- **응답**: 업로드된 이미지 정보

### 2. 이미지 삭제
- **URL**: `DELETE /post-images/:id`
- **인증**: JWT 토큰 필요
- **응답**: 삭제 성공 메시지

### 3. 게시글별 이미지 조회
- **URL**: `GET /post-images/post/:postId`
- **인증**: JWT 토큰 필요
- **응답**: 이미지 목록 (order 기준 정렬)

### 4. 이미지 순서 변경
- **URL**: `POST /post-images/:id/order`
- **인증**: JWT 토큰 필요
- **요청 본문**: `{ "order": number }`
- **응답**: 업데이트된 이미지 정보

## 파일 저장 구조
- 저장 위치: `uploads/posts/`
- 파일명: UUID + 원본 확장자
- 예시: `550e8400-e29b-41d4-a716-446655440000.jpg`

## 사용 예시

### 이미지 업로드
```bash
curl -X POST http://localhost:3000/post-images/{postId} \
  -H "Authorization: Bearer {your_jwt_token}" \
  -F "file=@/path/to/image.jpg" \
  -F "address=서울시 강남구"
```

### 이미지 조회
```bash
curl http://localhost:3000/post-images/post/{postId} \
  -H "Authorization: Bearer {your_jwt_token}"
```

### 이미지 삭제
```bash
curl -X DELETE http://localhost:3000/post-images/{imageId} \
  -H "Authorization: Bearer {your_jwt_token}"
```

### 이미지 순서 변경
```bash
curl -X POST http://localhost:3000/post-images/{imageId}/order \
  -H "Authorization: Bearer {your_jwt_token}" \
  -H "Content-Type: application/json" \
  -d '{"order": 1}'
```

## 주의사항
1. 모든 엔드포인트는 JWT 인증이 필요합니다.
2. 파일 업로드 시 multipart/form-data 형식을 사용합니다.
3. 이미지 삭제 시 실제 파일과 DB 레코드가 모두 삭제됩니다.
4. 이미지 순서는 order 필드를 통해 관리됩니다. 