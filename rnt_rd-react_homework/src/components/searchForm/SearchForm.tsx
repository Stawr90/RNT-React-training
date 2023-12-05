import React from 'react';
import { useCharMovies } from 'context/MoviesContext';

import './searchForm.scss';

const SearchForm = () => {
    const {value, searchFilter, searchBtn, searchingItems, searchBy, setSearchBy} = useCharMovies();

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
                        {searchingItems.map(item => (
                            <div key={item.value} className="form_radio_btn">
                                <input id={item.id} type="radio" name="radio" checked={item.value === searchBy ? true : false} 
                                onChange={() => setSearchBy(item.value)}/>
                                <label htmlFor={item.id}>{item.label}</label>
                            </div>
                        ))}
                    </div>
                    <button className="app__btn" type="submit">search</button>
                </div>
                
            </form>
        </>
    )
}

export default SearchForm;