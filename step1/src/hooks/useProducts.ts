import {useQuery} from "@tanstack/react-query";
import{productAPI} from "../api/products.ts";

// 모든 상품 가져오기
export const useProducts = () => {
    return useQuery({
        queryKey: ["products"], // 캐시 키(고유 식별자)
        queryFn: async() => {   // 데이터를 가져오는 함수
            const response = await productAPI.getAll();
            return response.data;
        },
    })
}

// 특정 상품 가져오기
export const useProduct = (id: number) => {
    return useQuery({
        queryKey:['product', id], // id를 키에 포함(각 상품별로 캐시)
        queryFn: async() => {
            const response = await productAPI.getById(id);
            return response.data;
        },
        enabled: !!id, // id가 있을 때만 실행
    })
}

// 카테고리별 상품 가져오기
export const useProductsByCategory = (category: string) => {
    return useQuery({
        queryKey:['products', 'category', category],
        queryFn: async() => {
            const response = await productAPI.getByCategory(category);
            return response.data;
        },
        enabled: !!category,
    })
}