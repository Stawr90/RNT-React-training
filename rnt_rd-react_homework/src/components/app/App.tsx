import React from 'react';

import { useSelector } from 'react-redux';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFooter';
import MoviesList from '../moviesList/MoviesList';
import LoginForm from 'components/loginForm/LoginForm';
import RegForm from 'components/regForm/RegForm';

import { useReg, useLog } from 'components/loginForm/loginSlice';

import './app.scss';

function App() {
  const registration = useSelector(useReg);
  const signin = useSelector(useLog);

  const AppContent: React.FC = () => {
    return (
      <>
        <AppHeader/>
        <main>
          <MoviesList/>
        </main>
        <AppFooter/>
      </>
    )
  }

  return (
    
    <div className="App">
      {!registration && !signin && <LoginForm/>}
      {registration && !signin && <RegForm/>}

      {signin && <AppContent/>}
    </div>
  );
}

export default App;
