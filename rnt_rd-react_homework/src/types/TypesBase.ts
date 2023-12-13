export enum SortBy {
    RELEASE_DATE = 'date',
    MOVIE_TITLE = 'title'
}

export enum SearchBy {
    TITLE = 'title',
    GENRE = 'genre'
}

export interface IRootState {
    movies: IStateMovies;
    search: IStateSearch;
}

export interface IStateMovies {
    movies: any[];
    moviesLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'error';
    movieCard: {img: string; title: string; date: string | number; timer: number; descr: string} | undefined;
    sortBtn: SortBy | null;
    sortingItems: { label: string; value: SortBy }[];
}

export interface IStateSearch {
    search: string;
    searchLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'error';
    searchBtn: SearchBy;
    searchingItems: { label: string; value: SearchBy; id: string }[];
}
