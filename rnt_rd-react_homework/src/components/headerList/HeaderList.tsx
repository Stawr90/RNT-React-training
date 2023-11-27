import React from 'react';

import './headerList.scss';

interface ICounter {
    found: number;
}

const HeaderList = ({found}: ICounter) => {
    return (
        <div className="headerlist">
            <div className="headerlist__movies"> {found} movies found</div>
            <div className="headerlist__sort">
                Sort by
                <button>release date</button>
                <button>movie title</button>
            </div>
        </div>
    )
}

export default HeaderList;