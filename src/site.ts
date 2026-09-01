export const site = {
  navigation: [{ label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Moments', href: '#moments' }, { label: 'Contact', href: '#contact' }],
  hero: { tagline: 'A little maker, a lot curious.', intro: '我喜欢把模糊的想法拆成小块，再让它们真的跑起来。最近在做 AI Agent、知识检索和本地开发工具。' },
  about: '我是 Sylvia。这里记录我在代码、Agent 和日常创作之间来回穿梭的痕迹。比起给自己贴标签，我更愿意持续做些有趣、可靠，也有一点点个性的东西。',
  stack: ['Python', 'MCP', 'Agentic RAG', 'TypeScript', 'Docker', 'Local-first'],
  links: { github: 'https://github.com/Sylvia145', email: 'hello@example.com' },
  projects: [
    { title: 'LiveGraphRAG', subtitle: 'Version-aware knowledge, with proof', description: '面向私有化软件运维支持的 GraphRAG 服务。它把多版本官方文档、混合检索和图关系串成一条可追溯的问答链：先找证据，再组织答案。', highlights: ['PostgreSQL + pgvector、全文检索与 Neo4j 图谱协同', '证据卡片、版本隔离与引用不足时拒答'], tags: ['Python', 'FastAPI', 'GraphRAG', 'Neo4j', 'Redis', 'Docker'], href: 'https://github.com/Sylvia145/LiveGraphRAG', image: '' },
    { title: 'Moka', subtitle: 'A local coding agent with memory', description: '运行在本地仓库里的终端 coding agent。Moka 把 provider、上下文、工具、审批、沙箱与运行证据放进同一个 runtime，让任务可以继续、结果能够复盘。', highlights: ['TUI / REPL / one-shot 三种入口，共享同一套 runtime', 'session、working memory 与 durable topics 支持长期协作'], tags: ['Python', 'TUI', 'LLM Runtime', 'Memory', 'Sandbox'], href: 'https://github.com/Sylvia145/moka', image: '/moka-tui.png' },
  ],
  contactCopy: '有想聊的项目、灵感或好玩的 Agent 实验？欢迎来打个招呼。',
} as const
