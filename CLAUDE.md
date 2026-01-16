# CLAUDE.md - 프로젝트 가이드

## 프로젝트 개요
- **프로젝트**: ksj-folio (개인 포트폴리오 웹사이트)
- **기술 스택**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Three.js
- **배포**: Firebase Hosting
- **URL**: https://seong-jun-kang.web.app

---

## 프로젝트 구조

```
ksj-folio/
├── app/
│   ├── layout.tsx          # 레이아웃, 메타데이터
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 전역 스타일
├── components/three/
│   ├── ParticleField.tsx   # 파티클 배경 (colorPalette)
│   └── VantaBackground.tsx # 네트워크 배경 (color 속성)
├── lib/data.ts             # 프로필, 연구 관심사 등 데이터
├── public/cv/              # CV PDF 파일
├── tips/                   # 학습 노트
├── next.config.ts          # Next.js 설정
├── firebase.json           # Firebase 호스팅 설정
└── .firebaserc             # Firebase 프로젝트 연결
```

---

## 주요 수정 포인트

### Hero 섹션 텍스트 변경
3곳을 같이 수정해야 일관성 유지:
1. `app/page.tsx` (225-228줄) - 실제 표시되는 텍스트
2. `lib/data.ts` (bio 필드) - 데이터
3. `app/layout.tsx` (description) - SEO 메타데이터

### 배경 색상 변경
- **네트워크 도형**: `components/three/VantaBackground.tsx` → `color: 0x색상코드`
- **파티클**: `components/three/ParticleField.tsx` → `colorPalette` 배열

---

## 명령어

```bash
# 개발
npm run dev

# 빌드 & 정식 배포
npm run build && firebase deploy --only hosting

# 프리뷰 배포
npm run build && firebase hosting:channel:deploy test --expires 7d

# 브랜치 작업
git checkout -b feature/새기능
git checkout main && git merge feature/새기능

# 정리
git branch -d 브랜치명
git push origin --delete 브랜치명
```

---

## 학습 노트
- `tips/2026-01-16-git-firebase-basics.md` - Git 브랜치, 워크트리, origin, Firebase 배포
