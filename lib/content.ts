// Single source of truth for everything the site says about Daniel.
// Edit here: the home page, case studies and the "Ask" search all read from this file.

export const profile = {
  name: "Daniel Diab",
  fullName: "Daniel Felipe Diab González",
  role: "Full-stack and AI engineer",
  location: "Bogotá, Colombia",
  timezone: "UTC−5",
  status: "Open to full-time roles and automation projects",
  email: "diabgonzalez9@gmail.com",
  github: "https://github.com/DanielDiab",
  githubUser: "DanielDiab",
  linkedin: "https://www.linkedin.com/in/daniel-felipe-diab-gonzalez-427523347/",
  languages: "Spanish (native) · English (C1)",
};

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "1st", label: "place nationwide in IEEEXtreme 19.0, Colombia" },
  { value: "−25%", label: "LLM operating cost for a freelance client" },
  { value: "+35%", label: "client sales after AI lead-generation automation" },
  { value: "70+", label: "active members in IEEE Computer Society Uniandes, which I lead" },
];

export type Step = { title: string; body: string };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  context: string;
  period: string;
  status: string;
  summary: string;
  problem: string;
  built: Step[];
  decision?: { title: string; body: string };
  lesson?: string;
  results: string[];
  stack: string[];
  link?: { label: string; href: string };
  note?: string;
  image?: { src: string; w: number; h: number; alt: string; fit?: "contain" };
  gallery?: { src: string; w: number; h: number; alt: string }[];
  keywords: string[];
};

export const projects: Project[] = [
  {
    slug: "charter",
    name: "Charter",
    kind: "Agent platform with an evaluation gate",
    context: "Prototype, applied to an energy retailer",
    period: "Oct 2026",
    status: "Open source",
    summary:
      "A platform where LLM agents are declared as versioned YAML manifests and must pass an evaluation gate before they can be published. Runs fully local on Ollama.",
    problem:
      "Once several teams build their own agents, nobody can say how many exist, which model each runs on, what customer data it touches or what it costs. Charter makes the agent a piece of configuration instead of code, so those answers come for free.",
    built: [
      {
        title: "Agents as manifests",
        body: "Each agent is a versioned YAML file: purpose, must and must-not rules, tools, knowledge, a model alias, a budget and an eval suite. The platform validates it against curated catalogs and computes its risk.",
      },
      {
        title: "An evaluation gate",
        body: "Three layers before publishing: the agent's own suite against a risk-based threshold (85, 90 or 95%), shared security suites for prompt injection and cross-customer PII at 100%, and cost and latency against budget.",
      },
      {
        title: "Six MCP servers",
        body: "Billing, metering, tariffs, support, knowledge search and platform introspection, one server per system. Permission checks happen in the runtime before each call.",
      },
      {
        title: "One LangGraph runtime",
        body: "Input guard, hybrid retrieval (BM25 plus vectors with rank fusion), the agent step, tool calls with writes held for confirmation, and an output guard. Every step is traced with tokens, cost and latency, PII masked.",
      },
      {
        title: "An Architect agent",
        body: "Answers questions about the platform and runs a five-question interview to create new agents. Code, not the model, picks the archetype, model tier, risk and approvals, and turns the user's examples into the new agent's first eval suite.",
      },
      {
        title: "OpenAI-compatible API",
        body: "Every published agent is served as a model on /v1/chat/completions. The bearer token defines the session, so customer identity never comes from the request body.",
      },
    ],
    decision: {
      title: "Numbers come from tools, and a guard checks them",
      body: "The output guard requires every figure in an answer to appear in a tool result from the same conversation. With the runtime fixes and write confirmation, it took the billing agent's suite from 80% to 100%.",
    },
    lesson:
      "The guard compares values, not units: a correct number in pesos instead of kWh would still pass. That is the next step.",
    results: [
      "Billing agent suite raised from 80% to 100%",
      "Internal-procedures agent passed its gate: own suite 7/7, red-team 4/4, US$0.00064 per conversation against a US$0.02 cap",
      "Two-step scope check: 17 of 18 test messages right, against 13 with the classifier alone",
      "85 automated tests that run without a model in under 20 seconds",
      "Fully local on Ollama with Qwen models, no API keys",
    ],
    stack: ["Python", "LangGraph", "MCP", "Ollama", "SQLite", "Pytest"],
    link: { label: "github.com/DanielDiab/Charter", href: "https://github.com/DanielDiab/Charter" },
    image: { src: "/img/charter-gate.png", w: 1390, h: 311, alt: "charter evaluar: the internal-procedures agent passes its own suite 7 of 7, red-team 4 of 4, and its cost and latency budget", fit: "contain" },
    gallery: [
      { src: "/img/charter-inventory.png", w: 1362, h: 489, alt: "charter inventario: every agent with its version, owner, model, data class, risk, tools and cost, then the models and the tools each one can use" },
      { src: "/img/charter-chat.png", w: 1391, h: 322, alt: "The billing agent explains a 33.2% higher invoice by calling three tools, then offers to escalate to an advisor" },
      { src: "/img/charter-architect.png", w: 1388, h: 422, alt: "The Architect agent explains how agents are created on the platform, answering from the platform's own docs" },
    ],
    keywords: ["agents", "platform", "governance", "evaluation", "evals", "gate", "mcp", "langgraph", "ollama", "guardrails", "yaml", "manifest", "enterprise", "llm", "testing", "rag"],
  },
  {
    slug: "agent-platform",
    name: "Connected agent platform",
    kind: "Multi-agent system",
    context: "Research Assistant, Universidad de los Andes",
    period: "Jan 2026 – now",
    status: "Ongoing",
    summary:
      "A full platform of connected AI agents for Universidad de los Andes, including voice agents and class agents. I own the architecture and the technical direction.",
    problem:
      "University teams had repetitive internal processes and no shared way to put AI agents to work on them without each project starting from zero.",
    built: [
      {
        title: "Connected agents",
        body: "Selected by faculty to design and build the platform with LangGraph, n8n and Open WebUI, so agents share tools and data instead of living as one-off bots.",
      },
      {
        title: "Voice and class agents",
        body: "Voice agents, and class agents that make teaching interactions faster for students and professors.",
      },
      {
        title: "Process automation",
        body: "Custom full-stack agents that automate internal university processes, using machine learning, data normalization and statistical algorithms.",
      },
      {
        title: "Cost-first architecture",
        body: "RAG database configuration, model and provider choice, and memory on Azure Cosmos DB, with LLM cost treated as a design input from day one.",
      },
    ],
    results: [
      "Voice agents and class agents in development for the university",
      "Technical direction and planning owned end to end, with academic stakeholders",
    ],
    stack: ["LangGraph", "LangChain", "n8n", "Open WebUI", "Azure Cosmos DB", "Python"],
    keywords: ["agents", "multi-agent", "langgraph", "langchain", "n8n", "open webui", "architecture", "memory", "cosmos", "cost", "university", "voice", "rag"],
  },
  {
    slug: "freelance-automation",
    name: "Freelance automation",
    kind: "Client work",
    context: "Independent developer",
    period: "Nov 2022 – Nov 2024",
    status: "Two years, multiple clients",
    summary:
      "I was the whole engineering team for small clients: automation that replaced manual steps and AI features that paid for themselves.",
    problem:
      "Small businesses were losing hours to manual follow-ups and copy-paste between tools, and their early AI features cost more to run than they returned.",
    built: [
      {
        title: "AI lead generation",
        body: "Automations that capture, qualify and follow up on leads without someone watching.",
      },
      {
        title: "LLM cost optimization",
        body: "Reworked how a client's product used the Claude API: prompts, resources and call patterns.",
      },
      {
        title: "Integrations",
        body: "Connected databases and REST APIs with Make and Google Workspace so internal communication stopped depending on manual handling.",
      },
    ],
    results: ["25% lower LLM operating cost for a client", "35% increase in client sales from lead-generation automation"],
    stack: ["Make", "Claude API", "REST APIs", "Google Workspace", "SQL", "JavaScript"],
    keywords: ["freelance", "automation", "leads", "sales", "cost", "clients", "make", "integrations", "workflow", "business", "ventas"],
  },
  {
    slug: "chromatic",
    name: "CHRO/MATIC",
    kind: "Design system generator",
    context: "Personal product",
    period: "2026",
    status: "Live",
    summary:
      "Pick one brand color, get a complete design system: palette, type, spacing, elevation and accessible components, exported to six formats.",
    problem:
      "Building a consistent design system from a single brand color takes designers days, and most palette tools produce steps that look uneven to the eye.",
    built: [
      {
        title: "Perceptual color engine",
        body: "Palettes are generated in the OKLCH color space, so the nine steps look evenly spaced to a human eye instead of only on paper.",
      },
      {
        title: "Accessible components",
        body: "React and Tailwind components with ARIA and validated contrast, rendered live with the generated tokens.",
      },
      {
        title: "Token export",
        body: "Exports to six formats, including CSS variables, Tailwind config, Style Dictionary (W3C draft), Figma Tokens and TypeScript.",
      },
      {
        title: "Presets and a live preview",
        body: "Ten brand presets, from neo bank to wellness, and an overview that shows the generated system on a realistic landing page and dashboard.",
      },
    ],
    results: ["Live and free to use", "The hue dial on this site runs on the same OKLCH idea"],
    stack: ["React", "TypeScript", "Tailwind", "OKLCH"],
    link: { label: "chro-matic.vercel.app", href: "https://chro-matic.vercel.app" },
    image: { src: "/img/chromatic.jpg", w: 1600, h: 940, alt: "CHRO/MATIC landing page: the wordmark set huge in cream and gold on black" },
    gallery: [{ src: "/img/chromatic-studio.jpg", w: 1800, h: 1002, alt: "The CHRO/MATIC studio: brand presets on the left, a live preview of the generated system on the right" }],
    keywords: ["design", "design system", "color", "oklch", "palette", "tokens", "react", "tailwind", "frontend", "ui", "accessibility"],
  },
  {
    slug: "stochastic",
    name: "Stochastic",
    kind: "Forecasting platform",
    context: "Academic project, machine learning and finance",
    period: "2026",
    status: "Live beta",
    summary:
      "Ingests real-time crypto market data and forecasts prices more than five hours ahead, with LLM reasoning being added so forecasts explain themselves.",
    problem:
      "Forecasting tools usually return an unexplained number. I wanted the full chain, from live data to model to an answer a person can reason about.",
    built: [
      {
        title: "Data ingestion",
        body: "Real-time market data feeding the modelling layer.",
      },
      {
        title: "Models and indicators",
        body: "ARIMA, Random Forest, RSI, MACD and moving averages producing forecasts on a 5+ hour horizon, with signals refreshed every hour.",
      },
      {
        title: "Explainable output",
        body: "Each analysis ends in a plain decision (buy, sell or hold) with the reasoning written out in Spanish: which indicators agree, which disagree, and why.",
      },
    ],
    results: ["Deployed front-end and API layer", "Full chain from ingestion to forecast"],
    stack: ["Python", "Flask", "Scikit-learn", "Statsmodels", "Pandas", "CryptoCompare API"],
    link: { label: "stochastic-beta.vercel.app", href: "https://stochastic-beta.vercel.app" },
    image: { src: "/img/stochastic.jpg", w: 1600, h: 924, alt: "Stochastic dashboard: a grid of coins to analyse and a written hold signal for Bitcoin" },
    gallery: [
      { src: "/img/stochastic-chart.jpg", w: 1800, h: 906, alt: "Bitcoin closing price with 50- and 200-day moving averages and the decision to hold" },
      { src: "/img/stochastic-about.jpg", w: 1600, h: 881, alt: "Stochastic's about page: learning to predict the crypto market with statistical models" },
    ],
    keywords: ["machine learning", "ml", "forecasting", "crypto", "finance", "arima", "random forest", "data", "time series"],
  },
  {
    slug: "paco",
    name: "PACO",
    kind: "Interactive installation, 3D art",
    context: "Personal project",
    period: "Mar 2026",
    status: "Published on Behance",
    summary:
      "A real penguin figurine, scanned with photogrammetry, that a turn of a knob breaks into particles, sets vibrating to the beat and finally presses into a vinyl record shaped by a trance bassline. Live, in TouchDesigner.",
    problem:
      "I wanted a transformation people would believe. Not a model built from nothing, but a real object the viewer could watch come apart and turn into sound.",
    built: [
      {
        title: "Photogrammetry",
        body: "Scanned Paco from many angles to capture his geometry and texture, then cleaned and modified the 3D model so it could break apart convincingly.",
      },
      {
        title: "A knob that tells the story",
        body: "An Arduino potentiometer is the narrator: each position maps in real time to one of four states in TouchDesigner.",
      },
      {
        title: "Four states",
        body: "Origin, the solid scan. Deconstruction, the mesh fractures into a particle system. Micro-beat, every particle vibrates to the music. Synthesis, the energy condenses into a vinyl disc.",
      },
      {
        title: "Sound builds the form",
        body: "In the last state the amplitude of the trance bass sets the radius and the groove of the record in real time. The audio doesn't illustrate the result; it builds it.",
      },
      {
        title: "The viewer steers",
        body: "In every state the mouse moves the scene: orbit the scan, spin the particle cloud, turn the waves, tilt the plane of the record.",
      },
    ],
    decision: {
      title: "Why scan a real object",
      body: "Paco wasn't modelled from scratch. Scanning a real figurine gives the transformation a real referent, so what people watch disintegrate is something genuine.",
    },
    results: ["Published on Behance with a real-time demo video and an interactive 3D model", "Four live states driven by hardware and audio"],
    stack: ["TouchDesigner", "Arduino", "Photogrammetry", "3D modelling", "Real-time audio"],
    link: { label: "PACO on Behance", href: "https://www.behance.net/gallery/245644523/PACO-Metamorfosis-de-Frecuencia" },
    image: { src: "/img/paco-particles.jpg", w: 810, h: 670, alt: "PACO: the scanned penguin figurine rendered as a cloud of blue particles" },
    gallery: [
      { src: "/img/paco-vinyl.jpg", w: 1054, h: 600, alt: "The final state: particles condensed into a glowing vinyl disc" },
      { src: "/img/paco-network.jpg", w: 1800, h: 588, alt: "The TouchDesigner network that drives the four states" },
      { src: "/img/paco-touchdesigner.jpg", w: 1146, h: 719, alt: "TouchDesigner: the Arduino serial input routed to the three renders" },
    ],
    keywords: ["touchdesigner", "arduino", "photogrammetry", "3d", "scan", "interactive", "installation", "audio", "music", "visual", "creative coding", "art", "hardware"],
  },
  {
    slug: "opticloud",
    name: "OptiCloud",
    kind: "Microservices on AWS",
    context: "Course project, Uniandes",
    period: "2026",
    status: "Deployed",
    summary:
      "Four services in four frameworks behind a Kong gateway inside an AWS VPC, each containerized on its own EC2 instance.",
    problem:
      "Design and run a multi-service platform end to end: networking, security, data stores and deployment, not only the code.",
    built: [
      {
        title: "Gateway and services",
        body: "A Kong API gateway on EC2 routing to independent services in NestJS, Spring Boot, Django and FastAPI, each in Docker on its own instance.",
      },
      {
        title: "Data layer",
        body: "RDS PostgreSQL for transactional and reporting data, MongoDB for access logs and Redis caching precomputed reports.",
      },
      {
        title: "Infrastructure",
        body: "Provisioning, AMI and instance sizing, security groups, inter-service networking, load balancing, JWT auth and YAML deployment definitions.",
      },
    ],
    results: ["Running inside a private VPC", "Four frameworks behind one gateway"],
    stack: ["AWS", "Docker", "Kong", "PostgreSQL", "MongoDB", "Redis"],
    keywords: ["aws", "cloud", "microservices", "docker", "devops", "infrastructure", "backend", "kong", "redis", "postgres"],
  },
];

export type Service = { title: string; body: string; proof: string; keywords: string[] };

export const services: Service[] = [
  {
    title: "Lead and sales automation",
    body: "Capture, qualify and follow up on leads with workflows that run without someone watching. Built on n8n or Make, connected to the tools you already use.",
    proof: "+35% client sales",
    keywords: ["leads", "sales", "automation", "n8n", "make", "crm", "follow up", "ventas", "automatizar"],
  },
  {
    title: "Search over your documents",
    body: "Your team asks questions in plain language and gets answers that link back to the source file. Guardrails keep the assistant inside your material.",
    proof: "RAG architectures at Uniandes",
    keywords: ["documents", "search", "rag", "pdf", "knowledge base", "assistant", "chatbot", "documentos"],
  },
  {
    title: "LLM cost review",
    body: "I review how your product calls models, then cut waste through prompt, model and caching changes without hurting answer quality.",
    proof: "−25% operating cost",
    keywords: ["cost", "llm", "tokens", "optimization", "api", "price", "costos", "ahorro"],
  },
];

export type Role = { when: string; title: string; org: string; detail: string };

export const roles: Role[] = [
  { when: "Jan 2026 – now", title: "Research Assistant, Generative AI", org: "Universidad de los Andes", detail: "Leads the university's platform of connected AI agents: voice agents, class agents and process automation." },
  { when: "Aug 2026 – now", title: "Teaching Assistant, Business Systems", org: "Universidad de los Andes", detail: "SAP S/4HANA and Dolibarr ERP/CRM, and the Design-Led innovation method. Trains students to talk like consultants." },
  { when: "Dec 2025 – now", title: "President", org: "IEEE Computer Society Uniandes", detail: "70+ active members, 8+ projects running at once, nearly 20 technical events with industry companies, and more hands-on AI workshops." },
  { when: "Apr 2026 – now", title: "Ambassador", org: "IEEE CS SYP TechX Initiative", detail: "Represents the program within the Section, supporting outreach and technical education." },
  { when: "Feb 2025 – now", title: "Organizer", org: "TechTalks Uniandes", detail: "Technical and networking talks with startups and companies. Brought 10+ companies on as speakers, partners or sponsors." },
  { when: "Aug 2024 – Dec 2025", title: "Community Manager", org: "IEEE Computer Society Uniandes", detail: "Ran the chapter's community and web presence before becoming president." },
  { when: "Nov 2022 – Nov 2024", title: "Freelance Software Developer", org: "Independent", detail: "Custom web apps, automation and AI features for clients, remote." },
];

export const education = {
  degree: "B.Sc. Systems and Computing Engineering",
  school: "Universidad de los Andes",
  when: "Graduating late 2026",
  detail: "Visual Computing option completed May 2026",
};

export const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "C", "C++"] },
  { group: "AI & agents", items: ["LangChain", "LangGraph", "LangSmith", "RAG", "MCP", "Voice agents", "Claude API", "Open WebUI"] },
  { group: "Automation", items: ["n8n", "Make", "REST APIs", "Google Workspace"] },
  { group: "Web", items: ["Next.js", "React", "Node.js", "Angular", "Tailwind"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "Azure Cosmos DB", "Redis"] },
  { group: "Cloud", items: ["AWS", "Google Cloud", "Docker", "Linux"] },
  { group: "Design and 3D", items: ["Figma", "Framer", "OKLCH color", "Design systems", "TouchDesigner", "Photogrammetry", "Rhino", "Fusion 360"] },
];

export const credentials: { issuer: string; items: string[] }[] = [
  { issuer: "IEEE", items: ["1st place nationwide, Colombia, IEEEXtreme 19.0 (2025)"] },
  { issuer: "Anthropic", items: ["Model Context Protocol: Advanced Topics", "Introduction to MCP", "Claude Code in Action", "Claude 101", "AI Fluency"] },
  { issuer: "NVIDIA", items: ["Fundamentals of Deep Learning", "Rapid Application Development with LLMs"] },
  { issuer: "Microsoft", items: ["Design Multi-Agent Memory Architectures with Azure Cosmos DB"] },
  { issuer: "AWS", items: ["Cloud Practitioner Essentials"] },
  { issuer: "CU Boulder", items: ["Databases for Data Scientists specialization"] },
];

// The "what I do" command list on the home page. Typing filters it with lib/search.ts.
export type Capability = { key: string; name: string; body: string; href: string; proof: string; keywords: string[] };

export const capabilities: Capability[] = [
  { key: "A", name: "LangChain and LangGraph agents", body: "Agents with tools, memory and retrieval, wired into your systems through MCP, with guardrails so they refuse prompt injection and questions outside their material.", href: "/work/charter/", proof: "Charter and the Uniandes agent platform", keywords: ["agent", "langgraph", "langchain", "guardrails", "llm", "ai", "mcp", "chatbot", "assistant", "agente", "prompt injection", "tools", "memory"] },
  { key: "V", name: "Voice and class agents", body: "Agents people talk to, and agents that sit inside a class or a process and answer for it.", href: "/work/agent-platform/", proof: "In development at Uniandes", keywords: ["voice", "voz", "call", "speech", "class", "teaching", "education", "students", "assistant", "llamadas"] },
  { key: "D", name: "Search your documents", body: "PDFs, scans and Word files turned into structured data your team can question in plain language, with links back to the source.", href: "/work/agent-platform/", proof: "RAG architectures at Uniandes", keywords: ["documents", "pdf", "ocr", "rag", "retrieval", "search", "knowledge", "documentos", "buscar", "scan"] },
  { key: "L", name: "Lead and sales automation", body: "Workflows in n8n or Make that capture, qualify and follow up on leads without someone watching.", href: "/work/freelance-automation/", proof: "+35% client sales", keywords: ["leads", "sales", "crm", "n8n", "make", "automation", "workflow", "ventas", "automatizar", "follow up", "marketing"] },
  { key: "G", name: "Agent evaluation and governance", body: "Eval suites, red-team tests and a gate that keeps an agent unpublished until it passes, plus an inventory of every agent, model and cost.", href: "/work/charter/", proof: "Charter", keywords: ["evaluation", "evals", "testing", "governance", "compliance", "red team", "security", "inventory", "audit", "quality", "gate"] },
  { key: "C", name: "LLM cost review", body: "I go through how your product calls models and cut the waste in prompts, model choice and caching without hurting answers.", href: "/work/freelance-automation/", proof: "−25% operating cost", keywords: ["cost", "tokens", "price", "budget", "optimization", "api", "claude", "openai", "costos", "ahorro", "cheap"] },
  { key: "S", name: "Design systems in OKLCH", body: "One brand color in, a full system out: palette, type, spacing and accessible React components, exported as tokens.", href: "/work/chromatic/", proof: "CHRO/MATIC", keywords: ["design", "color", "oklch", "tokens", "ui", "figma", "tailwind", "frontend", "accessibility", "diseno"] },
  { key: "W", name: "Web apps in Next.js", body: "Full-stack products in Next.js, React and Node, from scoping to deployment. This site is one.", href: "/work/chromatic/", proof: "This site", keywords: ["web", "next", "react", "node", "typescript", "frontend", "fullstack", "app", "site", "angular"] },
  { key: "R", name: "Real-time interactive visuals", body: "Installations that react to sound and to people: 3D scans, particles and hardware, built in TouchDesigner with Arduino.", href: "/work/paco/", proof: "PACO", keywords: ["touchdesigner", "arduino", "interactive", "installation", "visuals", "3d", "photogrammetry", "audio", "creative", "art", "event", "museum"] },
  { key: "I", name: "Cloud infrastructure", body: "Services on AWS and Google Cloud: gateways, containers, private networks, databases and caching.", href: "/work/opticloud/", proof: "OptiCloud", keywords: ["aws", "cloud", "gcp", "docker", "microservices", "devops", "infrastructure", "ec2", "redis", "postgres", "kubernetes"] },
  { key: "F", name: "Forecasting with ML", body: "Time-series and machine-learning models on live data, with an explanation attached to each forecast.", href: "/work/stochastic/", proof: "Stochastic", keywords: ["ml", "machine learning", "forecast", "prediction", "data", "arima", "random forest", "crypto", "finance", "python", "model"] },
];

// Talks and events, from LinkedIn.
export const events = [
  { what: "Workshop: build your own AI agent", where: "Universidad de los Andes", detail: "Taught students from every program to build an AI agent from scratch and use it in real projects." },
  { what: "AI Incident Response Sprint, Bogotá hub", where: "Sept 2026, with AI Safety Colombia and Young AI Leaders", detail: "Co-organized through Computer Society Uniandes: three days designing how to respond when an AI system fails." },
  { what: "6th Foro Académico on starting a career in IT", where: "Universidad de los Andes", detail: "Organized as teaching assistant for Business Systems, with speakers from industry." },
  { what: "6th Foro Tech", where: "Computer Society Uniandes, Oct 2026", detail: "The chapter's tech forum connecting students with the industry." },
];

// Facts that fill the hero's geometric panel.
export const heroFacts = {
  first: { big: "1st", small: "Colombia, IEEEXtreme 19.0" },
  agents: { big: "6", small: "MCP servers behind one LangGraph runtime in Charter" },
  community: { big: "70+", small: "members in the IEEE chapter I lead" },
  results: [{ big: "−25%", small: "LLM cost" }, { big: "+35%", small: "client sales" }],
};

export const proofNames = [
  "1st in Colombia at IEEEXtreme 19.0",
  "Universidad de los Andes",
  "IEEE Computer Society",
  "Anthropic",
  "NVIDIA",
  "Microsoft",
  "AWS",
];

// Photos for the About section. Captions say what each one shows.
export const photos = [
  { src: "/img/talk.jpg", w: 1100, h: 1298, alt: "Daniel presenting a workshop slide on setting up Google Cloud for an AI agent", caption: "Teaching a workshop on building AI agents" },
  { src: "/img/ieeextreme.jpg", w: 920, h: 515, alt: "Three team members of Overflowsquad outdoors on campus", caption: "Overflowsquad, first in Colombia at IEEEXtreme 19.0" },
  { src: "/img/board.jpg", w: 770, h: 595, alt: "Five members of the IEEE Computer Society Uniandes board on a campus rooftop", caption: "The IEEE Computer Society Uniandes board I lead" },
  { src: "/img/chapter-event.jpg", w: 900, h: 861, alt: "Four IEEE Uniandes members in front of a projected chapter website", caption: "At an IEEE Uniandes chapter event" },
];
