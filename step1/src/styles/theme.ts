export const theme = {
    // 1. 색상 팔레트
    colors:{

        // 주요 색상(버튼, 링크, 등)
        primary: '#007bff',

        // 보조 색상
        secondary: '#6c757d',

        // 성공(완료, 확인 메시지)
        success: '#28a745',

        // 위험(삭제, 에러)
        danger: '#dc3545',

        // 경고(주의 메시지)
        warning: '#ffc107',

        // 정보(안내 메시지)
        info: '#17a2b8',
    },

    // 2. 간격(padding, margin에 사용)
    // 일관된 간격으로 깔끔한 레이아웃 유지
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px', // 기본값
        lg: '24px',
        xl: '32px',
        xxl: '48px',
    },

    // 3. 폰트 크기
    fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px', // 기본 본문 크기
        lg: '18px',
        xl: '24px', // 제목
        xxl: '32px', // 큰 제목
    },

    // 4. 폰트 굵기
    fontWeight: {
        light: 300, // 얇게
        normal: 400, // 보통(기본값)
        medium: 500, // 중간
        bold: 700, // 굵게
    },

    // 5. 모서리 둥글기
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px', // 완전한 원형(pill 버튼)
    },
} as const;
// as const가 뭘까?
//TypeScript에게 "이 값들을 변경 불가능한 상수로 취급해"라고 알려줌
// 자동 완성이 더 정확해짐
// 실수로 값 변경하는 것 방지


// ts 타입 정의(자동 완성과 타입 체크를 위해)
export type Theme = typeof theme;