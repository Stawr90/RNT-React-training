import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderList from '../HeaderList';

test('header list element display', () => {
    render(<HeaderList found={7}/>);

    expect(screen.getByText(/movies found/i)).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByLabelText(/RELEASE_DATE/i)).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByLabelText(/MOVIE_TITLE/i)).toBeInTheDocument();
});