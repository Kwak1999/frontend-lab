import { api } from './axios.ts'


// Product 타입 정의
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

// API 함수들
export const productAPI = {
    // 모든 상품 가져오기
    getAll: () => {
        return api.get<Product[]>('/products');
    },

    // 특정 상품 가져오기
    getById: (id: number) => {
        return api.get<Product>(`/products/${id}`);
    },

    // 카테고리별 상품 가져오기
    getByCategory: (category: string) => {
        return api.get<Product[]>(`/products/category/${category}`);
    },

    // 상품 생성 (실제로는 DB에 저장 안 됨, 테스트용)
    create: (data: Omit<Products, 'id'>) => {
        return api.post<Product>('/products', data);
    },

    // 상품 수정
    update: (id:number, data: Partial<Product>) => {
        return api.put<Product>(`/products/${id}`, data);
    },

    // 상품 삭제
    delete: (id:number) => {
        return api.delete(`/products/${id}`);
    }
}