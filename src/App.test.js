import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { StatusParagraph } from './components/Reusables/StatusParagraph';

describe('Comprobamos el background del parrafo', () => {

  it('comprobamos que el parrafo status existe', () => {
    render(<StatusParagraph data-testid='statusParagraph' status="check_in" />);
    const status = screen.getByTestId("statusParagraph");

    expect(status).toBeInTheDocument();
  });

  it('el fondo debería ser verde al pasarle check_in', () => {
    render(<StatusParagraph data-testid='statusParagraph' status="check_in" />);
    const status = screen.getByTestId("statusParagraph");

    expect(status).toHaveStyle("background-color: #5AD07A");
  });

  it('el fondo debería ser rosa al pasarle check_out', () => {
    render(<StatusParagraph data-testid='statusParagraph' status="check_out" />);
    const status = screen.getByTestId("statusParagraph");

    expect(status).toHaveStyle("background-color: #FFEDEC");
  });

  it('el fondo debería ser gris al pasarle in_progress', () => {
    render(<StatusParagraph data-testid='statusParagraph' status="in_progress" />);
    const status = screen.getByTestId("statusParagraph");

    expect(status).toHaveStyle("background-color: #E2E2E2");
  });

  it('el fondo debería ser verde al pasarle available', () => {
    render(<StatusParagraph data-testid='statusParagraph' status="available" />);
    const status = screen.getByTestId("statusParagraph");

    expect(status).toHaveStyle("background-color: #5AD07A");
  });

  it('el fondo debería ser rojo al pasarle booked', () => {
    render(<StatusParagraph data-testid='statusParagraph' status="booked" />);
    const status = screen.getByTestId("statusParagraph");

    expect(status).toHaveStyle("background-color: #E23428");
  });

  it('el color debería ser blanco al pasarle booked', () => {
    render(<StatusParagraph data-testid='statusParagraph' status="booked" />);
    const status = screen.getByTestId("statusParagraph");

    expect(status).toHaveStyle("color: #ffffff");
  });
  
});


