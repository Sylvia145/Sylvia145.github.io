export const site = {
  navigation: [{ label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Moments', href: '#moments' }, { label: 'Contact', href: '#contact' }],
  hero: { tagline: 'A little maker, a lot curious.', intro: '我喜欢把模糊的想法拆成小块，再让它们真的跑起来。最近在做 AI Agent、知识检索和本地开发工具。' },
  about: '我是 Sylvia。这里记录我在代码、Agent 和日常创作之间来回穿梭的痕迹。比起给自己贴标签，我更愿意持续做些有趣、可靠，也有一点点个性的东西。',
  stack: ['Python', 'MCP', 'Agentic RAG', 'TypeScript', 'Docker', 'Local-first'],
  links: { github: 'https://github.com/Sylvia145', email: 'hello@example.com' },
  projects: [
    { title: 'LiveGraphRAG', subtitle: 'Verifiable Agentic RAG · MCP Server', description: '面向版本敏感知识查询的工程验证项目：让模型调用工具、取回证据，并让最终回答可追溯。', highlights: ['混合检索、图谱增强与证据不足拒答', 'MCP stdio / Streamable HTTP 双传输支持'], tags: ['Python', 'MCP', 'PostgreSQL', 'Neo4j', 'Docker'], href: 'https://github.com/Sylvia145/LiveGraphRAG', image: '' },
    { title: 'Moka', subtitle: 'A local coding agent with memory', description: '一个运行在本地仓库上下文里的轻量 coding agent，把工具、安全边界、会话和运行证据放进同一个可观察 runtime。', highlights: ['可恢复 session、run evidence 与本地 memory', '工具权限、sandbox 与受限 worker 执行'], tags: ['Python', 'TUI', 'LLM Runtime', 'Memory', 'Sandbox'], href: 'https://github.com/Sylvia145/moka', image: '/moka-tui.png' },
  ],
  contactCopy: '有想聊的项目、灵感或好玩的 Agent 实验？欢迎来打个招呼。',
} as const
