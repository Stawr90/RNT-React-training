import React from 'react';
import { Form, Field } from 'react-final-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {sortingBtn, sortBtn, moviesSorted, fetchSortMovies} from '../moviesList/moviesSlice';

import './headerList.scss';

interface ICounter {
    found: number | string;
}

const HeaderList = ({found}: ICounter) => {
	const sortingItemsBtn = useSelector(sortingBtn);
	const styleBtn = useSelector(sortBtn);
	const dispatch = useDispatch();

	useEffect(() => {
		if (styleBtn !== null) {
			dispatch(fetchSortMovies() as any)
		}
	}, [styleBtn]);

	const submitSort = (values) => {
		dispatch(moviesSorted(values.sortType));
	};

	return (
		<Form
			onSubmit={submitSort}
			render={({ handleSubmit }) => (
				<div className="headerlist">
					<div className="headerlist__movies">{found} movies found</div>
					<div className="headerlist__sort">
						Sort by
						{sortingItemsBtn.map(item => (
							<button key={item.value} onClick={handleSubmit} value={item.value}
								className={`sortBtn ${item.value === styleBtn ? 'sortBtnActive' : ''}`}>{item.label}
							</button>
						))}
						<Field name="sortType" component="input" type="hidden" />
					</div>
				</div>
			)}
		/>
	)
}

export default HeaderList;