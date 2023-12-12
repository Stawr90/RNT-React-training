import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useHttp } from "hooks/http.hook";

enum SearchBy {
    TITLE,
    GENRE
}

interface IStateSearch {
    search: string;
    searchLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'error';
    searchBtn: number;
    searchingItems: { label: string; value: SearchBy; id: string }[];
}

interface IRootState {
    movies: {};
    search: IStateSearch;
}

const initialState: IStateSearch = {
    search: '',
    searchLoadingStatus: 'idle',
    searchBtn: 0,
    searchingItems: [
        {
            label: 'title',
            value: SearchBy.TITLE,
            id: 'radio-1'
        },
        {
            label: 'genre',
            value: SearchBy.GENRE,
            id: 'radio-2'
        }
    ]
}

export const fetchSearchMovies = createAsyncThunk(
    'search/fetchSearchMovies',
    async (_, {getState}) => {
        const {request} = useHttp();
        const state: IRootState = getState() as IRootState;
        
        const searchBtn = state.search.searchBtn;
        const typeSearchBtn = searchBtn ? 'genre' : 'title';
        const valueSearch = state.search.search;

        return await request(`http://localhost:3000/posts?${typeSearchBtn}_like=${valueSearch}`)
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchTitleOrGenre: (state, action) => {
            state.searchBtn = action.payload;
            state.search = '';
        },
        searchChange: (state, acrion) => {
            state.search = acrion.payload;
        }
    }
})

export const searchingBtn = (state) => state.search.searchingItems;
export const searchBtn = (state) => state.search.searchBtn;
export const valueSearch = (state) => state.search.search;

const {actions, reducer} = searchSlice;

export default reducer;

export const {searchTitleOrGenre, searchChange} = actions;