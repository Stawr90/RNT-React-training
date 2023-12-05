import React from 'react';

import { useCharMovies } from 'context/MoviesContext';

import InfoCard from '../infoCard/InfoCard';
import SearchForm from '../searchForm/SearchForm';

import netflixBg from '../../resources/img/netflix_bg.jpg';
import './appHeader.scss';

const AppHeader = () => {
    const {card, setInfoCard} = useCharMovies();

    return (
        <header className="app__header">
            <div className="app__header-wrapper">
                <h1 className="app__title">
                    <span>netflixroulette</span>
                </h1>
                {card && <button className="app__btn app__btn-header" onClick={() => setInfoCard(undefined)}>search</button>}
            </div>
            {card && <InfoCard/>}
            {!card && <SearchForm/>}
            <div className="app__img">
                <img src={netflixBg} alt='background'/>
            </div>
        </header>
    )
}

export default AppHeader;