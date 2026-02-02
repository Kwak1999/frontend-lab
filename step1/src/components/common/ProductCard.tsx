import styled from "styled-components";
import {Button} from "./Button";
import {useCartStore} from "../../store/useCartStore.ts";

// 상품 카드 스타일
const Card = styled.div`
    border: 1px solid #dee2e6;
    border-radius: 12px;
    padding: 24px;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    transition: transform 0.2s;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
`;

const ProductImage = styled.div`
    width: 100%;
    height: 200px;
    background: #f8f9fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-size: 48px;
`;

const ProductName = styled.div`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #212529;
`;

const ProductPrice = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #007bff;
    margin-bottom: 16px;
`;

// Props 타입 정의
interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    emoji: string; // 이모지로 상품 이미지 대체
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    emoji
}) => {
    // Zustand 스토어 사용
    const addItem = useCartStore((state) => state.addItem);

    // 장바구니 추가 핸들러
    const handleAddToCart = () => {
        addItem({id, name, price, quantity: 1});
        alert(`${name} 을(를) 장바구니에 추가했습니다.`);
    };

    return (
        <Card>
            <ProductImage>{emoji}</ProductImage>
            <ProductName>{name}</ProductName>
            <ProductPrice>{price.toLocaleString()}원</ProductPrice>

            <Button
                variant="primary"
                fullWidth
                onClick={handleAddToCart}
                >
                장바구니 담기
            </Button>
        </Card>
    )
}