# 프론트엔드 패키지 설치 가이드

## 패키지 설치 방법

모노레포 구조에서 프론트엔드 패키지를 설치할 때는 반드시 `--workspace` 플래그를 사용해야 합니다.
이렇게 하면 package.json이 꼬이는 것을 방지할 수 있습니다.

### 기본 설치 방법

```bash
# 단일 패키지 설치
npm install [패키지명] --workspace=apps/front-end

# 개발 의존성 설치
npm install -D [패키지명] --workspace=apps/front-end
```

### 여러 패키지 한 번에 설치하기

```bash
# 프로덕션 의존성 설치
npm install [패키지1] [패키지2] [패키지3] --workspace=apps/front-end

# 개발 의존성 설치
npm install -D [패키지1] [패키지2] [패키지3] --workspace=apps/front-end
```

## 주의사항

1. 반드시 `--workspace=apps/front-end` 플래그를 사용해야 합니다.
2. 디렉토리를 직접 이동해서 설치하지 마세요.
3. 설치 후 `apps/front-end/package.json`에서 의존성이 올바르게 추가되었는지 확인하세요.
4. Next.js 프로젝트이므로, Next.js와 호환되는 패키지인지 확인하세요.

## 자주 사용되는 패키지 설치 예시

```bash
# UI 라이브러리
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion --workspace=apps/front-end

# 상태 관리
npm install zustand --workspace=apps/front-end

# 폼 관리
npm install react-hook-form --workspace=apps/front-end

# API 클라이언트
npm install axios --workspace=apps/front-end

# 타입 정의
npm install -D @types/react @types/node --workspace=apps/front-end
``` 