import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import dataApi from './mocks/dataApi';

describe('Testa os filtros numéricos', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dataApi),
    });
  });

  it('Verifica se o campo input numérico está presente na tela', () => {
    render(<App />);
    const inputNumber = screen.getByTestId('value-filter');

    expect(inputNumber).toBeInTheDocument();
  });

  it('Verifica se os selects estão estão presentes na tela', () => {
    render(<App />);
    const selectColuna = screen.getByTestId('column-filter');
    const selectOperador = screen.getByTestId('comparison-filter');

    expect(selectColuna).toBeInTheDocument();
    expect(selectOperador).toBeInTheDocument();
  });

  it('Verifica se os valores iniciais dos filtros', async () => {
    const {debug} = render(<App />);

    const selectColuna = screen.getByTestId('column-filter');
    const selectOperador = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', {name: 'Filtrar'} );

    // debug()
    expect(selectColuna.value).toBe('population');
    expect(selectOperador.value).toBe('maior que');
    expect(inputNumber.value).toBe('0');
  });

  it('Verifica se o filtro por population funciona', async () => {
    const {debug} = render(<App />);

    const btnFilter = screen.getByRole('button', {name: 'Filtrar'} );
    const Hoth = await screen.findByText('Hoth');
    const Dagobah = await screen.findByText('Dagobah');

    expect(Hoth).toBeInTheDocument();
    expect(Dagobah).toBeInTheDocument();

    userEvent.click(btnFilter);

    // debug()
    expect(Hoth).not.toBeInTheDocument();
    expect(Dagobah).not.toBeInTheDocument();
  });

  it('Verifica se os filtros se acumulam', async () => {
    // estou usando os filtros population maior que 0, orbital_period maior que 364 e rotation_period maior que 25
    const {debug} = render(<App />);

    const selectColuna = screen.getByTestId('column-filter');
    const selectOperador = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', {name: 'Filtrar'} );
    const Hoth = await screen.findByText('Hoth');
    const Alderaan = await screen.findByText('Alderaan');
    const Kamino = await screen.findByText('Kamino');
    const Naboo = await screen.findByText('Naboo');

    expect(Hoth).toBeInTheDocument();
    expect(Alderaan).toBeInTheDocument();
    expect(Kamino).toBeInTheDocument();
    expect(Naboo).toBeInTheDocument();

    userEvent.click(btnFilter);

    expect(Hoth).not.toBeInTheDocument();
    expect(Kamino).toBeInTheDocument();
    expect(Alderaan).toBeInTheDocument();
    expect(Naboo).toBeInTheDocument();

    userEvent.type(inputNumber, '400')
    userEvent.selectOptions(selectOperador, 'menor que');
    userEvent.click(btnFilter);

    expect(Hoth).not.toBeInTheDocument();
    expect(Alderaan).toBeInTheDocument();
    expect(Kamino).not.toBeInTheDocument();
    expect(Naboo).toBeInTheDocument();

    userEvent.selectOptions(selectColuna, 'rotation_period');
    userEvent.selectOptions(selectOperador, 'igual a');
    userEvent.type(inputNumber, '26')
    userEvent.click(btnFilter);

    expect(Hoth).not.toBeInTheDocument();
    expect(Alderaan).not.toBeInTheDocument();
    expect(Naboo).toBeInTheDocument();
    expect(Kamino).not.toBeInTheDocument();
  });

  it('Verifica se o filtro utilizado some do dropdown de colunas', async () => {
    // estou usando os filtros population maior que 0
    const {debug} = render(<App />);

    const btnFilter = screen.getByRole('button', {name: 'Filtrar'} );

    expect(screen.getAllByRole('option', {name: 'population'}).length).toBe(2)
    expect(screen.getAllByRole('option', {name: 'orbital_period'}).length).toBe(2)
    
    userEvent.click(btnFilter);
       
    expect(screen.getAllByRole('option', {name: 'population'}).length).toBe(1)
    expect(screen.getAllByRole('option', {name: 'orbital_period'}).length).toBe(2)
    
    userEvent.click(btnFilter);
    expect(screen.getAllByRole('option', {name: 'population'}).length).toBe(1)
    expect(screen.getAllByRole('option', {name: 'orbital_period'}).length).toBe(1)
  });

  it('Verifica se os filtros utilizados aparecem listados na tela com um botão de excluir', async () => {
    // estou usando os filtros population maior que 0
    const {debug} = render(<App />);

    const btnFilter = screen.getByRole('button', {name: 'Filtrar'} );

    expect(screen.queryByRole('button', {name: 'X'})).not.toBeInTheDocument();
    
    userEvent.click(btnFilter);

    expect(screen.queryByRole('button', {name: 'X'})).toBeInTheDocument();
  });

  it('Verifica se é possíel excluir um filtro selecionado anteriormente', async () => {
    // estou usando os filtros population maior que 0
    const {debug} = render(<App />);

    const btnFilter = screen.getByRole('button', {name: 'Filtrar'} );

    expect(screen.getAllByRole('option', {name: 'population'}).length).toBe(2)
    
    userEvent.click(btnFilter);
       
    expect(screen.getAllByRole('option', {name: 'population'}).length).toBe(1)

    userEvent.click(screen.queryByRole('button', {name: 'X'}));
    
    expect(screen.getAllByRole('option', {name: 'population'}).length).toBe(2)

  });
});
