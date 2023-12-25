import React from 'react';

import { Routes, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFooter';
import MoviesList from '../moviesList/MoviesList';
import LoginForm from 'components/loginForm/LoginForm';
import RegForm from 'components/regForm/RegForm';
import InfoCard from 'components/infoCard/InfoCard';
import Page404 from 'components/pages/404';

import PrivateRoute from 'utils/router/privateRoute';

import './app.scss';


function App() {

  const AppContent: React.FC = () => {
    return (
      <>
        <AppHeader/>
        <main>
          <Routes>
            <Route path='/' element={<MoviesList/>}/>
            <Route path='/posts/:id' element={<InfoCard/>}/>
            <Route path='*' element={<Page404/>}/>
          </Routes>
        </main>
        <AppFooter/>
      </>
    )
  }

  return (
      <div className="App">
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path='*' element={<AppContent/>}/>
          </Route>

          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/registration' element={<RegForm/>}/>
        </Routes>
      </div>
  );
}

export default App;
