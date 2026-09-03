# PROMPT MESTRE — Landing Page "EscalaMED · A Rota do Crescimento"
### Estilo visual de referência: sequra-wealth.aura.build (Sequra Financial Wealth SaaS Template)

> **Como usar este arquivo:** cole este prompt inteiro em uma IA de geração de código (Claude, etc.) pedindo a construção da página em **HTML + CSS + JS puros**, um único fluxo de arquivos (`index.html`, `style.css`, `script.js`). Todo o conteúdo textual abaixo já está pronto — não invente ou resuma dados que não estejam aqui.

---

## 1. CONTEXTO E OBJETIVO

Construir uma landing page de **alta conversão** para o evento presencial **EscalaMED — A Rota do Crescimento**, da mentoria **X5 MED**, voltado a médicos empresários donos de clínica.

A página deve **copiar a linguagem visual "cinematic financial intelligence"** do template Sequra Financial Wealth (aura.build) — uma estética *premium dark fintech*, usada normalmente para wealth management/investimento — e aplicá-la ao conteúdo de negócios/saúde do EscalaMED. O contraste entre uma estética "banco premium/wealth" e o público de médicos-empresários é proposital: transmite autoridade, exclusividade e seriedade financeira ("dobrar o faturamento" tratado como tema de alta finança).

**Nota de honestidade sobre a referência:** o site `sequra-wealth.aura.build` é uma aplicação renderizada 100% em JavaScript (SPA), então não foi possível abrir/inspecionar o DOM ou tirar um screenshot pixel-a-pixel dele diretamente. A descrição de estilo abaixo foi reconstruída a partir (a) da descrição oficial do template na Aura ("premium fintech landing page template designed for wealth management and investment firms looking for cinematic financial intelligence"), (b) do padrão visual assinado por Meng To (autor do template) em seus outros templates da família Sequra/fintech (ex.: Sequra Financial Intelligence — dark theme, animações GSAP cinematográficas, vídeo integrado) e (c) das convenções visuais desse gênero "dark fintech premium" (Linear, Ramp, Mercury, Arc). Se você tiver um print de tela real do site, ajuste cores/tipografia finas com base nele — a estrutura e a linguagem de design abaixo já vão te deixar muito perto.

---

## 2. SISTEMA DE DESIGN (baseado na referência)

### 2.1 Paleta de cores

```
--bg-base:        #0A0B0F   /* preto-azulado profundo, quase preto */
--bg-surface:      #101319   /* cards e seções alternadas */
--bg-surface-2:     #161A22   /* cards elevados / hover */
--border-hairline:  rgba(255,255,255,0.08)
--border-hover:    rgba(255,255,255,0.16)

--text-primary:    #F4F3EF   /* branco levemente quente, não puro */
--text-secondary:   #A8ACB8   /* cinza-azulado para corpo de texto */
--text-muted:      #6B7080

--accent-gold:      #C9A961   /* dourado champanhe — CTA, destaques, ícones */
--accent-gold-soft: rgba(201,169,97,0.12)  /* fundo de badges/pills */
--accent-emerald:   #4ADE9C   /* verde esmeralda — indicadores positivos, gráficos, "crescimento" */
--accent-glow:      radial-gradient(circle, rgba(201,169,97,0.25) 0%, rgba(74,222,156,0.08) 45%, transparent 70%)

--gradient-hero:   linear-gradient(180deg, #0A0B0F 0%, #12141B 55%, #0A0B0F 100%)
```

- Nunca usar branco puro `#FFFFFF` nem preto puro `#000000` — sempre os tons quentes/frios acima.
- O dourado (`--accent-gold`) é a cor de ação (botões primários, números, sublinhados, ícones dos 4 pilares).
- O verde-esmeralda é reservado para conceitos de "crescimento/resultado positivo" (setas para cima, indicadores de faturamento, checkmarks).

### 2.2 Tipografia

- **Display / Headlines:** uma serifada elegante e editorial — `"Fraunces"` ou `"Playfair Display"` (Google Fonts), peso 500–600, `letter-spacing: -0.02em`, tamanhos grandes (64–88px no desktop para H1, 40–48px para H2 de seção).
- **Corpo / UI:** uma grotesk limpa — `"Inter"` ou `"Neue Montreal"`/`"Manrope"` como fallback, pesos 400/500/600.
- Hierarquia: eyebrows/kickers em caixa alta, tamanho pequeno (12–13px), `letter-spacing: 0.15em`, cor `--accent-gold`, antes de cada H2 de seção (ex.: "OS 4 PILARES DA ROTA").
- Parágrafos de destaque (citações/teses) em serifada itálica, tamanho maior, para criar "momentos editoriais" — como uma revista de finanças premium.

### 2.3 Efeitos e textura

- **Glow radial** no hero e atrás de números-chave: `--accent-glow` posicionado atrás do headline, blur alto (~120px), opacidade baixa.
- **Grain/noise sutil** sobreposto em todo o fundo (SVG de ruído em `background-blend-mode: overlay`, opacidade ~3–4%) para não parecer "flat design" genérico.
- **Glassmorphism** nos cards: `background: rgba(255,255,255,0.03)`, `backdrop-filter: blur(20px)`, borda 1px `--border-hairline`, `border-radius: 20px`.
- **Sombra suave** nos cards elevados: `box-shadow: 0 20px 60px rgba(0,0,0,0.4)`.
- **Linhas divisórias finas** (1px, `--border-hairline`) em vez de grandes blocos de cor para separar seções.

### 2.4 Layout

- Container máximo: `1280px`, padding lateral `24px` mobile / `64px` desktop.
- Espaçamento vertical generoso entre seções: `120–160px` desktop, `72–96px` mobile.
- Grids assimétricos onde fizer sentido (ex.: texto 40% / visual 60% no hero e nas seções de diferencial).
- Botões em formato **pill** (`border-radius: 999px`), padding generoso (`16px 32px`), com uma sutil animação de preenchimento/gradiente no hover.

### 2.5 Motion (JS)

- **Scroll reveal**: todos os blocos de conteúdo entram com `opacity: 0 → 1` + `translateY(24px → 0)` ao entrarem no viewport, via `IntersectionObserver` (stagger de ~80ms entre itens de uma mesma grade). Sem dependências externas — JS puro é suficiente para simular o efeito "cinematográfico" do GSAP/ScrollTrigger da referência.
- **Contadores animados**: números-chave (100 vagas, R$ 1 milhão, 100+ médicos, 2+ anos) contam de 0 até o valor final quando entram na tela.
- **Header sticky com blur progressivo**: nav fixo no topo, transparente no início, ganha `background: rgba(10,11,15,0.8)` + `backdrop-filter: blur(12px)` + borda inferior ao rolar.
- **Hover em cards**: leve `translateY(-4px)` + intensificação da borda + glow dourado sutil atrás do card.
- **Menu mobile**: hambúrguer que abre um overlay fullscreen com blur, mesma estética dark.
- Sem uso de bibliotecas externas (sem GSAP/jQuery) — tudo em JS vanilla, leve e performático.

---

## 3. ESTRUTURA DA PÁGINA (seções, nesta ordem)

Use o texto abaixo **literalmente** como copy (pode ajustar apenas para HTML semântico — headings, listas etc. — sem reescrever o conteúdo).

### 3.1 Header / Navegação
- Logo/wordmark: **EscalaMED** (com "MED" em `--accent-gold` ou peso diferente) — subtítulo pequeno "por X5 MED".
- Links de navegação (scroll suave até âncoras): `A Ideia` · `Para Quem` · `Os 4 Pilares` · `A Experiência` · `Quem Somos` · `O Evento`.
- CTA no header: botão pill dourado **"Garantir minha vaga"**.

### 3.2 Hero
- Eyebrow: `EVENTO PRESENCIAL · 100 VAGAS · ALPHAVILLE-SP · NOVEMBRO`
- H1 (serifado, grande): **EscalaMED**
- Subheadline H2: **A Rota do Crescimento**
- Parágrafo de apoio: "Um caminho prático para dobrar o faturamento da sua clínica, melhorar a lucratividade e construir o próximo nível do seu negócio."
- CTA primário (pill dourado): "Garantir minha vaga" · CTA secundário (ghost/outline): "Conhecer a Rota"
- Fundo: glow radial dourado/esmeralda atrás do headline, grain sutil, talvez uma "malha" de linhas finas sugerindo gráfico financeiro (SVG decorativo, sem dados reais).
- Pequena barra de confiança abaixo do CTA com 3 métricas em destaque (usar contador animado): **100 vagas** · **100% presencial** · **Novembro**.

### 3.3 A Grande Ideia
- Eyebrow: `A GRANDE IDEIA`
- H2: "O que precisaria mudar na sua clínica para ela dobrar de faturamento?"
- Lista de perguntas retóricas, uma por linha, estilo editorial (fonte serifada, itálico, espaçadas):
  - Mais pacientes?
  - Mais investimento em marketing?
  - Uma equipe maior?
  - Mais procedimentos?
  - Talvez.
- Bloco de transição: "Mas talvez o próximo salto da sua clínica **não esteja simplesmente em fazer mais.**"
- Três variações de diagnóstico, apresentadas como pequenos cards/linhas (glass card leve, sem borda pesada):
  - "Para algumas clínicas, a maior oportunidade está em **atrair mais pacientes**."
  - "Para outras, a demanda já existe — o que falta é **converter melhor as oportunidades que chegam**."
  - "Em alguns casos, existe faturamento sendo deixado na mesa por decisões de **oferta, precificação, ticket, recorrência ou retenção**."
  - "E existem clínicas que já alcançaram um bom faturamento, mas precisam de **estrutura para suportar um novo ciclo de crescimento**."
- Citação de destaque (grande, serifada, centralizada, cor de texto primária com "significa" em dourado):
  > "Dobrar o faturamento não significa, necessariamente, dobrar pacientes, equipe ou investimento. **Significa descobrir quais alavancas precisam ser acionadas para fazer a clínica crescer.**"
- Fecho: "Porque clínicas em momentos diferentes precisam de movimentos diferentes."
- Headline de fechamento da seção (destaque, dourado): **"Dobrar o faturamento é o objetivo. O caminho depende do gargalo."** — subtítulo: "Essa é a tese central do EscalaMED — A Rota do Crescimento."

### 3.4 Para Quem Estamos Falando
- Eyebrow: `PARA QUEM ESTAMOS FALANDO`
- Texto: "O público prioritário do EscalaMED é o **médico empresário cuja clínica fatura aproximadamente entre R$ 40 mil e R$ 100 mil por mês.**"
- Card de destaque estilo "faixa de investimento" (visual de dashboard financeiro — como um range/slider estático, estética de wealth management): mostrar visualmente a faixa **R$ 40 mil → R$ 100 mil/mês**.
- Lista curta em sequência (uma frase por linha, ritmo de leitura rápido):
  - É o médico que já ultrapassou a fase inicial.
  - Já tem pacientes.
  - Já gera receita.
  - Já provou que existe demanda pelo seu trabalho.
- Texto: "Mas começa a perceber que **continuar fazendo mais do mesmo pode não ser suficiente para romper o patamar atual.**"
- H3: "O que precisa mudar no meu negócio para chegar ao próximo nível?"
- Lista de possíveis caminhos (grid de 5 mini-cards ou lista com ícones dourados):
  - Para alguns, será necessário gerar mais demanda.
  - Para outros, converter melhor.
  - Alguns precisarão rever oferta, precificação e ticket.
  - Outros encontrarão oportunidades em recorrência e retenção.
  - E alguns já começarão a enfrentar gargalos relacionados a equipe, processos, indicadores e gestão.
- Fecho em destaque: "**A faixa de R$ 40 mil a R$ 100 mil é o centro do nosso público, não necessariamente um critério de exclusão.**"

### 3.5 Os 4 Pilares da Rota
- Eyebrow: `OS 4 PILARES DA ROTA`
- Grid de **4 cards** (glassmorphism, numerados 01–04, ícone/número em dourado, hover eleva o card):
  1. **Mentalidade Empresarial** — "Enxergar a clínica como negócio." Números, oportunidades, prioridades e decisões. Antes de executar mais, entender onde está o verdadeiro potencial de crescimento e qual gargalo precisa ser enfrentado.
  2. **Atração** — "Gerar mais oportunidades de faturamento." Reativação, indicação, posicionamento, ações locais, marketing médico e geração consistente de demanda.
  3. **Conversão** — "Transformar melhor oportunidades em faturamento." Oferta, precificação, vendas, experiência do paciente, follow-up, ticket, retenção e recorrência.
  4. **Expansão** — "Criar estrutura para sustentar o próximo estágio." Equipe, processos, liderança, indicadores, finanças, capacidade operacional e tecnologia.
- Fecho da seção: "Porque existe uma diferença entre **alcançar um novo patamar de faturamento e construir uma empresa capaz de sustentá-lo.**"

### 3.6 O Papel da Inteligência Artificial
- Eyebrow: `O PAPEL DA INTELIGÊNCIA ARTIFICIAL`
- Texto: "IA não será o centro da narrativa do EscalaMED. Ela será apresentada como aquilo que acreditamos que deve representar dentro de uma clínica:"
- Destaque grande (serifado, itálico): **"um braço catalisador da execução."**
- Texto: "Tecnologia para apoiar análises, organizar informações, simplificar processos e aumentar a capacidade de execução da clínica."
- Duas linhas finais, formatadas como par de afirmações (uma neutra, uma em dourado):
  - "A estratégia continua sendo empresarial."
  - "**A inteligência artificial entra para potencializá-la.**"

### 3.7 A Experiência EscalaMED
- Eyebrow: `A EXPERIÊNCIA ESCALAMED`
- Barra de specs do evento (estilo "ficha técnica" financeira, 3–4 itens em linha com divisores verticais finos): **100 participantes** · **Presencial** · **Alphaville — SP** · **Novembro**
- Texto: "O EscalaMED não será apenas uma sequência de palestras. O participante percorrerá os quatro pilares olhando para a realidade da própria clínica e começará a construir sua própria Rota do Crescimento."
- H3: "Durante a experiência, terá acesso a:"
- Lista de entregáveis (ícones dourados, grid 2 colunas no desktop):
  - Mapa da Rota — esboço do Plano de Ação da clínica
  - Planilha da Hora da Cadeira
  - Agente de IA para apoio à precificação por markup
  - Conteúdo prático nos quatro pilares
  - Kit EscalaMED
  - Coffee break
  - Momentos de conexão entre os participantes
- Bloco de citação final da seção: "Você não vai apenas conhecer A Rota do Crescimento. **Vai começar a construir a sua.**"

### 3.8 Nosso Diferencial (case Manaus)
- Eyebrow: `NOSSO DIFERENCIAL`
- H2: "Não ensinamos gestão olhando uma clínica de fora."
- Subtítulo: "Ensinamos a partir dos negócios que construímos — inclusive dos desafios que ainda estamos resolvendo."
- Narrativa do case (texto corrido, ritmo editorial, um parágrafo por bloco):
  - "Uma das clínicas construídas pelos sócios da X5 MED, em Manaus, **saiu do zero e alcançou o patamar de aproximadamente R$ 1 milhão de faturamento mensal em cerca de um ano.**"
  - "Naquele momento, Fábio e Patrícia estavam diretamente envolvidos na operação e nas vendas."
  - "O crescimento aconteceu. Mas revelou um novo gargalo."
  - "Quando os dois deixaram a linha de frente da operação, o faturamento recuou para a faixa de aproximadamente **R$ 400 mil mensais**."
- **Dois cards numéricos lado a lado** (estilo "before/after" de dashboard financeiro, com contador animado e uma seta/linha indicando queda):
  - Card 1: `R$ 1.000.000/mês` — legenda: "Com Fábio e Patrícia na linha de frente"
  - Card 2: `R$ 400.000/mês` — legenda: "Quando saíram da operação direta"
- Citação de aprendizado (destaque grande): "O que leva uma clínica a um patamar **não necessariamente é o que a sustenta nesse patamar.**"
- Texto: "Hoje, o desafio é buscar novamente o patamar de **R$ 1 milhão por mês**, mas com uma construção diferente:"
- Lista em linha/tags (pills): gestores · equipe · processos · comercial · indicadores · tecnologia · estratégia
- Texto: "**Sem depender da presença diária de Fábio e Patrícia na operação.**"
- Texto: "Esse é o desafio atual — e não um resultado que afirmamos já ter alcançado. É justamente essa realidade que fortalece aquilo que ensinamos."
- Bloco de fechamento (duas linhas, contraste tipográfico):
  - "Não ensinamos a partir de uma empresa perfeita."
  - "**Ensinamos a partir de empresas reais.**"
- Lista rápida (uma linha cada, ritmo de "manifesto"):
  - Empresas que crescem.
  - Que encontram gargalos.
  - Que precisam rever decisões.
  - Que testam estratégias.
  - Que estruturam pessoas e processos.
  - E que continuam buscando o próximo nível.
- Fecho: "Porque crescer uma vez é um desafio. **Construir uma empresa capaz de sustentar o crescimento é outro.**"

### 3.9 Quem Está Por Trás Dessa Rota (Equipe)
- Eyebrow: `QUEM ESTÁ POR TRÁS DESSA ROTA`
- Grid de **5 cards de equipe** (avatar placeholder — círculo com iniciais sobre fundo gradiente dourado/esmeralda, já que não há fotos reais; nome em serifado; cargo em dourado; bio em texto secundário):
  1. **Fábio Rodrigues** — Médico cirurgião, empresário e gestão. Participou diretamente da construção e do crescimento das clínicas e hoje atua sobre o desafio de transformar crescimento em estrutura empresarial.
  2. **Patrícia Santiago** — Experiência do cliente e vendas. Esteve diretamente na linha de frente comercial durante a construção do case de Manaus e traz a visão de experiência, jornada, percepção de valor e conversão.
  3. **Vital Araújo** — Vendas e Mentalidade Empresarial. Além da atuação na X5 MED, vive atualmente, ao lado de Tainara, o processo de estruturação de uma nova clínica em Sergipe.
  4. **Tainara** — Médica dermatologista, empresária e posicionamento. Traz a visão de autoridade, diferenciação e percepção de valor enquanto participa da construção da nova operação em Sergipe.
  5. **Patrício Darvisson** — Empresário e visão empresarial sem o viés da medicina. Com participação em mais de 30 negócios, atuando, de acordo com cada empresa, como fundador, sócio, investidor ou gestor. Sua presença traz um contraponto importante: *"Se isso fosse qualquer outra empresa, administraríamos o negócio dessa mesma maneira?"*

### 3.10 Nossa Autoridade
- Eyebrow: `NOSSA AUTORIDADE NÃO VEM APENAS DO PALCO`
- Texto: "A X5 MED está no mercado há mais de dois anos. Nesse período, mais de 100 médicos já passaram pela mentoria, aplicando Mentalidade Empresarial, Atração, Conversão e Expansão em diferentes momentos dos seus negócios."
- Barra de estatísticas com **contadores animados** (3 números grandes em dourado, estilo dashboard financeiro):
  - **2+** anos de mercado
  - **100+** médicos mentorados
  - **4** pilares aplicados
- Espaço reservado para depoimentos (carrossel/marquee horizontal infinito de cards vazios com estrutura pronta, já que o conteúdo real ainda não foi fornecido): renderizar 3 a 4 cards placeholder com texto `[Depoimento a ser inserido]`, nome `[Nome do médico]`, clínica `[Nome da clínica]` — deixar comentado no HTML como `<!-- INSERIR CASES E DEPOIMENTOS DOCUMENTADOS -->`.
- Headline de fechamento (grande, centralizada): **"O palco não é de onde vem nossa autoridade. A operação é."**

### 3.11 Modelo do Evento
- Eyebrow: `MODELO DO EVENTO`
- Card central de destaque (glass card grande, estilo "resumo de investimento" de wealth management, mas com preço = gratuito):
  - **100 vagas presenciais**
  - **Participação sem custo**
  - **Inscrição + confirmação pela equipe X5 MED**
  - **Local:** Alphaville — São Paulo
  - **Mês:** Novembro
  - **Data:** [Em definição]
- CTA grande dourado: "Quero garantir minha vaga"

### 3.12 A Mensagem Que Precisa Ficar (fechamento/manifesto)
- Texto em sequência, ritmo de negação/afirmação (bom para animação de fade sequencial):
  - "O EscalaMED não será um evento sobre marketing."
  - "Não será um evento sobre inteligência artificial."
  - "E não será apenas um evento sobre gestão."
- Headline gigante de impacto: **"Será um evento sobre crescimento."**
- Três frases de destaque (uma abaixo da outra, tipografia grande):
  - "Como dobrar o faturamento."
  - "Como transformar faturamento em lucratividade."
  - "E como construir uma clínica preparada para o próximo nível."
- Diagrama/funil visual dos 4 pilares em sequência (linha horizontal conectando os 4 nós, cada nó com o nome do pilar, cor dourada, com seta/linha esmeralda entre eles):
  **Mentalidade Empresarial → Atração → Conversão → Expansão**

### 3.13 CTA Final + Rodapé
- Repetição do bloco de abertura como fechamento circular (mesma estética do hero, glow dourado):
  - **EscalaMED**
  - **A Rota do Crescimento**
  - "Um caminho prático para dobrar o faturamento da sua clínica, melhorar a lucratividade e construir o próximo nível do seu negócio."
- Formulário de inscrição (simples, sem back-end — apenas front-end funcional com validação e estado de sucesso via JS):
  - Campos: Nome completo · WhatsApp · E-mail · Nome da clínica
  - Botão pill dourado: "Garantir minha vaga"
  - Ao enviar (sem backend real): mostrar um estado de sucesso in-page ("Recebemos seu interesse — nossa equipe entrará em contato para confirmar sua vaga.") em vez de recarregar a página.
- Rodapé: logo **EscalaMED por X5 MED**, links de âncora repetidos, e linha de copyright `© 2026 X5 MED. Todos os direitos reservados.`

---

## 4. REQUISITOS TÉCNICOS

- **Arquivos:** `index.html`, `style.css`, `script.js` separados (ou single-file se o ambiente de destino exigir — mas prefira separado para manutenção).
- **Responsivo:** mobile-first, breakpoints em `480px`, `768px`, `1024px`, `1280px`. Grids de cards colapsam para 1 coluna no mobile.
- **Acessibilidade:** HTML semântico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), contraste AA mínimo para texto sobre fundo escuro, `alt` em imagens/ícones decorativos como `aria-hidden`, foco visível em elementos interativos.
- **Performance:** sem frameworks/bibliotecas externas pesadas — apenas Google Fonts (`Fraunces` + `Inter`) e JS vanilla. Animações via `IntersectionObserver` e CSS transitions/keyframes.
- **Ícones:** usar SVGs inline simples e minimalistas (line icons, stroke fino, cor dourada) em vez de bibliotecas externas de ícones.
- **Sem imagens reais de clientes:** como não há fotos da equipe ou de clínicas, usar placeholders visuais elegantes (gradientes, iniciais, formas abstratas com aspecto de gráfico financeiro) coerentes com a estética.
- **Idioma:** todo o conteúdo em português do Brasil, exatamente como especificado na seção 3.
- **SEO básico:** `<title>`, meta description e Open Graph tags coerentes com "EscalaMED — A Rota do Crescimento".

---

## 5. TOM DE VOZ DO COPY

Editorial, confiante, um pouco de "manifesto" — frases curtas isoladas em parágrafos próprios para dar peso e ritmo de leitura (como uma matéria de revista de negócios/finanças premium). Evitar qualquer tom "hype" de infoproduto genérico; o design cinematográfico e a linguagem financeira sóbria devem carregar a persuasão, não emojis ou caixa alta excessiva.
