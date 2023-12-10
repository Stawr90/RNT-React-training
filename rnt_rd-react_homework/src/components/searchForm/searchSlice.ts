import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useHttp } from "hooks/http.hook";

enum SearchBy {
    TITLE,
    GENRE
}

interface IStateSearch {
    foundMovies: any[];
    search: string;
    searchLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'error';
    searchBtn: number;
    searchingItems: { label: string; value: string | number; id: string }[];
  }

const initialState: IStateSearch = {
    foundMovies: [],
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
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3000/posts?title_like=P")
        // title - http://localhost:3000/posts?title_like=Mar
        // genre - http://localhost:3000/posts?genre_like=Doc
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
export const foundMovies = (state) => state.search.foundMovies;

const {actions, reducer} = searchSlice;

export default reducer;

export const {searchTitleOrGenre, searchChange} = actions;