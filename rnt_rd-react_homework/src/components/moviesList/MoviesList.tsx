import React from 'react';

import HeaderList from '../headerList/HeaderList';
import MovieCard from '../movieCard/MovieCard';

import moviesDb from '../../../db.json';

import './moviesList.scss';

const MoviesList = () => {
    const numMovies: number = moviesDb.movies.length;

    return (
        <div>
            <HeaderList found={numMovies}/>
            <div className="list">
                <ul className="list__movies">
                    {moviesDb.movies.map(item => (
                        <MovieCard key={item.id} movie={item}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MoviesList;