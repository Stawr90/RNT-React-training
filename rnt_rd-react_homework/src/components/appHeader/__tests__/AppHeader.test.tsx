import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import AppHeader from '../AppHeader';

test('header element display', () => {
    render(<AppHeader/>);

    expect(screen.getByText(/netflixroulette/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText(/background/i)).toBeInTheDocument();
});