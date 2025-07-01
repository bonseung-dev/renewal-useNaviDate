# 백엔드 패키지 설치 가이드

## 인증 관련 패키지 설치

모노레포 구조에서 백엔드 패키지를 설치할 때는 반드시 `--workspace` 플래그를 사용해야 합니다.
이렇게 하면 package.json이 꼬이는 것을 방지할 수 있습니다.

### 필수 패키지 설치

```bash
# 기본 패키지 설치
npm install --save passport --workspace=apps/back-end
npm install --save passport-google-oauth20 --workspace=apps/back-end
npm install --save express-session --workspace=apps/back-end

# 타입 정의 설치
npm install -D @types/express-session @types/passport-google-oauth20 --workspace=apps/back-end
```

### 한 번에 설치하기

모든 패키지를 한 번에 설치하려면 다음 명령어를 사용할 수 있습니다:

```bash
# 프로덕션 의존성 설치
npm install --save passport passport-google-oauth20 express-session --workspace=apps/back-end

# 개발 의존성 설치
npm install -D @types/express-session @types/passport-google-oauth20 --workspace=apps/back-end
```

## 주의사항

1. 반드시 `--workspace=apps/back-end` 플래그를 사용해야 합니다.
2. 디렉토리를 직접 이동해서 설치하지 마세요.
3. 설치 후 `apps/back-end/package.json`에서 의존성이 올바르게 추가되었는지 확인하세요. 