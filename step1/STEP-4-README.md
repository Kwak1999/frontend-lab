# 📚 STEP 4: Axios + React Query 익히기

## 🎯 학습 목표

- Axios로 HTTP 요청하기
- React Query로 서버 상태 관리
- useQuery로 데이터 가져오기
- useMutation으로 데이터 변경하기
- 캐싱 전략 이해

---

## 🤔 왜 API 통신이 중요한가요?

실제 웹 앱은 **서버에서 데이터를 가져와야** 합니다:
- 상품 목록
- 사용자 정보
- 게시글, 댓글
- 검색 결과

**해결:** Axios + React Query로 서버와 통신!

---

## 📝 학습 내용

### 1. Axios 인스턴스 설정

**파일:** `src/api/axios.ts`

**예제 코드:**
```typescript
import axios from 'axios';

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('📤 요청:', config.method?.toUpperCase(), config.url);
    // 토큰 추가 등 가능
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log('📥 응답:', response.status);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 인증 에러 처리
    }
    return Promise.reject(error);
  }
);
```

**핵심 개념:**
- `axios.create()`: 공통 설정을 가진 인스턴스 생성
- `interceptors`: 요청/응답 가로채기
- 에러 처리 중앙화

---

### 2. API 함수 작성

**파일:** `src/api/products.ts`

**예제 코드:**
```typescript
import { api } from './axios';

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

export const productAPI = {
  // 모든 상품 가져오기
  getAll: () => {
    return api.get<Product[]>('/products');
  },
  
  // 특정 상품 가져오기
  getById: (id: number) => {
    return api.get<Product>(`/products/${id}`);
  },
  
  // 상품 생성
  create: (data: Omit<Product, 'id'>) => {
    return api.post<Product>('/products', data);
  },
  
  // 상품 수정
  update: (id: number, data: Partial<Product>) => {
    return api.put<Product>(`/products/${id}`, data);
  },
  
  // 상품 삭제
  delete: (id: number) => {
    return api.delete(`/products/${id}`);
  }
};
```

**핵심 개념:**
- Generic 타입: `api.get<Product[]>()`
- `Omit<T, K>`: 특정 속성 제외
- `Partial<T>`: 모든 속성 선택적

---

### 3. React Query 설정

**파일:** `src/main.tsx`

**예제 코드:**
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,  // 5분
    },
  },
});

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

**핵심 개념:**
- `QueryClient`: 캐시 설정 관리
- `QueryClientProvider`: 앱 전체에 제공
- `ReactQueryDevtools`: 개발 도구

---

### 4. useQuery로 데이터 가져오기

**파일:** `src/hooks/useProducts.ts`

**예제 코드:**
```typescript
import { useQuery } from '@tanstack/react-query';
import { productAPI } from '../api/products';

// 모든 상품 가져오기
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],  // 캐시 키
    queryFn: async () => {   // 데이터 가져오는 함수
      const response = await productAPI.getAll();
      return response.data;
    },
  });
};

// 특정 상품 가져오기
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await productAPI.getById(id);
      return response.data;
    },
    enabled: !!id,  // id가 있을 때만 실행
  });
};
```

**useQuery 반환값:**
```typescript
const { 
  data,        // 가져온 데이터
  isLoading,   // 로딩 중 (첫 요청)
  isFetching,  // 데이터 가져오는 중 (리프레시 포함)
  error,       // 에러 객체
  refetch      // 수동으로 다시 가져오기
} = useProducts();
```

**핵심 개념:**
- `queryKey`: 캐시의 고유 식별자
- `queryFn`: 실제 데이터를 가져오는 함수
- 자동 캐싱, 자동 리프레시

---

### 5. useMutation으로 데이터 변경하기

**파일:** `src/hooks/useProducts.ts`

**예제 코드:**
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 상품 생성 Mutation
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<Product, 'id'>) => {
      const response = await productAPI.create(data);
      return response.data;
    },
    // 성공 시: 캐시 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// 상품 삭제 Mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await productAPI.delete(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
```

**useMutation 사용:**
```typescript
const createProduct = useCreateProduct();

// Mutation 실행
createProduct.mutate({
  title: '새 상품',
  price: 100,
  // ...
}, {
  onSuccess: () => {
    alert('성공!');
  },
  onError: (error) => {
    alert('에러!');
  }
});

// 상태 확인
createProduct.isPending   // 실행 중
createProduct.isSuccess   // 성공
createProduct.isError     // 에러
```

**핵심 개념:**
- `mutationFn`: 실제 API 호출 함수
- `onSuccess`: 성공 시 실행 (캐시 무효화)
- `invalidateQueries`: 캐시 무효화 (자동 리프레시)

---

### 6. 컴포넌트에서 사용하기

**파일:** `src/components/common/ProductList.tsx`

**예제 코드:**
```typescript
import { useProducts } from '../../hooks/useProducts';

export const ProductList: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();
  
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  
  if (error) {
    return <div>에러가 발생했습니다</div>;
  }
  
  if (!products || products.length === 0) {
    return <div>상품이 없습니다</div>;
  }
  
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
```

---

### 7. 상품 추가 폼 예제

**파일:** `src/components/common/AddProductForm.tsx`

**예제 코드:**
```typescript
import { useState } from 'react';
import { useCreateProduct } from '../../hooks/useProducts';

export const AddProductForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  
  const createProduct = useCreateProduct();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createProduct.mutate({
      title,
      price: parseFloat(price),
      // ...
    }, {
      onSuccess: () => {
        setTitle('');
        setPrice('');
        alert('상품이 추가되었습니다!');
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={createProduct.isPending}
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={createProduct.isPending}
      />
      <button disabled={createProduct.isPending}>
        {createProduct.isPending ? '추가 중...' : '상품 추가'}
      </button>
    </form>
  );
};
```

---

## ✅ 실습 과제

### 과제 1: Axios 인스턴스 설정 ✅
- [x] `axios.ts` 파일 생성
- [x] baseURL, timeout 설정
- [x] 요청/응답 인터셉터 구현
- [x] 에러 처리

### 과제 2: API 함수 작성 ✅
- [x] `products.ts` 파일 생성
- [x] Product 타입 정의
- [x] getAll, getById, create, update, delete 구현

### 과제 3: React Query 설정 ✅
- [x] QueryClient 생성
- [x] QueryClientProvider 설정
- [x] ReactQueryDevtools 추가

### 과제 4: useQuery Hook 만들기 ✅
- [x] `useProducts.ts` 파일 생성
- [x] useProducts, useProduct 구현
- [x] 로딩/에러 상태 처리

### 과제 5: useMutation Hook 만들기 ✅
- [x] useCreateProduct 구현
- [x] useUpdateProduct 구현
- [x] useDeleteProduct 구현
- [x] 캐시 무효화 처리

### 과제 6: 컴포넌트에서 사용하기 ✅
- [x] ProductList 컴포넌트 만들기
- [x] 로딩/에러 UI 구현
- [x] AddProductForm 만들기
- [x] 실제 API 연동 확인

---

## 💡 핵심 개념 정리

### 1. useQuery vs useMutation
```
useQuery: 데이터 읽기 (GET)
- 자동 실행
- 자동 캐싱
- 자동 리프레시

useMutation: 데이터 변경 (POST, PUT, DELETE)
- 수동 실행
- 성공 시 캐시 무효화
- 낙관적 업데이트 가능
```

### 2. 캐시 무효화 (Invalidation)
```typescript
// 상품 추가 후
createProduct.mutate({ ... });

// ↓ 캐시 무효화 안 하면
// 상품 목록에 새 상품이 안 보임!

// ↓ 캐시 무효화 하면
queryClient.invalidateQueries({ queryKey: ['products'] });
// 자동으로 상품 목록 다시 가져옴 ✅
```

### 3. queryKey의 역할
```typescript
['products']                    // 모든 상품
['product', 1]                  // 상품 ID 1
['products', 'category', 'electronics']  // 전자제품 카테고리

// 같은 키 = 같은 캐시
```

---

## 🎯 이해도 체크

1. ✅ Axios 인스턴스를 만드는 이유는?
   - 공통 설정을 한 번만 작성

2. ✅ queryKey는 무엇인가요?
   - 캐시의 고유 식별자

3. ✅ invalidateQueries는 왜 필요한가요?
   - 데이터 변경 후 최신 데이터를 가져오기 위해

4. ✅ useQuery와 useMutation의 차이는?
   - useQuery: 자동 실행, 읽기
   - useMutation: 수동 실행, 변경

5. ✅ React Query의 장점은?
   - 자동 캐싱, 자동 리프레시, 로딩/에러 상태 관리

---

## 🔥 실전 팁

### 1. 에러 처리
```typescript
const { data, error, isLoading } = useProducts();

if (error) {
  // 에러 UI 표시
  return <ErrorMessage>{error.message}</ErrorMessage>;
}
```

### 2. 로딩 상태
```typescript
if (isLoading) {
  return <LoadingSpinner />;
}
```

### 3. 캐시 전략
```typescript
// 5분간 신선한 것으로 간주
staleTime: 5 * 60 * 1000

// 창 포커스 시 자동 리프레시 안 함
refetchOnWindowFocus: false
```

### 4. React Query Devtools 활용
- 쿼리 상태 확인
- 캐시 내용 보기
- 수동 리프레시
- 쿼리 무효화

---

## 📚 다음 단계

STEP 5: 통합 프로젝트로 모든 기능 결합하기
