import React from 'react';
import { MoviesProvider } from 'context/MoviesContext';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFooter';
import MoviesList from '../moviesList/MoviesList';

import './app.scss';

function App() {
  return (
    <MoviesProvider>
      <div className="App">
        <AppHeader/>
        <main>
          <MoviesList/>
        </main>
        <AppFooter/>
      </div>
    </MoviesProvider>
  );
}

export default App;
