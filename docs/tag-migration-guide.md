# 태그 모듈 마이그레이션 가이드

## 개요
기존의 `PostTag` 엔티티를 `Tag` 엔티티로 변경하여 다대다 관계를 구현하는 마이그레이션 가이드입니다.

## 변경 사항

### 1. 데이터베이스 스키마 변경

#### 기존 구조 (PostTag)
```sql
CREATE TABLE post_tags (
    id SERIAL PRIMARY KEY,
    postId INTEGER REFERENCES posts(id),
    name VARCHAR NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP,
    isDeleted BOOLEAN DEFAULT FALSE
);
```

#### 새로운 구조 (Tag + post_tags 연결 테이블)
```sql
-- 태그 테이블
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP,
    isDeleted BOOLEAN DEFAULT FALSE
);

-- 포스트-태그 연결 테이블 (자동 생성됨)
-- TypeORM의 @ManyToMany 데코레이터가 자동으로 생성
```

### 2. 마이그레이션 단계

#### 1단계: 데이터 백업
```sql
-- 기존 post_tags 데이터 백업
CREATE TABLE post_tags_backup AS SELECT * FROM post_tags;
```

#### 2단계: 새로운 태그 생성
```sql
-- 고유한 태그명 추출하여 tags 테이블에 삽입
INSERT INTO tags (name, "createdAt", "updatedAt", "isDeleted")
SELECT DISTINCT name, MIN("createdAt"), MAX("updatedAt"), false
FROM post_tags_backup
GROUP BY name;
```

#### 3단계: 연결 테이블 생성
```sql
-- post_tags 테이블을 post_tags_old로 이름 변경
ALTER TABLE post_tags RENAME TO post_tags_old;

-- TypeORM이 자동으로 새로운 연결 테이블을 생성할 것입니다
```

#### 4단계: 데이터 마이그레이션
```sql
-- 새로운 연결 테이블에 데이터 삽입
INSERT INTO post_tags_tags_posts (tagId, postId)
SELECT t.id, pt.postId
FROM post_tags_old pt
JOIN tags t ON pt.name = t.name
WHERE pt."isDeleted" = false;
```

### 3. 코드 변경 사항

#### PostsService 수정
```typescript
// 기존
async createPost(createPostDto: CreatePostDto): Promise<Post> {
  // PostTag 생성 로직
  const postTags = createPostDto.tags?.map(tagName => 
    this.postTagRepository.create({ name: tagName, postId: post.id })
  );
}

// 새로운 방식
async createPost(createPostDto: CreatePostDto): Promise<Post> {
  // Tag 생성 또는 조회
  const tags = await this.tagsService.createMultiple({ 
    names: createPostDto.tags || [] 
  });
  post.tags = tags;
}
```

#### PostsController 수정
```typescript
// 기존 PostTag 관련 엔드포인트 제거
// 새로운 Tag 엔드포인트 사용
```

### 4. API 엔드포인트

#### 태그 관리
- `POST /tags` - 단일 태그 생성
- `POST /tags/multiple` - 다중 태그 생성
- `GET /tags` - 모든 태그 조회
- `GET /tags/popular` - 인기 태그 조회
- `GET /tags/:id` - 특정 태그 조회
- `PUT /tags/:id` - 태그 수정
- `DELETE /tags/:id` - 태그 삭제

### 5. 장점

1. **태그 재사용**: 동일한 태그를 여러 포스트에서 사용 가능
2. **효율적인 검색**: 태그별 포스트 검색 성능 향상
3. **일관성**: 태그명의 일관성 보장
4. **확장성**: 태그 관련 기능 확장 용이

### 6. 주의사항

1. **데이터 무결성**: 마이그레이션 중 데이터 손실 방지
2. **백업**: 반드시 기존 데이터 백업
3. **테스트**: 마이그레이션 후 충분한 테스트 필요
4. **롤백 계획**: 문제 발생 시 롤백 방법 준비

### 7. 테스트 시나리오

1. 태그 생성/수정/삭제
2. 포스트에 태그 추가/제거
3. 태그별 포스트 검색
4. 인기 태그 조회
5. 태그 중복 처리

## 결론
이 마이그레이션을 통해 더 효율적이고 확장 가능한 태그 시스템을 구축할 수 있습니다. 단계별로 진행하고 충분한 테스트를 거쳐 안전하게 적용하시기 바랍니다.
