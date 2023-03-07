import React from 'react';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import App from '../App';
import dataApi from './mocks/dataApi';

describe('Testa a Api da aplicação', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataApi),
    });
  });

  it('Verifica se a Api é chamada', () => {
    render(<App />);
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se a tabela é renderizada depois da chamada da Api', async () => {
    render(<App />);

    const carregando = screen.getByText('Carregando...');
    const Tatooine = screen.queryByText('Tatooine');
    expect(carregando).toBeInTheDocument();
    expect(Tatooine).not.toBeInTheDocument();

    waitFor(() => {
      expect(carregando).not.toBeInTheDocument();
      expect(Tatooine).toBeInTheDocument();
    });
  });
});
