# 🚀 프론트엔드 실전 학습 프로젝트

> React + TypeScript + 상태관리 + API 통신 + Styled-components 마스터하기

## 📦 설치된 기술 스택

### 핵심 라이브러리
```bash
# React + TypeScript (Vite)
npm create vite@latest . -- --template react-ts
npm install

# 상태관리
npm install zustand @tanstack/react-query @tanstack/react-query-devtools

# API 통신
npm install axios

# 라우팅
npm install react-router-dom

# 스타일링 (CSS-in-JS)
npm install styled-components
npm install -D @types/styled-components

# 개발 도구
npm install -D @types/node
```

---

## 🎯 학습 목표 (3대 약점 집중 공략)

### 1️⃣ 상태관리 마스터하기
- **Zustand**: 클라이언트 상태 (장바구니, 사용자 정보, UI 상태)
- **React Query**: 서버 상태 (API 데이터, 캐싱, 동기화)
- 언제 어떤 상태관리를 써야 하는지 체득

### 2️⃣ CSS 실력 향상하기
- **Styled-components**: 컴포넌트 기반 스타일링
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 테마 시스템 구축
- 재사용 가능한 스타일 컴포넌트

### 3️⃣ 백엔드 통신 능숙해지기
- **Axios + React Query**: 실전 API 통신
- CRUD 작업 (생성, 읽기, 수정, 삭제)
- 에러 핸들링 & 로딩 상태 관리
- 낙관적 업데이트(Optimistic Update)

---

## 📁 프로젝트 폴더 구조

```
src/
├── api/              # API 호출 함수들
│   ├── axios.ts      # axios 인스턴스 설정
│   ├── products.ts   # 상품 관련 API
│   └── auth.ts       # 인증 관련 API
│
├── components/       # 재사용 가능한 컴포넌트
│   ├── common/       # 공통 컴포넌트 (Button, Input 등)
│   └── layout/       # 레이아웃 컴포넌트 (Header, Footer 등)
│
├── pages/           # 페이지 컴포넌트
│   ├── LocalStore.tsx
│   ├── Products.tsx
│   └── Cart.tsx
│
├── hooks/           # 커스텀 훅
│   ├── useProducts.ts
│   └── useCart.ts
│
├── store/           # Zustand 스토어
│   ├── useCartStore.ts
│   └── useUserStore.ts
│
├── types/           # TypeScript 타입 정의
│   ├── product.ts
│   └── user.ts
│
├── utils/           # 유틸리티 함수
│   └── helpers.ts
│
└── styles/          # 전역 스타일 & 테마
    ├── GlobalStyle.ts
    └── theme.ts
```

---

## 🛠️ 실전 프로젝트: 쇼핑몰 앱

### 핵심 기능
1. **상품 목록** - API 데이터 불러오기 (React Query)
2. **상품 검색/필터** - 클라이언트 상태 관리 (Zustand)
3. **장바구니** - 로컬 상태 + 서버 동기화
4. **반응형 디자인** - Styled-components
5. **로딩/에러 처리** - 사용자 경험 개선

---

## 📚 단계별 학습 로드맵

### STEP 1: 기본 설정 (1일차) ✅
- [x] Vite 프로젝트 생성
- [x] 필수 라이브러리 설치
- [x] 폴더 구조 생성

### STEP 2: Styled-components 익히기 (2-3일차)
**학습 내용:**
- 기본 스타일링 문법
- props를 활용한 동적 스타일
- 테마 시스템 구축
- 반응형 디자인

**실습:**
```typescript
// 예제: Button 컴포넌트
import styled from 'styled-components';

const Button = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary ? '#007bff' : '#fff'};
  color: ${props => props.$primary ? '#fff' : '#333'};
  padding: 10px 20px;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;
```

**과제:**
- [ ] Button 컴포넌트 만들기 (primary, secondary, danger 스타일)
- [ ] Input 컴포넌트 만들기
- [ ] Card 컴포넌트 만들기
- [ ] 전역 테마 설정 (colors, spacing, typography)

---

### STEP 3: Zustand 상태관리 (4-5일차)
**학습 내용:**
- Zustand 기본 사용법
- 스토어 생성 및 사용
- TypeScript와 함께 사용하기
- Devtools 연동

**실습:**
```typescript
// 예제: Cart Store
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  devtools((set) => ({
    items: [],
    addItem: (item) => set((state) => ({
      items: [...state.items, item]
    })),
    removeItem: (id) => set((state) => ({
      items: state.items.filter(item => item.id !== id)
    })),
    clearCart: () => set({ items: [] })
  }))
);
```

**과제:**
- [ ] 장바구니 스토어 만들기
- [ ] 사용자 정보 스토어 만들기
- [ ] 필터/검색 상태 스토어 만들기

---

### STEP 4: Axios + React Query (6-8일차)
**학습 내용:**
- Axios 인스턴스 설정
- React Query 기본 사용법
- useQuery, useMutation 마스터
- 캐싱 전략 이해
- 에러 핸들링

**실습:**
```typescript
// 1. Axios 인스턴스 설정 (api/axios.ts)
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 2. API 함수 작성 (api/products.ts)
import { api } from './axios';

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id: number) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: number, data: any) => api.put(`/products/${id}`, data),
  delete: (id: number) => api.delete(`/products/${id}`)
};

// 3. React Query 훅 (hooks/useProducts.ts)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productAPI } from '../api/products';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productAPI.getAll();
      return response.data;
    }
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productAPI.create,
    onSuccess: () => {
      // 캐시 무효화 (자동으로 데이터 다시 불러오기)
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
};
```

**과제:**
- [ ] 상품 목록 불러오기 (useQuery)
- [ ] 상품 추가하기 (useMutation)
- [ ] 상품 삭제하기 (useMutation)
- [ ] 로딩/에러 UI 구현
- [ ] React Query Devtools로 상태 확인

---

### STEP 5: 통합 프로젝트 (9-14일차)
**목표:** 모든 기능을 결합한 완성도 높은 앱 만들기

**필수 기능:**
1. **상품 목록 페이지**
   - API로 상품 데이터 가져오기 (React Query)
   - 카드 레이아웃으로 표시 (Styled-components)
   - 로딩 스피너 & 에러 메시지

2. **검색 & 필터**
   - 검색어 입력 (Zustand로 상태 관리)
   - 카테고리 필터링
   - 가격 범위 필터

3. **장바구니**
   - 상품 추가/삭제 (Zustand)
   - 수량 조절
   - 총 금액 계산
   - LocalStorage에 저장 (새로고침해도 유지)

4. **반응형 디자인**
   - 모바일 (< 768px)
   - 태블릿 (768px - 1024px)
   - 데스크톱 (> 1024px)

5. **라우팅**
   - `/` - 홈
   - `/products` - 상품 목록
   - `/products/:id` - 상품 상세
   - `/cart` - 장바구니

---

## 🔥 필수 스킬

### 1. 컴포넌트 설계 원칙
- **재사용성**: 중복 코드 최소화
- **단일 책임**: 한 컴포넌트는 한 가지 역할
- **Props Drilling 방지**: 상태관리 라이브러리 활용

### 2. 타입스크립트 활용
```typescript
// 타입 정의 예제 (types/product.ts)
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// API 응답 타입
export type ProductResponse = Product[];
export type ProductDetailResponse = Product;
```

### 3. 에러 핸들링
```typescript
// 전역 에러 핸들러
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 인증 에러 처리
    }
    return Promise.reject(error);
  }
);
```

### 4. 코드 구조화
- **Custom Hooks**: 로직 재사용
- **컴포넌트 분리**: UI와 로직 분리
- **폴더 구조**: 기능별로 명확하게

---

## 📝 실습 API

### FakeStore API (무료, 인증 불필요)
- 주소: https://fakestoreapi.com
- 상품 목록: GET `/products`
- 상품 상세: GET `/products/:id`
- 카테고리: GET `/products/categories`

### JSONPlaceholder (추가 연습용)
- 주소: https://jsonplaceholder.typicode.com
- CRUD 전체 연습 가능

---

## 🎓 학습 팁

### 1. 매일 꾸준히
- 하루 2-3시간 집중 학습
- 코드 작성 > 이론 공부
- 에러를 두려워하지 말기

### 2. 코드 스타일
- ESLint 규칙 따르기
- 일관된 네이밍 컨벤션
- 주석은 "왜"를 설명 (무엇은 코드가 말함)

### 3. 포트폴리오 관리
- GitHub에 커밋 습관화
- README 잘 작성하기
- 데모 배포 (Vercel, Netlify)

### 4. 막힐 때
- 공식 문서 먼저 읽기
- 에러 메시지 정확히 읽기
- 구글링 스킬 향상

---

## 🚀 실행 명령어

```bash
# 개발 서버 시작
npm run dev

# 빌드
npm run build

# 미리보기
npm run preview

# 린트 체크
npm run lint
```

---

## 📌 다음 단계 (완료 후)

1. **성능 최적화**
   - React.memo, useMemo, useCallback
   - Code Splitting
   - 이미지 최적화

2. **테스트**
   - Vitest (단위 테스트)
   - React Testing Library

3. **배포**
   - Vercel / Netlify
   - CI/CD 구축

4. **고급 기능**
   - Next.js로 전환
   - SSR/SSG
   - SEO 최적화

---

## 💪 마무리

- ✅ 상태관리
- ✅ CSS 스타일링 능숙도
- ✅ API 통신 이해
- ✅ 포트폴리오 1개 완성

