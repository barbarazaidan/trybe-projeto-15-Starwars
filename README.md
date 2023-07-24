# Projeto Starwars
## Este repositório contém o desenvolvimento do meu 15º projeto na Trybe

A ideia do Starwars é bastante simples: criar uma aplicação para pesquisar planetas e poder fazer isso usando diferentes filtros de forma combinada. Apesar de algo trivial, este foi um projeto extremamente desafiador. Junto com o Trybetunes, foram os dois mais difíceis de Frontend. Para o desenvolvimento, trabalhei usando Context API e React Hooks.

## Detalhes do projeto

Confira os requisitos exigidos pela Trybe (texto extraído dos readme oficial da Trybe):

**1. Faça uma requisição para o endpoint /planets da API de Star Wars e preencha uma tabela com os dados retornados, com exceção dos dados da coluna residents**

<details><summary>Detalhes</summary>
<p>

> A tabela deve ser renderizada por um componente chamado Table.

</p>
</details>

**2. Crie um filtro de texto para a tabela**

<details><summary>Detalhes</summary>
<p>

> A tabela deve ser atualizada com os planetas que se encaixam no filtro à medida que o nome é digitado, sem ter que apertar em um botão para efetuar a filtragem. Por exemplo, se for digitado "Tatoo" no campo de texto, o planeta "Tatooine" deve ser exibido.

</p>
</details>

**3. Crie um filtro para valores numéricos**

<details><summary>Detalhes</summary>
<p>

> O filtro funcionará com três seletores:

* O primeiro deve abrir um dropdown que permita a quem usa selecionar uma das seguintes colunas: population, orbital_period, diameter, rotation_period e surface_water.
* O segundo deve determinar se a faixa de valor será maior que, menor que ou igual a o numero que virá a seguir.
* O terceiro deve ser uma caixa de texto que só aceita números.

> A combinação desses três seletores, ao clicar no botão, deve filtrar os dados da tabela de acordo com a coluna correspondente e com os valores escolhidos.

</p>
</details>

**4.   Implemente múltiplos filtros numéricos**
<details><summary>Detalhes</summary>
<p>

> Deverá ser possível adicionar múltiplos filtros numéricos. Todos os filtros adicionados devem funcionar de forma conjunta.

</p>
</details>

**5. Desenvolva testes para atingir 30% de cobertura total da aplicação**

**6. Não utilize filtros repetidos**

<details><summary>Detalhes</summary>
<p>

> Caso um filtro seja totalmente preenchido, um novo filtro de valores numéricos deve ser carregado:

* Este novo filtro não deve incluir quaisquer colunas que já tenham sido selecionadas em filtros de valores numéricos anteriores;
* Caso todas as colunas já tenham sido inclusas em filtros anteriores, não deve ser carregado um novo filtro;
* Você deve usar Context API e Hooks para fazer o gerenciamento do estado da aplicação.

</p>
</details>

**7. Apague um filtro de valor numérico ao clicar no ícone X de um dos filtros e apague todas filtragens numéricas simultaneamente ao clicar em outro botão de Remover todas filtragens**

<details><summary>Detalhes</summary>
<p>

> O button que permite exclusão de um filtro deve existir em todos os filtros de valores numéricos.

> O button de Remover todas filtragens deverá possuir o data-testid='button-remove-filters'. Este button será responsável pela remoção de todos os filtros numéricos simultaneamente.

</p>
</details>

**8. Desenvolva testes para atingir 60% de cobertura total da aplicação**

**9. Ordene as colunas de forma ascendente ou descendente**

<details><summary>Detalhes</summary>
<p>

> A ordenação deve ser feita via filtro: um dropdown selecionará a coluna a basear a ordenação e um par de radio buttons determinará se é ascendente ou descendente.

* Caso a coluna ordenada possua planetas com valores unknown, você deverá ordená-los de forma que valores unknown ficarão em último lugar na ordenação.

> Por fim, crie um botão para submeter a ordenação.

</p>
</details>

REQUISITO BÔNUS

**10. Desenvolva testes para atingir 90% de cobertura total da aplicação**

## Sobre o curso da Trybe
O programa total de estudo conta com mais de 1.500 horas de aulas presenciais e online,divididas ao longo de 12 meses. O conteúdo aborda introdução ao desenvolvimento de software, front-end, back-end, ciência da computação, engenharia de software, metodologias ágeis e habilidades comportamentais.
