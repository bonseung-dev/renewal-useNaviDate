# useNaviDate - 모노레포

NaviDate 프로젝트의 모노레포 구조입니다.

## 프로젝트 구조

```
useNaviDate/
├── apps/
│   ├── front-end/          # Next.js 프론트엔드 애플리케이션
│   └── back-end/           # NestJS 백엔드 API
├── packages/
│   └── shared/             # 공유 타입과 유틸리티
└── package.json            # 루트 워크스페이스 설정
```

## 설치 및 실행

### 전체 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
# 모든 서비스 동시 실행
npm run dev

# 개별 서비스 실행
npm run dev:front    # 프론트엔드만
npm run dev:back     # 백엔드만
npm run dev:shared   # 공유 패키지만
```

### 빌드
```bash
# 전체 빌드
npm run build

# 개별 빌드
npm run build:front
npm run build:back
npm run build:shared
```

### 프로덕션 실행
```bash
npm run start:front
npm run start:back
```

## 패키지 설명

### @use-navi-date/front-end
- Next.js 기반 프론트엔드 애플리케이션
- React, TypeScript, Tailwind CSS 사용
- 포트: 3000

### @use-navi-date/back-end
- NestJS 기반 백엔드 API
- TypeScript, TypeORM, PostgreSQL 사용
- 포트: 3001

### @use-navi-date/shared
- 프론트엔드와 백엔드 간 공유 타입과 유틸리티
- 공통 인터페이스, 상수, 헬퍼 함수 포함

## 개발 가이드

### 새로운 기능 추가
1. 공통 타입이 필요한 경우 `packages/shared/src/index.ts`에 추가
2. 프론트엔드 기능은 `apps/front-end/src/`에 추가
3. 백엔드 기능은 `apps/back-end/src/modules/`에 추가

### 타입 공유
```typescript
// shared 패키지에서 타입 정의
export interface User {
  id: number;
  email: string;
  name: string;
}

// 프론트엔드에서 사용
import { User } from '@use-navi-date/shared';

// 백엔드에서 사용
import { User } from '@use-navi-date/shared';
```

## 기술 스택

### 프론트엔드
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand

### 백엔드
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Socket.io
- Passport.js

### 공통
- TypeScript
- ESLint
- Prettier

## 개발 환경 설정

### 로컬 개발
```bash
# 모든 의존성 설치
npm run install:all

# 백엔드 개발 서버 실행
npm run dev:backend

# 프론트엔드 개발 서버 실행 (새 터미널)
npm run dev:frontend
```

### Docker를 사용한 개발 환경
```bash
# 개발 환경 실행 (DB + 백엔드 + 프론트엔드)
npm run docker:dev

# 개발 환경 빌드 후 실행
npm run docker:dev:build

# 개발 환경 로그 확인
npm run docker:dev:logs

# 개발 환경 중지
npm run docker:dev:down
```

### Docker를 사용한 프로덕션 환경
```bash
# 프로덕션 환경 실행
npm run docker:prod

# 프로덕션 환경 빌드 후 실행
npm run docker:prod:build

# 프로덕션 환경 로그 확인
npm run docker:prod:logs

# 프로덕션 환경 중지
npm run docker:prod:down
```

## 환경별 포트 및 데이터베이스

### 개발 환경 (Dev)
- **백엔드**: http://localhost:3000
- **프론트엔드**: http://localhost:3001
- **데이터베이스**: localhost:10004 (use_navi_date_dev)
- **네트워크**: usenavi-dev-network

### 프로덕션 환경 (Prod)
- **백엔드**: http://localhost:3002
- **프론트엔드**: http://localhost:3003
- **데이터베이스**: localhost:10005 (use_navi_date_prod)
- **네트워크**: usenavi-prod-network

## 빌드

```bash
# 공유 패키지 빌드
npm run build:shared

# 백엔드 빌드
npm run build:nest

# 프론트엔드 빌드
npm run build:front

# 전체 빌드
npm run build
```

## 프로젝트 구조

```
useNaviDate/
├── apps/
│   ├── back-end/          # NestJS 백엔드
│   └── front-end/         # Next.js 프론트엔드
├── packages/
│   └── shared/            # 공유 타입 및 상수
├── docs/                  # 문서
├── docker-compose.dev.yml # 개발 환경 Docker Compose
├── docker-compose.prod.yml # 프로덕션 환경 Docker Compose
└── Dockerfile*            # Docker 설정 파일들
```
