
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./styles/GlobalStyle.ts";
import { BrowserRouter } from "react-router-dom";
import {theme} from "./styles/theme.ts";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              {/*  이 안의 모든 컴포넌트가 theme 사용 가능 */}
              <GlobalStyle /> {/* 전역 스타일 적용 */}
              <App />
          </ThemeProvider>
      </BrowserRouter>
  </StrictMode>,
)
