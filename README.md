# 🎬 Letterboxd Stats

> Transforme seu histórico do Letterboxd em visualizações interativas.

![Angular](https://img.shields.io/badge/Angular-22-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![ECharts](https://img.shields.io/badge/Apache_ECharts-5-orange)
![TMDB](https://img.shields.io/badge/TMDB_API-v3-green)

## O que é

**Letterboxd Stats** é uma aplicação web pessoal que lê o arquivo de exportação do seu perfil no Letterboxd e cruza esses dados com a API do TMDB para gerar estatísticas e visualizações sobre o seu histórico de filmes.

### Visualizações disponíveis

- 🌍 **Países** — mapa mundial interativo com os países de origem dos filmes que você mais assistiu
- 🎭 **Gêneros** — gráfico de pizza com a distribuição dos gêneros
- 🎬 **Diretores** — top 20 diretores com foto, destaque para o top 4
- 🎭 **Elenco** — top 20 atores/atrizes com foto, destaque para o top 4

---

## Como usar

### 1. Exporte seus dados do Letterboxd

1. Acesse [letterboxd.com](https://letterboxd.com) e faça login
2. Vá em **Settings → Data → Export Your Data**
3. Baixe o arquivo `.zip` e extraia
4. Use o arquivo **`diary.csv`**

### 2. Configure o projeto

#### Pré-requisitos
- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)
- Conta no [TMDB](https://www.themoviedb.org/) com API key

#### Instalação

```bash
# Clone o repositório
git clone https://github.com/gscotrim2006/letterboxd-stats.git
cd letterboxd-stats

# Instale as dependências
npm install

# Configure a API key do TMDB
cp src/environments/environment.ts.example src/environments/environment.ts
```

Abra `src/environments/environment.ts` e substitua `SUA_CHAVE_AQUI` pela sua API key do TMDB:

```typescript
export const environment = {
  tmdbApiKey: 'SUA_CHAVE_AQUI'
};
```

> **Como obter a API key do TMDB:**
> 1. Crie uma conta em [themoviedb.org](https://www.themoviedb.org/)
> 2. Acesse **Settings → API**
> 3. Solicite uma API key (uso pessoal/educacional)
> 4. Copie a chave da seção **API Key (v3 auth)**

#### Rodando o projeto

```bash
ng serve
```

Acesse `http://localhost:4200`

### 3. Usando a aplicação

1. Na página inicial, clique em **Choose file** e selecione seu `diary.csv`
2. Clique em **Search movies information** para buscar os dados na API do TMDB
3. Aguarde o processamento — a barra de progresso indica o andamento
4. Navegue pelas páginas na barra lateral para explorar suas estatísticas

> **Nota:** o processamento respeita um intervalo de 250ms entre requisições para não exceder o rate limit da API do TMDB. Para listas grandes, pode levar alguns minutos.

---

## Arquivo de teste

Não tem conta no Letterboxd? Use o arquivo `test-diary.csv` na pasta raiz do projeto para testar a aplicação com dados fictícios.

---

## Stack

| Tecnologia | Uso |
|---|---|
| Angular 22 | Framework principal |
| TypeScript | Linguagem |
| RxJS | Requisições encadeadas e reatividade |
| Apache ECharts + ngx-echarts | Visualizações e mapa interativo |
| TMDB API v3 | Dados de filmes (gêneros, elenco, países) |

---

## Estrutura do projeto

```
src/app/
├── layout/
│   ├── header/          # Header com logo
│   └── sidenav/         # Navegação lateral
├── pages/
│   ├── home/            # Upload do CSV e processamento
│   ├── genres/          # Gráfico de pizza
│   ├── directors/       # Top diretores
│   ├── cast/            # Top elenco
│   └── countries/       # Mapa mundial
├── services/
│   ├── csv-parser.ts    # Leitura e parse do diary.csv
│   ├── tmdb.ts          # Integração com TMDB API
│   ├── stats.ts         # Agregação de estatísticas
│   └── state.ts         # Estado global compartilhado
└── models/
    └── movie.model.ts   # Interfaces TypeScript
```

---

## Roadmap

- [ ] Sidenav retrátil
- [ ] Gráfico de notas ao longo do tempo
- [ ] Décadas mais assistidas
- [ ] Backend com Java/Python + PostgreSQL para persistência
- [ ] Mais estatísticas (tempo total assistido, média de notas por gênero)

---

## Créditos

Desenvolvido por **Guilherme Cotrim** com auxílio do [Claude](https://claude.ai) (Anthropic) como tutor — cada conceito pesquisado e entendido antes de implementado.

Dados de filmes fornecidos pela [API do TMDB](https://www.themoviedb.org/documentation/api).

> *This product uses the TMDB API but is not endorsed or certified by TMDB.*