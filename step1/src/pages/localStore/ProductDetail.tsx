import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useProduct } from '../../hooks/useProducts';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../../components/common/Button';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 32px;
`;

const BackButton = styled(Link)`
  text-decoration: none;
  display: inline-block;
  margin-bottom: 24px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div``;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InfoSection = styled.div``;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #212529;
`;

const Category = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 16px;
  text-transform: capitalize;
`;

const Price = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 24px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const Stars = styled.span`
  color: #ffc107;
  font-size: 20px;
`;

const RatingText = styled.span`
  color: #6c757d;
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #495057;
  margin-bottom: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 48px;
  color: #6c757d;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 48px;
  color: #dc3545;
`;


export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const productId = id ? parseInt(id) : 0;

    const { data: product, isLoading, error } = useProduct(productId);
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        if (product) {
            addItem({
                id: product.id,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
            alert(`${product.title}을(를) 장바구니에 추가했습니다!`);
        }
    };

    if (isLoading) {
        return (
            <Container>
                <LoadingContainer>로딩 중...</LoadingContainer>
            </Container>
        );
    }

    if (error || !product) {
        return (
            <Container>
                <ErrorContainer>
                    <h2>상품을 찾을 수 없습니다</h2>
                    <Button onClick={() => navigate('/localStore/products')}>
                        상품 목록으로 돌아가기
                    </Button>
                </ErrorContainer>
            </Container>
        );
    }

    return (
        <Container>
            <BackButton to="/localStore/products">
                <Button variant="secondary">← 상품 목록으로</Button>
            </BackButton>

            <Content>
                <ImageSection>
                    <ProductImage src={product.image} alt={product.title} />
                </ImageSection>

                <InfoSection>
                    <Category>{product.category}</Category>
                    <Title>{product.title}</Title>

                    <Rating>
                        <Stars>
                            {'★'.repeat(Math.round(product.rating.rate))}
                            {'☆'.repeat(5 - Math.round(product.rating.rate))}
                        </Stars>
                        <RatingText>
                            {product.rating.rate} ({product.rating.count}개 리뷰)
                        </RatingText>
                    </Rating>

                    <Price>${product.price.toFixed(2)}</Price>

                    <Description>{product.description}</Description>

                    <ButtonGroup>
                        <Button variant="primary" size="large" onClick={handleAddToCart}>
                            장바구니 담기
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/localStore/cart')}>
                            장바구니 보기
                        </Button>
                    </ButtonGroup>
                </InfoSection>
            </Content>
        </Container>
    );
};