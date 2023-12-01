import React from 'react';
import { useCharMovies } from 'context/MoviesContext';

import './headerList.scss';

interface ICounter {
    found: number;
}

const HeaderList = ({found}: ICounter) => {
	const {sortDate, sortTitle, styleBtn} = useCharMovies();

	const colorDate = styleBtn && styleBtn !== null ? {color: 'rgb(245, 90, 90)'} : {color: '#000'};
	const colorTitle = !styleBtn && styleBtn !== null ? {color: 'rgb(245, 90, 90)'} : {color: '#000'};

	return (
		<div className="headerlist">
			<div className="headerlist__movies">{found} movies found</div>
			<div className="headerlist__sort">
                Sort by
				<button onClick={sortDate} style={colorDate}>release date</button>
				<button onClick={sortTitle} style={colorTitle}>movie title</button>
			</div>
		</div>
	)
}

export default HeaderList;