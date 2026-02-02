// src/App.tsx

import styled from 'styled-components';
import { ProductCard } from '../components/common/ProductCard';
import { Cart } from '../components/common/Cart';

// 전체 레이아웃
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

const Subtitle = styled.p`
  text-align: center;
  color: #6c757d;
  margin-bottom: 48px;
  font-size: 16px;
`;

// 2단 레이아웃 (상품 목록 + 장바구니)
const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;  /* 상품 목록: 장바구니 = 2:1 */
  gap: 32px;
  
  /* 반응형: 화면 작으면 세로로 */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ProductSection = styled.section``;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #212529;
`;

// 상품 그리드 레이아웃
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const CartSection = styled.section`
  position: sticky;  /* 스크롤해도 고정 */
  top: 32px;
  height: fit-content;
`;

function StorePage() {
    // 샘플 상품 데이터
    const products = [
        { id: 1, name: '신선한 사과', price: 3000, emoji: '🍎' },
        { id: 2, name: '달콤한 바나나', price: 2000, emoji: '🍌' },
        { id: 3, name: '시원한 수박', price: 15000, emoji: '🍉' },
        { id: 4, name: '맛있는 딸기', price: 8000, emoji: '🍓' },
        { id: 5, name: '노란 레몬', price: 1500, emoji: '🍋' },
        { id: 6, name: '파인애플', price: 5000, emoji: '🍍' },
    ];

    return (
        <Container>
            <Title>🛒 Zustand 쇼핑몰</Title>
            <Subtitle>
                상품을 장바구니에 담아보세요!
                여러 컴포넌트가 하나의 상태를 공유합니다.
            </Subtitle>

            <MainLayout>
                {/* 왼쪽: 상품 목록 */}
                <ProductSection>
                    <SectionTitle>🍎 상품 목록</SectionTitle>
                    <ProductGrid>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                emoji={product.emoji}
                            />
                        ))}
                    </ProductGrid>
                </ProductSection>

                {/* 오른쪽: 장바구니 */}
                <CartSection>
                    <Cart />
                </CartSection>
            </MainLayout>
        </Container>
    );
}

export default StorePage;