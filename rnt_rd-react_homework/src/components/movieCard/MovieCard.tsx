import React from 'react';

import './movieCard.scss';

interface IFilms {
    id: number;
    img: string;
    title: string;
    genre: string;
    date: number | string;
}

const MovieCard = ({movie}: {movie: IFilms}) => {
    const {id, img, title, genre, date} = movie;

    return (
        <li key={id} className="card">
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