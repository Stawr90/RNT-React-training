import React from 'react';

import { useCharMovies } from 'context/MoviesContext';

import InfoCard from '../infoCard/InfoCard';
import SearchForm from '../searchForm/SearchForm';

import netflixBg from '../../resources/img/netflix_bg.jpg';
import './appHeader.scss';

const AppHeader = () => {
    const {visible, toggle} = useCharMovies();

    return (
        <header className="app__header">
            <div className="app__header-wrapper">
                <h1 className="app__title">
                    <span>netflixroulette</span>
                </h1>
                {!visible && <button className="app__btn app__btn-header" onClick={toggle}>search</button>}
            </div>
            {!visible && <InfoCard/>}
            {visible && <SearchForm/>}
            <div className="app__img">
                <img src={netflixBg} alt='background'/>
            </div>
        </header>
    )
}

export default AppHeader;