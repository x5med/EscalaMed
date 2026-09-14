# EscalaMED

Landing page do evento EscalaMED migrada para Next.js 16, React 19 e TypeScript.

## Rota

- `/` — página principal, baseada na V2 do projeto original.
- `/v2` — redirecionamento permanente para `/` para preservar links existentes.

A página é pré-renderizada como conteúdo estático pelo Next.js. Menus responsivos, navegação suave, painéis de diagnóstico, carrosséis, vídeos, contadores e animações são inicializados pelo componente cliente `PageRuntime`.

## Desenvolvimento

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Validação de produção

```bash
npm run check
```

O comando executa a validação de tipos e a compilação otimizada de produção.

## Candidatura

O projeto original não possuía integração de formulário ou URL externa. Por isso, os CTAs direcionam para a seção `#inscricao` e o botão final permanece desabilitado. Quando o destino de candidatura for definido, ele deve substituir esses pontos no conteúdo da página.
