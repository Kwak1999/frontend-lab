// src/pages/CartPage.tsx

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Cart } from '../../components/common/Cart';
import { Button } from '../../components/common/Button';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 32px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 32px;
  text-align: center;
`;

const BackButton = styled(Link)`
  text-decoration: none;
  display: inline-block;
  margin-bottom: 24px;
`;

export const CartPage: React.FC = () => {
    return (
        <Container>
            <Title>🛒 장바구니</Title>

            <BackButton to="/localStore/products">
                <Button variant="secondary">
                    ← 상품 목록으로 돌아가기
                </Button>
            </BackButton>

            <Cart />
        </Container>
    );
};