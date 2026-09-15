// The application, in three languages.
//
// One template (build.mjs) renders this into /index.html, /es/index.html and
// /zh/index.html — three real pages with their own <html lang> and hreflang,
// rather than one page that swaps text in the browser. The reader here is
// likely to be an ATS filter or a Hermes agent before it is a person, and a
// JavaScript translation is invisible to both.
//
// English (British) is the source. Spanish is peninsular and avoids
// anglicisms. Chinese is Simplified. Facts must match across all three.

export const langs = [
  { code: 'en', label: 'EN', name: 'English', html: 'en-GB', dir: '' },
  { code: 'es', label: 'ES', name: 'Español', html: 'es-ES', dir: 'es/' },
  { code: 'zh', label: '中文', name: '简体中文', html: 'zh-Hans', dir: 'zh/' }
];

export const links = {
  portfolio: 'https://javierponz.technoir.cloud/?skin=omarchy',
  projects: 'https://javierponz.technoir.cloud/?skin=omarchy#projects',
  cv: 'https://javierponz.technoir.cloud/javier-ponz-prado-cv.pdf',
  github: 'https://github.com/ponzgpt',
  linkedin: 'https://www.linkedin.com/in/javierponz',
  email: 'nerion89@gmail.com',
  memento: 'https://memento.technoir.cloud/',
  mementoSrc: 'https://github.com/ponzgpt/memento-mori',
  pkm: 'https://github.com/ponzgpt/hermes-pkm-toolkit',
  zeroth: 'https://github.com/ponzgpt/0th-hermes',
  hermes: 'https://hermes-agent.nousresearch.com/',
  careers: 'https://nousresearch.com/careers/'
};

const A = (href, text) => `<a href="${href}">${text}</a>`;

export const content = {
  /* ═══════════════════════════════════════════════════════════ ENGLISH ══ */
  en: {
    title: 'Javier Ponz — application to Nous Research',
    desc: 'Open application to Nous Research from Javier Ponz: ten years of Apple technical support, hands-on agent operations with Hermes Agent and MCP, and an honest early-career path toward Forward Deployed Engineer.',
    ogDesc: 'Ten years helping people make difficult technology work, now applied to open agents, tools and systems — an early-career path toward forward-deployed engineering.',
    portfolio: 'Portfolio',
    langLabel: 'Language',
    nav: ['Person', 'Work', 'Proof', 'Fit', 'Gap', 'Logistics'],
    block: 'Application',
    tagline: 'Technical support, agent operations and a forward-deployed path',
    portraitAlt: 'Pencil-sketch portrait of Javier Ponz',
    opening: [
      'I have spent ten years helping people make difficult technology work.',
      'At Apple Retail, that meant diagnosing the problem behind the symptom, translating between technical systems and human needs, and staying with the case until the person in front of me had a working next step.',
      'I am now applying that same discipline to open agents, tools and systems that people can actually use. I am building toward forward-deployed engineering at Nous — honestly, from the support side first.'
    ],
    status: 'Aberdeen, Scotland · open to remote work, travel and relocation · available immediately',

    person: { label: '01 / The person', head: 'Who I am', paras: [
      `I am ${A(links.portfolio, 'Javier Ponz')}: an ex-Apple Genius from Madrid, now learning and building AI from Aberdeen.`,
      'Between 2014 and 2024 I worked across Apple Retail Spain as a Specialist, a Technical Specialist and, for six and a half years, a Genius, with a spell as a remote AppleCare Support Advisor during COVID. Most of that time was hands-on diagnosis: difficult cases, incomplete information and people with very different levels of technical confidence.',
      'Twice I stepped away from the bench for a seven-month In-Store Experience Lead secondment. Planning, resourcing, events and the situations that fit no procedure taught me the principle I still use: leading is serving. The job is not to be the cleverest person in the room. It is to make the room work.'
    ] },

    work: { label: '02 / The work', head: 'What I bring', blocks: [
      { title: 'Technical diagnosis', body: 'Find the fault, separate symptom from cause, write down what has been checked, and keep going until the problem is useful again.' },
      { title: 'Translation and adoption', body: 'Explain the system in terms the person can act on. Technical work is not finished when the engineer understands it; it is finished when the other person can use it.' },
      { title: 'Agent operations', body: `I work hands-on with ${A(links.hermes, 'Hermes Agent')}, MCP, skills, workflows, Docker and small tools. I give agents explicit context and permissions, let them do the work, and verify what comes back.` }
    ],
      calibration: 'I am not presenting this as five years of production software engineering. It is a deliberate engineering transition built on ten years of technical support, operating discipline and customer-facing problem solving.' },

    proof: { label: '03 / The proof', head: 'Built and shipped',
      intro: 'The fastest way to understand how I work is to inspect the work.',
      projects: [
        { name: 'Memento Mori', tag: 'Written and deployed by me',
          body: 'A small web product shipped to its own domain. Privacy-first by design — no accounts, no analytics — built in plain HTML, CSS and ES modules, and deployed with Docker, Nginx and Traefik behind release checks. The point was never to make the app look bigger than it is. It was to take a bounded idea all the way to a verified deployment.',
          links: [[links.memento, 'Live site'], [links.mementoSrc, 'Source']] },
        { name: 'Hermes PKM Toolkit', tag: 'Specified by me · written with an agent',
          body: 'MCP tools and agent skills for working safely with local Markdown vaults. The filesystem layer has path-traversal protection and tests, because an agent with access to files needs a boundary it can explain.',
          links: [[links.pkm, 'Source']] },
        { name: '0TH Hermes', tag: 'Specified by me · written with an agent',
          body: 'An opinionated onboarding path for Hermes Agent. It cuts the first hour of confusion by choosing a next step, reading the machine and making the setup problem concrete.',
          links: [[links.zeroth, 'Source']] }
      ],
      note: `The ${A(links.projects, 'portfolio')} labels what I specified, wrote, deployed or built with an agent. I would rather show the boundary than blur it.` },

    fit: { label: '04 / The fit', head: 'Why Nous', paras: [
      'Nous is working on the part of AI I want to help make practical: open intelligence that does not stay locked behind a closed product surface.',
      'Hermes and MCP make capability inspectable. A skill can be a Markdown file. A tool can be a server someone can read. That matters because the person using a system should be able to understand, shape and repair more of it.',
      'The FDE role sits where my background is strongest and where my engineering depth is still growing: between a powerful system, a messy environment and the person who needs the system to work. I bring the diagnosis, translation, persistence and customer contact now. I am building the deeper deployment and engineering layer deliberately.'
    ],
      mapLead: 'Against the published role',
      map: [
        ['Customer conversations', 'Ten years of technical support and consultative service'],
        ['Ambiguous failures', 'Genius diagnosis under pressure'],
        ['Implementation discipline', 'Documented checks, release gates and bounded deployments'],
        ['Agent systems', 'Hermes, MCP, skills, workflows and daily operation'],
        ['Engineering depth', 'Being built through AI and Full Stack study and shipped projects']
      ] },

    gap: { label: '05 / The gap', head: 'Where I am still learning', paras: [
      'The gap is specific, and I would rather name it once.',
      'I am still building depth in backend engineering, cloud and hybrid deployment, APIs and authentication, observability, networking and the infrastructure around production agents. I have not spent five years shipping enterprise software, and I will not write as if I have.',
      'What I do have is a decade of hands-on technical support, a habit of finding the fault instead of performing confidence, and the willingness to learn in the environment where the system has to work. I am asking for the chance to close the gap in the direction of Forward Deployed Engineer — not asking you to pretend it is already closed.'
    ],
      study: 'Studying · AI and Full Stack development · Universidad Rey Juan Carlos via Racks Academy · in progress',
      more: `The wider learning log is on the ${A(links.portfolio, 'portfolio')}.` },

    logistics: { label: '06 / The logistics', head: 'Based, available, reachable',
      para: 'I am based in Aberdeen, Scotland, work comfortably across UK and European time zones, can travel when being in the room matters, and would consider relocation for the right fit. I have no notice period and can start immediately.' },

    contact: { label: 'Contact', head: 'The next step', paras: [
      'If the support foundation and the engineering trajectory look useful, I would like to talk about the gap between them.',
      'Tell me what would make me obviously useful to Nous in the first 90 days. I would rather close a specific gap than guess at one.'
    ],
      items: ['Email', 'CV', 'Portfolio', 'Projects', 'GitHub', 'LinkedIn'] },

    footer: 'A personal page on my own domain. Not affiliated with or endorsed by Nous Research. Hermes Agent is built by Nous Research; I use it and build around it.'
  },

  /* ═══════════════════════════════════════════════════════════ ESPAÑOL ══ */
  es: {
    title: 'Javier Ponz — candidatura a Nous Research',
    desc: 'Candidatura abierta a Nous Research de Javier Ponz: diez años de soporte técnico en Apple, operación práctica de agentes con Hermes Agent y MCP, y un camino honesto, desde el inicio, hacia Forward Deployed Engineer.',
    ogDesc: 'Diez años ayudando a que la tecnología difícil funcione para la gente, aplicados ahora a agentes, herramientas y sistemas abiertos: un camino hacia la ingeniería desplegada en cliente.',
    portfolio: 'Portafolio',
    langLabel: 'Idioma',
    nav: ['Persona', 'Trabajo', 'Pruebas', 'Encaje', 'Distancia', 'Logística'],
    block: 'Candidatura',
    tagline: 'Soporte técnico, operación de agentes y un camino hacia la ingeniería desplegada en cliente',
    portraitAlt: 'Retrato a lápiz de Javier Ponz',
    opening: [
      'Llevo diez años ayudando a que la tecnología difícil funcione para la gente.',
      'En Apple Retail eso significaba diagnosticar el problema que había detrás del síntoma, traducir entre los sistemas técnicos y las necesidades de las personas, y no soltar el caso hasta que quien tenía delante se iba con un siguiente paso que funcionara.',
      'Ahora aplico esa misma disciplina a agentes, herramientas y sistemas abiertos que la gente pueda usar de verdad. Me estoy preparando para la ingeniería desplegada en cliente en Nous; con honestidad, empezando por el lado del soporte.'
    ],
    status: 'Aberdeen, Escocia · abierto a remoto, viajes y mudanza · disponible de inmediato',

    person: { label: '01 / La persona', head: 'Quién soy', paras: [
      `Soy ${A(links.portfolio, 'Javier Ponz')}: ex-Genius de Apple, de Madrid, ahora aprendiendo y construyendo IA desde Aberdeen.`,
      'Entre 2014 y 2024 trabajé en Apple Retail España como Specialist, Technical Specialist y, durante seis años y medio, Genius, con una etapa en remoto como AppleCare Support Advisor durante la COVID. Casi todo ese tiempo fue diagnóstico directo: casos difíciles, información incompleta y personas con niveles de confianza técnica muy distintos.',
      'Dos veces dejé el banco de trabajo para una comisión de siete meses como In-Store Experience Lead. La planificación, los recursos, los eventos y las situaciones que no encajan en ningún procedimiento me dejaron el principio que sigo usando: liderar es servir. El trabajo no consiste en ser la persona más lista de la sala, sino en hacer que la sala funcione.'
    ] },

    work: { label: '02 / El trabajo', head: 'Qué aporto', blocks: [
      { title: 'Diagnóstico técnico', body: 'Encontrar la avería, separar el síntoma de la causa, dejar por escrito lo que ya se ha comprobado y seguir hasta que el problema vuelva a ser útil.' },
      { title: 'Traducción y adopción', body: 'Explicar el sistema en términos con los que la persona pueda actuar. El trabajo técnico no termina cuando lo entiende el ingeniero; termina cuando la otra persona puede usarlo.' },
      { title: 'Operación de agentes', body: `Trabajo a diario con ${A(links.hermes, 'Hermes Agent')}, MCP, habilidades, flujos de trabajo, Docker y herramientas pequeñas. Doy a los agentes contexto y permisos explícitos, les dejo hacer el trabajo y compruebo lo que devuelven.` }
    ],
      calibration: 'No presento esto como cinco años de ingeniería de software en producción. Es una transición deliberada hacia la ingeniería, construida sobre diez años de soporte técnico, disciplina operativa y resolución de problemas cara al cliente.' },

    proof: { label: '03 / Las pruebas', head: 'Construido y publicado',
      intro: 'La forma más rápida de entender cómo trabajo es revisar el trabajo.',
      projects: [
        { name: 'Memento Mori', tag: 'Escrito y desplegado por mí',
          body: 'Un producto web pequeño publicado en su propio dominio. Privado por diseño —sin cuentas ni analítica—, hecho con HTML, CSS y módulos ES sin marco, y desplegado con Docker, Nginx y Traefik tras comprobaciones de publicación. La idea nunca fue que la aplicación pareciera más grande de lo que es, sino llevar una idea acotada hasta un despliegue verificado.',
          links: [[links.memento, 'Sitio'], [links.mementoSrc, 'Código']] },
        { name: 'Hermes PKM Toolkit', tag: 'Especificado por mí · escrito con un agente',
          body: 'Herramientas MCP y habilidades de agente para trabajar con seguridad sobre bóvedas locales de Markdown. La capa de ficheros tiene protección contra recorrido de rutas y pruebas, porque un agente con acceso a ficheros necesita un límite que pueda explicar.',
          links: [[links.pkm, 'Código']] },
        { name: '0TH Hermes', tag: 'Especificado por mí · escrito con un agente',
          body: 'Un camino de incorporación con criterio propio para Hermes Agent. Recorta la primera hora de confusión eligiendo el siguiente paso, leyendo la máquina y concretando el problema de instalación.',
          links: [[links.zeroth, 'Código']] }
      ],
      note: `El ${A(links.projects, 'portafolio')} indica qué especifiqué, escribí, desplegué o construí con un agente. Prefiero enseñar el límite que difuminarlo.` },

    fit: { label: '04 / El encaje', head: 'Por qué Nous', paras: [
      'Nous trabaja en la parte de la IA que quiero ayudar a hacer práctica: inteligencia abierta que no se queda encerrada tras la superficie de un producto cerrado.',
      'Hermes y MCP hacen que la capacidad se pueda inspeccionar. Una habilidad puede ser un fichero Markdown. Una herramienta puede ser un servidor que cualquiera puede leer. Eso importa porque quien usa un sistema debería poder entender, moldear y reparar una parte mayor de él.',
      'El puesto de FDE está justo donde mi experiencia es más sólida y donde mi base de ingeniería sigue creciendo: entre un sistema potente, un entorno desordenado y la persona que necesita que el sistema funcione. Hoy aporto el diagnóstico, la traducción, la constancia y el trato con el cliente. La capa más profunda de despliegue e ingeniería la estoy construyendo a propósito.'
    ],
      mapLead: 'Frente al puesto publicado',
      map: [
        ['Conversaciones con clientes', 'Diez años de soporte técnico y atención consultiva'],
        ['Fallos ambiguos', 'Diagnóstico de Genius bajo presión'],
        ['Disciplina de implantación', 'Comprobaciones documentadas, controles de publicación y despliegues acotados'],
        ['Sistemas de agentes', 'Hermes, MCP, habilidades, flujos de trabajo y uso diario'],
        ['Profundidad de ingeniería', 'En construcción, con estudios de IA y Full Stack y proyectos publicados']
      ] },

    gap: { label: '05 / La distancia', head: 'Dónde sigo aprendiendo', paras: [
      'La distancia es concreta, y prefiero nombrarla una sola vez.',
      'Sigo ganando profundidad en ingeniería de backend, despliegue en nube e híbrido, APIs y autenticación, observabilidad, redes y la infraestructura que rodea a los agentes en producción. No llevo cinco años entregando software empresarial, y no voy a escribir como si así fuera.',
      'Lo que sí tengo es una década de soporte técnico directo, la costumbre de buscar la avería en lugar de aparentar seguridad, y las ganas de aprender en el entorno donde el sistema tiene que funcionar. Pido la oportunidad de cerrar esa distancia en dirección a Forward Deployed Engineer, no que finjáis que ya está cerrada.'
    ],
      study: 'Estudiando · IA y desarrollo Full Stack · Universidad Rey Juan Carlos a través de Racks Academy · en curso',
      more: `El registro completo de aprendizaje está en el ${A(links.portfolio, 'portafolio')}.` },

    logistics: { label: '06 / La logística', head: 'Base, disponibilidad y contacto',
      para: 'Vivo en Aberdeen, Escocia; trabajo sin problema en los husos horarios del Reino Unido y de Europa, puedo viajar cuando estar presente importa y valoraría una mudanza si el encaje es el adecuado. No tengo preaviso y puedo empezar de inmediato.' },

    contact: { label: 'Contacto', head: 'El siguiente paso', paras: [
      'Si la base de soporte y la trayectoria de ingeniería os parecen útiles, me gustaría hablar de la distancia que hay entre ambas.',
      'Decidme qué haría que fuera claramente útil para Nous en los primeros 90 días. Prefiero cerrar una distancia concreta que adivinar cuál es.'
    ],
      items: ['Correo', 'CV', 'Portafolio', 'Proyectos', 'GitHub', 'LinkedIn'] },

    footer: 'Página personal en mi propio dominio. Sin afiliación ni respaldo de Nous Research. Hermes Agent es obra de Nous Research; yo lo uso y construyo a su alrededor.'
  },

  /* ══════════════════════════════════════════════════════════════ 中文 ══ */
  zh: {
    title: 'Javier Ponz — 致 Nous Research 的求职申请',
    desc: 'Javier Ponz 致 Nous Research 的公开求职：在 Apple 十年的技术支持经验，使用 Hermes Agent 与 MCP 的实际智能体运维，以及一条如实的、从初级起步通往前置部署工程师（FDE）的路径。',
    ogDesc: '十年帮助人们让复杂的技术真正运转起来，如今把这份能力用在开放的智能体、工具与系统上——一条通往前置部署工程的初级路径。',
    portfolio: '作品集',
    langLabel: '语言',
    nav: ['其人', '能力', '证据', '契合', '差距', '安排'],
    block: '求职申请',
    tagline: '技术支持、智能体运维，以及一条通往前置部署工程的路径',
    portraitAlt: 'Javier Ponz 的铅笔素描肖像',
    opening: [
      '过去十年，我一直在帮助人们让复杂的技术真正运转起来。',
      '在 Apple Retail，这意味着找出症状背后的问题，在技术系统与人的需求之间做翻译，并且一直跟进，直到面前的人拿到一个可行的下一步。',
      '现在，我把同样的方法用在人们真正能用上的开放智能体、工具与系统上。我正朝着在 Nous 从事前置部署工程的方向努力——坦白说，先从支持这一端做起。'
    ],
    status: '苏格兰阿伯丁 · 接受远程、出差与搬迁 · 可立即到岗',

    person: { label: '01 / 其人', head: '我是谁', paras: [
      `我是 ${A(links.portfolio, 'Javier Ponz')}：来自马德里的前 Apple Genius，现在在阿伯丁学习并构建 AI。`,
      '2014 年至 2024 年，我在 Apple Retail 西班牙先后担任 Specialist、Technical Specialist，以及六年半的 Genius；新冠期间还曾远程担任 AppleCare Support Advisor。其中大部分时间都在一线做诊断：棘手的案例、不完整的信息，以及技术自信程度差异很大的人。',
      '我曾两次离开维修台，各以七个月的借调担任 In-Store Experience Lead。规划、排班、活动，以及那些不符合任何流程的状况，让我得出一个至今仍在用的原则：领导即服务。这份工作不是要做房间里最聪明的人，而是让整个房间运转起来。'
    ] },

    work: { label: '02 / 能力', head: '我能带来什么', blocks: [
      { title: '技术诊断', body: '找到真正的故障，区分症状与原因，把已经检查过的内容记录下来，一直做到问题重新变得可用。' },
      { title: '翻译与落地', body: '用对方能据此行动的语言解释系统。技术工作不是在工程师弄懂时结束，而是在对方能用起来时才算完成。' },
      { title: '智能体运维', body: `我日常实际使用 ${A(links.hermes, 'Hermes Agent')}、MCP、技能、工作流、Docker 和各种小工具。我给智能体明确的上下文与权限，让它们去做事，再核验它们交回的结果。` }
    ],
      calibration: '我并不把这些说成五年的生产级软件工程经验。这是一次有意识的工程转型，建立在十年技术支持、运营纪律与面向客户解决问题的基础之上。' },

    proof: { label: '03 / 证据', head: '已构建并上线',
      intro: '想了解我怎么做事，最快的办法是直接检查我做过的东西。',
      projects: [
        { name: 'Memento Mori', tag: '由我编写并部署',
          body: '一个部署在独立域名上的小型 Web 产品。从设计上注重隐私——没有账户，没有统计分析——用纯 HTML、CSS 和 ES 模块构建，通过 Docker、Nginx 和 Traefik 部署，并有发布前检查。目的从来不是让它显得比实际更大，而是把一个边界清晰的想法完整地做到经过验证的上线。',
          links: [[links.memento, '网站'], [links.mementoSrc, '源代码']] },
        { name: 'Hermes PKM Toolkit', tag: '由我制定规格 · 借助智能体编写',
          body: '用于安全操作本地 Markdown 知识库的 MCP 工具与智能体技能。文件系统层带有路径穿越防护和测试，因为能访问文件的智能体需要一条它能解释清楚的边界。',
          links: [[links.pkm, '源代码']] },
        { name: '0TH Hermes', tag: '由我制定规格 · 借助智能体编写',
          body: '一条有明确取舍的 Hermes Agent 上手路径。它通过选定下一步、读取机器状态、把安装问题具体化，来减少第一个小时里的困惑。',
          links: [[links.zeroth, '源代码']] }
      ],
      note: `${A(links.projects, '作品集')}里标明了哪些是我制定规格、亲自编写、负责部署，或借助智能体构建的。我宁愿把边界亮出来，也不愿把它模糊掉。` },

    fit: { label: '04 / 契合', head: '为什么是 Nous', paras: [
      'Nous 正在做的，正是我想帮忙落到实处的那部分 AI：不被锁在封闭产品界面之后的开放智能。',
      'Hermes 与 MCP 让能力变得可以检视。一个技能可以是一个 Markdown 文件，一个工具可以是任何人都能读懂的服务。这很重要，因为使用系统的人应该能够理解、塑造并修复其中更多的部分。',
      'FDE 这个岗位，恰好处在我背景最扎实、而工程深度仍在成长的地方：在一个强大的系统、一个复杂混乱的环境，以及需要系统跑起来的那个人之间。诊断、翻译、韧性与客户沟通，我现在就能带来；更深的部署与工程层面，我正在有计划地补上。'
    ],
      mapLead: '对照已发布的岗位',
      map: [
        ['客户沟通', '十年技术支持与顾问式服务'],
        ['含糊不清的故障', '在压力下完成 Genius 级别的诊断'],
        ['实施纪律', '有记录的检查、发布关卡与边界清晰的部署'],
        ['智能体系统', 'Hermes、MCP、技能、工作流与日常运维'],
        ['工程深度', '正在通过 AI 与全栈学习以及已上线项目积累']
      ] },

    gap: { label: '05 / 差距', head: '我仍在学习的地方', paras: [
      '差距是具体的，我宁愿只说一次、说清楚。',
      '我仍在加深以下方面的能力：后端工程、云与混合部署、API 与身份认证、可观测性、网络，以及生产环境中智能体周边的基础设施。我没有五年交付企业软件的经历，也不会写得好像我有。',
      '我拥有的是十年一线技术支持经验、找出故障而不是装作胸有成竹的习惯，以及在系统必须运转的环境里学习的意愿。我申请的是朝着前置部署工程师方向缩小差距的机会——而不是请你们假装差距已经不存在。'
    ],
      study: '在读 · AI 与全栈开发 · 胡安·卡洛斯国王大学（经由 Racks Academy）· 进行中',
      more: `更完整的学习记录见${A(links.portfolio, '作品集')}。` },

    logistics: { label: '06 / 安排', head: '所在地、到岗与联系方式',
      para: '我住在苏格兰阿伯丁，可以轻松配合英国与欧洲时区工作；在需要到场时可以出差，遇到合适的机会也会考虑搬迁。我没有离职通知期，可以立即入职。' },

    contact: { label: '联系', head: '下一步', paras: [
      '如果你们觉得这份支持方面的基础和工程上的发展方向有价值，我很想聊聊两者之间的差距。',
      '请告诉我，怎样才能在前 90 天里明显地对 Nous 有用。我宁愿去补一个具体的差距，也不愿去猜它在哪里。'
    ],
      items: ['邮箱', '简历', '作品集', '项目', 'GitHub', 'LinkedIn'] },

    footer: '这是我在自己域名上的个人页面，与 Nous Research 无隶属关系，也未获其认可。Hermes Agent 由 Nous Research 开发；我是它的使用者，并围绕它构建工具。'
  }
};
