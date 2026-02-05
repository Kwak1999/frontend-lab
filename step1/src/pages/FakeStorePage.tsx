import styled from "styled-components";
import {ProductList} from "../components/common/ProductList.tsx";
import {Cart} from "../components/common/Cart.tsx";


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

// 2단 레이아웃(상품 목록 + 장바구니)
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

function FakeStorePage() {
    return (
        <Container>
            <Title>React Query 쇼핑물</Title>
            <Subtitle>
                실제 API에서 상품 데이터를 가져옵니다.
                (FakeStore API 사용)
            </Subtitle>

            <MainLayout>
            {/*    왼쪽: 상품 목록 (API에서 가져옴)    */}
                <ProductList />
            {/*    오른쪽 바구니    */}
                <CartSection>
                    <Cart />
                </CartSection>
            </MainLayout>
        </Container>
    )
}

export default FakeStorePage;