// Single source of truth for everything the site says about Daniel.
// Edit here: the home page, case studies and the "Ask" search all read from this file.

export const profile = {
  name: "Daniel Diab",
  fullName: "Daniel Felipe Diab González",
  role: "AI & automation engineer",
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
  image?: { src: string; w: number; h: number; alt: string };
  gallery?: { src: string; w: number; h: number; alt: string }[];
  keywords: string[];
};

export const projects: Project[] = [
  {
    slug: "senecareader",
    name: "SenecaReader",
    kind: "Agentic RAG platform",
    context: "Universidad de los Andes",
    period: "2026",
    status: "In use by the Engineering Faculty",
    summary:
      "Turns decades of Council minutes (PDFs, scans, DOCX) into searchable data, with an agent that answers in plain language and stays inside the corpus.",
    problem:
      "Decades of Engineering Council minutes existed as PDFs, scanned images and DOCX files. They were public on paper and unsearchable in practice: finding one decision meant opening files one by one.",
    built: [
      {
        title: "Ingestion pipeline",
        body: "Converts PDFs, OCR'd scans and DOCX into structured, indexed JSON. It recovers hyperlinks, repairs Spanish accents that were silently dropped and broke matching, and extracts action items into their own field.",
      },
      {
        title: "Resumable batch CLI",
        body: "Digitized hundreds of historical documents. When a run fails midway it picks up where it stopped, so nothing gets reprocessed.",
      },
      {
        title: "Agent and retrieval",
        body: "A LangGraph agent with keyword search and semantic search as separate tools, JWT authentication, and input and output guardrails against prompt injection and off-topic questions.",
      },
      {
        title: "Deployment",
        body: "Processed corpus deployed to Google Cloud Storage and served to faculty staff.",
      },
    ],
    decision: {
      title: "Why keyword search became its own tool",
      body: "Pure semantic search kept missing exact references: resolution numbers and dates. Splitting keyword and semantic retrieval into separate tools let the agent pick the right one per question.",
    },
    lesson:
      "Next time I'd build the evaluation set before tuning retrieval, not after. I learned that by tuning blind first.",
    results: [
      "In active use by Universidad de los Andes' Engineering Faculty",
      "Hundreds of historical documents digitized and searchable",
    ],
    stack: ["Python", "LangGraph", "RAG", "OCR", "JWT", "Google Cloud"],
    note: "Internal to the university. I can walk through it live on a call.",
    keywords: ["rag", "retrieval", "documents", "pdf", "ocr", "search", "guardrails", "langgraph", "agent", "ingestion", "university", "minutes", "actas"],
  },
  {
    slug: "agent-platform",
    name: "Connected agent platform",
    kind: "Multi-agent system",
    context: "Generative AI Research Monitor, Uniandes",
    period: "Jan 2026 – now",
    status: "Ongoing",
    summary:
      "A platform of connected AI agents for internal university processes. I own the architecture and the technical decisions.",
    problem:
      "University teams had repetitive internal processes and no shared way to put AI agents to work on them without each project starting from zero.",
    built: [
      {
        title: "Platform architecture",
        body: "Selected by faculty to lead a connected AI-agent platform built with LangGraph, n8n and Open WebUI.",
      },
      {
        title: "Agent memory",
        body: "Multi-agent memory architecture designed on Azure Cosmos DB.",
      },
      {
        title: "Cost as a constraint",
        body: "Model and provider selection across the platform's agents, with LLM cost treated as a design input from day one.",
      },
    ],
    results: [
      "SenecaReader shipped on top of this work",
      "Requirements gathered directly with academic stakeholders",
    ],
    stack: ["LangGraph", "n8n", "Open WebUI", "Azure Cosmos DB", "Python"],
    keywords: ["agents", "multi-agent", "langgraph", "n8n", "open webui", "architecture", "memory", "cosmos", "cost", "university"],
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
    proof: "SenecaReader, in production",
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
  { when: "Jan 2026 – now", title: "Generative AI Research Monitor", org: "Universidad de los Andes", detail: "Leads the connected agent platform and SenecaReader." },
  { when: "Dec 2025 – now", title: "President", org: "IEEE Computer Society Uniandes", detail: "Grew the community to 70+ active members and organized nearly 20 technical events with industry companies." },
  { when: "Apr 2026 – now", title: "Ambassador", org: "IEEE CS SYP TechX Initiative", detail: "Represents the program within the Section, supporting outreach and technical education." },
  { when: "Current", title: "Teaching Assistant, Business Systems", org: "Universidad de los Andes", detail: "SAP S/4HANA and ERP/CRM processes. Trains students to explain systems like consultants." },
  { when: "Nov 2022 – Nov 2024", title: "Freelance Software Developer", org: "Independent", detail: "Custom web apps, automation and AI features for small clients." },
];

export const education = {
  degree: "B.Sc. Systems and Computing Engineering",
  school: "Universidad de los Andes",
  when: "Expected Dec 2026",
  detail: "Visual Computing option completed May 2026",
};

export const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "C", "C++"] },
  { group: "AI & agents", items: ["LangGraph", "LangSmith", "RAG", "MCP", "Claude API", "Prompt engineering", "Open WebUI"] },
  { group: "Automation", items: ["n8n", "Make", "REST APIs", "Google Workspace"] },
  { group: "Web", items: ["Next.js", "React", "Node.js", "Angular", "Tailwind"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "Azure Cosmos DB", "Redis"] },
  { group: "Cloud", items: ["AWS", "Google Cloud", "Docker", "Linux"] },
  { group: "Design", items: ["Figma", "Framer", "OKLCH color", "Design systems"] },
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
  { key: "A", name: "Agents that stay on topic", body: "LangGraph agents with input and output guardrails, so they refuse prompt injection and questions outside their material.", href: "/work/senecareader/", proof: "SenecaReader", keywords: ["agent", "langgraph", "guardrails", "llm", "ai", "mcp", "chatbot", "assistant", "agente", "prompt injection"] },
  { key: "D", name: "Search your documents", body: "PDFs, scans and Word files turned into structured data your team can question in plain language, with links back to the source.", href: "/work/senecareader/", proof: "In daily use at Uniandes", keywords: ["documents", "pdf", "ocr", "rag", "retrieval", "search", "knowledge", "documentos", "buscar", "scan"] },
  { key: "L", name: "Lead and sales automation", body: "Workflows in n8n or Make that capture, qualify and follow up on leads without someone watching.", href: "/work/freelance-automation/", proof: "+35% client sales", keywords: ["leads", "sales", "crm", "n8n", "make", "automation", "workflow", "ventas", "automatizar", "follow up", "marketing"] },
  { key: "C", name: "LLM cost review", body: "I go through how your product calls models and cut the waste in prompts, model choice and caching without hurting answers.", href: "/work/freelance-automation/", proof: "−25% operating cost", keywords: ["cost", "tokens", "price", "budget", "optimization", "api", "claude", "openai", "costos", "ahorro", "cheap"] },
  { key: "S", name: "Design systems in OKLCH", body: "One brand color in, a full system out: palette, type, spacing and accessible React components, exported as tokens.", href: "/work/chromatic/", proof: "CHRO/MATIC", keywords: ["design", "color", "oklch", "tokens", "ui", "figma", "tailwind", "frontend", "accessibility", "diseno"] },
  { key: "W", name: "Web apps in Next.js", body: "Full-stack products in Next.js, React and Node, from scoping to deployment. This site is one.", href: "/work/chromatic/", proof: "This site", keywords: ["web", "next", "react", "node", "typescript", "frontend", "fullstack", "app", "site", "angular"] },
  { key: "I", name: "Cloud infrastructure", body: "Services on AWS and Google Cloud: gateways, containers, private networks, databases and caching.", href: "/work/opticloud/", proof: "OptiCloud", keywords: ["aws", "cloud", "gcp", "docker", "microservices", "devops", "infrastructure", "ec2", "redis", "postgres", "kubernetes"] },
  { key: "F", name: "Forecasting with ML", body: "Time-series and machine-learning models on live data, with an explanation attached to each forecast.", href: "/work/stochastic/", proof: "Stochastic", keywords: ["ml", "machine learning", "forecast", "prediction", "data", "arima", "random forest", "crypto", "finance", "python", "model"] },
];

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
