====================
INSTALAÇÃO DAS DEPENDÊNCIAS
===========================

Este projeto não inclui a pasta node_modules, porque ela é pesada e nunca deve ser enviada ao GitHub.

Para instalar:

npm install

ou

npm i

Isso irá:

* Ler o package.json
* Baixar todas as bibliotecas necessárias
* Criar automaticamente a pasta node_modules

====================
COMO RODAR O PROJETO
====================

Após instalar os módulos, executar:

npm run dev

O Vite abrirá no navegador:
[http://localhost:5173/](http://localhost:5173/)

Se essa porta estiver ocupada, ele abrirá outra (5174, 5175…).

====================
CONFIGURAÇÃO DO ARQUIVO .env
============================

Criar o arquivo .env na raiz do projeto e colocar:

VITE_API_URL=[http://localhost:3000](http://localhost:3000)

Se sua API estiver em outra porta, mudar para o endereço correto.

====================
ESTRUTURA DO PROJETO (ATUAL)
============================



package-lock.json
checkpoint-react/
|
├── .env
├── package.json
├── package-lock.json
├── vite.config.js
|
├── index.html
|
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   |
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   |
│   ├── styles/
│   │   ├── globals.css
│   │   └── home.css
│   |
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   │   └── AuthLayout.jsx
│   │   |
│   │   ├── common/
│   │   │   ├── ActivityCard.jsx
│   │   │   ├── FeaturedCard.jsx
│   │   │   └── GameCard.jsx
│   │   |
│   │   └── home/
│   │   │   ├── ActivitySection.jsx
│   │   │   ├── FeaturedSection.jsx
│   │   │   └── Hero.jsx
|   |
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Games.jsx
│   │   ├── Lists.jsx
│   │   ├── Profile.jsx
│   │   └── GameDetail.jsx
│   │   └── Login.jsx
│   │   └── NotFound.jsx
│   |
│   ├── context/
│   │   └── AuthContext.jsx
│   |
│   ├── hooks/
│   │   └── useAuth.js
│   |
│   ├── services/
│   │   └── api.js
│   │   └── authService.js
│   │   └── avaliacoesServices.js
│   │   └── jogosService.js
│   │   └── listaService.js
│   │   └── usuarioService.js
│   |
│   ├── routes/
│   │   └── AppRoutes.jsx
│   |
├── public/
│   ├── favicon.ico
│   |

====================
SCRIPTS DISPONÍVEIS
===================

npm install            → instala dependências
npm run dev            → inicia servidor Vite
npm run build          → gera build para produção
npm run preview        → abre a build localmente

====================
AUTENTICAÇÃO
============

A API oferece rotas para:

* Registrar usuário
* Login
* Logout
* Buscar perfil
* Atualizar dados
* Rotas protegidas por token

O token é salvo automaticamente no localStorage.

====================
INTEGRAÇÃO COM A API DE JOGOS, LISTAS E AVALIAÇÕES
==================================================

Toda a parte dinâmica é carregada via Axios:

GET /api/jogos
GET /api/jogos/:id
GET /api/jogos/:id/imagem
GET /api/listas
GET /api/avaliacoes

Tudo configurado no arquivo src/services/api.js

====================
COMO CLONAR E RODAR O PROJETO
=============================

1. Clonar o repositório
   git clone <url>

2. Acessar
   cd checkpoint-react

3. Instalar dependências
   npm install

4. Rodar
   npm run dev

Pronto, o projeto estará funcionando.

====================
FIM
