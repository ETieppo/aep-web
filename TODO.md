# checklist do front

## Angular

- bun i
- bun dev
ou
- npm i
- npm run dev

---

## 1 — login

tela inicial;
PUBLIC

- [ ] campo de input pra e-mail e senha
  - [ ] validacoes
  - [ ] botao de mostrar/ocultar
  - [ ] toast pra erros
  - [ ] receber tokens por credentials include
- [ ] CTA "nao tem conta? cadastre-se"
- [ ] apos login, redirecionar:
  - [ ] cidadao → tela 3
  - [ ] gestor → tela 4

---

## 2 — cadastro

cria conta de cidadao;
PUBLIC

- [ ] campos
  - [ ] nome, cpf, email, senha, confirmar senha
  - [ ] validacoes
  - [ ] toast pra erros
- [ ] CTA "cadastrar"
- [ ] CTA "ja tem conta? faca login"

---

## tela 3 — cidadao

ve e cria suas solicitacoes;
PRIVATE

### cabecalho

- [ ] ola com nome
- [ ] CTA log off
- [ ] CTA "nova solicitacao"

### form de nova solicitacao

- [ ] campos: categoria (select: iluminacao, buraco, limpeza, saude, outros), bairro, descricao
- [ ] CTA "enviar" / "cancelar"

### listagem solicitacoes

- [ ] filtro status: (todas, aberta, em andamento, concluida, cancelada)
- [ ] tabela: protocolo, status, prioridade
- [ ] CTA "+ detalhes" categorias: bairro, descricao, data, historico
- [ ] empty state
- [ ] cidadao so ve as proprias

---

## tela 4 — gestor

ve e gerencia todas as solicitacoes;
PRIVATE

### cabecalho

- [ ] saudacao com nome
- [ ] CTA logout
- [ ] busca por protocolo/descricao

### filtros

- [ ] dropdowns: categoria, bairro, prioridade, status
- [ ] CTA limpar filtros

### listagem

- [ ] tabela:
  - [ ] fixo: protocolo, categoria, bairro,
  - [ ] editavel: prioridade, status
- [ ] CTA detalhes:
  - [ ] dados completos + nome do cidadao
  - [ ] selects pra alterar prioridade/status
  - [ ] CTA "salvar alteracoes"
- [ ] empty state

---

## checklist geral

### estrutura

- [ ] telas: login, cadastro, cidadao, gestor
- [ ] componentizado?

### auth

- [ ] guard
  - [ ] rotas internas
  - [ ] lidar com gestor e cidadao
- [ ] service
  - [ ] metodo is_authenticated
  - [ ] metodo logout
  - [ ] metodo get_user_role

### perfumaria

- [ ] responsivo minimo(acho q n faz parte de perfumaria mas vai ficar aqui)
- [ ] coloridos pra status/prioridade
- [ ] selecao de cor e paleta, algo azul mais escuro acho
  - [ ] mono ou hetero?

### apresentacao

- [ ] readme com instrucoes (`npm i`, `ng serve`...)
