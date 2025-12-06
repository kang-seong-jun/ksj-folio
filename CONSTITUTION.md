# 코딩 컨벤션 (Coding Constitution)

이 문서는 ksj-folio 프로젝트의 코딩 표준과 Next.js 15+ 모범 사례를 정의합니다.

## 목차
1. [프로젝트 구조](#프로젝트-구조)
2. [컴포넌트 작성 규칙](#컴포넌트-작성-규칙)
3. [파일 및 폴더 네이밍](#파일-및-폴더-네이밍)
4. [TypeScript 규칙](#typescript-규칙)
5. [Next.js 특화 규칙](#nextjs-특화-규칙)
6. [스타일링 규칙](#스타일링-규칙)
7. [성능 최적화](#성능-최적화)
8. [에러 처리](#에러-처리)
9. [코드 품질](#코드-품질)

---

## 프로젝트 구조

### 디렉토리 구조
```
app/                    # Next.js App Router
├── (routes)/          # Route groups (괄호로 그룹화)
├── components/        # 재사용 가능한 컴포넌트
│   ├── ui/           # 기본 UI 컴포넌트
│   └── features/     # 기능별 컴포넌트
├── lib/              # 유틸리티 함수 및 헬퍼
├── hooks/            # Custom React hooks
├── types/            # TypeScript 타입 정의
├── constants/        # 상수 정의
└── styles/           # 전역 스타일

public/               # 정적 파일
```

### 모듈화 원칙
- **단일 책임 원칙**: 각 파일/모듈은 하나의 명확한 목적만 가져야 함
- **관심사 분리**: UI, 비즈니스 로직, 데이터 페칭을 분리
- **재사용성**: 공통 로직은 hooks나 유틸리티로 추출

---

## 컴포넌트 작성 규칙

### 1. 컴포넌트 구조
```tsx
// 1. Imports (외부 라이브러리 → 내부 모듈)
import { useState } from 'react';
import { NextImage } from 'next/image';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  optional?: boolean;
}

// 3. Component
export default function Component({ title, optional }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState<string>('');
  
  // 5. Event handlers
  const handleClick = () => {
    // ...
  };
  
  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

### 2. 컴포넌트 규칙
- **기본값**: 모든 컴포넌트는 `export default` 사용
- **이름**: PascalCase 사용 (`UserProfile.tsx`)
- **Props 타입**: 항상 명시적으로 타입 정의
- **Props 인터페이스**: 컴포넌트 위에 정의
- **조건부 렌더링**: 삼항 연산자보다 early return 선호

```tsx
// ✅ 좋은 예
export default function UserProfile({ userId }: { userId: string }) {
  if (!userId) return null;
  
  return <div>...</div>;
}

// ❌ 나쁜 예
export default function UserProfile({ userId }: { userId: string }) {
  return userId ? <div>...</div> : null;
}
```

### 3. Server vs Client Components
- **기본값**: Server Component (서버에서 렌더링)
- **Client Component 필요시**: `'use client'` 지시어 사용
- **원칙**: 가능한 한 Server Component 사용, 필요한 경우에만 Client Component

```tsx
// ✅ Server Component (기본)
export default function ServerComponent() {
  return <div>Server rendered</div>;
}

// ✅ Client Component (필요시)
'use client';

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## 파일 및 폴더 네이밍

### 파일 네이밍
- **컴포넌트**: PascalCase (`UserProfile.tsx`)
- **유틸리티/훅**: camelCase (`useAuth.ts`, `formatDate.ts`)
- **타입 정의**: PascalCase (`types.ts` 또는 `User.ts`)
- **상수**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

### 폴더 네이밍
- **컴포넌트 폴더**: kebab-case (`user-profile/`)
- **기능 폴더**: kebab-case (`auth/`, `dashboard/`)

### Route 파일 네이밍 (App Router)
- `page.tsx` - 페이지 컴포넌트
- `layout.tsx` - 레이아웃 컴포넌트
- `loading.tsx` - 로딩 UI
- `error.tsx` - 에러 UI
- `not-found.tsx` - 404 페이지
- `route.ts` - API Route

---

## TypeScript 규칙

### 1. 타입 정의
- **명시적 타입**: 가능한 한 명시적으로 타입 지정
- **인터페이스 vs Type**: 객체는 `interface`, 유니온/교차는 `type`
- **타입 파일**: 공유 타입은 `types/` 폴더에 분리

```tsx
// ✅ 좋은 예
interface User {
  id: string;
  name: string;
  email: string;
}

type Status = 'pending' | 'approved' | 'rejected';

// ❌ 나쁜 예
const user = { id: '1', name: 'John' }; // 타입 추론에만 의존
```

### 2. Props 타입
```tsx
// ✅ 좋은 예
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  // ...
}

// ❌ 나쁜 예
export default function Button(props: any) {
  // ...
}
```

### 3. 타입 가드
- 런타임 검증이 필요한 경우 타입 가드 사용

```tsx
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
}
```

---

## Next.js 특화 규칙

### 1. App Router 패턴
- **레이아웃**: 공통 레이아웃은 `layout.tsx` 사용
- **로딩 상태**: `loading.tsx`로 Suspense 경계 설정
- **에러 처리**: `error.tsx`로 에러 경계 설정
- **메타데이터**: `metadata` 객체 또는 `generateMetadata` 함수 사용

```tsx
// ✅ 좋은 예
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};

export default function Page() {
  return <div>...</div>;
}
```

### 2. 데이터 페칭
- **Server Components**: `async/await` 직접 사용
- **Client Components**: `useEffect` + `fetch` 또는 SWR/React Query
- **캐싱**: `fetch` 옵션으로 캐싱 전략 명시

```tsx
// ✅ Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // ISR
  }).then(res => res.json());
  
  return <div>{data.title}</div>;
}

// ✅ Client Component
'use client';

import { useEffect, useState } from 'react';

export default function ClientPage() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data?.title}</div>;
}
```

### 3. 이미지 최적화
- **Next.js Image**: 항상 `next/image`의 `Image` 컴포넌트 사용
- **필수 속성**: `width`, `height`, `alt` 항상 제공
- **우선순위**: Above-the-fold 이미지는 `priority` prop 사용

```tsx
import Image from 'next/image';

// ✅ 좋은 예
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority
/>

// ❌ 나쁜 예
<img src="/hero.jpg" alt="Hero" />
```

### 4. 링크 최적화
- **Next.js Link**: 내부 링크는 항상 `next/link`의 `Link` 사용
- **Prefetching**: 기본적으로 활성화되어 있음 (필요시 `prefetch={false}`)

```tsx
import Link from 'next/link';

// ✅ 좋은 예
<Link href="/about">About</Link>

// ❌ 나쁜 예
<a href="/about">About</a>
```

### 5. 동적 라우팅
- **동적 세그먼트**: `[id]` 형식 사용
- **캐치올 세그먼트**: `[...slug]` 형식 사용
- **옵셔널 세그먼트**: `[[...slug]]` 형식 사용

---

## 스타일링 규칙

### 1. Tailwind CSS 사용
- **유틸리티 우선**: Tailwind 유틸리티 클래스 사용
- **커스텀 클래스**: `@apply` 지시어는 최소한으로 사용
- **반응형**: 모바일 우선 접근 (`sm:`, `md:`, `lg:`)
- **다크모드**: `dark:` 접두사 사용

```tsx
// ✅ 좋은 예
<div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 sm:flex-row">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Title
  </h1>
</div>
```

### 2. CSS 모듈 (필요시)
- 컴포넌트별 스타일이 복잡한 경우에만 사용
- 파일명: `Component.module.css`

### 3. 전역 스타일
- `app/globals.css`에만 전역 스타일 정의
- Tailwind 지시어 (`@tailwind`)는 여기에만

---

## 성능 최적화

### 1. 코드 스플리팅
- **동적 임포트**: 큰 컴포넌트는 `next/dynamic` 사용
- **로딩 상태**: `loading` prop 제공

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // 필요시
});
```

### 2. 메모이제이션
- **React.memo**: Props가 자주 변경되지 않는 컴포넌트
- **useMemo**: 비용이 큰 계산
- **useCallback**: 자식 컴포넌트에 전달하는 함수

```tsx
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data }: { data: string[] }) => {
  const sortedData = useMemo(() => {
    return data.sort();
  }, [data]);
  
  const handleClick = useCallback(() => {
    // ...
  }, []);
  
  return <div>...</div>;
});
```

### 3. 이미지 최적화
- 적절한 크기와 포맷 사용
- `priority`는 Above-the-fold에만
- `loading="lazy"`는 기본값 (priority 없을 때)

---

## 에러 처리

### 1. 에러 바운더리
- `error.tsx` 파일로 에러 처리
- 사용자 친화적인 에러 메시지

```tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### 2. API 에러 처리
- 명확한 에러 메시지
- 적절한 HTTP 상태 코드
- 타입 안전한 에러 응답

```tsx
// app/api/users/route.ts
export async function GET() {
  try {
    const data = await fetchData();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
```

---

## 코드 품질

### 1. ESLint 규칙
- Next.js ESLint 설정 사용 (`eslint-config-next`)
- 커밋 전 린트 확인 필수

### 2. 코드 리뷰 체크리스트
- [ ] 타입 안전성 확인
- [ ] 에러 처리 구현
- [ ] 접근성 고려 (a11y)
- [ ] 성능 최적화 적용
- [ ] 불필요한 의존성 제거
- [ ] 주석은 "왜"를 설명 (코드는 "무엇"을 설명)

### 3. 주석 규칙
- **복잡한 로직**: 주석으로 설명
- **TODO**: 명확한 이유와 계획 포함
- **JSDoc**: 공개 API에만 사용

```tsx
// ✅ 좋은 예
// 사용자 권한 확인: 관리자만 접근 가능하도록 체크
if (user.role !== 'admin') {
  return redirect('/unauthorized');
}

// ❌ 나쁜 예
// 권한 체크
if (user.role !== 'admin') {
  return redirect('/unauthorized');
}
```

### 4. 함수 규칙
- **함수 길이**: 50줄 이하 권장
- **매개변수**: 3개 이하 권장 (객체로 그룹화)
- **순수 함수**: 가능한 한 순수 함수 작성

```tsx
// ✅ 좋은 예
function createUser({ name, email, role }: CreateUserParams) {
  // ...
}

// ❌ 나쁜 예
function createUser(name: string, email: string, role: string, age: number, address: string) {
  // ...
}
```

---

## 추가 모범 사례

### 1. 환경 변수
- `.env.local`에 민감한 정보 저장
- `.env.example`에 예시 제공 (값 제외)
- `NEXT_PUBLIC_` 접두사는 클라이언트에서 접근 가능

### 2. API Routes
- RESTful 원칙 따르기
- 적절한 HTTP 메서드 사용
- 타입 안전한 요청/응답

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // ...
  return NextResponse.json({ users: [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // ...
  return NextResponse.json({ success: true }, { status: 201 });
}
```

### 3. 접근성 (a11y)
- 시맨틱 HTML 사용
- `alt` 속성 필수
- 키보드 네비게이션 지원
- ARIA 속성 적절히 사용

---

## 요약 체크리스트

새 코드 작성 시 확인:

- [ ] 컴포넌트는 단일 책임을 가짐
- [ ] 타입이 명시적으로 정의됨
- [ ] Server/Client Component 구분이 명확함
- [ ] 이미지는 `next/image` 사용
- [ ] 링크는 `next/link` 사용
- [ ] 에러 처리가 구현됨
- [ ] 접근성을 고려함
- [ ] 성능 최적화가 적용됨
- [ ] ESLint 규칙을 준수함
- [ ] 불필요한 주석이 없음

---

**마지막 업데이트**: 2024년
**Next.js 버전**: 15+ (현재 16.0.7)

