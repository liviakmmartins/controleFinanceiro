//selecionando no html a ul com id transactions
const transactionsUl = document.querySelector('#transactions')

const incomeDisplay = document.querySelector('#money-plus')//#money-plus:id do paragrafo que exibe o valor total da receita

const expenseDisplay = document.querySelector('#money-minus')//#money-minus:id do paragrafo que exibe o valor total das despesas

const balanceDisplay = document.querySelector('#balance') //#balance: id do h1 que exibe o saldo total

//definindo um array de objetos para simular algumas transações
dummyTransactions = [
    {id: 1, name:'Bolo de Brigadeiro', amount: -20},
    {id: 2, name:'Salario', amount: 300},
    {id: 3, name:'Torta de frango', amount: -10},
    {id: 4, name:'Violão', amount: -150}
]


//criou uma função transaction e dentro dela inseriu a li

const addTransactionIntoDOM = transaction => {

    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ?'minus' : 'plus'//class plus e class minus

    //vai transformar os numeros em valor absoluto sem sinal - ou +
    const amountWithoutOperator = Math.abs(transaction.amount)

    //criano novo elemento html - li (<li></li>)
    const li = document.createElement('li')

    //adicionando a classe no elemento li
    li.classList.add(CSSClass)

    //vai se convertida pra html
    li.innerHTML = 
    `${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
    `

    //adicionando na ul, o li como o ultimo filho da ul
    transactionsUl.append(li)

}

//map:ele faz a leitura de todos os elementos do array, executa uma função callback para cada um e devolve como retorno um novo array.
const updateBalanceValues = () => {
    const transactionsAmounts = 
    dummyTransactions.map(transaction => transaction.amount)

    //reduce:Ela permite que você execute uma função de redução, em cada elemento de um determinado array, passando o valor retornado da operação anterior como um acumulador.0==valor inicial do acumulator.toFixed:quandos decimais


    const total = transactionsAmounts.reduce((accumulator, transaction) => accumulator+transaction, 0).toFixed(2)

    //filter:filtra os elementos de um array de acordo com determinados critério
    const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator,value) => accumulator + value,0)
    .toFixed(2)

    const expense = Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator,value) => accumulator + value,0))
    .toFixed(2)


    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

//Quando a página for carregada, vai adicionar as transações no DOM
const init = () =>{
    dummyTransactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()