
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./styles/GlobalStyle.ts";
import { BrowserRouter } from "react-router-dom";
import {theme} from "./styles/theme.ts";
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


// QueryClient 생성 (캐시 설정 등)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // 창 포커스 시 자동 리프레시 안 함
            retry: 1,                   // 실패 시 1번만 재시도
            staleTime: 5 * 60 * 1000, // 5분간 데이터를 "신선한" 것으로 간주
        }
    }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <ThemeProvider theme={theme}>
                  {/*  이 안의 모든 컴포넌트가 theme 사용 가능 */}
                  <GlobalStyle /> {/* 전역 스타일 적용 */}
                  <App />
                  {/* React Query 개발 도구 (개발 환경에서만 보임) */}
                  <ReactQueryDevtools initialIsOpen={false} />
              </ThemeProvider>
          </BrowserRouter>
      </QueryClientProvider>
  </StrictMode>,
)
