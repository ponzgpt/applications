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
// Keep sentences short — this is read out loud in your head, not skimmed.

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

const U = (s) => `<span class="u">${s}</span>`;

export const content = {
  /* ═══════════════════════════════════════════════════════════ ENGLISH ══ */
  en: {
    title: 'Javier Ponz — application to Nous Research',
    desc: 'Open application to Nous Research from Javier Ponz: ten years of Apple technical support, hands-on agent operations with Hermes Agent and MCP, and an honest early-career path toward Forward Deployed Engineer.',
    ogDesc: 'Ten years helping people make difficult technology work, now applied to open agents — an early-career path toward forward-deployed engineering.',
    home: 'Javier Ponz',
    portfolio: 'Portfolio',
    langLabel: 'Language',
    nav: ['Person', 'Work', 'Proof', 'Fit', 'Gap', 'Logistics'],
    block: 'APPLICATION',
    portraitAlt: 'Pencil-sketch portrait of Javier Ponz',
    status: 'Aberdeen, Scotland · open to remote, travel and relocation · available now',
    opening: [
      `I have spent ten years helping people make difficult technology work.`,
      `At Apple Retail, that meant diagnosing the problem behind the symptom, translating between technical systems and human needs, and staying with the case until the person in front of me had a working next step.`,
      `I am now doing the same for open agents and the tools around them, and building toward forward-deployed engineering at Nous — from the support side first.`
    ],

    person: { head: 'Person', sub: '— who I am', paras: [
      `I am <a class="u" href="${links.portfolio}">Javier Ponz</a>: an ex-Apple Genius from Madrid, now learning and building AI from Aberdeen.`,
      `Between 2014 and 2024 I worked across Apple Retail Spain as a Specialist, a Technical Specialist and, for six and a half years, a Genius, with a spell as a remote AppleCare Support Advisor during COVID. Most of it was hands-on diagnosis: difficult cases, incomplete information, people with very different levels of technical confidence.`,
      `Twice I left the bench for a seven-month In-Store Experience Lead secondment. Planning, resourcing, the situations that fit no procedure — both taught me the same thing: ${U('leading is serving')}. Not being the cleverest person in the room. Making the room work.`
    ] },

    work: { head: 'Work', sub: '— what I bring', calibration:
      `Not five years of production engineering. A transition built on ten years of support, operating discipline and customer-facing problem solving.`,
      items: [
        { badge: 'Diagnosis', title: 'Find the fault', body: `Separate symptom from cause, document what has been checked, keep going until the thing works again.` },
        { badge: 'Translation', title: 'Make it usable', body: `Explain the system in terms the other person can act on. Done when they can use it, not when I understand it.` },
        { badge: 'Agents', title: 'Run them daily', body: `Hands-on with <a class="u" href="${links.hermes}">Hermes Agent</a>, MCP, skills and Docker. Explicit context and permissions, then verify what comes back.` }
      ] },

    proof: { head: 'Proof', sub: '— built and shipped', intro: `Inspect the work rather than take my word for it.`,
      items: [
        { badge: 'Shipped solo', title: 'Memento Mori', body: `Privacy-first web product — no accounts, no analytics. Plain HTML, CSS and ES modules; Docker, Nginx and Traefik behind release checks.`,
          links: [[links.memento, 'Live'], [links.mementoSrc, 'Source']] },
        { badge: 'Specified · agent-built', title: 'Hermes PKM Toolkit', body: `MCP tools for local Markdown vaults. Path-traversal protection and tests, because file access needs a boundary I can explain.`,
          links: [[links.pkm, 'Source']] },
        { badge: 'Specified · agent-built', title: '0TH Hermes', body: `An onboarding path for Hermes Agent that cuts the first hour of confusion to one concrete next step.`,
          links: [[links.zeroth, 'Source']] }
      ],
      note: `The <a class="u" href="${links.projects}">portfolio</a> labels what I wrote, deployed or built with an agent. I would rather show the line than blur it.` },

    fit: { head: 'Fit', sub: '— why Nous', paras: [
      `Nous works on the part of AI I want to help make practical: open intelligence that doesn't stay locked behind a closed surface.`,
      `Hermes and MCP make capability inspectable — a skill can be a Markdown file, a tool a server someone can actually read.`,
      `The FDE role sits between a powerful system, a messy environment and the person who needs it to work. I bring the diagnosis, the translation and the customer contact now. The deployment and engineering depth, I'm building deliberately.`
    ],
      map: [
        ['Customer conversations', 'ten years of technical support'],
        ['Ambiguous failures', 'Genius diagnosis under pressure'],
        ['Implementation discipline', 'documented checks and bounded deployments'],
        ['Agent systems', 'Hermes, MCP, skills, daily use'],
        ['Engineering depth', 'being built — study plus shipped projects']
      ] },

    gap: { head: 'Gap', sub: '— where I am still learning', paras: [
      `The gap is specific. I'll name it once.`,
      `Backend engineering, cloud and hybrid deployment, APIs and auth, observability, networking, the infrastructure around production agents. I haven't shipped enterprise software for five years, and I won't write like I have.`,
      `What I do have: a decade of hands-on support, the habit of finding the fault instead of performing confidence, and a willingness to learn where the system has to work. I'm asking to close the gap toward Forward Deployed Engineer — not asking you to pretend it's closed.`
    ],
      nextLead: `What I am starting next, stated as intent rather than experience:`,
      next: [
        ['Kubernetes and orchestration', 'starting, on top of the Docker, Traefik and nginx I already run in production'],
        ['Python', 'building on it now; not claiming it as a language I know'],
        ['A homelab of my own', 'in design: hardware, topology, networking']
      ],
      method: `I learn this with an LLM and an agent harness beside me. I am after the 20% that makes a system operable: enough to deploy it, read what the harness proposes, and catch it when it is wrong.`,
      study: `Studying AI and Full Stack development at Universidad Rey Juan Carlos via Racks Academy, in progress. The rest of the learning log is on the <a class="u" href="${links.portfolio}">portfolio</a>.` },

    logistics: { head: 'Logistics', sub: '— based, available, reachable', paras: [
      `Aberdeen, Scotland. Comfortable across UK and European hours, happy to travel when being in the room matters, open to relocation for the right fit. No notice period — I can start now.`
    ] },

    contact: { head: 'Contact', paras: [
      `If the support foundation and the engineering trajectory look useful, let's talk about the gap between them.`
    ],
      ask: `Tell me what would make me obviously useful to Nous in the first 90 days. I would rather close a specific gap than guess at one.`,
      items: [
        `Email · <a class="u" href="mailto:${links.email}">${links.email}</a>`,
        `CV · <a class="u" href="${links.cv}">javier-ponz-prado-cv.pdf</a>`,
        `Portfolio · <a class="u" href="${links.portfolio}">javierponz.technoir.cloud</a>`,
        `GitHub · <a class="u" href="${links.github}">github.com/ponzgpt</a>`,
        `LinkedIn · <a class="u" href="${links.linkedin}">linkedin.com/in/javierponz</a>`
      ] },

    footer: `A personal page on my own domain. Not affiliated with or endorsed by Nous Research. Hermes Agent is built by Nous Research; I use it and build around it.`
  },

  /* ═══════════════════════════════════════════════════════════ ESPAÑOL ══ */
  es: {
    title: 'Javier Ponz — candidatura a Nous Research',
    desc: 'Candidatura abierta a Nous Research de Javier Ponz: diez años de soporte técnico en Apple, operación práctica de agentes con Hermes Agent y MCP, y un camino honesto hacia Forward Deployed Engineer.',
    ogDesc: 'Diez años ayudando a que la tecnología difícil funcione, aplicados ahora a agentes abiertos: un camino hacia la ingeniería desplegada en cliente.',
    home: 'Javier Ponz',
    portfolio: 'Portafolio',
    langLabel: 'Idioma',
    nav: ['Persona', 'Trabajo', 'Pruebas', 'Encaje', 'Distancia', 'Logística'],
    block: 'CANDIDATURA',
    portraitAlt: 'Retrato a lápiz de Javier Ponz',
    status: 'Aberdeen, Escocia · abierto a remoto, viajes y mudanza · disponible ya',
    opening: [
      `Llevo diez años ayudando a que la tecnología difícil funcione para la gente.`,
      `En Apple Retail eso era diagnosticar el problema detrás del síntoma, traducir entre los sistemas técnicos y las personas, y no soltar el caso hasta que quien tenía delante se iba con un paso siguiente que funcionaba.`,
      `Ahora hago lo mismo con agentes abiertos y sus herramientas, y me preparo para la ingeniería desplegada en cliente en Nous, empezando por el soporte.`
    ],

    person: { head: 'Persona', sub: '— quién soy', paras: [
      `Soy <a class="u" href="${links.portfolio}">Javier Ponz</a>: ex-Genius de Apple, de Madrid, ahora aprendiendo y construyendo IA desde Aberdeen.`,
      `Entre 2014 y 2024 trabajé en Apple Retail España como Specialist, Technical Specialist y, seis años y medio, Genius, con una etapa remota como AppleCare Support Advisor durante la COVID. Sobre todo, diagnóstico directo: casos difíciles, información incompleta, gente con niveles de confianza técnica muy distintos.`,
      `Dos veces dejé el banco para una comisión de siete meses como In-Store Experience Lead. Planificación, recursos, lo que no encaja en ningún procedimiento: las dos me dejaron lo mismo: ${U('liderar es servir')}. No ser el más listo de la sala. Hacer que la sala funcione.`
    ] },

    work: { head: 'Trabajo', sub: '— qué aporto', calibration:
      `No cinco años de ingeniería en producción. Una transición construida sobre diez años de soporte, disciplina operativa y trato con el cliente.`,
      items: [
        { badge: 'Diagnóstico', title: 'Encontrar la avería', body: `Separar síntoma de causa, dejar por escrito lo comprobado, seguir hasta que vuelva a funcionar.` },
        { badge: 'Traducción', title: 'Hacerlo usable', body: `Explicar el sistema en términos con los que la otra persona pueda actuar. Termina cuando ella puede usarlo, no cuando yo lo entiendo.` },
        { badge: 'Agentes', title: 'Operarlos a diario', body: `A diario con <a class="u" href="${links.hermes}">Hermes Agent</a>, MCP, habilidades y Docker. Contexto y permisos explícitos, y compruebo lo que devuelven.` }
      ] },

    proof: { head: 'Pruebas', sub: '— construido y publicado', intro: `Mejor revisar el trabajo que fiarse de mi palabra.`,
      items: [
        { badge: 'Solo', title: 'Memento Mori', body: `Producto web privado por diseño: sin cuentas, sin analítica. HTML, CSS y módulos ES; Docker, Nginx y Traefik tras comprobaciones de publicación.`,
          links: [[links.memento, 'Sitio'], [links.mementoSrc, 'Código']] },
        { badge: 'Especificado · con agente', title: 'Hermes PKM Toolkit', body: `Herramientas MCP para bóvedas locales de Markdown. Protección contra recorrido de rutas y pruebas, porque acceder a ficheros necesita un límite que pueda explicar.`,
          links: [[links.pkm, 'Código']] },
        { badge: 'Especificado · con agente', title: '0TH Hermes', body: `Un camino de incorporación para Hermes Agent que recorta la primera hora de confusión a un siguiente paso concreto.`,
          links: [[links.zeroth, 'Código']] }
      ],
      note: `El <a class="u" href="${links.projects}">portafolio</a> indica qué escribí, desplegué o construí con un agente. Prefiero mostrar el límite que difuminarlo.` },

    fit: { head: 'Encaje', sub: '— por qué Nous', paras: [
      `Nous trabaja en la parte de la IA que quiero ayudar a hacer práctica: inteligencia abierta que no se queda encerrada tras una superficie cerrada.`,
      `Hermes y MCP hacen la capacidad inspeccionable: una habilidad puede ser un fichero Markdown, una herramienta un servidor que cualquiera puede leer.`,
      `El puesto de FDE está entre un sistema potente, un entorno desordenado y la persona que necesita que funcione. Hoy aporto el diagnóstico, la traducción y el trato con el cliente. La profundidad de despliegue e ingeniería la estoy construyendo a propósito.`
    ],
      map: [
        ['Conversaciones con clientes', 'diez años de soporte técnico'],
        ['Fallos ambiguos', 'diagnóstico de Genius bajo presión'],
        ['Disciplina de implantación', 'comprobaciones documentadas y despliegues acotados'],
        ['Sistemas de agentes', 'Hermes, MCP, habilidades, uso diario'],
        ['Profundidad de ingeniería', 'en construcción — estudios y proyectos publicados']
      ] },

    gap: { head: 'Distancia', sub: '— dónde sigo aprendiendo', paras: [
      `La distancia es concreta. La nombro una vez.`,
      `Ingeniería de backend, despliegue en nube e híbrido, APIs y autenticación, observabilidad, redes, la infraestructura de agentes en producción. No llevo cinco años entregando software empresarial, y no voy a escribir como si así fuera.`,
      `Lo que sí tengo: una década de soporte directo, la costumbre de buscar la avería en vez de aparentar seguridad, y ganas de aprender donde el sistema tiene que funcionar. Pido cerrar la distancia hacia Forward Deployed Engineer, no que finjáis que ya está cerrada.`
    ],
      nextLead: `Lo que empiezo ahora, dicho como intención y no como experiencia:`,
      next: [
        ['Kubernetes y orquestación', 'empezando, sobre el Docker, Traefik y nginx que ya tengo en producción'],
        ['Python', 'trabajándolo ahora; todavía no lo reclamo como lenguaje que sé'],
        ['Un homelab propio', 'en diseño: hardware, topología, redes']
      ],
      method: `Esto lo aprendo con un LLM y un arnés de agentes al lado. Voy a por el 20% que hace operable un sistema: lo justo para desplegarlo, leer lo que propone el arnés y pillarlo cuando se equivoca.`,
      study: `Estudiando IA y desarrollo Full Stack en la Universidad Rey Juan Carlos vía Racks Academy, en curso. El resto del registro de aprendizaje está en el <a class="u" href="${links.portfolio}">portafolio</a>.` },

    logistics: { head: 'Logística', sub: '— base, disponibilidad, contacto', paras: [
      `Aberdeen, Escocia. Cómodo en horario de Reino Unido y Europa, encantado de viajar cuando importa estar presente, abierto a mudanza si el encaje es bueno. Sin preaviso: puedo empezar ya.`
    ] },

    contact: { head: 'Contacto', paras: [
      `Si la base de soporte y la trayectoria de ingeniería os parecen útiles, hablemos de la distancia entre ambas.`
    ],
      ask: `Decidme qué me haría claramente útil para Nous en los primeros 90 días. Prefiero cerrar una distancia concreta que adivinarla.`,
      items: [
        `Correo · <a class="u" href="mailto:${links.email}">${links.email}</a>`,
        `CV · <a class="u" href="${links.cv}">javier-ponz-prado-cv.pdf</a>`,
        `Portafolio · <a class="u" href="${links.portfolio}">javierponz.technoir.cloud</a>`,
        `GitHub · <a class="u" href="${links.github}">github.com/ponzgpt</a>`,
        `LinkedIn · <a class="u" href="${links.linkedin}">linkedin.com/in/javierponz</a>`
      ] },

    footer: `Página personal en mi propio dominio. Sin afiliación ni respaldo de Nous Research. Hermes Agent es obra de Nous Research; yo lo uso y construyo a su alrededor.`
  },

  /* ══════════════════════════════════════════════════════════════ 中文 ══ */
  zh: {
    title: 'Javier Ponz — 致 Nous Research 的求职申请',
    desc: 'Javier Ponz 致 Nous Research 的公开求职：在 Apple 十年的技术支持经验，使用 Hermes Agent 与 MCP 的实际智能体运维，以及一条如实的、通往前置部署工程师（FDE）的初级路径。',
    ogDesc: '十年帮助人们让复杂的技术运转起来，如今用在开放智能体上——一条通往前置部署工程的初级路径。',
    home: 'Javier Ponz',
    portfolio: '作品集',
    langLabel: '语言',
    nav: ['其人', '能力', '证据', '契合', '差距', '安排'],
    block: '求职申请',
    portraitAlt: 'Javier Ponz 的铅笔素描肖像',
    status: '苏格兰阿伯丁 · 接受远程、出差与搬迁 · 可立即到岗',
    opening: [
      `过去十年，我一直在帮助人们让复杂的技术真正运转起来。`,
      `在 Apple Retail，这意味着找出症状背后的问题，在技术系统与人之间做翻译，一直跟进到对方拿到一个可行的下一步。`,
      `现在我把同样的事情用在开放智能体和它周边的工具上，也在为在 Nous 从事前置部署工程做准备——先从支持这一端做起。`
    ],

    person: { head: '其人', sub: '— 我是谁', paras: [
      `我是 <a class="u" href="${links.portfolio}">Javier Ponz</a>：来自马德里的前 Apple Genius，现在在阿伯丁学习并构建 AI。`,
      `2014 年到 2024 年，我在 Apple Retail 西班牙先后做过 Specialist、Technical Specialist，以及六年半的 Genius，新冠期间还远程做过 AppleCare Support Advisor。大部分时间是一线诊断：棘手的案例、不完整的信息、技术自信程度差异很大的人。`,
      `我两次离开维修台，各以七个月借调担任 In-Store Experience Lead。排班、资源调配、不合流程的状况——两次都让我明白同一件事：${U('领导即服务')}。不是做房间里最聪明的人，而是让房间运转起来。`
    ] },

    work: { head: '能力', sub: '— 我能带来什么', calibration:
      `不是五年的生产级工程经验，而是建立在十年支持、运营纪律与客户沟通之上的转型。`,
      items: [
        { badge: '诊断', title: '找到故障', body: `区分症状与原因，记录已检查的内容，坚持到问题重新可用。` },
        { badge: '翻译', title: '让它能用', body: `用对方能据此行动的语言解释系统。结束的标志是对方能用，而不是我懂了。` },
        { badge: '智能体', title: '每天运维', body: `日常使用 <a class="u" href="${links.hermes}">Hermes Agent</a>、MCP、技能和 Docker。给出明确的上下文与权限，再核验结果。` }
      ] },

    proof: { head: '证据', sub: '— 已构建并上线', intro: `与其听我说，不如直接看做过的东西。`,
      items: [
        { badge: '独立完成', title: 'Memento Mori', body: `从设计上注重隐私的 Web 产品——没有账户、没有统计。纯 HTML、CSS 和 ES 模块；Docker、Nginx、Traefik，带发布检查。`,
          links: [[links.memento, '网站'], [links.mementoSrc, '源代码']] },
        { badge: '制定规格 · 智能体编写', title: 'Hermes PKM Toolkit', body: `面向本地 Markdown 知识库的 MCP 工具。带路径穿越防护和测试，因为访问文件需要一条我能解释清楚的边界。`,
          links: [[links.pkm, '源代码']] },
        { badge: '制定规格 · 智能体编写', title: '0TH Hermes', body: `把 Hermes Agent 上手时第一小时的困惑，压缩成一个具体的下一步。`,
          links: [[links.zeroth, '源代码']] }
      ],
      note: `${'<a class="u" href="' + links.projects + '">作品集</a>'}标明了哪些是我编写、部署或借助智能体构建的。我宁愿亮出边界，也不愿模糊它。` },

    fit: { head: '契合', sub: '— 为什么是 Nous', paras: [
      `Nous 在做我想帮忙落地的那部分 AI：不被锁在封闭产品界面之后的开放智能。`,
      `Hermes 与 MCP 让能力变得可检视——技能可以是一个 Markdown 文件，工具可以是一个任何人都能读懂的服务。`,
      `FDE 这个岗位，正处在强大系统、混乱环境与需要系统跑起来的人之间。诊断、翻译与客户沟通，我现在就能带来；更深的部署与工程能力，我正有计划地补上。`
    ],
      map: [
        ['客户沟通', '十年技术支持'],
        ['含糊的故障', '压力下的 Genius 级诊断'],
        ['实施纪律', '有记录的检查与边界清晰的部署'],
        ['智能体系统', 'Hermes、MCP、技能、日常使用'],
        ['工程深度', '正在补上——学习加已上线项目']
      ] },

    gap: { head: '差距', sub: '— 我仍在学习的地方', paras: [
      `差距是具体的，我只说一次。`,
      `后端工程、云与混合部署、API 与身份认证、可观测性、网络，以及生产环境智能体周边的基础设施。我没有五年交付企业软件的经历，也不会写得好像有。`,
      `我有的是：十年一线支持经验、找故障而不是装自信的习惯，以及在系统必须运转的地方学习的意愿。我请求的是朝 FDE 缩小差距的机会，不是让你们假装差距不存在。`
    ],
      nextLead: `接下来要开始的事情——这里写的是打算，不是经验：`,
      next: [
        ['Kubernetes 与容器编排', '刚起步，建立在我已经跑在生产环境里的 Docker、Traefik 和 nginx 之上'],
        ['Python', '正在补；还不敢说这是我会的语言'],
        ['属于自己的 homelab', '设计阶段：硬件、拓扑、网络']
      ],
      method: `这些我是带着 LLM 和智能体框架一起学的。我要的是让系统变得可操作的那 20%：够用来部署它、读懂框架提出的方案，并在它出错时发现问题。`,
      study: `在读：AI 与全栈开发，胡安·卡洛斯国王大学（经由 Racks Academy），进行中。更完整的学习记录见${'<a class="u" href="' + links.portfolio + '">作品集</a>'}。` },

    logistics: { head: '安排', sub: '— 所在地、到岗、联系方式', paras: [
      `苏格兰阿伯丁。可以配合英国与欧洲时区，在需要到场时乐意出差，遇到合适机会也考虑搬迁。没有离职通知期，现在就能开始。`
    ] },

    contact: { head: '联系', paras: [
      `如果这份支持基础和工程发展方向对你们有用，我们聊聊两者之间的差距。`
    ],
      ask: `告诉我怎样才能在前 90 天里明显对 Nous 有用。我宁愿去补一个具体的差距，也不愿去猜。`,
      items: [
        `邮箱 · <a class="u" href="mailto:${links.email}">${links.email}</a>`,
        `简历 · <a class="u" href="${links.cv}">javier-ponz-prado-cv.pdf</a>`,
        `作品集 · <a class="u" href="${links.portfolio}">javierponz.technoir.cloud</a>`,
        `GitHub · <a class="u" href="${links.github}">github.com/ponzgpt</a>`,
        `LinkedIn · <a class="u" href="${links.linkedin}">linkedin.com/in/javierponz</a>`
      ] },

    footer: `这是我在自己域名上的个人页面，与 Nous Research 无隶属关系，也未获其认可。Hermes Agent 由 Nous Research 开发；我是它的使用者，并围绕它构建工具。`
  }
};
