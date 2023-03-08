import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import dataApi from './mocks/dataApi';

describe('Testa os dados da tabela', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataApi),
    });
  });

  it('Verifica se os dados do cabeçalho estão corretos', async () => {
    const {debug} = render(<App />);
    const chavesApi = Object.keys(dataApi.results[0]).filter((name) => name!== 'residents');
    
    // await waitForElementToBeRemoved(() => screen.queryByText('Carregando...'))
    await screen.findByText('Hoth');

    const arrayDeColunas = screen.getAllByRole('columnheader');
    // console.log(arrayDeColunas)
    debug();

    chavesApi.forEach((chave) => {
      expect(screen.getByRole('columnheader', {name: chave})).toBeInTheDocument();
      expect(screen.getByRole('columnheader', {name: chave})).toHaveTextContent(chave);
    });
  });
});
