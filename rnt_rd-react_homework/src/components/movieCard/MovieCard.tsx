import React from 'react';
import { useCharMovies } from 'context/MoviesContext';

import './movieCard.scss';

interface IFilms {
    id: number;
    img: string;
    title: string;
    genre: string;
    date: number | string;
}

type TMovie = {
    movie: IFilms;
}

const MovieCard = ({movie}: TMovie) => {
    const {id, img, title, genre, date} = movie;
    const {charInfoCard} = useCharMovies();

    return (
        <li className="card" onClick={() => charInfoCard(id)}>
            <div className="card__img">
                <img src={img} alt={title} />
            </div>
            <div className="card__desc">
                <div className="card__item">
                    <div className="card__item-title">{title}</div>
                    <div className="card__item-date">{date}</div>
                </div>
                <span>{genre}</span>
            </div>
        </li>
    )
}

export default MovieCard;