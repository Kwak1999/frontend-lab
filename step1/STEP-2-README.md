# 📚 STEP 2: Styled-components 익히기

## 🎯 학습 목표

- Styled-components 기본 문법 이해
- 테마 시스템 구축
- Props 기반 동적 스타일링
- 재사용 가능한 컴포넌트 만들기

---

## 📝 학습 내용

### 1. 테마 시스템 (Theme System)

**파일:** `src/styles/theme.ts`

**목적:** 프로젝트 전체에서 사용할 디자인 변수 정의

**예제 코드:**
```typescript
export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    danger: '#dc3545',
    success: '#28a745',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
} as const;

export type Theme = typeof theme;
```

**핵심 개념:**
- `as const`: 타입을 상수로 고정 (자동완성 향상)
- 중앙 집중식 관리로 일관성 유지

---

### 2. 전역 스타일 (Global Style)

**파일:** `src/styles/GlobalStyle.ts`

**목적:** 모든 페이지에 적용되는 기본 CSS

**예제 코드:**
```typescript
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: #ffffff;
    color: #212529;
  }

  a {
    color: #007bff;
    text-decoration: none;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;
```

**핵심 개념:**
- CSS Reset: 브라우저 기본 스타일 제거
- `box-sizing: border-box`: 크기 계산 직관적
- `&:hover`: 중첩 선택자 (Sass 문법)

---

### 3. TypeScript 타입 정의

**파일:** `src/styled.d.ts`

**목적:** TypeScript가 theme 타입을 인식하도록 설정

**예제 코드:**
```typescript
import 'styled-components';
import { Theme } from './styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```

**핵심 개념:**
- Module Augmentation: 외부 라이브러리 타입 확장
- `DefaultTheme`: styled-components의 기본 테마 타입

---

### 4. Button 컴포넌트 만들기

**파일:** `src/components/common/Button.tsx`

**예제 코드:**
```typescript
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  
  /* 크기별 스타일 */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `padding: 4px 16px; font-size: 14px;`;
      case 'large':
        return `padding: 16px 32px; font-size: 18px;`;
      default:
        return `padding: 8px 24px; font-size: 16px;`;
    }
  }}
  
  /* variant별 색상 */
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `background-color: #6c757d; color: #fff;`;
      case 'danger':
        return `background-color: #dc3545; color: #fff;`;
      default:
        return `background-color: #007bff; color: #fff;`;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

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
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};
```

**핵심 개념:**
- `styled.button`: HTML button 태그에 스타일 적용
- Props 기반 동적 스타일: `${({ variant }) => ...}`
- Switch 문으로 여러 케이스 처리
- Pseudo 선택자: `&:hover`, `&:disabled`

---

### 5. ThemeProvider 설정

**파일:** `src/main.tsx`

**예제 코드:**
```typescript
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';

<ThemeProvider theme={theme}>
  <GlobalStyle />
  <App />
</ThemeProvider>
```

**핵심 개념:**
- `ThemeProvider`: 테마를 앱 전체에 제공
- 모든 styled-components에서 `theme` 사용 가능

---

## ✅ 실습 과제

### 과제 1: 테마 시스템 만들기 ✅
- [x] `theme.ts` 파일 생성
- [x] colors, spacing, fontSize, borderRadius 정의
- [x] TypeScript 타입 export

### 과제 2: 전역 스타일 만들기 ✅
- [x] `GlobalStyle.ts` 파일 생성
- [x] CSS Reset 적용
- [x] 기본 폰트, 색상 설정

### 과제 3: TypeScript 타입 설정 ✅
- [x] `styled.d.ts` 파일 생성
- [x] DefaultTheme 확장

### 과제 4: Button 컴포넌트 만들기 ✅
- [x] Props 타입 정의
- [x] variant (primary, secondary, danger)
- [x] size (small, medium, large)
- [x] fullWidth, disabled 옵션
- [x] 동적 스타일 적용

### 과제 5: App.tsx에서 테스트 ✅
- [x] ThemeProvider 설정
- [x] Button 컴포넌트 다양한 방식으로 사용
- [x] 카운터 기능으로 상태 관리 연습

---

## 💡 핵심 개념 정리

### 1. Styled-components 기본 문법
```typescript
const StyledComponent = styled.htmlTag`
  /* CSS 작성 */
`;
```

### 2. Props 접근
```typescript
${({ propName }) => {
  // propName 사용
}}
```

### 3. 테마 사용
```typescript
color: ${({ theme }) => theme.colors.primary};
```

### 4. 조건부 스타일
```typescript
${({ condition }) => condition && `
  /* 스타일 */
`}
```

### 5. 중첩 선택자
```typescript
&:hover { }
&:disabled { }
&:active { }
```

---

## 🎯 이해도 체크

1. ✅ `as const`의 역할은?
   - 타입을 상수로 고정하여 자동완성 향상

2. ✅ `box-sizing: border-box`를 왜 사용하나요?
   - 크기 계산이 직관적 (padding, border 포함)

3. ✅ `&:hover`는 무엇인가요?
   - 자기 자신의 hover 상태 (중첩 선택자)

4. ✅ ThemeProvider는 왜 필요한가요?
   - 테마를 앱 전체에 제공하여 모든 컴포넌트에서 사용 가능

5. ✅ Props 기반 동적 스타일은 어떻게 하나요?
   - `${({ prop }) => ...}` 문법 사용

---

## 🔥 실전 팁

### 1. CSS vs Styled-components
- **CSS 파일**: 순수 CSS 학습, 전통적 방식
- **Styled-components**: 컴포넌트 기반, JS와 통합
- **Tailwind**: 유틸리티 클래스, 빠른 개발

### 2. 테마 활용
```typescript
// 하드코딩 ❌
color: #007bff;

// 테마 사용 ✅
color: ${({ theme }) => theme.colors.primary};
```

### 3. 재사용성
- 공통 스타일은 컴포넌트로 만들기
- Props로 변형 가능하게 설계

---

## 📚 다음 단계

STEP 3: Zustand로 상태관리 시작하기
