import React from 'react';
import { useCharMovies } from 'context/MoviesContext';

import './headerList.scss';

interface ICounter {
    found: number;
}

const HeaderList = ({found}: ICounter) => {
	const {sortingItems, setSortBy, sortBy} = useCharMovies();

	return (
		<div className="headerlist">
			<div className="headerlist__movies">{found} movies found</div>
			<div className="headerlist__sort">
                Sort by
				{
					sortingItems.map(item => (
						<button 
							key={item.value} 
							onClick={() => setSortBy(item.value)} 
							className={`sortBtn ${item.value === sortBy ? 'sortBtnActive' : ''}`}>{item.label}
						</button>
					))
				}
			</div>
		</div>
	)
}

export default HeaderList;