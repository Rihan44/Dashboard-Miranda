import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { StatusParagraph } from './components/Reusables/StatusParagraph';

describe('equisde', () => {
    render(<StatusParagraph data-testid='statusParagraph'/>);
    const status = screen.getByTestId('statusParagraph');
    it('renders welcome message', () => {
        expect(status).toBeInTheDocument();
    });
});

