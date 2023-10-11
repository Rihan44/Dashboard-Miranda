import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { StatusParagraph } from './components/Reusables/StatusParagraph';

describe('Comprobamos el background del parrafo', () => {

/*   it('el fondo debería ser verde al pasarle check_in', () => {
    render(<div>
      <StatusParagraph status="check_out"> Hola </StatusParagraph>
    </div>);
    console.log(screen.getByText("Hola"))
    expect(screen.getByText("Hola")).toHaveStyle(`background-color: red`);
  }); */

/*   it('dwdw', () => {
    render(<StatusParagraph status="check_in" />);
    const status = screen.getByTestId("statusParagraph");
    const style = window.getComputedStyle(status);

    expect(style.rules.backgroundColor).toBe("#5AD07A");
  }); */

  it('el fondo debería ser rosa al pasarle check_in', () => {
    render(<StatusParagraph status="check_out" />);
    const status = screen.getByTestId("statusParagraph");

    expect(status).toHaveStyle("background-color: #5AD07A");
  });

  it('el fondo debería ser rosa al pasarle check_out', () => {
    render(<StatusParagraph status="check_out" />);
    const status = screen.getByTestId("statusParagraph");

    expect(status).toHaveStyle("background-color: #FFEDEC");
  });

  it('el fondo debería ser gris al pasarle in_progress', () => {
    render(<StatusParagraph status="in_progress" />);
    const status = screen.getByTestId("statusParagraph");

    expect(status).toHaveStyle("background-color: #E2E2E2");
  });
  
});


