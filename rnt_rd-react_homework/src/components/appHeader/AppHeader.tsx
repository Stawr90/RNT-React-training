import React from 'react';

import netflixBg from '../../resources/img/netflix_bg.jpg';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="/">
                    <span>netflixroulette</span>
                </a>
            </h1>
            <form className="form">
                <div className="form__subtitle">
                    <span>find your movie</span>
                </div>

                <input placeholder="Please enter a movie" className="form__input"/>
                
                <div className="form__allbtn">
                    <div className="form__radiobtn">
                        <span>search by</span>
                        <div className="form_radio_btn">
                            <input id="radio-1" type="radio" name="radio" value="1" defaultChecked/>
                            <label htmlFor="radio-1">title</label>
                        </div>
                        <div className="form_radio_btn">
                            <input id="radio-2" type="radio" name="radio" value="2"/>
                            <label htmlFor="radio-2">genre</label>
                        </div>
                    </div>
                    <button className="app__btn">search</button>
                </div>
                
            </form>
            <div className="app__img">
                <img src={netflixBg} alt='background'/>
            </div>
        </header>
    )
}

export default AppHeader;