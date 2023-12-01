import React, { useState, useContext, useRef, useEffect} from 'react';

import { movies } from 'constants/movies';

const MoviesContext = React.createContext(null);

export const useCharMovies = () => {
    return useContext(MoviesContext);
}

type ProviderProps = {
    children: React.ReactNode;
};

export const MoviesProvider = ({children}: ProviderProps) => {
    const [blockHeader, setBlockHeader] = useState(true);
    const [infoCard, setInfoCard] = useState([]);
    const [moviesCard, setMoviesCard] = useState(movies);
    const [colorBtn, setColorBtn] = useState(null);
    const [searchBy, setSearchBy] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const timer = useRef(null);

    useEffect(() => {
        if (inputValue === '') {
            setMoviesCard(movies);
        }
    }, [inputValue])

    const toggle = () => {
        setBlockHeader(prev => !prev);
    }

    const charInfoCard = (id) => {
        const charCard = movies.filter(item => {
            return item.id === id;
        })
        setInfoCard(() => charCard);
    }

    const onShowInfoCard = (event, id) => {
        clearTimeout(timer.current);

        if (event.detail === 1) {
            timer.current = setTimeout(() => {console.log('Please double click on the card')}, 300);
        } else if (event.detail === 2) {
            setBlockHeader(false);
            charInfoCard(id);
        }
    }

    const sortDate = () => {
        const date = [...moviesCard].sort((x1, x2) => x2.date - x1.date);
        setMoviesCard(date);
        setColorBtn(true);
    }

    const sortTitle = () => {
        const title = [...moviesCard].sort((x1, x2) => x1.title.localeCompare(x2.title));
        setMoviesCard(title);
        setColorBtn(false);
    }

    const toggleFilter = () => {
        setSearchBy(!searchBy);
        setInputValue('');
        setColorBtn(null);
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
        if (searchBy) {
            const title = movies.filter(item => {
                const reg = new RegExp(inputValue, 'gi');
                return reg.test(item.title);
            })
            setMoviesCard(title);
        }

        if (!searchBy) {
            const genre = movies.filter(item => {
                const reg = new RegExp(inputValue, 'gi');
                return reg.test(item.genre);
            })
            setMoviesCard(genre);
        }
    }

    return (
        <MoviesContext.Provider value={{
            visible: blockHeader,
            card: infoCard,
            movies: moviesCard,
            styleBtn: colorBtn,
            search: searchBy,
            value: inputValue,
            toggle,
            onShowInfoCard,
            sortDate,
            sortTitle,
            toggleFilter,
            searchFilter,
            searchBtn
        }}>
            {children}
        </MoviesContext.Provider>
    )
}