export const v2Markup = String.raw`
<a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

  <header class="site-header" id="topo">
    <div class="nav-shell">
      <a class="brand" href="#inicio" aria-label="EscalaMED — início">
        <img src="assets/images/logo.svg" alt="EscalaMED por X5 MED">
      </a>

      <nav class="desktop-nav" aria-label="Navegação principal">
        <a href="#diagnostico">DIAGNÓSTICO</a>
        <a href="#pilares">A ROTA</a>
        <a href="#publico">PARA QUEM</a>
        <a href="#experiencia">A EXPERIÊNCIA</a>
        <a href="#equipe">MENTORES</a>
      </nav>

      <a class="button button-small nav-cta" href="https://formulario-escalamed.x5med.com.br/">Garantir minha vaga</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menu">
        <span></span><span></span>
      </button>
    </div>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav aria-label="Navegação mobile">
        <a href="#diagnostico">Diagnóstico</a>
        <a href="#pilares">A Rota</a>
        <a href="#publico">Para quem</a>
        <a href="#experiencia">A Experiência</a>
        <a href="#equipe">Mentores</a>
        <a class="button" href="https://formulario-escalamed.x5med.com.br/">Garantir minha vaga</a>
      </nav>
    </div>
  </header>

  <main id="conteudo">
    <section class="hero" id="inicio">
      <div class="hero-art" role="img" aria-label="Grupo de mentores do EscalaMED em um palco de evento"></div>
      <div class="hero-wash" aria-hidden="true"></div>

      <div class="container hero-content">
        <div class="hero-copy">
          <h1><span>EscalaMED</span><em>A Rota do Crescimento</em></h1>
          <p>Um caminho prático para dobrar o faturamento da sua clínica, melhorar a lucratividade e construir o próximo nível do seu negócio.</p>
        </div>

        <div class="hero-actions" aria-label="Ações principais">
          <a class="button" href="https://formulario-escalamed.x5med.com.br/">Garantir minha vaga</a>
          <a class="button button-ghost" href="#diagnostico">Descobrir meu gargalo</a>
        </div>
      </div>

      <a class="scroll-cue" href="#diagnostico" aria-label="Continuar para o diagnóstico">
        <span>Role para descobrir a rota</span><i></i>
      </a>
    </section>

    <div class="event-marquee" aria-label="Informações do evento">
      <div class="event-marquee-track">
        <span>27, 28 e 29 de novembro</span><i></i><span>Alphaville — São Paulo</span><i></i><span>100 vagas presenciais</span><i></i><span>Convite exclusivo</span><i></i>
        <span aria-hidden="true">27, 28 e 29 de novembro</span><i aria-hidden="true"></i><span aria-hidden="true">Alphaville — São Paulo</span><i aria-hidden="true"></i><span aria-hidden="true">100 vagas presenciais</span><i aria-hidden="true"></i><span aria-hidden="true">Convite exclusivo</span><i aria-hidden="true"></i>
      </div>
    </div>

    <section class="diagnosis section" id="diagnostico">
      <div class="container">
        <div class="section-intro diagnosis-intro">
          <p class="kicker">A rota começa pelo diagnóstico</p>
          <h2>O que precisaria mudar na sua clínica para ela dobrar de faturamento?</h2>
          <p class="intro-copy">A resposta não é igual para todas as clínicas. Selecione uma possibilidade e reconheça onde pode estar o seu próximo movimento.</p>
        </div>

        <div class="diagnosis-accordion" data-diagnosis>
          <article class="diagnosis-panel is-active" data-panel="atracao">
            <button type="button" aria-expanded="true">
              <span class="panel-number">01</span>
              <span class="panel-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="14"></circle><path d="M24 3v7M24 38v7M3 24h7M38 24h7M9 9l5 5M34 34l5 5M39 9l-5 5M14 34l-5 5"></path></svg>
              </span>
              <span class="panel-title">Mais pacientes?</span>
            </button>
            <div class="panel-content">
              <p>Para algumas clínicas, a maior oportunidade está em <strong>atrair mais pacientes.</strong></p>
              <span>Demanda e posicionamento</span>
            </div>
          </article>

          <article class="diagnosis-panel" data-panel="conversao">
            <button type="button" aria-expanded="false">
              <span class="panel-number">02</span>
              <span class="panel-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48"><path d="M8 11h32M12 18l12 12 12-12M24 30v9"></path><circle cx="24" cy="40" r="2"></circle></svg>
              </span>
              <span class="panel-title">Converter melhor?</span>
            </button>
            <div class="panel-content">
              <p>Para outras, a demanda já existe — o que falta é <strong>converter melhor as oportunidades que chegam.</strong></p>
              <span>Oferta e experiência</span>
            </div>
          </article>

          <article class="diagnosis-panel" data-panel="valor">
            <button type="button" aria-expanded="false">
              <span class="panel-number">03</span>
              <span class="panel-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48"><path d="M7 34l10-10 7 7 17-18M32 13h9v9"></path><path d="M7 41h34"></path></svg>
              </span>
              <span class="panel-title">Mais rentabilidade?</span>
            </button>
            <div class="panel-content">
              <p>Existe faturamento sendo deixado na mesa por decisões de <strong>oferta, precificação, ticket, recorrência ou retenção.</strong></p>
              <span>Ticket e recorrência</span>
            </div>
          </article>

          <article class="diagnosis-panel" data-panel="estrutura">
            <button type="button" aria-expanded="false">
              <span class="panel-number">04</span>
              <span class="panel-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48"><path d="M8 38V20l16-10 16 10v18M15 38V23h18v15M20 38v-8h8v8"></path></svg>
              </span>
              <span class="panel-title">Mais estrutura?</span>
            </button>
            <div class="panel-content">
              <p>Algumas clínicas precisam de <strong>estrutura para suportar um novo ciclo de crescimento.</strong></p>
              <span>Equipe e operação</span>
            </div>
          </article>
        </div>

        <p class="diagnosis-thesis" data-scrub-text>Dobrar o faturamento não significa, necessariamente, dobrar pacientes, equipe ou investimento. Significa descobrir quais alavancas precisam ser acionadas para fazer a clínica crescer.</p>
      </div>
    </section>

    <section class="pillars section" id="pilares">
      <div class="container pillars-layout">
        <div class="pillars-intro">
          <p class="kicker">Uma visão completa do negócio</p>
          <h2>Os 4 Pilares <span class="inline-portraits" aria-hidden="true"><img src="assets/images/img-fabio.webp" alt=""><img src="assets/images/img-patricia.webp" alt=""><img src="assets/images/img-vital.webp" alt=""><img src="assets/images/img-patricio.webp" alt=""><img src="assets/images/img-tainara.webp" alt=""></span> da Rota</h2>
          <p>Porque clínicas em momentos diferentes precisam de movimentos diferentes.</p>
          <div class="route-progress" aria-hidden="true"><span></span><i></i></div>
        </div>

        <div class="pillars-stack">
          <article class="pillar-card" data-accent="gold">
            <div class="pillar-top"><span>01</span><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 36V22l16-10 16 10v14M15 36V24h18v12M20 36v-7h8v7"></path></svg></div>
            <div>
              <h3>Mentalidade Empresarial</h3>
              <h4>Enxergar a clínica como negócio.</h4>
              <p>Números, oportunidades, prioridades e decisões. Antes de executar mais, entender onde está o verdadeiro potencial de crescimento e qual gargalo precisa ser enfrentado.</p>
            </div>
          </article>

          <article class="pillar-card" data-accent="cyan">
            <div class="pillar-top"><span>02</span><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="15"></circle><path d="m24 15 4 7 7 2-7 3-4 7-4-7-7-3 7-2Z"></path></svg></div>
            <div>
              <h3>Atração</h3>
              <h4>Gerar mais oportunidades de faturamento.</h4>
              <p>Reativação, indicação, posicionamento, ações locais, marketing médico e geração consistente de demanda.</p>
            </div>
          </article>

          <article class="pillar-card" data-accent="blue">
            <div class="pillar-top"><span>03</span><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 12h30M12 18l12 12 12-12M24 30v8"></path><circle cx="24" cy="38" r="2"></circle></svg></div>
            <div>
              <h3>Conversão</h3>
              <h4>Transformar melhor oportunidades em faturamento.</h4>
              <p>Oferta, precificação, vendas, experiência do paciente, follow-up, ticket, retenção e recorrência.</p>
            </div>
          </article>

          <article class="pillar-card" data-accent="white">
            <div class="pillar-top"><span>04</span><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 36h28M14 32l8-9 6 5 9-14M30 14h7v7"></path></svg></div>
            <div>
              <h3>Expansão</h3>
              <h4>Criar estrutura para sustentar o próximo estágio.</h4>
              <p>Equipe, processos, liderança, indicadores, finanças, capacidade operacional e tecnologia.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="audience section" id="publico">
      <div class="container">
        <div class="audience-intro">
          <p class="kicker">Para quem estamos falando</p>
          <h2>O público prioritário do EscalaMED é o <strong>médico empresário cuja clínica fatura aproximadamente entre R$ 40 mil e R$ 100 mil por mês.</strong></h2>
        </div>

        <div class="audience-bento">
          <article class="audience-range">
            <div class="audience-card-head">
              <span>Faixa central do público</span>
              <i aria-hidden="true"></i>
            </div>
            <div class="range-scale" aria-label="Faixa de faturamento mensal entre quarenta mil e cem mil reais">
              <div class="range-values"><strong>R$ 40 mil</strong><strong>R$ 100 mil/mês</strong></div>
              <div class="range-line" aria-hidden="true"><span></span><i></i><i></i></div>
            </div>
            <p><strong>A faixa de R$ 40 mil a R$ 100 mil é o centro do nosso público, não necessariamente um critério de exclusão.</strong></p>
          </article>

          <article class="audience-signals">
            <div class="audience-card-head">
              <span>Sinais de um negócio em movimento</span>
              <i aria-hidden="true"></i>
            </div>
            <ul>
              <li class="audience-signal"><span>01</span>É o médico que já ultrapassou a fase inicial.</li>
              <li class="audience-signal"><span>02</span>Já tem pacientes.</li>
              <li class="audience-signal"><span>03</span>Já gera receita.</li>
              <li class="audience-signal"><span>04</span>Já provou que existe demanda pelo seu trabalho.</li>
            </ul>
          </article>

          <article class="audience-pathways">
            <div class="pathways-thesis">
              <p>Mas começa a perceber que <strong>continuar fazendo mais do mesmo pode não ser suficiente para romper o patamar atual.</strong></p>
              <h3>O que precisa mudar no meu negócio para chegar ao próximo nível?</h3>
            </div>
            <ol class="growth-paths">
              <li><span>01</span><p>Para alguns, será necessário <strong>gerar mais demanda.</strong></p></li>
              <li><span>02</span><p>Para outros, <strong>converter melhor.</strong></p></li>
              <li><span>03</span><p>Alguns precisarão rever <strong>oferta, precificação e ticket.</strong></p></li>
              <li><span>04</span><p>Outros encontrarão oportunidades em <strong>recorrência e retenção.</strong></p></li>
              <li><span>05</span><p>E alguns já começarão a enfrentar gargalos relacionados a <strong>equipe, processos, indicadores e gestão.</strong></p></li>
            </ol>
          </article>
        </div>
      </div>
    </section>

    <section class="experience section" id="experiencia">
      <div class="container">
        <div class="experience-heading">
          <div>
            <p class="kicker">A experiência EscalaMED</p>
            <h2>Não será apenas uma sequência de palestras.</h2>
          </div>
          <p>O participante percorrerá os quatro pilares olhando para a realidade da própria clínica e começará a construir sua própria Rota do Crescimento.</p>
        </div>

        <div class="experience-specs" aria-label="Informações do evento">
          <div><span>Participantes</span><strong>100</strong></div>
          <div><span>Formato</span><strong>Presencial</strong></div>
          <div><span>Local</span><strong>Alphaville — SP</strong></div>
          <div><span>Quando</span><strong>Novembro</strong></div>
        </div>

        <div class="experience-journey">
          <div class="journey-title">
            <p class="kicker">Durante a experiência</p>
            <h3>Uma rota prática para sair com decisões, não apenas anotações.</h3>
          </div>

          <div class="journey-track">
            <span class="journey-progress" aria-hidden="true"></span>
            <article class="journey-station">
              <div class="station-marker"><span>01</span><i></i></div>
              <h4>Clareza</h4>
              <ul><li>Mapa da Rota — esboço do Plano de Ação da clínica</li></ul>
            </article>
            <article class="journey-station">
              <div class="station-marker"><span>02</span><i></i></div>
              <h4>Ferramentas</h4>
              <ul>
                <li>Planilha da Hora da Cadeira</li>
                <li>Agente de IA para apoio à precificação por markup</li>
              </ul>
            </article>
            <article class="journey-station">
              <div class="station-marker"><span>03</span><i></i></div>
              <h4>Aplicação</h4>
              <ul><li>Conteúdo prático nos quatro pilares</li></ul>
            </article>
            <article class="journey-station">
              <div class="station-marker"><span>04</span><i></i></div>
              <h4>Conexão</h4>
              <ul>
                <li>Kit EscalaMED</li>
                <li>Coffee break</li>
                <li>Momentos de conexão entre os participantes</li>
              </ul>
            </article>
          </div>
        </div>

        <blockquote class="experience-quote">Você não vai apenas conhecer A Rota do Crescimento. <strong>Vai começar a construir a sua.</strong></blockquote>
      </div>
    </section>

    <section class="case-proof section" id="diferencial">
      <div class="container">
        <div class="proof-heading">
          <p class="kicker">A diferença está na operação</p>
          <h2>Não ensinamos gestão olhando uma clínica de fora.</h2>
          <p>Ensinamos a partir dos negócios que construímos — inclusive dos desafios que ainda estamos resolvendo.</p>
        </div>

        <div class="proof-bento">
          <article class="case-timeline">
            <div class="proof-card-head"><span><span style="color: rgb(244, 181, 64);">Do zero a quase R$ 1 milhão por mês,</span> com gestão aplicada ao dia a dia da clínica.</span><i aria-hidden="true"></i></div>
            <ol>
              <li class="proof-step"><span>01</span><p><strong><span style="color: rgb(244, 181, 64);">O Gargalo de cada Estágio</span></strong></br></br> Ao longo da jornada, o gargalo da empresa foi mudando. Cada novo estágio apresentava um novo desafio, e precisávamos entender o que a clínica precisava resolver naquele momento para continuar crescendo.</p></li>
              <li class="proof-step"><span>02</span><p><strong><span style="color: rgb(244, 181, 64);">Melhorar a Atração e a Conversão de Pacientes</span></strong></br></br> Em determinados momentos, precisávamos melhorar a atração de pacientes. Em outros, o foco estava em vendas e conversão. O esforço acompanhava a necessidade da operação.</p></li>
              <li class="proof-step"><span>03</span><p><strong><span style="color: rgb(244, 181, 64);">Criar Produtos e Desenvolver a Experiência</span></strong></br></br> Criamos novos produtos, trabalhamos a experiência dos pacientes e aumentamos o ticket. Essas frentes fizeram parte da construção do crescimento da clínica.</p></li>
              <li class="proof-step"><span>04</span><p><strong><span style="color: rgb(244, 181, 64);">Desenvolver Pessoas e Estruturar Processos</span></strong></br></br> Desenvolvemos pessoas, estruturamos processos e encontramos novas oportunidades de expansão. A construção aconteceu na prática, com pacientes reais, equipe real e erros e acertos reais.</p></li>
            </ol>
          </article>

          <aside class="case-meter" aria-label="Comparação do faturamento mensal da clínica">
            <div class="proof-card-head"><span>Nossa clínica em Manaus</span><i aria-hidden="true"></i></div>
            <div class="proof-metric proof-metric-high"><span>Partimos do Zero</span><strong><small>R$</small> <span data-counter data-value="0" data-format="decimal">0,00</span></strong><span class="proof-metric-bridge">E chegamos a quase</span></div>
            <div class="meter-route" aria-hidden="true"><i></i><span></span><i></i></div>
            <div class="proof-metric proof-metric-finish"><strong><small>R$</small> <span data-counter data-value="1000000" data-format="compact">0</span></strong><p class="proof-metric-caption">De faturamento por mês em aproximadamente 1 ano.</p><p class="proof-metric-note">Uma trajetória com pacientes reais, equipe real, erros e acertos reais.</p></div>
          </aside>

          <div class="proof-turn-intro">
            <h3><span>Dobrar o <strong>faturamento</strong> é o objetivo.</span><span>O caminho depende do gargalo.</span></h3>
            <p>É essa experiência prática que levamos para o EscalaMED: entender o que a sua clínica precisa resolver agora para chegar ao próximo nível.</p>
          </div>

          <article class="proof-turn">
            <blockquote>O que leva uma clínica a um patamar <strong>não necessariamente é o que a sustenta nesse patamar.</strong></blockquote>
            <div class="proof-construction">
              <p>Hoje, o desafio é buscar novamente o patamar de <strong>R$ 1 milhão por mês</strong>, mas com uma construção diferente:</p>
              <ul aria-label="Estruturas para sustentar o crescimento">
                <li>gestores</li><li>equipe</li><li>processos</li><li>comercial</li><li>indicadores</li><li>tecnologia</li><li>estratégia</li>
              </ul>
              <p><strong>Sem depender da presença diária de Fábio e Patrícia na operação.</strong></p>
              <p>Esse é o desafio atual — e não um resultado que afirmamos já ter alcançado. É justamente essa realidade que fortalece aquilo que ensinamos.</p>
            </div>
          </article>
        </div>

        <div class="operation-manifest">
          <p>Não ensinamos a partir de uma empresa perfeita.</p>
          <h3>Ensinamos a partir de empresas reais.</h3>
          <div>
            <span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>Empresas que crescem.</span>
            <span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>Que encontram gargalos.</span>
            <span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>Que precisam rever decisões.</span>
            <span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>Que testam estratégias.</span>
            <span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>Que estruturam pessoas e processos.</span>
            <span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>E que continuam buscando o próximo nível.</span>
          </div>
          <p>Porque crescer uma vez é um desafio. <strong>Construir uma empresa capaz de sustentar o crescimento é outro.</strong></p>
        </div>
      </div>
    </section>

    <section class="mentors section" id="equipe">
      <div class="container mentors-heading">
        <div>
          <p class="kicker">Quem está por trás dessa rota</p>
          <h2>Experiência clínica <span class="inline-portraits" aria-hidden="true"><img src="assets/images/img-fabio.webp" alt=""><img src="assets/images/img-patricia.webp" alt=""><img src="assets/images/img-vital.webp" alt=""><img src="assets/images/img-patricio.webp" alt=""><img src="assets/images/img-tainara.webp" alt=""></span> e visão empresarial na mesma mesa.</h2>
        </div>
        <p>Uma equipe que conhece a medicina, a operação e as decisões necessárias para transformar uma clínica em um negócio sustentável.</p>
      </div>

      <div class="container rail-toolbar">
        <p>Conheça as trajetórias</p>
        <div class="rail-controls" data-rail-controls="mentors">
          <button type="button" data-rail-prev aria-label="Ver mentor anterior" disabled><span aria-hidden="true">←</span></button>
          <button type="button" data-rail-next aria-label="Ver próximo mentor"><span aria-hidden="true">→</span></button>
        </div>
      </div>

      <div class="mentor-viewport" data-rail-viewport="mentors">
        <div class="mentor-track">
          <article class="mentor-card">
            <div class="mentor-photo mentor-photo--fabio"><img src="assets/images/img-fabio-mentor.webp" alt="Fábio Rodrigues" loading="lazy" decoding="async"></div>
            <div class="mentor-copy">
              <div><span>Cirurgia e gestão</span><h3>Fábio Rodrigues</h3><p class="mentor-role">Médico cirurgião, empresário e gestão.</p></div>
              <p>Formado em 2002, o Dr. Fábio tem duas residências, milhares de cirurgias bariátricas realizadas e cerca de oito anos de atuação como Diretor Clínico e Técnico de um grande hospital em Manaus.</p>
              <details><summary>Conheça a trajetória completa <span aria-hidden="true">+</span></summary><div><p>Buscando se libertar da dependência de plantões e hospitais, fundou em 2018 sua primeira clínica. Em 2022, lançou uma segunda clínica focada no mercado High Ticket, acelerando o faturamento do zero a R$ 1 milhão em cerca de um ano.</p><p>Hoje, suas clínicas operam com sucesso à distância, o que permitiu sua mudança para Alphaville. Ele ensina na prática a implementar processos e metodologias para que o médico conquiste a mesma previsibilidade e autonomia em sua carreira.</p></div></details>
            </div>
          </article>

          <article class="mentor-card">
            <div class="mentor-photo"><img src="assets/images/img-vital.webp" alt="Vital Araújo" loading="lazy" decoding="async"></div>
            <div class="mentor-copy">
              <div><span>Liderança médica</span><h3>Vital Araújo</h3><p class="mentor-role">Médico Empresário</p></div>
              <p>Formado muito jovem pela UFBA, tornou-se Diretor Médico de um hospital regional aos 24 anos. Especializou-se na área integrativa, ortomolecular e emagrecimento e tornou-se referência nacional.</p>
              <details><summary>Conheça a trajetória completa <span aria-hidden="true">+</span></summary><div><p>No auge do sucesso financeiro, percebeu que havia se tornado escravo do próprio consultório ao trabalhar até 15 horas por dia. Ele orienta como criar uma estrutura com gestão eficiente, processos bem definidos e liberdade de tempo.</p></div></details>
            </div>
          </article>

          <article class="mentor-card">
            <div class="mentor-photo"><img src="assets/images/img-patricia.webp" alt="Patrícia Santiago" loading="lazy" decoding="async"></div>
            <div class="mentor-copy">
              <div><span>Gestão à distância</span><h3>Patrícia Santiago</h3><p class="mentor-role">Médica, Empresária e Case de Sucesso em Gestão à Distância</p></div>
              <p>A Dra. Patrícia viveu durante anos a exaustão dos plantões e a falta de tempo com a família. A virada aconteceu ao compreender que precisava mudar sua mentalidade de médica técnica para gestora.</p>
              <details><summary>Conheça a trajetória completa <span aria-hidden="true">+</span></summary><div><p>De uma única unidade, expandiu os negócios para três clínicas de sucesso. Duas dessas clínicas funcionam em Manaus com gestão 100% à distância, enquanto ela reside em São Paulo. Como ela mesma define, é uma “sócia e case real do método”.</p><p>Seu foco é ensinar como transformar o consultório ou clínica em uma estrutura profissional sustentável, com liberdade geográfica, financeira e tempo de qualidade com a família.</p></div></details>
            </div>
          </article>

          <article class="mentor-card">
            <div class="mentor-photo"><img src="assets/images/img-patricio.webp" alt="Patrício Darvisson" loading="lazy" decoding="async"></div>
            <div class="mentor-copy">
              <div><span>Estratégia de negócios</span><h3>Patrício Darvisson</h3><p class="mentor-role">Estrategista de Negócios e Especialista em Crescimento Exponencial</p></div>
              <p>Empresário há 20 anos, especialista em Marketing e estrategista de negócios com experiência no comando e estruturação de mais de 30 empresas.</p>
              <details><summary>Conheça a trajetória completa <span aria-hidden="true">+</span></summary><div><p>Sua experiência engloba desde a reestruturação até o planejamento estratégico focado em crescimento exponencial. Traz a visão de mercado empresarial para ensinar aos médicos como definir e atrair seus clientes ideais, criar posicionamento e implementar um planejamento estratégico sólido.</p></div></details>
            </div>
          </article>

          <article class="mentor-card">
            <div class="mentor-photo"><img src="assets/images/img-tainara.webp" alt="Tainara Carvalho" loading="lazy" decoding="async"></div>
            <div class="mentor-copy">
              <div><span>Medicina particular</span><h3>Tainara Carvalho</h3><p class="mentor-role">Médica Dermatologista, Empresária e Co-idealizadora da X5 Med</p></div>
              <p>Formada em Medicina pela UFBA, foi a primeira médica de sua família. Atua no mercado particular na área de Dermatologia.</p>
              <details><summary>Conheça a trajetória completa <span aria-hidden="true">+</span></summary><div><p>Enfrentou de perto os desafios do mercado tradicional: o cansaço dos plantões, a perda de momentos em família e a dificuldade inicial de atrair e fidelizar clientes particulares. A Dra. Tainara virou a chave para o modelo de médico empresário.</p><p>Seu propósito dentro da mentoria é gerar transformação, levando prosperidade e paz para a carreira e para a família dos médicos participantes.</p></div></details>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="authority section" id="autoridade">
      <div class="container">
        <div class="authority-intro">
          <p class="kicker">Autoridade construída na prática</p>
          <h2>A X5 MED está no mercado há mais de dois anos.</h2>
          <p class="authority-volume">Nesse período, mais de 100 médicos já passaram pela mentoria.</p>
          <p>Aplicando Mentalidade Empresarial, Atração, Conversão e Expansão em diferentes momentos dos seus negócios.</p>
        </div>

        <div class="authority-stats">
          <div class="authority-stat"><strong data-counter data-value="2" data-suffix="+">0</strong><span>anos de mercado</span></div>
          <div class="authority-stat"><strong data-counter data-value="100" data-suffix="+">0</strong><span>médicos mentorados</span></div>
          <div class="authority-stat"><strong data-counter data-value="4">0</strong><span>pilares aplicados</span></div>
        </div>

        <div class="testimonials-heading">
          <div><p class="kicker">Experiências de quem já passou pela rota</p><h3>Resultados contados por quem viveu o processo.</h3></div>
        </div>

        <article class="featured-testimonial">
          <div class="featured-testimonial-media">
            <button class="video-poster featured-video-poster" type="button" data-youtube-id="Czgzqz6gcAE" data-player-title="Depoimento de Meuze" aria-label="Reproduzir depoimento de Meuze">
              <img src="assets/images/capa-meuze.webp" alt="" loading="lazy">
              <i aria-hidden="true"></i>
            </button>
          </div>
          <blockquote>Meuze faturava <strong>R$ 100 mil</strong> e, há pouco menos de 1 ano, já fatura <em>R$ meio milhão</em></blockquote>
        </article>

        <div class="rail-controls testimonials-controls" data-rail-controls="testimonials">
          <button type="button" data-rail-prev aria-label="Ver depoimento anterior" disabled><span aria-hidden="true">←</span></button>
          <button type="button" data-rail-next aria-label="Ver próximo depoimento"><span aria-hidden="true">→</span></button>
        </div>

        <div class="video-viewport" data-rail-viewport="testimonials" aria-label="Depoimentos em vídeo">
          <div class="video-track">
            <article class="video-slide"><button class="video-poster" type="button" data-youtube-id="9cqVBgDa4Ts" aria-label="Reproduzir depoimento em vídeo 1"><img src="https://i.ytimg.com/vi/9cqVBgDa4Ts/hqdefault.jpg" alt="" loading="lazy"><span>01</span><i aria-hidden="true"></i></button></article>
            <article class="video-slide"><button class="video-poster" type="button" data-youtube-id="kzQYiqI-Mgk" aria-label="Reproduzir depoimento em vídeo 2"><img src="https://i.ytimg.com/vi/kzQYiqI-Mgk/hqdefault.jpg" alt="" loading="lazy"><span>02</span><i aria-hidden="true"></i></button></article>
            <article class="video-slide"><button class="video-poster" type="button" data-youtube-id="AkDm_335A-k" aria-label="Reproduzir depoimento em vídeo 3"><img src="https://i.ytimg.com/vi/AkDm_335A-k/hqdefault.jpg" alt="" loading="lazy"><span>03</span><i aria-hidden="true"></i></button></article>
            <article class="video-slide"><button class="video-poster" type="button" data-youtube-id="EfMUFEvG6HI" aria-label="Reproduzir depoimento em vídeo 4"><img src="https://i.ytimg.com/vi/EfMUFEvG6HI/hqdefault.jpg" alt="" loading="lazy"><span>04</span><i aria-hidden="true"></i></button></article>
            <article class="video-slide"><button class="video-poster" type="button" data-youtube-id="Jg8fEQ_QVjg" aria-label="Reproduzir depoimento em vídeo 5"><img src="https://i.ytimg.com/vi/Jg8fEQ_QVjg/hqdefault.jpg" alt="" loading="lazy"><span>05</span><i aria-hidden="true"></i></button></article>
            <article class="video-slide"><button class="video-poster" type="button" data-youtube-id="CX1jZ8qTgp4" aria-label="Reproduzir depoimento em vídeo 6"><img src="https://i.ytimg.com/vi/CX1jZ8qTgp4/hqdefault.jpg" alt="" loading="lazy"><span>06</span><i aria-hidden="true"></i></button></article>
            <article class="video-slide"><button class="video-poster" type="button" data-youtube-id="TqBVrGRPStc" aria-label="Reproduzir depoimento em vídeo 7"><img src="https://i.ytimg.com/vi/TqBVrGRPStc/hqdefault.jpg" alt="" loading="lazy"><span>07</span><i aria-hidden="true"></i></button></article>
          </div>
        </div>

        <h2 class="authority-close" data-authority-scrub>O palco não é de onde vem nossa autoridade. <strong>A operação é.</strong></h2>
      </div>
    </section>

    <section class="chapter-cta" id="proximo-capitulo">
      <div class="container chapter-cta-inner">
        <p class="kicker">Primeiro, o diagnóstico. Depois, a rota.</p>
        <h2>Dobrar o faturamento é o objetivo. O caminho depende do gargalo.</h2>
        <p>Essa é a tese central do EscalaMED — A Rota do Crescimento.</p>
        <a class="button" href="https://formulario-escalamed.x5med.com.br/">Quero garantir minha vaga</a>
      </div>
    </section>

    <section class="application section" id="inscricao">
      <div class="application-glow" aria-hidden="true"></div>
      <div class="container application-grid">
        <div class="application-copy">
          <p class="kicker">Candidatura EscalaMED</p>
          <h2>Candidate-se para uma <em>Vaga Exclusiva</em></h2>
        </div>
        <aside class="application-panel" aria-label="Processo de candidatura">
          <p class="application-kicker">Convite exclusivo e intransferível</p>
          <p>Como o número de vagas é altamente limitado e há outros candidatos concorrendo, sua aplicação passará por uma análise criteriosa da nossa equipe.</p>
          <p>Caso o seu perfil seja aprovado, você receberá um convite exclusivo e intransferível para ter acesso à oportunidade.</p>
          <p>Buscamos pessoas comprometidas e dispostas a aproveitar ao máximo esse privilégio.</p>
          <div class="application-capacity"><span>100</span><p>cadeiras presenciais<br>em Alphaville</p></div>
          <a class="button button-wide" href="https://formulario-escalamed.x5med.com.br/">Garantir minha vaga</a>
        </aside>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <a class="brand" href="#topo" aria-label="Voltar ao topo"><img src="assets/images/logo.svg" alt="EscalaMED por X5 MED"></a>
      <span>© 2026 X5 MED</span>
    </div>
  </footer>
`;
