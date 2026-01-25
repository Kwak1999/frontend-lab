import {useState} from "react";
import styled from 'styled-components'    // styled-components
import {Button} from "./components/common/Button.tsx";

// styled-components로 레이아웃 만들기
const Container = styled.div`
  max-width: 1200px;        /* 최대 너비 */
  margin: 0 auto;           /* 가운데 정렬 */
  padding: 48px 32px;       /* 여백 */
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 48px;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 48px;
  padding: 32px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #212529;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;              /* 버튼 사이 간격 */
  flex-wrap: wrap;        /* 화면 작으면 줄바꿈 */
  margin-bottom: 24px;
`;

const Description = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 16px;
`;

const Counter = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #007bff;
  margin: 24px 0;
  text-align: center;
`;

function App() {
    // 카운터 상태 관리
    const [count, setCount] = useState(0);

  return (
    <Container>
        <Title>Styled-components 실습</Title>
    {/*    Section 1: Button Variants */}
        <Section>
            <SectionTitle>1. Button Variants (버튼 종류)</SectionTitle>
            <Description>
                Primary, Secondary, Danger 세 가지 variant를 테스트
            </Description>

            <ButtonGroup>
                <Button variant="primary" onClick={() => alert('Primary 버튼 클릭')}>
                    Primary Button
                </Button>

                <Button variant="secondary" onClick={() => alert('Secondary 버튼 클릭!')}>
                    Secondary Button
                </Button>

                <Button variant="danger" onClick={() => alert('Danger 버튼 클릭!')}>
                    Danger Button
                </Button>
            </ButtonGroup>
        </Section>


        {/* Section 2: Button Sizes */}
        <Section>
            <SectionTitle>2. Button Sizes (버튼 크기)</SectionTitle>
            <Description>
                Small, Medium, Large 세 가지 크기를 테스트합니다.
            </Description>
            <ButtonGroup>
                <Button size="small" onClick={() => alert('Small 버튼!')}>
                    Small
                </Button>
                <Button size="medium" onClick={() => alert('Medium 버튼!')}>
                    Medium
                </Button>
                <Button size="large" onClick={() => alert('Large 버튼!')}>
                    Large
                </Button>
            </ButtonGroup>
        </Section>

        {/* Section 3: Full Width & Disabled */}
        <Section>
            <SectionTitle>3. Full Width & Disabled (전체 너비 & 비활성화)</SectionTitle>
            <Description>
                전체 너비 버튼과 비활성화된 버튼을 테스트합니다.
            </Description>
            <Button
                variant="primary"
                fullWidth
                onClick={() => alert('전체 너비 버튼!')}
                style={{ marginBottom: '16px' }}
            >
                Full Width Button
            </Button>
            <ButtonGroup>
                <Button disabled>Disabled Primary</Button>
                <Button variant="secondary" disabled>Disabled Secondary</Button>
                <Button variant="danger" disabled>Disabled Danger</Button>
            </ButtonGroup>
        </Section>

        {/* Section 4: Counter 실습 */}
        <Section>
            <SectionTitle>4. 카운터 실습 (상태 관리)</SectionTitle>
            <Description>
                버튼을 클릭하여 카운터 값을 변경해보세요.
            </Description>
            <Counter>현재 카운트: {count}</Counter>
            <ButtonGroup>
                <Button
                    variant="primary"
                    onClick={() => setCount(count + 1)}
                >
                    증가 (+1)
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => setCount(count - 1)}
                >
                    감소 (-1)
                </Button>
                <Button
                    variant="danger"
                    onClick={() => setCount(0)}
                >
                    리셋 (0)
                </Button>
            </ButtonGroup>
        </Section>
    </Container>
  )
}

export default App
