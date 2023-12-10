import React from 'react';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFooter';
import MoviesList from '../moviesList/MoviesList';

import './app.scss';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main>
        <MoviesList/>
      </main>
      <AppFooter/>
    </div>
  );
}

export default App;
