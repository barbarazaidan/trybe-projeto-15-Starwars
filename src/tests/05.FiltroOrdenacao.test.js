import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import dataApi from './mocks/dataApi';

describe('Testa o filtro de ordenação', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataApi),
    });
  });

  it('Verifica se a tabela está sendo ordenada corretamente com base no período orbital ascendente', async () => {
   
    const {debug} = render(<App />);

    const selectColunaSort = screen.getByTestId('column-sort');
    const radioASC = screen.getByTestId('column-sort-input-asc');
    const btnSort = screen.getByRole('button', {name: 'Ordenar'} );
    const planetasNomeInicial = await screen.findAllByTestId('planet-name');

    const planetasPadrao = ['Tatooine', 'Alderaan', 'Yavin IV', 'Hoth', 'Dagobah', 'Bespin', 'Endor', 'Naboo', 'Coruscant', 'Kamino']  

    const ordemASC = ['Tatooine', 'Naboo', 'Dagobah', 'Alderaan', 'Coruscant', 'Endor', 'Kamino', 'Hoth', 'Yavin IV', 'Bespin'];

    planetasNomeInicial.forEach((elemento, index) => {
      console.log(elemento, index)
      expect(elemento).toHaveTextContent(planetasPadrao[index])
    })

    userEvent.selectOptions(selectColunaSort, ['orbital_period']);
    userEvent.click(radioASC);
    userEvent.click(btnSort);
    debug()

    const planetasNomeFinal = screen.getAllByTestId('planet-name');

    planetasNomeFinal.forEach((elemento, index) => {
      expect(elemento).toHaveTextContent(ordemASC[index])
    })
  });

  it('Verifica se a tabela está sendo ordenada corretamente com base no período orbital descendente', async () => {
   
    const {debug} = render(<App />);

    const selectColunaSort = screen.getByTestId('column-sort');
    const radioDESC = screen.getByTestId('column-sort-input-desc');
    const btnSort = screen.getByRole('button', {name: 'Ordenar'} );
    const planetasNomeInicial = await screen.findAllByTestId('planet-name');

    const planetasPadrao = ['Tatooine', 'Alderaan', 'Yavin IV', 'Hoth', 'Dagobah', 'Bespin', 'Endor', 'Naboo', 'Coruscant', 'Kamino']  

    const ordemDESC = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino', 'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];

    planetasNomeInicial.forEach((elemento, index) => {
        console.log(elemento, index)
        expect(elemento).toHaveTextContent(planetasPadrao[index])
      })
  
      userEvent.selectOptions(selectColunaSort, ['orbital_period']);
      userEvent.click(radioDESC);
      userEvent.click(btnSort);
      debug()
  
      const planetasNomeFinal = screen.getAllByTestId('planet-name');
  
      planetasNomeFinal.forEach((elemento, index) => {
        expect(elemento).toHaveTextContent(ordemDESC[index])
      })
  });
});