import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { searchingBtn, searchBtn, searchTitleOrGenre, valueSearch, searchChange, fetchSearchMovies} from './searchSlice';

import './searchForm.scss';

const SearchForm = () => {
    const serchingItemsBtn = useSelector(searchingBtn);
    const checkedBtn = useSelector(searchBtn);
    const value = useSelector(valueSearch);
    const dispatch = useDispatch();

    const searchBtnForm = (event) => {
        event.preventDefault();
        if (value !== '') {
            dispatch(fetchSearchMovies() as any);
        }
    }

    return (
        <>
            <form className="form" onSubmit={(e) => searchBtnForm(e)}>
                <div className="form__subtitle">
                    <span>find your movie</span>
                </div>

                <input 
                    placeholder="Please enter a movie" 
                    className="form__input" 
                    value={value} 
                    onChange={e => dispatch(searchChange((e.target.value).trim()))}/>
                
                <div className="form__allbtn">
                    <div className="form__radiobtn">
                        <span>search by</span>
                        {serchingItemsBtn.map(item => (
                            <div key={item.value} className="form_radio_btn">
                                <input id={item.id} type="radio" name="radio" checked={item.value === checkedBtn ? true : false} 
                                onChange={() => dispatch(searchTitleOrGenre(item.value))}/>
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