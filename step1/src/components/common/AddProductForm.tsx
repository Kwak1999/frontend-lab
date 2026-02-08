import styled from "styled-components";
import {useState} from "react";
import {useCreateProduct} from "../../hooks/useProducts.ts";
import * as React from "react";
import {Button} from "./Button.tsx";


const Form = styled.form`
    border: 1px solid #dee2e6;
    border-radius: 12px;
    padding: 24px;
    background: white;
    margin-bottom: 32px;
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #212529;
`;

const InputGroup = styled.div`
    margin-bottom: 16px;
`;

const Label = styled.label`
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #495057;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 16px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 16px;
    
    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 256, 0.1);
    }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;


const Message = styled.div<{ $success?: boolean }>`
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 16px;
    background-color: ${({$success}) => $success ? '#d4edda' : '#f8d7da'};
    color: ${({ $success}) => $success ? '#155724' : '#721c24'};
    font-size: 14px;
`;

export const AddProductForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    // useMutation 사용
    const createProduct = useCreateProduct();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 입력값 검증
        if(!title || !price){
            alert('제목과 가격을 입력해주세요')
            return;
        }

        // Mutation 실행
        createProduct.mutate({
            title,
            price: parseFloat(price),
            description: description || '',
            category: 'electronics', // 기본값
            image: 'https://via.placeholder.com/300', // 기본 이미지
            rating:{
                rate: 0,
                count: 0
            }
        }, {
            // 성공 시 폼 초기화
            onSuccess: () => {
                setTitle('');
                setPrice('');
                setDescription('');
                alert('상품이 추가 되었습니다.');
            },
            // 실패 시 에러 표시
            onError: (error) => {
                alert(`에러: ${error instanceof Error ? error.message : '알 수 없는 에러'}`);
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Title>➕ 새 상품 추가</Title>
        {/*    로딩/에러 메시지    */}
            {createProduct.isPending && (
                <Message>상품 추가 중...</Message>
            )}

            {createProduct.isError && (
                <Message>에러가 발생했습니다. 다시 시도해주세요.</Message>
            )}

            {createProduct.isSuccess && (
                <Message $success> 상품이 성공적으로 추가되었습니다.</Message>
            )}

        {/*    폼 입력     */}
            <InputGroup>
                <Label>상품명 *</Label>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: 맥북 프로"
                    disabled={createProduct.isPending} />
            </InputGroup>

            <InputGroup>
                <Label>가격 *</Label>
                <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="예: 1299.99"
                    step="0.01"
                    disabled={createProduct.isPending} />
            </InputGroup>

            <InputGroup>
                <Label>설명</Label>
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="상품 설명 (선택사항)"
                    disabled={createProduct.isPending} />
            </InputGroup>

            <ButtonGroup>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={createProduct.isPending}
                >{createProduct.isPending ? '추가 중...' : '상품 추가'}</Button>

                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                        setTitle('');
                        setPrice('');
                        setDescription('');
                    }}
                    disabled={createProduct.isPending}
                    >초기화</Button>
            </ButtonGroup>
        </Form>
    )
}