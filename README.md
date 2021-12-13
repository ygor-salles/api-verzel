## :clipboard: Instruções

### VARIÁVEIS DE AMBIENTE

- Criar na raiz da pasta do projeto um arquivo `.env`
  e preencher as informações conforme se encontra no arquivo `.env.example`.

### DOCKER

- Após preenchida as variáveis de ambiente subir o container do docker

```bash
docker-compose up
```

### BACKEND

- Entrar no repositório backend do projeto com o terminal e executar o seguinte comando para instalar as dependências:

```bash
yarn
```

- Após todas as dependências instaladas executar as migrations para criar as tabelas do banco de dados:

```bash
yarn typeorm migration:run
```

- Finalizado! Basta agora executar a aplicação backend com o seguinte comando:

```bash
yarn dev
```

- A Api estará rodando na porta conforme definido no arquivo .env em PORT. Exemplo usando a porta 4000 `http://localhost:4000`

## Comandos básicos para as migrations

- Criar uma migration

```bash
yarn typeorm migration:create -n CreateExample
```

- Rodar as migrations

```bash
yarn typeorm migration:run
```

- Desfazer alterações da migration

```bash
yarn typeorm migration:revert
```

## Gerar o build

```bash
yarn build
```
