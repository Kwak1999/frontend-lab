import {create} from 'zustand';
import { persist } from "zustand/middleware";

// 장바구니 아이템 타입
interface CartItem{
    id: number;         // 상품 ID
    name: string;       // 상품 이름
    price: number;      // 가격
    quantity: number;   // 수량
}

// 장바구니 스토어 타입
interface CartStore{
    // 상태(State)
    items: CartItem[]; // 장바구니에 담긴 상품들

    // 액션(Actions)
    addItem: (item: CartItem) => void;      // 상품 추가
    removeItem: (item: CartItem) => void;   // 상품 삭제
    updateQuantity: (id: number, quantity: number) => void;     // 수량 변경
    clearCart: () => void;      // 장바구니 비우기

    // 계산된 값(Computed)
    getTotalPrice: () => number;        // 총 가격 계산
}


// Zustand의 스토어를 만드는 함수
// React Hook처럼 사용 가능 (useCartStore)
// <CartStore>: TypeScript 타입 지정
export const useCartStore = create<CartStore>()(
    persist(
    (set, get) => ({
        // set 함수 - 상태 변경
        // 상태를 업데이트하는 함수
        // 불변성 유지 필수 (기존 state를 직접 수정 X)
        // 새로운 객체를 반환해야 함

        // get 함수 - 현재 상태 읽기
        // 현재 상태를 가져오는 함수
        // 계산된 값을 만들 때 유용

        // 초기 상태
        items: [],

        // 상품 추가 액션
        addItem: (item) => set((state) => {
            // 이미 장바구니에 있는 상품인지 확인
            const existingItem = state.items.find(i => i.id === item.id);

            if(existingItem) {
                // 이미 있으면 수량만 증가
                return{
                    items: state.items.map(i =>
                        i.id === item.id
                            ? {...i, quantity: i.quantity + 1}
                            : i
                    )
                }
            }else{
                // 없으면 새로 추가
                return {
                    items: [...state.items, {...item, quantity: 1}]
                };
            }
        }),
        // 상품 삭제 액션
        removeItem: (id) => set((state) => ({
            items: state.items.filter(item => item.id !== id)
        })),

        // 수량 변경 액션
        updateQuantity: (id, quantity) => set((state) => ({
            items: state.items.map(item =>
                item.id === id
                    ? {...item, quantity} // 해당 항목만 수정
                    : item                // 나머지는 그대로
            )
        })),

        // 장바구니 비우기 액션
        clearCart: () => set({ items: [] }),

        // 총 가격 계산
        getTotalPrice: () => {
            const state = get(); // 현재 상태 가져오기
            return state.items.reduce((total, item) =>
                total + (item.price * item.quantity), 0
            );
        }
    }),
    {
        name: 'cart-storage', // LocalStorage 키 이름
    }
    )
);


