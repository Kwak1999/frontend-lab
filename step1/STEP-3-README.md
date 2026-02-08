# 📚 STEP 3: Zustand 상태관리 익히기

## 🎯 학습 목표

- Zustand 기본 사용법 이해
- 전역 상태 관리 패턴 학습
- 불변성(Immutability) 개념 이해
- Selector 패턴으로 성능 최적화

---

## 🤔 상태관리가 뭔가요?

**상태(State)**: 앱에서 변하는 데이터
- 로그인 여부
- 장바구니 상품 개수
- 다크모드 ON/OFF
- 검색어 입력값

**문제:** 여러 컴포넌트가 같은 상태를 공유해야 할 때

**해결:** 전역 상태관리 라이브러리 사용!

---

## 📝 학습 내용

### 1. Zustand 스토어 만들기

**파일:** `src/store/useCartStore.ts`

**예제 코드:**
```typescript
import { create } from 'zustand';

// 타입 정의
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  // 상태 (State)
  items: CartItem[];
  
  // 액션 (Actions)
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  
  // 계산된 값 (Computed)
  getTotalPrice: () => number;
}

// 스토어 생성
export const useCartStore = create<CartStore>((set, get) => ({
  // 초기 상태
  items: [],
  
  // 상품 추가
  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id);
    
    if (existingItem) {
      // 이미 있으면 수량 증가
      return {
        items: state.items.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      };
    } else {
      // 없으면 새로 추가
      return {
        items: [...state.items, { ...item, quantity: 1 }]
      };
    }
  }),
  
  // 상품 삭제
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  // 수량 변경
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === id
        ? { ...item, quantity }
        : item
    )
  })),
  
  // 장바구니 비우기
  clearCart: () => set({ items: [] }),
  
  // 총 가격 계산
  getTotalPrice: () => {
    const state = get();
    return state.items.reduce((total, item) =>
      total + (item.price * item.quantity), 0
    );
  }
}));
```

**핵심 개념:**
- `create`: Zustand 스토어 생성 함수
- `set`: 상태 변경 함수
- `get`: 현재 상태 읽기 함수
- 불변성 유지 필수!

---

### 2. 불변성(Immutability) 이해

**왜 불변성을 지켜야 하나요?**

React는 상태가 변경되었는지 **참조 비교**로 확인합니다.

```typescript
// ❌ 잘못된 방법 (직접 수정)
addItem: (item) => set((state) => {
  state.items.push(item);  // 같은 배열 참조
  return state;  // React가 변경을 감지 못함!
});

// ✅ 올바른 방법 (새 배열 생성)
addItem: (item) => set((state) => ({
  items: [...state.items, item]  // 새 배열 참조
}));
```

**불변성 패턴:**
```typescript
// 배열에 추가
[...array, newItem]

// 배열에서 삭제
array.filter(item => item.id !== targetId)

// 배열 항목 수정
array.map(item =>
  item.id === targetId
    ? { ...item, ...changes }
    : item
)

// 객체 속성 변경
{ ...object, newProperty: value }
```

---

### 3. 컴포넌트에서 사용하기

**파일:** `src/components/common/ProductCard.tsx`

**예제 코드:**
```typescript
import { useCartStore } from '../../store/useCartStore';

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price }) => {
  // ⭐ Selector 패턴: 필요한 것만 가져오기
  const addItem = useCartStore((state) => state.addItem);
  
  const handleAddToCart = () => {
    addItem({ id, name, price, quantity: 1 });
  };
  
  return (
    <Button onClick={handleAddToCart}>
      장바구니 담기
    </Button>
  );
};
```

**핵심 개념:**
- **Selector 패턴**: 필요한 상태/액션만 선택
- 성능 최적화: 해당 부분만 변경될 때 리렌더링

---

### 4. 여러 값 가져오기

**예제 코드:**
```typescript
// 방법 1: 각각 가져오기 (추천)
const items = useCartStore((state) => state.items);
const addItem = useCartStore((state) => state.addItem);

// 방법 2: 객체로 가져오기
const { items, addItem, removeItem } = useCartStore((state) => ({
  items: state.items,
  addItem: state.addItem,
  removeItem: state.removeItem
}));
```

---

### 5. Cart 컴포넌트 예제

**파일:** `src/components/common/Cart.tsx`

**예제 코드:**
```typescript
import { useCartStore } from '../../store/useCartStore';

export const Cart: React.FC = () => {
  // 필요한 상태와 액션 가져오기
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  
  if (items.length === 0) {
    return <div>장바구니가 비어있습니다</div>;
  }
  
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>{item.price}원 × {item.quantity}개</p>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button onClick={() => removeItem(item.id)}>삭제</button>
        </div>
      ))}
      <div>총 금액: {getTotalPrice()}원</div>
    </div>
  );
};
```

---

## ✅ 실습 과제

### 과제 1: 장바구니 스토어 만들기 ✅
- [x] `useCartStore.ts` 파일 생성
- [x] CartItem 타입 정의
- [x] CartStore 인터페이스 정의
- [x] addItem, removeItem, updateQuantity, clearCart 구현
- [x] getTotalPrice 계산 함수 구현

### 과제 2: ProductCard에서 사용하기 ✅
- [x] useCartStore에서 addItem 가져오기
- [x] 장바구니 추가 버튼 구현

### 과제 3: Cart 컴포넌트 만들기 ✅
- [x] 장바구니 아이템 목록 표시
- [x] 수량 조절 기능
- [x] 삭제 기능
- [x] 총 금액 계산 표시

### 과제 4: App.tsx에서 통합 ✅
- [x] ProductCard와 Cart 함께 사용
- [x] 실시간 동기화 확인

---

## 💡 핵심 개념 정리

### 1. Zustand vs 다른 상태관리
```
Redux: 복잡하지만 강력 (대규모 프로젝트)
Recoil: Facebook 제작 (실험적)
Zustand: 간단하고 실용적 ⭐ (중소규모 프로젝트)
```

### 2. 언제 Zustand를 쓸까?
- ✅ 클라이언트 상태 (장바구니, UI 상태)
- ✅ 여러 컴포넌트가 공유하는 상태
- ✅ Props Drilling을 피하고 싶을 때

### 3. 언제 React Query를 쓸까?
- ✅ 서버 상태 (API 데이터)
- ✅ 캐싱이 필요한 데이터
- ✅ 자동 리프레시가 필요한 데이터

---

## 🎯 이해도 체크

1. ✅ `set` 함수는 무엇을 하나요?
   - 상태를 변경하는 함수

2. ✅ 왜 불변성을 지켜야 하나요?
   - React가 변경을 감지하기 위해 (참조 비교)

3. ✅ `get` 함수는 언제 사용하나요?
   - 현재 상태를 읽어올 때 (계산된 값 만들 때)

4. ✅ Selector 패턴의 장점은?
   - 필요한 것만 구독하여 성능 최적화

5. ✅ Zustand와 React Query의 차이는?
   - Zustand: 클라이언트 상태
   - React Query: 서버 상태

---

## 🔥 실전 팁

### 1. 불변성 유지 패턴
```typescript
// 배열 추가
[...items, newItem]

// 배열 삭제
items.filter(item => item.id !== id)

// 배열 수정
items.map(item => item.id === id ? { ...item, ...changes } : item)
```

### 2. Selector 최적화
```typescript
// ❌ 전체 스토어 구독 (비효율)
const store = useCartStore();

// ✅ 필요한 것만 구독 (효율적)
const items = useCartStore((state) => state.items);
```

### 3. 여러 컴포넌트 동기화
```typescript
// ProductCard에서
addItem({ id: 1, name: '사과', price: 1000 });

// ↓ 자동으로 Cart 컴포넌트 리렌더링!
// 코드 연결 없이도 동기화됨
```

---

## 📚 다음 단계

STEP 4: Axios + React Query로 API 통신 시작하기
