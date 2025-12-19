//modulos externos
import inquirer from 'inquirer'
import chalk from 'chalk'

//modulos internos
import fs from 'fs'

//inicializando a função junto com o sistema
operation()


function operation(){
    //opções para o usuario escolher
    inquirer.prompt([
        {
        //tipo: lista para que o usuario escolha uma opção
         type: 'list',

         //nomeando a perguta 
         name: 'action',

         //mensgame/pergunta pro usuario
         message: 'O que você deseja fazer?',

         //escolhas que o usuario pode fazer no sistema
         choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair',
         ],
        },
    ])
    //pegando a opção que o usuario escolheu
    .then((answer) => {
        //pegando a ação que o usuario escolheu
        const action = answer['action']
        
        //executando funções que o usuario escolher
        if(action === 'Criar Conta'){
            creatAccount()
        } else if(action === 'Depositar'){
            deposit()
        } else if(action === 'Consultar Saldo'){
            getAccountBalance()
        } else if(action === 'Sacar'){
            withdraw()
        } else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'))
            process.exit()
        }
    })
    //mostrar algum erro
    .catch((err) => console.log(err))
}

//mensagem para o usuario 
function creatAccount(){
    console.log(chalk.bgGreen.black('Parabens por escolher nosso banco'))
    console.log(chalk.green('Defina o nome da sua conta a seguir'))
    buildAccount()
}

//metodo pra criar a conta
function buildAccount() {
    //pedindo o nome da conta do usuario
    inquirer.prompt([
        {
            //nomeando a pergunta
            name: 'accountName',
            //messagem/pergunta pro usuario
            message: 'Digte um nome para sua conta:'
        }
        //recebendo a resposta do usuario
    ]).then(answer => {
        //guardando o nome da conta do usuario na variavel
        const accountName = answer['accountName']

        //logando o nome da conta
        console.info(accountName)

        //criando banco de dados
        //verifica se o diretorio não existe, sendo verdadeiro, entra na if 
        if(!fs.existsSync('accounts')){
            //se não existir, cria o diretorio accounts
            fs.mkdirSync('accounts')
        }

        //verificando se o nome da conta ja existe
        //se essa validação for verdadeira, aparece um erro e fala pro usuario digitar outro nome
        if(fs.existsSync(`accounts/${accountName}.json`)){
            //mostrando erro
            console.log(chalk.bgRed.black('esta conta já existe, escolha outro nome'))
            //chamando a função para usuario digitar um novo nome 
            buildAccount()
            //return para encerrar a açaõ e começar a execução de buildaccount denovo, para não dar bug
            return
        }

        //se não ouver arquivo com o nome, criamos um novo arquivo com o nome novo
        fs.writeFileSync(
            //criando arquivo com nome novo
            `accounts/${accountName}.json`, 

            //conteudo que vai dentro do arquivo
            '{"balance": 0}', 

            //função anonima caso de algum erro
            function(err) {
                //imprimindo erro
                console.log(err)
            },
        )

        //mensagem de sucesso para o usuario, falando que a conta foi criada com sucesso
        console.log(chalk.green('Parabens sua conta foi criada!'))
        //executando operation denovo, para usuario escolher outra operação do banco
        operation()
    })
    .catch(err => console.log(err))

}

//criando função de deposito na conta
function deposit(){
    //pedindo o nome da conta do usuario
    inquirer.prompt([
        {
            //nomeando a pergunta
            name: 'accountName',
            //messagem/pergunta pro usuario
            message: 'Qual o nome da sua conta?'
        }
    ])
    //pegando a resposta do usuario
    .then((answer) => {
        //guardando a resposta do usuario na variavel
        const accountName = answer['accountName']

        //verificando se a conta digitada pelo usuario existe, usando a função reutilizavel checkaccount
        if(!checkAccount(accountName)){
            //se a conta não existir
            //redireciona o usuario para a função deposit para reexecutar a função e pedir novamente o nome
            return deposit()
        }

        //pedindo pro usuario o valor que deseja depositar
        inquirer.prompt([
            {
                //nomeando a pergunta
                name: 'amount',
                //messagem/pergunta pro usuario
                message: 'quanto vocẽ deseja depositar?'
            },
        ])
        //pegando o valor
        .then((answer) => {
            //guardando o valor em uma variavel
            const amount = answer['amount']
            //chamando função de deposito de valores, com os parametros nome da conta e valor a ser depositado
            addAmount(accountName, amount)

            //chamando a função de operações
            operation()
        })
        //avidenciando algum erro
        .catch(err => console.log(err))

    })
    //motrar se tiver erro
    .catch(err => console.log(err))
}

//criando uma função reutilizavel para ver se a conta existe
function checkAccount(accountName){
    //verificando se a conta não existi
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        //se a conta não existir, mostramos uma mensagem de erro
        console.log(chalk.bgRed.black('esta conta não exite, tente novamente'))
        return false
    }
    //se a conta existir, não entra no if, retorna verdadeiro e o programa procegue normal
    return true
}

//função de deposito na conta, com os parametros nome da conta e valor que vai ser depositado
function addAmount(accountName, amount){
    //pegando a conta em objeto js
    const accountData = getAccount(accountName)

    //verificando se não tem amount, se o usuario não digitou nada, obs:caso usuario aperte enter sem digitar nada
    if(!amount){
        //mostra um mensagem de erro
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        //retornando para a função de deposit para digitar denovo
        return deposit()
    }
    //acessando o balance da conta do usuario, convertendo o valor que o usuario digitou para numero, e somando o valor que ja esta na conta
    //balance recebe o numero que o usuario digitou mais o valor que ja tinha na conta
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    //salvando dado do banco no arquivo do usuario
    fs.writeFileSync(
        //nome do arquivo/conta do usuario onde vai ser salvo
        `accounts/${accountName}.json`,
        //transformando o JSON em texto
        JSON.stringify(accountData),
        //callback para algum possivel erro
        function (err) {
            console.log(err)
        },
    )
    //mensagem de deposito bem sucedido
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`))
}

//função reutilizavel para ler os arquivos 
function getAccount(accountName){
    //lendo e retornando um arquivo em JSON
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        //metodo para usar acentuações pt-br
        encoding: 'utf8',
        //metodo para somente ler o arquivo
        flag: 'r'
    })
    //retornando um JSON, accountJSON chega em arquivo/texto e retornamos um JSON
    return JSON.parse(accountJSON)
}

//função para consultar o saldo da conta
function getAccountBalance(){
    //perguntando pro usuario o nome da conta
    inquirer.prompt([
        {
            //nomeando a pergunta
            name: 'accountName',
            //messagem/pergunta pro usuario
            message: 'qual o nome da sua conta?'
        }
    ])
    //recebendo a resposta do usuario
    .then((answer) => {
        //guardando o nome da conta na variavel, para carregar a conta 
        const accountName = answer["accountName"]

        //verificando se a conta não existe ou nome estiver errado
        //usando a função de checar contas, passando como parametro o nome que o usuario digitou
        if(!checkAccount(accountName)){
            //se a conta não existir, usuario tenta digitar o nome da conta denovo
            return getAccountBalance()
        }

        //pegando os dados da conta com o nome que o usuario digitou e guardando o resultado na variável accountData
        const accountData = getAccount(accountName)

        // se a conta existir, mostra o saldo da conta, pegando os dados/balance da conta do usuario
        console.log(chalk.bgBlue.black(`o saldo da sua conta é de R$${accountData.balance}`))

        //redirecionando o usuario para as operações
        operation()
    })
    //exibindo se tiver algum erro
    .catch(err => console.log(err))
}

//função de sacar dinheiro da conta do usuario
function withdraw(){
    //perguntando pro usuario o nome da conta
    inquirer.prompt([
        {
            //nomeando a pergunta
            name: 'accountName',
            //messagem/pergunta pro usuario
            message: 'qual o nome da sua conta?'
        }
     //recebendo a resposta do usuario
    ]).then((answer) => {
        //guardando o nome da conta na variavel, para carregar a conta 
        const accountName = answer['accountName']

        //verificando se a conta não existe ou nome estiver errado
        //usando a função de checar contas, passando como parametro o nome que o usuario digitou
        if(!checkAccount(accountName)){
            //se a conta não existir, usuario tenta digitar o nome da conta denovo
            return withdraw()
        }

        //perguntando pro usuario quanto deseja sacar
        inquirer.prompt([
            {
                //nomeando a pergunta
                name: 'amount',
                //messagem/pergunta pro usuario
                message: 'quanto deseja sacar?'
            }
        //recebendo a resposta do usuario
        ]).then((answer) => {
            //guardando o valor que o usuario digitou na variavel
            const amount = answer['amount']

            //chamando a função de saque, passando como parametros o nome da conta e o valor a ser sacado
            removeAmount(accountName, amount)
        })
        //evidenciando se tiver erro
        .catch(err => console.log(err))
    })
    //evidenciando se tiver erro
    .catch(err => console.log(err))
}

//função de saque da conta
function removeAmount(accountName, amount){
    //pegando os dados da conta com o nome que o usuario digitou e guardando o resultado na variável accountData
    const accountData = getAccount(accountName)

    //verificando se o usuario não digitou o valor do saque
    //se nao foi digitado nenhum valor
    if(!amount){
        //mensagem de erro
        console.log(chalk.bgRed.black('ocorreu um erro tente novamente mais tarde'))
        //redireciona o usuario para digitar denovo
        return withdraw()
    }
    
    //se o valor que esta na conta for menor que o valor do saque
    if(accountData.balance < amount){
        //mensagem de erro valor indiponivel
        console.log(chalk.bgRed.black('valor indisponivel'))
        //redireciona o usuario para digitar denovo
        return withdraw()
    }
    
    //Convertendo os valores para número, e subtraindo saldo(balance) atual do valor que o usuario digitou e atualiza o saldo da conta.
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    //salvando o saldo do banco no arquivo do usuario
    fs.writeFileSync(
        //nome do arquivo/conta do usuario onde vai ser salvo
        `accounts/${accountName}.json`,
        //transformando o JSON em texto
        JSON.stringify(accountData),
        //calback para algum possivel erro
        function (err){
            console.log(err)
        },
    )

    //mensagem que o saque foi feito com sucesso
    console.log(chalk.green(`foi realizado um saque de R$${amount} da sua conta`))
    //redirecionando o usuario para as operações
    operation()
}