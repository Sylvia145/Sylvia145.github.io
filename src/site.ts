export const site = {
  navigation: [{ label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Moments', href: '#moments' }, { label: 'Contact', href: '#contact' }],
  hero: { tagline: 'A little maker, a lot curious.', intro: '我喜欢把模糊的想法拆成小块，再让它们真的跑起来。最近在做 AI Agent、知识检索和本地开发工具。' },
  about: '我是 Sylvia。这里记录我在代码、Agent 和日常创作之间来回穿梭的痕迹。比起给自己贴标签，我更愿意持续做些有趣、可靠，也有一点点个性的东西。',
  stack: ['Python', 'MCP', 'Agentic RAG', 'TypeScript', 'Docker', 'Local-first'],
  links: { github: 'https://github.com/Sylvia145', email: 'hello@example.com' },
  projects: [
    {
      slug: 'livegraphrag', title: 'LiveGraphRAG', subtitle: 'Version-aware knowledge, with proof',
      description: '为版本敏感的私有化软件支持场景构建的 GraphRAG 服务：每一次回答都先经过版本边界、检索证据与引用校验。',
      highlights: ['多版本与 tenant / snapshot 边界，避免旧资料混入当前答案', '关键词、向量、全文与图关系协同检索，保留可点击来源', '引用不足时拒答；异步索引、缓存和观测组件模拟真实运行链路'],
      tags: ['Python', 'FastAPI', 'GraphRAG', 'Neo4j', 'Redis', 'Docker'], href: 'https://github.com/Sylvia145/LiveGraphRAG', image: '', visualLabel: 'evidence-first pipeline',
      detail: {
        eyebrow: '01 / ENGINEERING CASE', headline: '答案不只要对，<br />还要能回到证据。',
        intro: 'LiveGraphRAG 将版本、租户与快照作为检索边界。系统先从受约束的知识底座取回候选，再以图关系和证据门禁组织回答，让“我为什么这样回答”也能被追溯。',
        flow: ['问题', '边界校验', '混合检索', '图关系', '证据门禁', '带引用回答'],
        systems: [
          { title: '边界先行', copy: 'tenant、版本与 snapshot 在候选召回前生效，避免跨环境资料污染。' },
          { title: '混合召回', copy: 'PostgreSQL 全文、pgvector 与 Neo4j 路径共同提供候选与关系线索。' },
          { title: '证据优先', copy: 'Agent 先查来源再组织回答；缺少可支持引用时显式停止输出。' },
          { title: '可运行链路', copy: 'Redis、异步索引、限流和 OpenTelemetry 让演示具备工程运行面的完整性。' },
        ],
        evidence: { label: 'OFFLINE EVALUATION', value: 'R@5 0.8929', note: '来自冻结标题型评测集上的离线排序融合实验；该集合存在词法泄漏限制，不能表述为线上能力或独立泛化结论。项目保留失败切片、消融与评测证据，用来约束后续取舍。' },
      },
    },
    {
      slug: 'moka', title: 'Moka', subtitle: 'A local coding agent with memory',
      description: '一个运行在本地仓库上下文里的终端 coding agent，把模型调用、工具边界、运行证据和长期记忆收进同一个可观察 runtime。',
      highlights: ['TUI / REPL / one-shot 三种入口，共享一套 runtime 与上下文组装', '文件、搜索、Shell、patch 与子 agent 统一纳入工具协议和权限边界', 'session、run evidence、working memory 与 durable topics 让任务可以续接和复盘'],
      tags: ['Python', 'TUI', 'LLM Runtime', 'Memory', 'Sandbox'], href: 'https://github.com/Sylvia145/moka', image: '/moka-tui.png', visualLabel: 'local-first runtime',
      detail: {
        eyebrow: '02 / ENGINEERING CASE', headline: '让 coding agent<br />留在你的仓库里。',
        intro: 'Moka 将本地仓库作为 agent 的工作上下文：它能读代码、调用工具、执行受限操作，并把会话、事件与有价值的上下文沉淀在本地。重点不是“自动化更多”，而是让每一步都看得见、接得上。',
        flow: ['任务', 'Provider / Context', 'Tools', 'Approval / Sandbox', 'Run evidence', 'Memory / Dream'],
        systems: [
          { title: '本地优先', copy: '配置、session、运行证据和记忆均落在项目侧，降低跨项目上下文漂移。' },
          { title: '统一 runtime', copy: 'TUI、REPL 与 one-shot 共享 provider profile、上下文装配和工具协议。' },
          { title: '边界可见', copy: '写操作与 Shell 可进入审批或 sandbox；trace、report 和事件流可供复盘。' },
          { title: '长期协作', copy: 'working memory 与 durable topics 将 daily log 整理为可延续的本地主题。' },
        ],
        evidence: { label: 'DESIGN PRINCIPLE', value: 'Local-first', note: 'Moka 的核心约束是：任务状态可恢复、工具操作有边界、运行结果可复盘。它优先服务于长期使用的本地代码仓库，而不是一次性的聊天演示。' },
      },
    },
  ],
  contactCopy: '有想聊的项目、灵感或好玩的 Agent 实验？欢迎来打个招呼。',
} as const
