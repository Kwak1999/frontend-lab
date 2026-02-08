# 📚 STEP 1: 프로젝트 기본 설정

## 🎯 학습 목표

- Vite + React + TypeScript 프로젝트 생성
- 필수 라이브러리 설치 및 설정
---

## 📦 설치된 기술 스택

### 핵심 라이브러리
```bash
# React + TypeScript (Vite)
npm create vite@latest . -- --template react-ts
npm install

# 상태관리
npm install zustand @tanstack/react-query @tanstack/react-query-devtools

# API 통신
npm install axios

# 라우팅
npm install react-router-dom

# 스타일링 (CSS-in-JS)
npm install styled-components
npm install -D @types/styled-components

# 개발 도구
npm install -D @types/node
```

---

## 📁 프로젝트 폴더 구조

```
src/
├── api/              # API 호출 함수들
│   ├── axios.ts      # axios 인스턴스 설정
│   └── products.ts   # 상품 관련 API
│
├── components/       # 재사용 가능한 컴포넌트
│   ├── common/       # 공통 컴포넌트 (Button, Input 등)
│   └── layout/       # 레이아웃 컴포넌트 (Header, Footer 등)
│
├── pages/           # 페이지 컴포넌트
│   ├── Home.tsx
│   └── Products.tsx
│
├── hooks/           # 커스텀 훅
│   └── useProducts.ts
│
├── store/           # Zustand 스토어
│   └── useCartStore.ts
│
├── types/           # TypeScript 타입 정의
│   └── product.ts
│
├── utils/           # 유틸리티 함수
│   └── helpers.ts
│
└── styles/          # 전역 스타일 & 테마
    ├── GlobalStyle.ts
    └── theme.ts
```

---

## ✅ 완료한 작업

- [x] Vite 프로젝트 생성
- [x] 필수 라이브러리 설치
- [x] 폴더 구조 생성

---

## 💡 주요 개념

### 1. Vite란?
- 빠른 개발 서버와 빌드 도구
- Create React App보다 훨씬 빠름

### 2. TypeScript란?
- JavaScript에 타입을 추가한 언어
- 에러를 미리 방지
- 자동완성과 리팩토링이 쉬움

### 3. 폴더 구조의 중요성
- 기능별로 명확하게 분리
- 유지보수와 협업이 쉬워짐
- 확장 가능한 구조

---

## 🎓 학습 팁

1. **폴더 구조 이해하기**
   - 각 폴더의 역할 파악
   - 파일을 어디에 둘지 판단하는 연습

2. **패키지 관리**
   - `package.json` 확인하기
   - 각 라이브러리의 역할 이해

3. **개발 환경 설정**
   - ESLint, Prettier 설정
   - Git 설정

---

## 🚀 다음 단계

STEP 2: Styled-components로 스타일링 시작하기
