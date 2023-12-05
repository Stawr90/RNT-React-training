import React from 'react';
import { useCharMovies } from 'context/MoviesContext';

import HeaderList from '../headerList/HeaderList';
import MovieCard from '../movieCard/MovieCard';

import './moviesList.scss';

const MoviesList = () => {
    const {movies} = useCharMovies();
    const numMovies = movies.length;

    return (
        <div>
            <HeaderList found={numMovies}/>
            <div className="list">
                <ul className="list__movies">
                    {movies.map(item => (
                        <MovieCard key={item.id} movie={item}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MoviesList;