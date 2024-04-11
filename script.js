//selecionando no html a ul com id transactions
const transactionsUl = document.querySelector('#transactions')

const incomeDisplay = document.querySelector('#money-plus')//#money-plus:id do paragrafo que exibe o valor total da receita

const expenseDisplay = document.querySelector('#money-minus')//#money-minus:id do paragrafo que exibe o valor total das despesas

const balanceDisplay = document.querySelector('#balance') //#balance: id do h1 que exibe o saldo total

const form = document.querySelector('#form')//id do form no html

const inputTransactionName = document.querySelector('#text')//id do input no html

const inputTransactionAmount = document.querySelector('#amount')//id do input do valor da transaçãono html

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))//vai resultar no valor da transactions do objeto da localStorage

let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []


const removeTransaction = (ID) => {
    transactions = transactions.filter(transaction => 
        transaction.id !== parseInt(ID)); // Convertendo ID para número antes de comparar

    UpdateLocalStorage();
    init();
};

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
        `${transaction.name} <span>${operator} R$ ${amountWithoutOperator}
        </span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
            x
        </button>
        `

    //adicionando na ul, o li como o ultimo filho da ul
    transactionsUl.append(li)

}

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator,value) => accumulator + value,0))
    .toFixed(2)


    const getIncomes = transactionsAmounts => Math.abs(transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator,value) => accumulator + value,0))
        .toFixed(2)

    const getTotal = transactionsAmounts => transactionsAmounts.reduce((accumulator, transaction) => accumulator+transaction, 0).toFixed(2)

//map:ele faz a leitura de todos os elementos do array, executa uma função callback para cada um e devolve como retorno um novo array.
const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(transaction => transaction.amount)

    //reduce:Ela permite que você execute uma função de redução, em cada elemento de um determinado array, passando o valor retornado da operação anterior como um acumulador.0==valor inicial do acumulator.toFixed:quandos decimais


    const total = getTotal(transactionsAmounts)

    //filter:filtra os elementos de um array de acordo com determinados critério
    const income = getIncomes(transactionsAmounts)

    const expense = getExpenses(transactionsAmounts)


    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

//Quando a página for carregada, vai adicionar as transações no DOM
const init = () =>{
    transactionsUl.innerHTML=''//para não ficar adicionando as transações novamemente quando inserir uma nova
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const UpdateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))//vai salvar uma informação no localStorage. json: converter array de objetos em strings
}

const generateId = () => Math.round(Math.random()*1000)//vai gerar id aleatorio de 0 a 1000

const addTransactionArray = (transactionName, transactionAmount) => {
    const id = generateId() // Gera um ID único
    transactions.push({
        id: id, 
        name: transactionName, 
        amount: Number(transactionAmount)
    })
}
const cleanInputs = () => {
    inputTransactionName.value =''
    inputTransactionAmount.value =''
}


const handleFormSubmit = event =>{

    event.preventDefault()//vai evitar que o form seja enviado

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

    if (isSomeInputEmpty){
        alert('Por favor, preencha o nome e o valor da transação')
        return
    }
    addTransactionArray(transactionName,transactionAmount)
    init()
    UpdateLocalStorage()

    cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)