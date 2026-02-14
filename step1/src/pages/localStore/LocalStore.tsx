// src/pages/LocalStore.tsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 32px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 24px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #6c757d;
  margin-bottom: 48px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const LocalStore: React.FC = () => {
    return (
        <Container>
            <Title>🛒 React Query 쇼핑몰</Title>
            <Subtitle>
                React + TypeScript + Zustand + React Query로 만든 실전 쇼핑몰
            </Subtitle>

            <ButtonGroup>
                <StyledLink to="/localStore/products">
                    <Button variant="primary" size="large">
                        상품 둘러보기
                    </Button>
                </StyledLink>
                <StyledLink to="/localStore/cart">
                    <Button variant="secondary" size="large">
                        장바구니 보기
                    </Button>
                </StyledLink>
            </ButtonGroup>
        </Container>
    );
};