import styled from "styled-components";
import { useProducts } from "../../hooks/useProducts.ts";
import {ProductCard} from "./ProductCard.tsx";
import {useFilterStore} from "../../hooks/useFilterStore.ts";

const Container = styled.div`
    margin-bottom: 32px;
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    color: #212529;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 48px;
    color: #6c757d;
    font-size: 18px;
`;

const ErrorMessage = styled.div`
    text-align: center;
    padding: 48px;
    color: #dc3545;
    font-size: 18px;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
`;

export const ProductList: React.FC = () => {

    // React Query로 데이터 가져오기
    const {data: products, isLoading, error} = useProducts();

    // 필터 상태 가져오기
    const {searchQuery, selectedCategory, minPrice, maxPrice} = useFilterStore();

    // 필터링된 상품 목록
    const filteredProducts = products?.filter((product) => {
        // 검색어 필터
        if(searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())){
            return false;
        }

        // 카테고리 필터
        if(selectedCategory !== 'all' && product.category !== selectedCategory){
            return false;
        }

        // 가격 범위 필터
        if(minPrice !== null && product.price < minPrice){
            return false;
        }
        if(maxPrice !== null && product.price > maxPrice){
            return false;
        }
        return true;
    })

    // 로딩중
    if(isLoading) {
        return(
            <Container>
                <Title> 상품 목록 </Title>
                <LoadingMessage>로딩 중...</LoadingMessage>
            </Container>
        )
    }

    // 에러 발생
    if(error){
        return (
            <Container>
                <Title> 상품 목록 </Title>
                <ErrorMessage>
                    에러가 발생했습니다: {error instanceof Error ? error.message:'알 수 없는 에러'}
                </ErrorMessage>
            </Container>
        )
    }

    // 데이터 없음
    if (!products || products.length === 0) {
        return (
            <Container>
                <Title>🍎 상품 목록</Title>
                <LoadingMessage>상품이 없습니다</LoadingMessage>
            </Container>
        );
    }

    // 성공: 상품 목록 표시

    return (
        <Container>
            <Title> 상품 목록({filteredProducts?.length || 0}개) </Title>
            <ProductGrid>
                {filteredProducts?.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.title} // API는 title, 우리는 name 사용
                        price={product.price}
                        image={product.image} // 이미지 URL (나중에 <img>로 변경)
                    />
                ))}
            </ProductGrid>
        </Container>
    )
}