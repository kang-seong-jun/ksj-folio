# Git & Firebase 기초 학습 노트
> 작성일: 2026-01-16
> 대상: Git 초보자, Firebase 배포 처음 하는 사람
> 이 문서는 LLM이 참고하기에도 좋게 작성됨

---

## 1. Git 브랜치란?

### 왜 브랜치를 쓰는가?

문서 작업할 때 이런 경험 있을 것이다:
- "보고서_최종.docx"
- "보고서_최종_수정.docx"
- "보고서_최종_진짜최종.docx"

Git 브랜치는 이런 버전 관리를 **체계적으로** 하는 방법이다.

### 브랜치 = 책갈피

하나의 책(프로젝트 폴더)에 여러 개의 책갈피를 꽂아놓고, 필요할 때마다 책갈피를 바꿔가며 읽는 것과 같다.

```
📖 /Users/kang/Cursor/ksj-folio (하나의 폴더)
   ├─ 📑 main (메인 버전 - 항상 작동하는 안정적인 코드)
   ├─ 📑 feature/dark-mode (다크모드 작업중)
   └─ 📑 bugfix/header (헤더 버그 수정중)

"main 보다가 feature/dark-mode로 전환했다가 다시 main으로"
→ 같은 폴더인데 파일 내용만 바뀜
```

### 브랜치 실제 사용 흐름

```bash
# 1. 새 기능 작업 시작
git checkout -b feature/login
# → feature/login 브랜치 생성하고 그쪽으로 이동
# → 이제 여기서 작업해도 main은 안전하게 보존됨!

# 2. 작업하고 저장 (여러 번 반복)
git add .
git commit -m "로그인 폼 UI 추가"
git commit -m "로그인 API 연동"

# 3. 작업 완료 후 main에 합치기
git checkout main              # main으로 돌아가기
git merge feature/login        # feature/login 내용을 main에 합침

# 4. 다 쓴 브랜치 삭제 (정리)
git branch -d feature/login
```

### main 브랜치는 신성한 곳

- main에는 **항상 작동하는 코드**만 있어야 함
- 직접 main에서 작업하지 말고, 브랜치 만들어서 작업 후 merge
- 이렇게 하면 실수해도 main은 안전

---

## 2. 브랜치 vs 워크트리 (헷갈리기 쉬운 개념)

### 브랜치 = 책갈피 (95% 이것만 씀)

```
하나의 폴더에서 git checkout으로 내용 전환
├─ 장점: 간단, 디스크 공간 적게 사용
└─ 단점: 한 번에 하나의 브랜치만 볼 수 있음
```

### 워크트리 = 책을 여러 권 복사해서 펼쳐놓기

```
여러 폴더에서 동시에 다른 브랜치 작업
├─ 장점: 동시에 여러 버전 작업 가능
├─ 단점: 디스크 공간 많이 사용, 복잡
└─ 용도: 긴급 버그 수정하면서 기존 작업 유지할 때
```

```bash
# 워크트리 예시 (특수한 경우에만 사용)
git worktree add ../ksj-folio-hotfix main
# → ../ksj-folio-hotfix 폴더가 새로 생김
# → 그 폴더에는 main 브랜치 내용이 들어감
# → 원래 폴더와 새 폴더에서 동시에 다른 작업 가능
```

**결론: 초보자는 브랜치만 알면 충분. 워크트리는 필요할 때 배워도 됨.**

---

## 3. origin이 뭐야? (로컬 vs 원격)

### 핵심 개념

```
origin = GitHub 저장소 주소의 "별명"
       = https://github.com/username/repo.git 를 짧게 부르는 것
```

```bash
# origin이 뭔지 확인
git remote -v
# 출력: origin  https://github.com/kang-seong-jun/ksj-folio.git
```

### 로컬 브랜치 vs 원격 브랜치

| 브랜치 이름 | 위치 | 설명 |
|------------|------|------|
| `main` | 💻 내 컴퓨터 | 직접 수정 가능 |
| `origin/main` | ☁️ GitHub 상태의 로컬 복사본 | 읽기 전용, push해야 반영됨 |

### 비유

```
main              = 내 책상 위 문서 (바로 수정 가능)
origin/main       = 회사 공유 서버에 올린 문서 (업로드해야 반영)
```

### 동기화 명령어

```bash
# 내가 작업한 거 GitHub에 올리기
git push origin main
# → 내 컴퓨터의 main → GitHub의 main으로 업로드

# GitHub에서 받아오기 (다른 사람이 올린 거)
git pull origin main
# → GitHub의 main → 내 컴퓨터의 main으로 다운로드

# GitHub 상태만 확인 (다운로드 안 함)
git fetch origin
# → origin/main이 최신 상태로 업데이트됨
# → 내 main은 그대로 (아직 합치지 않음)
```

---

## 4. 자주 쓰는 Git 명령어

### 매일 쓰는 필수 명령어

```bash
git status                  # 현재 상태 확인 (가장 많이 씀!)
git add .                   # 모든 변경사항 스테이징 (커밋 준비)
git commit -m "메시지"       # 변경사항 저장 (스냅샷)
git push                    # GitHub에 업로드
git pull                    # GitHub에서 다운로드
```

### 브랜치 관련

```bash
git branch                  # 브랜치 목록 보기 (* 표시가 현재 브랜치)
git branch -a               # 원격 브랜치까지 전부 보기
git checkout -b 브랜치명     # 새 브랜치 만들고 이동 (한번에)
git checkout main           # main 브랜치로 이동
git merge 브랜치명           # 다른 브랜치를 현재 브랜치에 합치기
git branch -d 브랜치명       # 로컬 브랜치 삭제
git push origin --delete 브랜치명  # 원격(GitHub) 브랜치 삭제
```

### 실수 되돌리기

```bash
git restore 파일명           # 파일 수정 취소 (커밋 전)
git restore --staged 파일명  # 스테이징 취소 (add 취소)
git stash                   # 작업 중인 내용 임시 저장
git stash pop               # 임시 저장한 내용 꺼내기
```

### 히스토리 확인

```bash
git log --oneline           # 커밋 기록 간단히 보기
git log --oneline --graph   # 브랜치 그래프로 보기
git diff                    # 변경 내용 상세히 보기
```

---

## 5. 태그 (Tag) - 버전 마킹

### 태그 vs 브랜치

- **브랜치**: 계속 변하는 작업 라인 (움직이는 포인터)
- **태그**: 특정 시점을 고정해서 마킹 (움직이지 않음)

### 태그 사용법

```bash
git tag v1.0.0                    # 현재 커밋에 태그 달기
git tag -a v1.0.0 -m "설명"        # 설명 포함 태그
git tag                           # 태그 목록 보기
git push origin --tags            # 태그 GitHub에 올리기
git checkout v1.0.0               # 그 시점으로 이동해서 보기
```

### 백업할 때 태그 vs 브랜치

```bash
# 방법 1: 태그 (권장) - 가볍고 깔끔
git tag backup-2026-01-16
git push origin --tags

# 방법 2: 브랜치 (비추천) - 목록이 지저분해짐
git branch backup-2026-01-16
git push origin backup-2026-01-16
```

**결론: 백업/버전 마킹은 태그 사용 권장**

---

## 6. Firebase Hosting 배포

### 개념

Firebase Hosting = 정적 웹사이트를 호스팅해주는 서비스
- HTML, CSS, JS 파일을 올리면 URL로 접근 가능
- Next.js의 경우 `output: 'export'`로 정적 파일 생성 필요

### 필요한 설정 파일

**next.config.ts** (Next.js 설정)
```typescript
const nextConfig: NextConfig = {
  output: 'export',      // 정적 파일로 빌드 (필수!)
  images: {
    unoptimized: true,   // 이미지 최적화 비활성화
  },
};
```

**firebase.json** (Firebase 호스팅 설정)
```json
{
  "hosting": {
    "public": "out",     // 빌드 결과물 폴더 (Next.js는 out)
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

**.firebaserc** (프로젝트 연결)
```json
{
  "projects": {
    "default": "프로젝트ID"
  }
}
```

### 배포 종류

| 종류 | 명령어 | URL | 용도 |
|------|--------|-----|------|
| 정식 배포 (live) | `firebase deploy --only hosting` | https://프로젝트.web.app | 실제 사용자용 |
| 프리뷰 배포 | `firebase hosting:channel:deploy 채널명 --expires 7d` | https://프로젝트--채널명-xxx.web.app | 테스트용 (만료됨) |

### 배포 과정

```bash
# 1. 빌드 (out/ 폴더에 정적 파일 생성)
npm run build

# 2-A. 정식 배포
firebase deploy --only hosting

# 2-B. 프리뷰 배포 (테스트용, 7일 후 만료)
firebase hosting:channel:deploy test --expires 7d

# 프리뷰 채널 목록 보기
firebase hosting:channel:list
```

### 캐시 문제 해결

배포 후 변경이 안 보이면 **브라우저 캐시** 문제일 수 있다:
- Mac: `Cmd + Shift + R` (강제 새로고침)
- Windows: `Ctrl + Shift + R`
- 또는 시크릿/프라이빗 모드로 열기

---

## 7. 실전 워크플로우 예시

### 새 기능 개발 → 테스트 → 배포

```bash
# 1. 새 브랜치에서 작업 시작
git checkout main
git pull origin main              # 최신 코드 받기
git checkout -b feature/새기능

# 2. 작업 (코딩...)
git add .
git commit -m "feat: 새 기능 추가"

# 3. 프리뷰 배포로 테스트
npm run build
firebase hosting:channel:deploy feature-test --expires 7d
# → 프리뷰 URL에서 확인

# 4. 테스트 OK → main에 합치기
git checkout main
git merge feature/새기능
git push origin main

# 5. 정식 배포
npm run build
firebase deploy --only hosting

# 6. 브랜치 정리
git branch -d feature/새기능
```

---

## 8. 자주 하는 실수 & 해결법

### "변경사항이 있어서 checkout 안 됨"

```bash
# 해결법 1: 커밋하기
git add . && git commit -m "작업중"

# 해결법 2: 임시 저장
git stash
git checkout 다른브랜치
# 나중에 돌아와서
git stash pop
```

### "push가 거부됨 (rejected)"

```bash
# 원인: GitHub에 내가 없는 커밋이 있음
# 해결: 먼저 pull 받고 push
git pull origin main
git push origin main
```

### "merge conflict (충돌)"

```bash
# 같은 부분을 여러 사람이 수정했을 때 발생
# 1. 충돌 파일 열기 (<<<<<<, ======, >>>>>> 표시 있음)
# 2. 원하는 내용으로 수동 수정
# 3. 저장 후
git add .
git commit -m "Merge conflict 해결"
```

---

## 요약 명령어 모음

```bash
# === 기본 ===
git status                       # 상태 확인
git add . && git commit -m "msg" # 저장
git push                         # 업로드
git pull                         # 다운로드

# === 브랜치 ===
git checkout -b feature/xxx      # 새 브랜치 만들고 이동
git checkout main                # main으로 이동
git merge feature/xxx            # 합치기
git branch -d feature/xxx        # 삭제

# === 태그 ===
git tag v1.0.0                   # 태그 달기
git push origin --tags           # 태그 업로드

# === Firebase ===
npm run build                    # 빌드
firebase deploy --only hosting   # 정식 배포
firebase hosting:channel:deploy test --expires 7d  # 프리뷰 배포
```
