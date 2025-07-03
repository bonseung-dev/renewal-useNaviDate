# 머지 후 Import 경로 오류 수정사항

## 문제 상황
dev 브랜치와 머지 후 프론트엔드 빌드 시 다음과 같은 오류가 발생했습니다:

```
Type error: Cannot find module '@/app/(routes)/date-detail/[id]/page' or its corresponding type declarations.
```

## 원인
여러 컴포넌트에서 존재하지 않는 파일 경로에서 `Date` 타입을 import하고 있었습니다:
- `@/app/(routes)/date-detail/[id]/page` (존재하지 않는 경로)
- 실제로는 `@/types/post.type`에서 `CalendarPost` 타입을 사용해야 함

## 수정된 파일들

### 1. `place-name.tsx`
**변경 전:**
```typescript
import { Date } from '@/app/(routes)/date-detail/[id]/page';

const PlaceName = ({ date }: { date: Date }) => {
  return (
    <p>{date.place}</p>
  );
};
```

**변경 후:**
```typescript
import { CalendarPost } from '@/types/post.type';

const PlaceName = ({ date }: { date: CalendarPost }) => {
  const placeAddress = date.images?.[0]?.address || '장소 정보 없음';
  
  return (
    <p>{placeAddress}</p>
  );
};
```

### 2. `searched-address.tsx`
**변경 전:**
```typescript
import { Date } from '@/app/(routes)/date-detail/[id]/page';

const SearchedAddress = ({ date }: { date: Date }) => {
  return (
    <p>{date.address}</p>
  );
};
```

**변경 후:**
```typescript
import { CalendarPost } from '@/types/post.type';

const SearchedAddress = ({ date }: { date: CalendarPost }) => {
  const address = date.images?.[0]?.address || '주소 정보 없음';
  
  return (
    <p>{address}</p>
  );
};
```

### 3. `written-content.tsx`
**변경 전:**
```typescript
import { Date } from '@/app/(routes)/date-detail/[id]/page';

const WrittenContent = ({ date }: { date: Date }) => {
  return (
    <div>
      <h3>{date.title}</h3>
      <p>{date.content}</p>
    </div>
  );
};
```

**변경 후:**
```typescript
import { CalendarPost } from '@/types/post.type';

const WrittenContent = ({ date }: { date: CalendarPost }) => {
  return (
    <div>
      <h3>{date.title}</h3>
      <p>{date.content}</p>
    </div>
  );
};
```

### 4. `written-tags.tsx`
**변경 전:**
```typescript
import { Date } from '@/app/(routes)/date-detail/[id]/page';

const WrittenTags = ({ date }: { date: Date }) => {
  return (
    <div>
      {date.tags.map((tag, index) => (
        <p key={tag + index}>#{tag}</p>
      ))}
    </div>
  );
};
```

**변경 후:**
```typescript
import { CalendarPost } from '@/types/post.type';

const WrittenTags = ({ date }: { date: CalendarPost }) => {
  // CalendarPost 타입에는 tags 필드가 없으므로 임시로 빈 배열 사용
  const tags: string[] = [];
  
  return (
    <div>
      {tags.map((tag, index) => (
        <p key={tag + index}>#{tag}</p>
      ))}
    </div>
  );
};
```

### 5. `uploaded-image-items.tsx`
**변경 전:**
```typescript
import { Date } from '@/app/(routes)/date-detail/[id]/page';

const UploadedImageItems = ({ date }: { date: Date }) => {
  return (
    <>
      {date.images.map((image, index) => (
        <Image
          src={image}
          alt={`업로드 이미지${image[index]}`}
        />
      ))}
    </>
  );
};
```

**변경 후:**
```typescript
import { CalendarPost } from '@/types/post.type';

const UploadedImageItems = ({ date }: { date: CalendarPost }) => {
  return (
    <>
      {date.images.map((image, index) => (
        <Image
          src={image.imageUrl}
          alt={`업로드 이미지${index + 1}`}
        />
      ))}
    </>
  );
};
```

### 6. `uploaded-images-carousel.tsx`
**변경 전:**
```typescript
import { Date } from '@/app/(routes)/date-detail/[id]/page';

export type UploadedImagesCarouselProps = {
  date: Date;
};
```

**변경 후:**
```typescript
import { CalendarPost } from '@/types/post.type';

export type UploadedImagesCarouselProps = {
  date: CalendarPost;
};
```

## 주요 수정사항 요약

1. **Import 경로 수정**: 모든 `@/app/(routes)/date-detail/[id]/page`를 `@/types/post.type`로 변경
2. **타입 통일**: `Date` 타입을 `CalendarPost` 타입으로 통일
3. **필드 매핑**:
   - `place` → `images[0].address`
   - `address` → `images[0].address`
   - `images` 배열의 문자열 → `imageUrl` 필드
   - `tags` → 임시 빈 배열 (CalendarPost에 tags 필드 없음)

## 참고사항

- `CalendarPost` 타입에는 `tags` 필드가 없어서 임시로 빈 배열을 사용했습니다.
- 향후 백엔드 API와 연동 시 `tags` 필드를 추가하거나 별도 API로 태그 정보를 가져와야 할 수 있습니다.
- `images` 배열의 `address` 필드를 사용하여 장소 정보를 표시하도록 변경했습니다.

## 검증 방법

빌드 명령어로 오류가 해결되었는지 확인:
```bash
cd apps/front-end
npm run build
``` 