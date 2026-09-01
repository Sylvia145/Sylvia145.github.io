export const site = {
  navigation: [{ label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Moments', href: '#moments' }, { label: 'Contact', href: '#contact' }],
  hero: { tagline: 'A little maker, a lot curious.', intro: '我喜欢把模糊的想法拆成小块，再让它们真的跑起来。最近在做 AI Agent、知识检索和本地开发工具。' },
  about: '我是 Sylvia。这里记录我在代码、Agent 和日常创作之间来回穿梭的痕迹。比起给自己贴标签，我更愿意持续做些有趣、可靠，也有一点点个性的东西。',
  stack: ['Python', 'MCP', 'Agentic RAG', 'TypeScript', 'Docker', 'Local-first'],
  links: { github: 'https://github.com/Sylvia145', email: 'hello@example.com' },
  projects: [
    {
      title: 'LiveGraphRAG', subtitle: 'Version-aware knowledge, with proof',
      description: '为版本敏感的私有化软件支持场景构建的 GraphRAG 服务：每一次回答都先经过版本边界、检索证据与引用校验。',
      highlights: ['多版本与 tenant / snapshot 边界，避免旧资料混入当前答案', '关键词、向量、全文与图关系协同检索，保留可点击来源', '引用不足时拒答；异步索引、缓存和观测组件模拟真实运行链路'],
      tags: ['Python', 'FastAPI', 'GraphRAG', 'Neo4j', 'Redis', 'Docker'], href: 'https://github.com/Sylvia145/LiveGraphRAG', image: '', visualLabel: 'evidence-first pipeline',
    },
    {
      title: 'Moka', subtitle: 'A local coding agent with memory',
      description: '一个运行在本地仓库上下文里的终端 coding agent，把模型调用、工具边界、运行证据和长期记忆收进同一个可观察 runtime。',
      highlights: ['TUI / REPL / one-shot 三种入口，共享一套 runtime 与上下文组装', '文件、搜索、Shell、patch 与子 agent 统一纳入工具协议和权限边界', 'session、run evidence、working memory 与 durable topics 让任务可以续接和复盘'],
      tags: ['Python', 'TUI', 'LLM Runtime', 'Memory', 'Sandbox'], href: 'https://github.com/Sylvia145/moka', image: '/moka-tui.png', visualLabel: 'local-first runtime',
    },
  ],
  contactCopy: '有想聊的项目、灵感或好玩的 Agent 实验？欢迎来打个招呼。',
} as const
