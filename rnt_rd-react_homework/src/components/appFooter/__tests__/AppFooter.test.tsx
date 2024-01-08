import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFooter from '../AppFooter';

test('footer element display', () => {
    render(<AppFooter/>);
    
    expect(screen.getByText(/netflixroulette/i)).toBeInTheDocument();
});
