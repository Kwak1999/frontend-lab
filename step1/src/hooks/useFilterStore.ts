import {create} from "zustand";


interface FilterStore {
    // 검색어
    searchQuery: string;

    // 선택된 카테고리
    selectedCategory: string;

    // 가격 범위
    minPrice: number | null;
    maxPrice: number | null;

    // 액션
    setSearchQuery: (query: string) => void;
    setCategory: (category: string) => void;
    setPriceRange:(min: number | null, max: number | null) => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
    // 초기 상태
    searchQuery: '',
    selectedCategory: 'all',
    minPrice: null,
    maxPrice: null,

    // 검색어 설정
    setSearchQuery: (query) => set({searchQuery: query}),

    // 카테고리 설정
    setCategory: (category) => set({selectedCategory: category}),

    // 가격 범위 설정
    setPriceRange: (min, max) => set({minPrice: min, maxPrice: max}),

    // 필터 초기화
    resetFilters: () => set({
        searchQuery: '',
        selectedCategory: 'all',
        minPrice: null,
        maxPrice: null,
    }),
}));