
# Contact Manager

Este é um sistema de gerenciamento de contatos desenvolvido como parte de um processo seletivo para a empresa Anodos. O projeto consiste em um backend com microserviços para autenticação e cadastro, além de um frontend responsivo para o gerenciamento de contatos. As tecnologias utilizadas incluem Java, TypeScript, Node.js, Redis, MongoDB, PostgreSQL e ReactJS, aplicando conceitos de Clean Architecture e práticas de desenvolvimento modernas.

## Funcionalidades

1. **Cadastro de Usuários:**
   - Permite a criação de novos usuários no sistema.
   - Campos: `e-mail` e `senha`.

2. **Tela de Login:**
   - Login utilizando `e-mail` e `senha`.
   - Após o login, o usuário é redirecionado para a tela principal do sistema.

3. **Gerenciamento de Contatos:**
   - Cadastro de contatos com os seguintes dados:
     - Nome
     - Endereço
     - Telefone
     - E-mail
   - Listagem de contatos cadastrados.
   - Edição de contatos existentes.
   - Exclusão de contatos.

4. **Autorização:**
   - Usuários `admin` podem criar, editar e excluir contatos.
   - Usuários não administradores podem cadastrar e editar contatos, mas não podem excluir.

5. **Usuário Admin:**
   - Por padrão, o sistema cria automaticamente um usuário admin:
     - Usuário: admin@anodos.com
     - Senha: Admin#10

## Tecnologias Utilizadas

- **Backend:**
  - Java (para o microserviço de cadastro)
  - TypeScript com Node.js (para o microserviço de autenticação)
  - MongoDB (para armazenamento de usuários)
  - Redis (para armazenamento de tokens de autenticação)
  - PostgreSQL (para armazenamento de contatos)

- **Frontend:**
  - ReactJS
  - Aplicação responsiva

- **Infraestrutura:**
  - Docker para execução local de banco de dados e backend.

## Instruções para Executar o Projeto

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/ivanodev/contact-manager.git
   ```

2. **Execute via docker-compose:**

   ```bash
   docker-compose up --build -d
   ```

## Docker

A aplicação é configurada para ser executada via **Docker** e **docker-compose**, garantindo que todos os serviços (backend, bancos de dados, autenticação, etc.) rodem de forma integrada e sem conflitos em diferentes ambientes. Aqui está o processo para rodar a aplicação utilizando Docker:

### Dependências do Docker

Certifique-se de ter o **Docker** e o **docker-compose** instalados em sua máquina. Você pode verificar as instalações executando:

```bash
docker --version
docker-compose --version
```

### Comandos para Execução

Após clonar o repositório, utilize o comando `docker-compose up --build -d` para compilar e subir os serviços. Isso fará com que os seguintes containers sejam criados e iniciados:

- **Backend**: Rodando o serviço Java para cadastro e Node.js para autenticação.
- **Redis**: Para gerenciamento de tokens de autenticação.
- **MongoDB**: Para armazenamento de dados de usuários.
- **PostgreSQL**: Para armazenamento de dados de contatos.
- **Frontend**: Interface de usuário em ReactJS, responsável pela interação com o usuário e pelo consumo das APIs do backend.

Os containers serão executados em segundo plano (`-d`), permitindo que a aplicação rode sem ocupar o terminal. Para visualizar os logs de execução, você pode usar:

```bash
docker-compose logs -f
```

### Parando os Containers

Para parar os serviços, execute:

```bash
docker-compose down
```

Esse comando interrompe e remove os containers criados.

## Acessando a Aplicação

1. **Acessar via navegador:**
   - Abra o navegador e vá para: `http://localhost:3000`

2. **Acessar com a senha de admin ou criar um novo usuário:**
   - Para se cadastrar no sistema, basta informar um e-mail válido e uma senha de oito caracteres, contendo letras maiúsculas, minúsculas, números e caracteres especiais, e clicar no botão **Signup**.
   - Depois do usuário ser criado, faça o login com os dados informados no cadastro.

## Testando as APIs

   - Na raiz do projeto, você encontrará o arquivo HttpRequest-Insomnia com as requisições para chamar os endpoints via Insomnia. Utilize este arquivo para testar as APIs do sistema.
