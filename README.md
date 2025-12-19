# 💰 Sistema Bancário em Node.js (Terminal)

Olá! 👋 Seja bem-vindo(a) a este projeto.

Este repositório contém um **sistema bancário simulado**, desenvolvido **totalmente em Node.js puro**, que roda diretamente no **terminal**. O objetivo do projeto é aplicar e consolidar conceitos fundamentais do Node.js, manipulação de arquivos e lógica de programação.

---

## 📌 Sobre o projeto

O sistema simula o funcionamento básico de um banco, permitindo que o usuário interaja por meio do terminal para realizar operações comuns do dia a dia bancário.

Toda a aplicação foi desenvolvida **sem frameworks**, utilizando apenas:

* Node.js
* Módulos nativos (`fs`, `process`)
* Bibliotecas auxiliares (`inquirer`, `chalk`)

---

## ⚙️ Funcionalidades

✔ Criar conta bancária
✔ Consultar saldo
✔ Depositar valores
✔ Sacar valores
✔ Validação de conta existente
✔ Validação de saldo disponível
✔ Interface interativa via terminal

---

## 🗂️ Armazenamento de dados

Cada vez que uma conta é criada:

* Um **arquivo JSON** é gerado automaticamente
* O arquivo recebe o **nome da conta informada pelo usuário**
* O saldo inicial é definido como **0**

Esses arquivos funcionam como um **armazenamento de dados local**, simulando o comportamento de um banco de dados simples baseado em arquivos.

> 📁 A pasta `accounts/` é criada automaticamente em tempo de execução e não é versionada no GitHub.

---

## ▶️ Como executar o projeto

### Pré-requisitos

* Node.js instalado
* Git (opcional, para clonar o repositório)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/erikvictorino/sistema-bancario-em-node.js.git

# Acesse a pasta do projeto
cd sistema-bancario-em-node.js

# Instale as dependências
npm install

# Execute o sistema
node index.js
```

---

## 🎯 Objetivo educacional

Este projeto faz parte do meu processo de aprendizado em **Node.js**, com foco em:

* Lógica de programação
* Manipulação de arquivos com `fs`
* Entrada e saída de dados no terminal
* Estruturação de código

Atualmente, estou me aprofundando ainda mais no ecossistema Node.js e iniciando os estudos com **frameworks**, como o **Express**, para evolução rumo ao desenvolvimento back-end.

---

## 🚀 Próximos passos

* Implementar validações adicionais
* Melhorar tratamento de erros
* Evoluir o projeto para uma API com Express
* Integrar com um banco de dados real

---

## 👨‍💻 Autor

Desenvolvido por **Erik Victorino**

📎 Estudante de Análise e Desenvolvimento de Sistemas
🐧 Usuário Linux
💻 Estudando Node.js e desenvolvimento back-end

---

⭐ Se você gostou do projeto, fique à vontade para dar uma estrela no repositório!
