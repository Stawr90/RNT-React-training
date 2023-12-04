import React, { useState, useContext, useRef, useEffect} from 'react';

import { movies } from 'constants/movies';

const MoviesContext = React.createContext(null);

export const useCharMovies = () => {
    return useContext(MoviesContext);
}

type ProviderProps = {
    children: React.ReactNode;
};

enum SortBy {
    RELEASE_DATE,
    MOVIE_TITLE
}

enum SearchBy {
    TITLE,
    GENRE
}

export const MoviesProvider = ({children}: ProviderProps) => {
    const [infoCard, setInfoCard] = useState(undefined);
    const [moviesCard, setMoviesCard] = useState(movies);    
    const [inputValue, setInputValue] = useState('');
    const [sortBy, setSortBy] = useState<SortBy>();
    const [searchBy, setSearchBy] = useState<SearchBy>(0);

    const sortingItems = [
        {
            label: 'release date',
            value: SortBy.RELEASE_DATE
        },
        {
            label: 'movie title',
            value: SortBy.MOVIE_TITLE
        }
    ]

    const searchingItems = [
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

    useEffect(() => {
        if (inputValue === '') {
            setMoviesCard(movies);
        }
    }, [inputValue])

    useEffect(() => {
        if (sortBy === 0) {
            sortDate();
        } else if (sortBy === 1) {
            sortTitle();
        }
    }, [sortBy])

    useEffect(() => {
        toggleFilter();
    }, [searchBy])

    const charInfoCard = (id) => {
        const charCard = movies.find(item => {
            return item.id === id;
        })
        setInfoCard(charCard);
    }

    const sortDate = () => {
        const date = [...moviesCard].sort((x1, x2) => x2.date - x1.date);
        setMoviesCard(date);
    }

    const sortTitle = () => {
        const title = [...moviesCard].sort((x1, x2) => x1.title.localeCompare(x2.title));
        setMoviesCard(title);
    }

    const toggleFilter = () => {
        setInputValue('');
        setSortBy(undefined);
        setMoviesCard(movies);
    }

    const searchFilter = (event) => {
        setInputValue((event.target.value).trim());
    }

    const searchBtn = (event) => {
        event.preventDefault();
        if (inputValue !== '') {
            filterMovies();
        }
    }

    const filterMovies = () => {
        if (searchBy === 0) {
            const title = movies.filter(item => {
                const reg = new RegExp(inputValue, 'gi');
                return reg.test(item.title);
            })
            setMoviesCard(title);
        }

        if (searchBy === 1) {
            const genre = movies.filter(item => {
                const reg = new RegExp(inputValue, 'gi');
                return reg.test(item.genre);
            })
            setMoviesCard(genre);
        }
    }

    return (
        <MoviesContext.Provider value={{
            card: infoCard,
            movies: moviesCard,
            value: inputValue,
            setInfoCard,
            sortingItems,
            sortBy,
            setSortBy,
            searchingItems,
            searchBy,
            setSearchBy,
            charInfoCard,
            searchFilter,
            searchBtn
        }}>
            {children}
        </MoviesContext.Provider>
    )
}