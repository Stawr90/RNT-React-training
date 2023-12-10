import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useHttp } from "hooks/http.hook";
import { fetchSearchMovies } from "components/searchForm/searchSlice";

enum SortBy {
    RELEASE_DATE,
    MOVIE_TITLE
}

interface IStateMovies {
    movies: any[];
    moviesLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'error';
    movieCard: {img: string; title: string; date: string | number; timer: number; descr: string} | undefined;
    sortBtn: number | null;
    sortingItems: { label: string; value: string | number }[];
}

const initialState: IStateMovies = {
    movies: [],
    moviesLoadingStatus: 'idle',
    movieCard: undefined,
    sortBtn: null,
    sortingItems: [
        {
            label: 'release date',
            value: SortBy.RELEASE_DATE
        },
        {
            label: 'movie title',
            value: SortBy.MOVIE_TITLE
        }
    ]
};

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3000/posts");
    } 
);

export const fetchSortMovies = createAsyncThunk(
    'movies/fetchSortMovies',
    async (_, {getState}) => {
        const {request} = useHttp();
        // const state = getState();
        // const btn = state.sortBtn;

        // switch (state.sortBtn) {
        //     case SortBy.RELEASE_DATE:
                return await request("http://localhost:3000/posts?_sort=date&_order=desc");
        //     case SortBy.MOVIE_TITLE:
        //         return await request("http://localhost:3000/posts?_sort=title&_order=asc");
        //     default:
        //         console.log('unsorted')
        // }
    }
);

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        movieGetChar: (state, action) => {
            state.movieCard = state.movies.find(item => item.id === action.payload);
        },
        movieGetSerch: (state, action) => {
            state.movieCard = action.payload;
        },
        moviesSorted: (state, action) => {
            state.sortBtn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // first request
            .addCase(fetchMovies.pending, state => {state.moviesLoadingStatus = 'loading'})
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<any>) => {
                state.moviesLoadingStatus = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, state => {state.moviesLoadingStatus = 'error'})

            // sort movies
            .addCase(fetchSortMovies.pending, state => {state.moviesLoadingStatus = 'loading'})
            .addCase(fetchSortMovies.fulfilled, (state, action: PayloadAction<any>) => {
                state.moviesLoadingStatus = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchSortMovies.rejected, state => {state.moviesLoadingStatus = 'error'})

            // search movies
            .addCase(fetchSearchMovies.pending, state => {state.moviesLoadingStatus = 'loading'})
            .addCase(fetchSearchMovies.fulfilled, (state, action: PayloadAction<any>) => {
                state.moviesLoadingStatus = 'succeeded';
                state.movies = action.payload;
                state.sortBtn = null;
                console.log(action.payload);
            }) 
            .addCase(fetchSearchMovies.rejected, state => {state.moviesLoadingStatus = 'error'})

            .addDefaultCase(() => {})
    }
});

export const moviesList = (state) => state.movies.movies;
export const sortingBtn = (state) => state.movies.sortingItems;
export const sortBtn = (state) => state.movies.sortBtn;
export const movieCard = (state) => state.movies.movieCard;

const {actions, reducer} = moviesSlice;

export default reducer;

export const {movieGetChar, movieGetSerch, moviesSorted} = actions;