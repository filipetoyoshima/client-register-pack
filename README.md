# Cadastro de Clientes

Essa aplicação se trata de um CRUD de clientes, para o qual é necessário estar logado. Todos os clientes são acessíveis por todos os usuários.

## Inicializando Coisas com o Docker

O projeto foi Dockerizado. São três containers, um para um front-end, outro para a API e um para uma instância do MySQL.

Para inicializar o projeto desta forma, garanta que o [Docker](https://docs.docker.com/install/overview/) e o [Docker Compose](https://docs.docker.com/compose/) estejam devidamente instalados na sua máquina. Uma vez que tudo estiver certo, apenas execute:

```bash
git clone https://github.com/filipetoyoshima/client-register-pack.git
cd client-register-pack

docker-compose build
docker-compose up
```

**Obs:** Talvez seja necessário executar o `docker-compose build` duas vezes em razão de um possível erro no container MySQL. Atente-se a logs de erro durante a primeira execução.

## Instruções de Instalação sem o Docker

Clone o repositório:

```bash
git clone https://github.com/filipetoyoshima/client-register-pack.git
```

Agora é necessário levantar três serviços diferentes:

### Front-End

Apenas abra a pasta `/client`, instale as dependências e rode o projeto React:

```bash
cd client/
npm install
npm start
```

### Back-End

Aqui é um pouco mais complicado. A API se trata de um projeto Sails configurado para consumir um banco MySQL. E aí existem duas opções: alterar essa configuração para que o Sails consuma um banco embutido, ou configurar uma conexão MySQL (ou, quem sabe, configurar o Sails para consumir o banco de sua preferência, é possível também).

#### Sem MySQL

Vá até o arquivo `api/config/datastores.js`, e comente as seguintes linhas:

```js
adapter: 'sails-mysql',
url: 'mysql://root:1234@localhost:3306/client_register',
```

O Sails automaticamente reconhecerá que não há conexão configurada e definirá seu banco embutido como padrão.

#### Com MySQL

Crie uma conexão MySQL, um Schema chamado `client_register` e um usuário capaz de acessá-la. É possível usar o root como usuário, mas você talvez não queira isso.

Existem várias maneiras de fazer isso, uma das mais populares é pelo [MySQL Workbench](https://youtu.be/DCgRF4KOYIY).

Uma outra forma é pelo MySQL Server, um CLI que pode variar conforme seu sistema operacional. Deixo aqui um exemplo para [Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/como-instalar-o-mysql-no-ubuntu-18-04-pt).

Depois de criar o usuário, abra o arquivo `api/config/datastores.js`, localize o segiunte trecho:

```js
adapter: 'sails-mysql',
url: 'mysql://root:1234@localhost:3306/client_register',
```

Então altere `root:1234@localhost:3306` por `<usuário>:<senha>@localhost:<port>`, colocando os dados do usuário que você acabou de criar e também o número da porta onde vocês está disponibilizando a conexão com o banco.

Para usar o MySQL, garanta que o servidor do banco esteja disponível sempre que você levantar o Sails.

#### Finally

Feita a sua opção de banco de dados, agora basta iniciar o projeto:

```bash
cd api/
npm install
sails lift
```

Após levantar a API, o Sails irá perguntar como quer migrar os dados. Leia as opções disponíveis e escolha a que mais se adequar com suas necessidades.

## Uso

Com o React online, Sails online (e eventualmente o banco também), abra, no seu navegador, o localhost:3000, e você deverá estar na tela de login:

![login image](docs/images/login.png)

Para logar, é necessário, obviamente, ter seu usuário registrado no banco de dados. Não existe UI para essa parte. Use seu client REST preferido ([algumas sugestões](https://www.slant.co/topics/7913/~rest-api-clients)), e faça um POST na rota `http://localhost:1337/user` com o payload:

```js
{
    "username": "escolhaUmNome",
    "password": "escolha sua senha",
}
```

Depois, é só logar no sistema com as credenciais que você acabou de criar e ver do que ele é capaz :wink: