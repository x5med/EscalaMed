# EscalaMED

Landing page do evento EscalaMED migrada para Next.js 16, React 19 e TypeScript.

## Rotas

- `/` — versão principal.
- `/v2` — segunda experiência visual preservada do projeto original.

As duas rotas são pré-renderizadas como conteúdo estático pelo Next.js. Menus responsivos, navegação suave, painéis de diagnóstico, carrosséis, vídeos, contadores e animações são inicializados pelo componente cliente `PageRuntime`.

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

O projeto original não possuía integração de formulário ou URL externa. Por isso, a versão principal mantém os CTAs direcionados à seção `#inscricao`, enquanto o botão final da V2 permanece desabilitado. Quando o destino de candidatura for definido, ele deve substituir esses pontos no conteúdo das páginas.
