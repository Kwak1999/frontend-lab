import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {type Product, productAPI} from "../api/products.ts";
import {data} from "react-router-dom";

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

// 상품 생성 Mutation
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(data: Omit<Product, 'id'>) => {
            const response = await productAPI.create(data);
            return response.data;
        },
        // 성공 시 : 상품 목록 캐시 무효화( 자동으로 다시 가져옴)
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
        }
    })
}

// 상품 수정 Mutation
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async({id, data}: {id:number; data: Partial<Product>}) => {
            const response = await productAPI.update(id, data);
            return response.data;
        },
        onSuccess: (_, variables) => {
            // 해당 상품과 전체 목록 캐시 무효화
            queryClient.invalidateQueries({queryKey: ['product', variables.id]});
            queryClient.invalidateQueries({queryKey: ['products']});

        }
    })
}

// 상품 삭제 Mutation
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(id: number) => {
            await productAPI.delete(id);
            return id;
        },
        onSuccess: () => {
            // 상품 목록 캐시 무효화
            queryClient.invalidateQueries({queryKey: ['products']});
        }
    })
}