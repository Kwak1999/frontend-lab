// styled-components 라이브러리의 타입을 확장(extend)한다
import 'styled-components';

// 우리가 만든 theme의 타입을 가져온다
import {Theme} from "./styles/theme.ts";

// Ts에게 "이 모듈의 타입을 수정할게"라고 선언
declare module 'styled-components' {
    // TypeScript에게 "이 모듈의 타입 정의를 추가/수정할게"
    // 외부 라이브러리 타입을 커스터마이징할 때 사용
    // Module Augmentation(모듈 확장)이라고 부름

    // DefaultTheme을 우리가 만든 Theme 타입으로 확장
    export interface DefaultTheme extends Theme{}
}