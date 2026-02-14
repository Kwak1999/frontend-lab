// src/pages/Products.tsx

import styled from 'styled-components';
import { ProductList } from '../../components/common/ProductList';
import { Cart } from '../../components/common/Cart';
import { SearchFilter } from '../../components/common/SearchFilter';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 32px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 16px;
  text-align: center;
`;

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CartSection = styled.section`
  position: sticky;
  top: 32px;
  height: fit-content;
`;

export const Products: React.FC = () => {
    return (
        <Container>
            <Title>🛍️ 상품 목록</Title>

            {/* 검색 & 필터 */}
            <SearchFilter />

            <MainLayout>
                {/* 상품 목록 */}
                <ProductList />

                {/* 장바구니 */}
                <CartSection>
                    <Cart />
                </CartSection>
            </MainLayout>
        </Container>
    );
};