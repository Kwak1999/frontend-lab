import styled from "styled-components";
import * as React from "react";

// Button 컴포넌트가 받을 수 있는 Props 타입 정의
interface ButtonProps {
    // variant: 버튼의 종류(색강 스타일)
    variant?: 'primary' | 'secondary' | 'danger';

    // size: 버튼의 크기
    size?: 'small' | 'medium' | 'large';

    // fullWidth: 전체 너비 사용 여부
    fullWidth?: boolean;

    // disabled: 비활성화 여부
    disabled?: boolean;

    // children: 버튼 안에 들어갈 내용 (텍스트, 아이콘 등)
    children?: React.ReactNode;

    // onClick: 클릭 이벤트 핸들러
    onClick?: () => void;
}

// Styled 컴포넌트용 Props (DOM에 전달되지 않는 prop은 $ 접두사 사용)
interface StyledButtonProps {
    $variant?: 'primary' | 'secondary' | 'danger';
    $size?: 'small' | 'medium' | 'large';
    $fullWidth?: boolean;
}

// styled.button: button 태그에 스타일 적용
const StyledButton = styled.button<StyledButtonProps>`
// 기본 스타일
    display: inline-flex; // flex로 내용물 정렬
    align-items: center; // 세로 가운데 정렬
    justify-content: center; // 가로 가운데 정렬
    font-weight: 500; // 폰트 굵기
    border-radius: 8px; // 모서리 둥글게
    transition: all 0.2s; // 부드러운 애니메이션
    cursor: pointer; // 마우스 포인트
    border: none; // 기본 테두리 제거
    outline: none; // 포커스 테두리 제거
    
    // 크기별 스타일 적용
    ${({ $size }) => {
        // size prop에 따라 다른 스타일 반환
        switch ($size) {
            case 'small':
                return `
                    padding: 4px 16px;
                    font-size: 14px;
                `;
            case 'large':
                return `
                    padding: 16px 32px;
                    font-size: 18px;
                `;
            default: // medium (기본값)
                return `
                    padding: 8px 24px;
                    font-size: 16px;
                `;
        }
    }}
    
    // 전체 너비 옵션
    ${({ $fullWidth }) => $fullWidth && `
        width: 100%;
    `}
    
    // variant별 색상 스타일
    ${({ $variant }) => {
        switch ($variant) {
            case 'secondary':
                return `
                    background-color: #6c757d;
                    color: #ffffff;
                    
                    &:hover:not(:disabled){
                        background-color: #5a6268
                    }
                `;
            case 'danger':
                return `
                    background-color: #dc3545;
                    color: #ffffff;
                    
                    &:hover:not(:disabled){
                        background-color: #c82333;
                    }
                `;
            default: // primary 기본값
                return `
                    background-color: #007bff;
                    color: #ffffff;
                    
                    &:hover:not(:disabled){
                        background-color: #0086b3
                    }
                `;
        }
    }}
    
    // 비활성화 상태
    &:disabled{
        opacity: 0.5; // 반투명하게
        cursor: not-allowed; // 금지 커서
    }
    
    // 클릭 시 효과
    &:active:not(:disabled){
        transform: scale(0.98); // 살짝 작아짐
    }
`;

//1. Props 접근
// ${({ size }) => { ... }}//  ↑ props에서 size 추출
// 2. 조건부 스타일
// ${({ fullWidth }) => fullWidth && `  width: 100%;`}// fullWidth가 true면 width: 100% 적용
// 3. Switch 문으로 여러 케이스 처리
// ${({ variant }) => {  switch (variant) {    case 'primary': return `...`;    case 'danger': return `...`;  }}}
// 4. Pseudo 선택자 중첩
// &:hover:not(:disabled) {  // 마우스 올렸을 때, 단 비활성화 상태가 아니면}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    children,
    onClick
}) => {
    return (
        <StyledButton
            $variant={variant}
            $size={size}
            $fullWidth={fullWidth}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
};

// 💡 React.FC란?
// export const Button: React.FC<ButtonProps> = ({ ... }) => { ... }//                   ↑ Function Component의 약자//                     TypeScript 타입
// 의미:
//     이 변수는 React 함수형 컴포넌트입니다
// ButtonProps 타입의 props를 받습니다
// 자동으로 children 타입 체크