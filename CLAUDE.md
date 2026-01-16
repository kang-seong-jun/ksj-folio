# CLAUDE.md - 프로젝트 가이드

## 프로젝트 개요
- **프로젝트**: ksj-folio (개인 포트폴리오 웹사이트)
- **기술 스택**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Three.js
- **배포**: Firebase Hosting
- **URL**: https://seong-jun-kang.web.app

---

# 2026-01-16 Git & 배포 학습 노트

## 1. Git 브랜치란?

### 브랜치를 왜 쓰는가?
문서 작업할 때 "최종.docx", "최종_진짜.docx", "최종_진짜_최종.docx" 만들어본 적 있을 것이다.
Git 브랜치는 이런 버전 관리를 **똑똑하게** 하는 방법이다.

### 브랜치 = 책갈피
하나의 책(프로젝트 폴더)에 여러 개의 책갈피를 꽂아놓고, 필요할 때마다 책갈피를 바꿔가며 읽는 것과 같다.

```
📖 /Users/kang/Cursor/ksj-folio (하나의 폴더)
   ├─ 📑 main (메인 버전)
   ├─ 📑 feature/dark-mode (다크모드 작업중)
   └─ 📑 bugfix/header (헤더 버그 수정중)

"main 보다가 feature/dark-mode로 전환했다가 다시 main으로"
→ 같은 폴더인데 내용만 바뀜
```

### 브랜치 실제 사용 예시

```bash
# 1. 새 기능 작업 시작
git checkout -b feature/login
# → feature/login 브랜치 생성하고 그쪽으로 이동
# → 이제 여기서 작업해도 main은 안전!

# 2. 작업하고 저장
git add .
git commit -m "로그인 기능 추가"

# 3. 작업 완료 후 main에 합치기
git checkout main          # main으로 돌아가기
git merge feature/login    # feature/login 내용을 main에 합침

# 4. 다 쓴 브랜치 삭제
git branch -d feature/login
```

---

## 2. 브랜치 vs 워크트리 (헷갈리기 쉬운 개념)

### 브랜치 = 책갈피 (95% 이것만 씀)
- 같은 폴더에서 내용만 바뀜
- `git checkout 브랜치명`으로 전환
- 한 번에 하나만 볼 수 있음

### 워크트리 = 책을 여러 권 복사해서 펼쳐놓기 (특수한 경우)
- 여러 폴더에서 동시에 다른 버전 작업
- 긴급 버그 수정하면서 기존 작업 유지할 때 유용

```bash
# 워크트리 예시 (거의 안 씀)
git worktree add ../ksj-folio-hotfix main
# → ../ksj-folio-hotfix 폴더가 생기고 main 브랜치 내용이 들어감
# → 원래 폴더와 새 폴더에서 동시에 다른 작업 가능
```

**결론: 초보자는 브랜치만 알면 됨. 워크트리는 나중에 필요할 때 배워도 됨.**

---

## 3. origin이 뭐야? (로컬 vs 원격)

### 핵심 개념
```
origin = GitHub 주소의 별명
       = https://github.com/kang-seong-jun/ksj-folio.git 를 짧게 부르는 것
```

### origin 있고 없고의 차이

| 브랜치 이름 | 위치 | 설명 |
|------------|------|------|
| `main` | 💻 내 컴퓨터 | 직접 수정 가능 |
| `origin/main` | ☁️ GitHub 상태 복사본 | 읽기 전용, push해야 반영됨 |

### 비유로 이해하기

```
main              = 내 책상 위 문서 (바로 수정 가능)
origin/main       = 회사 서버에 올린 문서 (push로 업로드해야 반영)
```

### 동기화 흐름

```bash
# 내가 작업한 거 GitHub에 올리기
git push origin main
# → 내 컴퓨터 main → GitHub main 업로드

# 다른 사람이 올린 거 받아오기
git pull origin main
# → GitHub main → 내 컴퓨터 main 다운로드

# GitHub 상태만 확인 (다운로드 안 함)
git fetch origin
# → origin/main이 업데이트됨 (내 main은 그대로)
```

---

## 4. 자주 쓰는 Git 명령어 정리

### 매일 쓰는 것 (필수)

```bash
git status                  # 지금 뭐가 바뀌었는지 확인 (가장 많이 씀!)
git add .                   # 모든 변경사항 스테이징 (커밋 준비)
git commit -m "메시지"      # 스냅샷 저장
git push                    # GitHub에 업로드
git pull                    # GitHub에서 다운로드
```

### 브랜치 관련

```bash
git branch                  # 브랜치 목록 보기
git checkout -b 브랜치명    # 새 브랜치 만들고 이동
git checkout main           # main으로 이동
git merge 브랜치명          # 현재 브랜치에 다른 브랜치 합치기
git branch -d 브랜치명      # 로컬 브랜치 삭제
git push origin --delete 브랜치명  # 원격 브랜치 삭제
```

### 실수했을 때

```bash
git restore 파일명          # 수정한 거 되돌리기 (커밋 전)
git stash                   # 작업 중인 거 임시 저장
git stash pop               # 임시 저장한 거 꺼내기
```

### 히스토리 확인

```bash
git log --oneline           # 커밋 기록 간단히 보기
git diff                    # 뭐가 바뀌었는지 상세히 보기
```

---

## 5. 태그란? (버전 마킹)

### 태그 vs 브랜치
- **브랜치**: 계속 변하는 작업 라인
- **태그**: 특정 시점을 고정해서 마킹 (릴리즈 버전 등)

```bash
git tag v1.0.0              # 현재 커밋에 태그 달기
git tag                     # 태그 목록 보기
git push origin --tags      # 태그 GitHub에 올리기
git checkout v1.0.0         # 그 시점으로 이동해서 보기
```

### 백업할 때 태그 vs 브랜치
- **태그 (권장)**: 가볍게 마킹만, 브랜치 목록 안 지저분해짐
- **브랜치 백업 (비추천)**: 브랜치 목록이 길어져서 관리 어려움

---

## 6. Firebase 배포 방법

### 필요한 설정

**next.config.ts** (static export 필수)
```typescript
const nextConfig: NextConfig = {
  output: 'export',      // 정적 파일로 빌드
  images: {
    unoptimized: true,   // 이미지 최적화 비활성화 (Firebase용)
  },
};
```

**firebase.json** (호스팅 설정)
```json
{
  "hosting": {
    "public": "out",     // 빌드 결과물 폴더
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

### 배포 종류

| 종류 | 명령어 | URL | 용도 |
|------|--------|-----|------|
| 정식 배포 | `firebase deploy --only hosting` | https://seong-jun-kang.web.app | 실제 사용자용 |
| 프리뷰 배포 | `firebase hosting:channel:deploy test --expires 7d` | https://seong-jun-kang--test-xxx.web.app | 테스트용 (7일 후 만료) |

### 배포 과정

```bash
# 1. 빌드 (out/ 폴더 생성)
npm run build

# 2-A. 정식 배포
firebase deploy --only hosting

# 2-B. 또는 프리뷰 배포 (테스트용)
firebase hosting:channel:deploy test-3 --expires 7d

# 프리뷰 채널 목록 보기
firebase hosting:channel:list
```

### 캐시 문제
배포 후 변경이 안 보이면 **브라우저 캐시** 문제일 수 있다.
- Mac: `Cmd + Shift + R` (강제 새로고침)
- 또는 시크릿/프라이빗 모드로 열기

---

## 7. 이 프로젝트 수정 가이드

### Hero 섹션 텍스트 변경
3곳을 같이 수정해야 일관성 유지:
1. `app/page.tsx` (225-228줄) - 실제 표시되는 텍스트
2. `lib/data.ts` (bio 필드) - 데이터
3. `app/layout.tsx` (description) - SEO 메타데이터

### 배경 색상 변경
- **네트워크 도형**: `components/three/VantaBackground.tsx`
  - `color: 0xf97316` (16진수 색상코드)
- **파티클**: `components/three/ParticleField.tsx`
  - `colorPalette` 배열에서 색상 추가/변경

---

## 8. 프로젝트 구조

```
ksj-folio/
├── app/
│   ├── layout.tsx          # 레이아웃, 메타데이터
│   ├── page.tsx            # 메인 페이지 (Hero, Research 등)
│   └── globals.css         # 전역 스타일
├── components/
│   └── three/
│       ├── ParticleField.tsx     # 파티클 배경
│       └── VantaBackground.tsx   # 네트워크 배경
├── lib/
│   └── data.ts             # 프로필, 연구 관심사 등 데이터
├── public/
│   └── cv/                 # CV PDF 파일
├── out/                    # 빌드 결과물 (배포용)
├── next.config.ts          # Next.js 설정
├── firebase.json           # Firebase 호스팅 설정
└── .firebaserc             # Firebase 프로젝트 연결
```

---

## 빠른 참조 명령어

```bash
# 개발
npm run dev                 # 로컬 개발 서버 (localhost:3000)

# 빌드 & 정식 배포
npm run build && firebase deploy --only hosting

# 프리뷰 배포
npm run build && firebase hosting:channel:deploy test --expires 7d

# 브랜치 작업
git checkout -b feature/새기능   # 새 브랜치에서 작업 시작
git checkout main && git merge feature/새기능  # 작업 완료 후 합치기

# 정리
git branch -d 브랜치명           # 로컬 브랜치 삭제
git push origin --delete 브랜치명  # 원격 브랜치 삭제
git fetch --prune               # 삭제된 원격 브랜치 로컬에서 정리
```
