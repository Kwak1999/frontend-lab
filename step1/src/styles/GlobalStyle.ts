import {createGlobalStyle} from 'styled-components';

// createGlobalStyle: styled-components에서 제공하는 전역 스타일
export const GlobalStyle = createGlobalStyle`
    
    //CSS reset
    //- 모든 요소의 기본 margin, padding 제거
    //- box-sizing: border-box로 크기 계산 방식 통일
    
    //CSS Reset이 왜 필요한가?
    //문제 상황:
    //<h1> 태그는 기본적으로 위아래 margin이 있어요
    //<button>은 브라우저마다 모양이 달라요
    // 예측 불가능한 레이아웃 발생!
    
    // 해결:
    // 모든 기본 스타일 제거
    // 우리가 원하는 스타일만 적용
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box; 
    //  기본값 (content-box): width: 100px + padding: 10px + border: 2px = 실제 크기 124px 😱
    //  border-box: width: 100px (padding, border 포함) = 실제 크기 100px ✅
    }
    
    
    // HTML, Body 기본 설정
    html, body {
        width: 100%;
        height: 100%;
        
    //    시스템 기본 폰트 사용(운영체제별로 최적화)
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
        
    //    폰트 렌더링 개선(더 부드럽게)
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    // Body 스타일
    // - theme 객체 사용 예시: ${({theme}) => theme.colors.primary};
    
    body{
        background-color: #ffffff;
        color: #212529;
        font-size: 16px;
        line-height: 1.6; // 줄 간격
    }
    
    // 링크(a 태그) 기본 스타일
    a{
        color: #007bff;
        text-decoration: none; // 밑줄 제거
        transition: opacity 0.2s ease-in-out; // 부드러운 효과

        // 마우스 올렸을 때 hover효과
        &:hover {
            opacity: 0.8;
        }
    }
    
    // 버튼 기본 스타일 초기화
    // - 브라우저 기본 스타일 제거
    button{
        border: none;
        background: none;
        cursor: pointer; // 마우스 커서올리면 포인터로 바뀜
        font-family: inherit; // 부모 폰트 상속
    }
    
    // 입력 필드 기본 설정
    input, textarea {
        font-family: inherit;
        font-size: inherit;
    }
    
    // 리스트(ul, ol) 기본 스타일 제거
    ul, ol {
        list-style: none; // 불릿 포인트 제거
    }
    
    // 이미지 반응형 설정
    img{
        max-width: 100%; // 부모 요소마다 커지지 않게
        height: auto; // 비율 유지
        display: block; // 이미지 하단 공백 제거
    }
`;

// createGlobalStyle이란?
// styled-components에서 전역 CSS를 만드는 함수
// 일반 CSS처럼 작성하지만, JS 파일 안에서 관리 가능
// 컴포넌트처럼 사용: <GlobalStyle />

