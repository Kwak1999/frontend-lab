import styled from "styled-components";
import {useFilterStore} from "../../hooks/useFilterStore.ts";
import {Button} from "./Button.tsx";

const Container = styled.div`
    margin-bottom: 32px;
    padding: 24px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Title = styled.h3`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #212529;
`;

const FilterGroup = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
    
    @media (max-width: 768px){
        grid-template-columns: 1fr;
    }
`;

const Input = styled.input`
    padding: 10px 16px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 16px;
    
    &:focus{
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
`;

const Select = styled.select`
    padding: 10px 16px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 16px;
    background: white;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
`

export const SearchFilter: React.FC = () => {
    const {
        searchQuery,
        selectedCategory,
        minPrice,
        maxPrice,
        setSearchQuery,
        setCategory,
        setPriceRange,
        resetFilters,
    } = useFilterStore();

    const categories = [
        {value: 'all', label: '전체'},
        {value: 'electranics', label: '전자제품'},
        {value: 'jewelery', label: '쥬얼리'},
        {value: "men's clothing", label: '남성 의류'},
        {value: "women's clothing", label: "여성 의류"},
    ];

    return (
        <Container>
            <Title>검색 & 필터</Title>

            <FilterGroup>
            {/*    검색어 입력   */}
                <Input
                    type="text"
                    placeholder="상품명 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />

            {/*    카테고리 선택  */}
                <Select
                    value={selectedCategory}
                    onChange={(e) => setCategory(e.target.value)} >
                    {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </Select>

            {/*    최소 가격    */}
                <Input
                    type="number"
                    placeholder="최소 가격"
                    value={minPrice || ''}
                    onChange={(e) =>
                setPriceRange(
                    e.target.value ? Number(e.target.value) : null,
                    maxPrice
                    )
                }
                />

            {/*    최대 가격    */}
                <Input
                    type="number"
                    placeholder="최대 가격"
                    value={maxPrice || ''}
                    onChange={(e) =>
                    setPriceRange(
                        minPrice,
                        e.target.value ? Number(e.target.value) : null,
                    )
                }
                    />

                <ButtonGroup>
                    <Button
                        variant='secondary'
                        onClick={resetFilters}
                        >
                        필터 초기화
                    </Button>
                </ButtonGroup>
            </FilterGroup>
        </Container>
    )
}