import React from 'react';
import { useCharMovies } from 'context/MoviesContext';

import './searchForm.scss';

const SearchForm = () => {
    const {value, searchFilter, toggleFilter, searchBtn} = useCharMovies();

    return (
        <>
            <form className="form" onSubmit={searchBtn}>
                <div className="form__subtitle">
                    <span>find your movie</span>
                </div>

                <input 
                    placeholder="Please enter a movie" 
                    className="form__input" 
                    value={value} 
                    onChange={e => searchFilter(e)}/>
                
                <div className="form__allbtn">
                    <div className="form__radiobtn">
                        <span>search by</span>
                        <div className="form_radio_btn">
                            <input id="radio-1" type="radio" name="radio" 
                            defaultChecked
                            onChange={toggleFilter}/>
                            <label htmlFor="radio-1">title</label>
                        </div>
                        <div className="form_radio_btn">
                            <input id="radio-2" type="radio" name="radio"
                            onChange={toggleFilter}/>
                            <label htmlFor="radio-2">genre</label>
                        </div>
                    </div>
                    <button className="app__btn" type="submit">search</button>
                </div>
                
            </form>
        </>
    )
}

export default SearchForm;