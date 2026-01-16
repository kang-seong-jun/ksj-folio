# CLAUDE.md - 프로젝트 가이드

## 프로젝트 개요
- **프로젝트**: ksj-folio (개인 포트폴리오 웹사이트)
- **기술 스택**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Three.js
- **배포**: Firebase Hosting
- **URL**: https://seong-jun-kang.web.app

---

## 2026-01-16 학습 내용 정리

### 1. Git 브랜치 vs 워크트리

#### 브랜치 (Branch) = 책갈피
- 같은 폴더에서 `git checkout 브랜치명`으로 전환
- 한 번에 하나의 브랜치만 작업 가능
- 디스크 공간 적게 사용
- **95% 경우 이것만 사용**

```bash
git checkout -b feature/새기능  # 브랜치 생성 + 전환
git checkout main               # main으로 전환
git branch -d feature/새기능    # 브랜치 삭제
```

#### 워크트리 (Worktree) = 책을 여러 권 펼쳐놓기
- 여러 폴더에서 동시에 다른 브랜치 작업 가능
- 긴급 버그 수정 + 기존 작업 유지할 때 유용
- **특수한 경우에만 사용**

```bash
git worktree add ../폴더명 브랜치명  # 워크트리 추가
git worktree list                   # 워크트리 목록
git worktree remove ../폴더명       # 워크트리 삭제
```

---

### 2. 로컬 브랜치 vs 원격 브랜치 (origin/)

```
origin 없음  = 내 컴퓨터 (직접 작업)
origin 있음  = GitHub 상태 (참조용, 읽기 전용)

예시:
- main              → 내 컴퓨터의 main
- origin/main       → GitHub에 있는 main의 로컬 복사본
```

```bash
git branch      # 로컬 브랜치만
git branch -r   # 원격 브랜치만
git branch -a   # 전부 보기

git push        # 로컬 → GitHub 업로드
git pull        # GitHub → 로컬 다운로드
git fetch       # GitHub 상태만 확인 (다운로드 안 함)
```

---

### 3. 자주 쓰는 Git 명령어

#### 기본 (매일 사용)
```bash
git status                      # 상태 확인
git add .                       # 모든 변경사항 스테이징
git commit -m "메시지"          # 커밋
git push                        # GitHub에 업로드
git pull                        # GitHub에서 다운로드
```

#### 브랜치 작업
```bash
git checkout -b feature/새기능  # 새 브랜치 생성 + 전환
git checkout main               # main으로 전환
git merge feature/새기능        # 현재 브랜치에 merge
git branch -d feature/새기능    # 로컬 브랜치 삭제
git push origin --delete 브랜치명  # 원격 브랜치 삭제
```

#### 되돌리기
```bash
git restore 파일명              # 파일 수정 취소 (커밋 전)
git restore --staged 파일명     # 스테이징 취소
git stash                       # 임시 저장
git stash pop                   # 임시 저장 복원
```

#### 태그 (버전 마킹)
```bash
git tag v1.0.0                  # 태그 생성
git tag                         # 태그 목록
git push origin --tags          # 태그 GitHub에 업로드
git checkout v1.0.0             # 특정 태그로 이동
```

---

### 4. Firebase Hosting 배포

#### 설정 파일
- `firebase.json`: 호스팅 설정
- `.firebaserc`: 프로젝트 연결 정보

#### 빌드 설정 (next.config.ts)
```typescript
const nextConfig: NextConfig = {
  output: 'export',      // static export 필수
  images: {
    unoptimized: true,   // 이미지 최적화 비활성화
  },
};
```

#### 배포 명령어
```bash
npm run build                                    # 빌드 (out/ 폴더 생성)
firebase deploy --only hosting                   # 정식 배포 (live)
firebase hosting:channel:deploy 채널명 --expires 7d  # 프리뷰 배포
firebase hosting:channel:list                    # 프리뷰 채널 목록
```

#### 프리뷰 vs 정식 배포
| 구분 | URL | 용도 |
|------|-----|------|
| 정식 (live) | https://seong-jun-kang.web.app | 실제 사용자용 |
| 프리뷰 | https://seong-jun-kang--채널명-xxx.web.app | 테스트용 (만료됨) |

---

### 5. 브랜치 관리 베스트 프랙티스

#### 브랜치 네이밍 규칙
```
feature/기능명     # 새 기능
bugfix/버그설명    # 버그 수정
hotfix/긴급수정    # 긴급 수정
experiment/실험    # 실험적 시도
```

#### 백업 방식
- **태그 사용 (권장)**: 가볍고, 히스토리에 마킹만
- **브랜치 백업 (비추천)**: 브랜치 목록이 지저분해짐

```bash
# 태그로 백업 (권장)
git tag backup-2026-01-16
git push origin --tags

# 특정 시점으로 돌아가기
git checkout backup-2026-01-16
```

#### 정리된 브랜치 구조
```
main (기본, 정식 배포용)
└── feature/xxx (작업 후 merge하고 삭제)
```

---

## 프로젝트 구조

```
ksj-folio/
├── app/
│   ├── layout.tsx      # 레이아웃, 메타데이터
│   ├── page.tsx        # 메인 페이지
│   └── globals.css     # 전역 스타일
├── components/
│   └── three/
│       ├── ParticleField.tsx    # 파티클 배경 (색상 팔레트)
│       └── VantaBackground.tsx  # 네트워크 배경 (color 속성)
├── lib/
│   └── data.ts         # 프로필, 연구 관심사 등 데이터
├── public/
│   └── cv/             # CV PDF 파일
├── next.config.ts      # Next.js 설정 (output: 'export')
├── firebase.json       # Firebase 호스팅 설정
└── .firebaserc         # Firebase 프로젝트 연결
```

---

## 주요 수정 포인트

### Hero 섹션 텍스트 변경
- 파일: `app/page.tsx` (225-228줄 근처)
- 파일: `lib/data.ts` (bio 필드)
- 파일: `app/layout.tsx` (description 메타데이터)

### 배경 색상 변경
- 네트워크 도형: `components/three/VantaBackground.tsx` → `color: 0x색상코드`
- 파티클: `components/three/ParticleField.tsx` → `colorPalette` 배열

---

## 유용한 명령어 모음

```bash
# 개발 서버
npm run dev

# 빌드 및 배포
npm run build && firebase deploy --only hosting

# 프리뷰 배포
npm run build && firebase hosting:channel:deploy test --expires 7d

# 브랜치 정리
git branch -d 브랜치명                    # 로컬 삭제
git push origin --delete 브랜치명         # 원격 삭제
git fetch --prune                         # 삭제된 원격 브랜치 정리

# 태그
git tag 태그명 && git push origin --tags
```
