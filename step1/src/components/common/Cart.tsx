import styled from "styled-components";
import {Button} from "./Button.tsx";
import {useCartStore} from "../../store/useCartStore.ts";

// 장바구니 컨테이너
const CartContainer = styled.div`
    border: 1px solid #dee2e6;
    border-radius: 12px;
    padding: 24px;
    background: white;
`;

const CartTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    color: #212529;
`;

const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e9ecef;
    
    &:last-child {
        border-bottom: none;
    }
`;

const ItemInfo = styled.div`
    flex: 1;
`;

const ItemName = styled.h4`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
`;

const ItemPrice = styled.p`
    font-size: 14px;
    color: #6c757d;
`;

const QuantityButton = styled.button`
    width: 32px;
    height: 32px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background: #f8f9fa;
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Quantity = styled.span`
    font-size: 16px;
    font-weight: 600;
    min-width: 30px;
    text-align: center;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TotalSection = styled.div`
    margin-top: 24px;
    padding-top: 24px;
    border-top: 2px solid #dee2e6;
`;

const TotalPrice = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #007bff;
`;

const EmptyCart = styled.div`
    text-align: center;
    padding: 48px 24px;
    color: #6c757d;
`;

export const Cart: React.FC = () => {
    // zustand에서 필요한 상태와 액션 가져오기
    const items = useCartStore((state) => state.items)
    const removeItem = useCartStore((state) => state.removeItem)
    const updateQuantity = useCartStore((state) => state.updateQuantity)
    const clearCart = useCartStore((state) => state.clearCart)
    const getTotalPrice = useCartStore((state) => state.getTotalPrice)

    // 장바구니가 비어있을 때
    if(items.length === 0){
        return(
            <CartContainer>
                <CartTitle>🛒 장바구니</CartTitle>
                <EmptyCart>장바구니가 비어있습니다</EmptyCart>
            </CartContainer>
        );
    }

    return (
        <CartContainer>
            <CartTitle>장바구니 ({items.length}개)</CartTitle>

        {/*    장바구니 아이템 목록  */}
            {items.map((item) => (
                <CartItem key={item.id}>
                    <ItemInfo>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>
                            {item.price.toLocaleString()}원 x {item.quantity}개
                        </ItemPrice>
                    </ItemInfo>

                {/*    수량 조절    */}
                    <QuantityControl>
                        <QuantityButton
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}>
                            -
                        </QuantityButton>
                        <Quantity>{item.quantity}</Quantity>
                        <QuantityButton
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >+</QuantityButton>
                        <Button
                            variant='danger'
                            size='small'
                            onClick={() => removeItem(item.id)}>삭제</Button>
                    </QuantityControl>

                </CartItem>
            ))}

        {/*    총 가격     */}
            <TotalSection>
                <TotalPrice>
                    <span>총 금액</span>
                    <span>{getTotalPrice().toLocaleString()}달러</span>
                </TotalPrice>
                <Button
                    variant='primary'
                    fullWidth
                    onClick={() => {
                        if (window.confirm('장바구니를 비우시겠습니까?')) {
                            clearCart();
                        }
                    }}
                    >전체 삭제</Button>
            </TotalSection>
        </CartContainer>
    )
}