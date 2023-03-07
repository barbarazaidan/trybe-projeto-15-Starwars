import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import dataApi from './mocks/dataApi';

describe('Testa o filtro do input de texto', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataApi),
    });
  });

  it.only('Verifica se o campo input name está presente na tela', () => {
    render(<App />);
    const inputname = screen.getByTestId('name-filter');

    expect(inputname).toBeInTheDocument();
  });

  it.only('Ao digitar Bespin, a tabela renderiza apenas esse planeta', async () => {
    render(<App />);

    const inputname = screen.getByTestId('name-filter');
    const Tatooine = await screen.findByText('Tatooine');
    const Bespin = screen.getByText('Bespin');
    expect(Tatooine).toBeInTheDocument();
    expect(Bespin).toBeInTheDocument();

    userEvent.type(inputname, 'Bespin');
    expect(Tatooine).not.toBeInTheDocument();
  });
});

//   it('Testa', () => {
//     'teste aqui'
//   });

//   it('Testa', () => {
//     'teste aqui'
//   });
// });
