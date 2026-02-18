# 📚 STEP 5: 통합 프로젝트

## 🎯 학습 목표

- 모든 기능을 결합한 완성도 높은 앱 만들기
- 검색 & 필터 기능 구현
- LocalStorage 연동
- React Router로 라우팅 설정
- 상품 상세 페이지 구현
- 반응형 디자인 적용

---

## 📝 학습 내용

### 1. 검색 & 필터 기능 (Zustand)

**파일:** `src/store/useFilterStore.ts`

**목적:** 검색어, 카테고리, 가격 범위를 전역 상태로 관리

**예제 코드:**
```typescript
import { create } from 'zustand';

interface FilterStore {
  searchQuery: string;
  selectedCategory: string;
  minPrice: number | null;
  maxPrice: number | null;
  
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  searchQuery: '',
  selectedCategory: 'all',
  minPrice: null,
  maxPrice: null,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategory: (category) => set({ selectedCategory: category }),
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max }),
  resetFilters: () => set({
    searchQuery: '',
    selectedCategory: 'all',
    minPrice: null,
    maxPrice: null,
  }),
}));
```

**핵심 개념:**
- 필터 상태를 전역으로 관리
- 여러 컴포넌트에서 공유
- 초기화 기능 제공

---

### 2. LocalStorage 연동 (장바구니 저장)

**파일:** `src/store/useCartStore.ts`

**목적:** 새로고침해도 장바구니 유지

**예제 코드:**
```typescript
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // ... 스토어 로직 ...
    }),
    {
      name: 'cart-storage',  // LocalStorage 키 이름
    }
  )
);
```

**핵심 개념:**
- `persist` 미들웨어 사용
- 자동으로 LocalStorage에 저장/불러오기
- 새로고침해도 데이터 유지

---

### 3. React Router 설정

**파일:** `src/App.tsx`, `src/main.tsx`

**목적:** 페이지 간 라우팅 구현

**예제 코드:**
```typescript
// main.tsx
<BrowserRouter>
  <App />
</BrowserRouter>

// App.tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:id" element={<ProductDetail />} />
  <Route path="/cart" element={<CartPage />} />
</Routes>
```

**핵심 개념:**
- `BrowserRouter`: 라우터 제공
- `Routes`, `Route`: 경로 정의
- `:id`: 동적 라우트 파라미터

---

### 4. 상품 상세 페이지

**파일:** `src/pages/ProductDetail.tsx`

**예제 코드:**
```typescript
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : 0;
  
  const { data: product, isLoading, error } = useProduct(productId);
  
  // ...
};
```

**핵심 개념:**
- `useParams`: URL 파라미터 가져오기
- `useNavigate`: 프로그래밍 방식 네비게이션
- `useProduct`: 특정 상품 데이터 가져오기

---

### 5. Navigation Bar

**파일:** `src/components/layout/Navbar.tsx`

**예제 코드:**
```typescript
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <Nav>
      <Logo to="/">🛒 쇼핑몰</Logo>
      <NavLink to="/products" $active={location.pathname === '/products'}>
        상품 목록
      </NavLink>
      <NavLink to="/cart">
        장바구니
        {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
      </NavLink>
    </Nav>
  );
};
```

**핵심 개념:**
- `useLocation`: 현재 경로 확인
- 활성 링크 스타일링
- 장바구니 개수 뱃지 표시

---

### 6. 필터링 로직 적용

**파일:** `src/components/common/ProductList.tsx`

**예제 코드:**
```typescript
import { useFilterStore } from '../../store/useFilterStore';

export const ProductList: React.FC = () => {
  const { data: products } = useProducts();
  const { searchQuery, selectedCategory, minPrice, maxPrice } = useFilterStore();
  
  const filteredProducts = products?.filter((product) => {
    // 검색어 필터
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // 카테고리 필터
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    
    // 가격 범위 필터
    if (minPrice !== null && product.price < minPrice) return false;
    if (maxPrice !== null && product.price > maxPrice) return false;
    
    return true;
  });
  
  // ...
};
```

**핵심 개념:**
- 필터 상태를 가져와서 적용
- 여러 조건을 동시에 필터링
- 실시간으로 필터링된 결과 표시

---

### 7. styled-components $ 접두사

**문제:** DOM에 전달되지 않는 prop 경고

**해결:** `$` 접두사 사용

**예제 코드:**
```typescript
// ❌ 경고 발생
const StyledButton = styled.button<ButtonProps>`
  ${({ fullWidth }) => fullWidth && `width: 100%;`}
`;

// ✅ 경고 없음
const StyledButton = styled.button<StyledButtonProps>`
  ${({ $fullWidth }) => $fullWidth && `width: 100%;`}
`;

// 사용
<StyledButton $fullWidth={true} />
```

**핵심 개념:**
- `$` 접두사: DOM에 전달하지 않는 prop 표시
- React 경고 방지
- styled-components 권장 방식

---

## ✅ 실습 과제

### 과제 1: 필터 스토어 만들기 ✅
- [x] `useFilterStore.ts` 파일 생성
- [x] 검색어, 카테고리, 가격 범위 상태 정의
- [x] 필터 변경 액션 구현
- [x] 필터 초기화 기능

### 과제 2: 검색 & 필터 컴포넌트 ✅
- [x] `SearchFilter.tsx` 컴포넌트 만들기
- [x] 검색어 입력 필드
- [x] 카테고리 선택 드롭다운
- [x] 가격 범위 입력
- [x] 필터 초기화 버튼

### 과제 3: 필터링 로직 적용 ✅
- [x] ProductList에 필터 적용
- [x] 검색어로 필터링
- [x] 카테고리로 필터링
- [x] 가격 범위로 필터링

### 과제 4: LocalStorage 연동 ✅
- [x] persist 미들웨어 추가
- [x] 장바구니 데이터 저장
- [x] 새로고침 후 데이터 유지 확인

### 과제 5: React Router 설정 ✅
- [x] BrowserRouter 설정
- [x] 라우트 정의
- [x] Home, Products, Cart, ProductDetail 페이지

### 과제 6: 상품 상세 페이지 ✅
- [x] ProductDetail 페이지 만들기
- [x] useParams로 ID 가져오기
- [x] 상품 정보 표시
- [x] 장바구니 추가 기능

### 과제 7: Navigation Bar ✅
- [x] Navbar 컴포넌트 만들기
- [x] 라우트 링크 추가
- [x] 활성 링크 스타일링
- [x] 장바구니 개수 뱃지

### 과제 8: 반응형 디자인 ✅
- [x] 모바일 레이아웃
- [x] 태블릿 레이아웃
- [x] 데스크톱 레이아웃
- [x] 미디어 쿼리 적용

---

## 💡 핵심 개념 정리

### 1. Zustand vs React Query
```
Zustand: 클라이언트 상태 (필터, UI 상태)
React Query: 서버 상태 (API 데이터)
```

### 2. 라우팅 패턴
```typescript
// 정적 라우트
<Route path="/products" element={<Products />} />

// 동적 라우트
<Route path="/products/:id" element={<ProductDetail />} />

// URL 파라미터 가져오기
const { id } = useParams<{ id: string }>();
```

### 3. LocalStorage 연동
```typescript
// persist 미들웨어 사용
persist(
  (set, get) => ({ ... }),
  { name: 'storage-key' }
)
```

### 4. 필터링 패턴
```typescript
const filtered = items.filter((item) => {
  // 조건 1
  if (condition1) return false;
  
  // 조건 2
  if (condition2) return false;
  
  return true;
});
```

---

## 🎯 이해도 체크

1. ✅ persist 미들웨어의 역할은?
   - LocalStorage에 자동 저장/불러오기

2. ✅ `$` 접두사를 왜 사용하나요?
   - DOM에 전달하지 않는 prop 표시 (경고 방지)

3. ✅ useParams는 무엇인가요?
   - URL 파라미터를 가져오는 React Router 훅

4. ✅ 필터링 로직은 어디에 구현하나요?
   - 컴포넌트에서 필터 상태를 가져와서 filter() 메서드 사용

5. ✅ 여러 필터를 동시에 적용하려면?
   - filter() 안에서 모든 조건을 &&로 연결

---

## 🔥 실전 팁

### 1. 라우팅 구조
```
/                    → Home
/products            → 상품 목록
/products/:id        → 상품 상세
/cart                → 장바구니
```

### 2. 필터 상태 관리
```typescript
// Zustand로 필터 상태 관리
const { searchQuery, setSearchQuery } = useFilterStore();

// 컴포넌트에서 필터링
const filtered = products.filter(...);
```

### 3. LocalStorage 활용
```typescript
// 자동 저장
persist({ name: 'cart-storage' })

// 수동 접근 (필요시)
localStorage.getItem('cart-storage')
```

### 4. 반응형 디자인
```typescript
// 미디어 쿼리
@media (max-width: 768px) {
  /* 모바일 스타일 */
}

// Grid 레이아웃
grid-template-columns: 2fr 1fr;  /* 데스크톱 */
grid-template-columns: 1fr;       /* 모바일 */
```

---

## 🐛 문제 해결

### 문제 1: fullWidth prop 경고
**원인:** styled-components가 prop을 DOM에 전달하려고 함

**해결:** `$` 접두사 사용
```typescript
$fullWidth={true}  // ✅
fullWidth={true}   // ❌
```

### 문제 2: 라우팅 오타
**원인:** URL 경로 오타 (`prodcuts` → `products`)

**해결:** 정확한 경로 확인
```typescript
to={`/localStore/products/${id}`}  // ✅
```

### 문제 3: 버튼 클릭 시 Link 이동
**원인:** Link 안에 Button이 있어서 클릭 시 이동

**해결:** preventDefault 사용
```typescript
const handleClick = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  // 버튼 로직
};
```

---

## 📊 완성된 기능

### ✅ 구현 완료
1. 검색 & 필터 기능
2. LocalStorage 연동
3. React Router 라우팅
4. 상품 상세 페이지
5. Navigation Bar
6. 반응형 디자인
7. 장바구니 기능
8. 상품 목록 표시

---

## 🎉 프로젝트 완성!

**지금까지 배운 것:**
- ✅ Styled-components
- ✅ Zustand 상태관리
- ✅ React Query
- ✅ Axios API 통신
- ✅ React Router
- ✅ LocalStorage
- ✅ 필터링 & 검색
- ✅ 반응형 디자인

**포트폴리오로 사용 가능한 완성도 높은 프로젝트!** 🚀

---

## 📚 다음 단계 (선택사항)

1. **성능 최적화**
   - React.memo
   - useMemo, useCallback
   - Code Splitting

2. **테스트**
   - Vitest
   - React Testing Library

3. **배포**
   - Vercel / Netlify
   - 환경 변수 설정

4. **추가 기능**
   - 사용자 인증
   - 결제 기능
   - 주문 내역

---

## 💪 축하합니다!

**STEP 1 ~ STEP 5 완료!**
프론트엔드 개발자로 취업하기 위한 핵심 스킬을 모두 마스터했습니다! 🎉
