import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoCard from '../InfoCard';

describe('InfoCard Component', () => {
    test('info card element display', () => {
        render(<InfoCard/>);
        
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByAltText('Pele')).toBeInTheDocument();
        expect(screen.getByText('Pele')).toBeInTheDocument();
        expect(screen.getByText('2021')).toBeInTheDocument();
        expect(screen.getByText('141 min')).toBeInTheDocument();
        expect(screen.getByText(/Looks back/i)).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
