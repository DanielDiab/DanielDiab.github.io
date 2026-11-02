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
    ],
    results: ["Live and free to use", "The hue dial on this site runs on the same OKLCH idea"],
    stack: ["React", "TypeScript", "Tailwind", "OKLCH"],
    link: { label: "chro-matic.vercel.app", href: "https://chro-matic.vercel.app" },
    keywords: ["design", "design system", "color", "oklch", "palette", "tokens", "react", "tailwind", "frontend", "ui", "accessibility"],
  },
  {
    slug: "stochastic",
    name: "Stochastic",
    kind: "Forecasting platform",
    context: "Personal product",
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
        body: "ARIMA, Random Forest, RSI, MACD and moving averages producing forecasts on a 5+ hour horizon.",
      },
      {
        title: "Explainable output",
        body: "Integrating LLM-based reasoning so each forecast comes with an explanation.",
      },
    ],
    results: ["Deployed front-end and API layer", "Full chain from ingestion to forecast"],
    stack: ["Python", "Time series", "Scikit-learn", "Vercel"],
    link: { label: "stochastic-beta.vercel.app", href: "https://stochastic-beta.vercel.app" },
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
