import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, ChevronRight, Code2, Mail, Menu, Play, ShieldCheck, Sparkles, Terminal, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site } from './site'
import './App.css'

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65 } }
type Project = typeof site.projects[number]

function getProjectSlug() {
  const match = window.location.hash.match(/^#\/projects\/([a-z0-9-]+)/)
  return match?.[1] ?? null
}

function App() {
  const [slug, setSlug] = useState(getProjectSlug)

  useEffect(() => {
    const onHashChange = () => {
      setSlug(getProjectSlug())
      const anchor = window.location.hash.match(/^#([a-z-]+)$/)?.[1]
      if (anchor) window.setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const project = site.projects.find((item) => item.slug === slug)
  return project ? <ProjectDetail project={project} /> : <Home />
}

function Header({ detail = false }: { detail?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <header className="site-header">
    <a className="brand" href="#top" onClick={closeMenu} aria-label="Sylvia 主页"><span className="brand-mark">S</span><span>SYLVIA</span></a>
    <button className="menu-button" aria-label="打开导航" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="主导航">
      {detail ? <a href="#projects" onClick={closeMenu}>Projects</a> : site.navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
    </nav>
    <a className="header-github" href={site.links.github} target="_blank" rel="noreferrer"><Code2 size={16} /> GitHub</a>
  </header>
}

function Home() {
  const [showVideo, setShowVideo] = useState(false)
  const [avatarReady, setAvatarReady] = useState(false)
  const [avatarFinished, setAvatarFinished] = useState(false)
  const reduceMotion = useReducedMotion()
  const avatarVideo = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!reduceMotion) void avatarVideo.current?.play().catch(() => undefined)
  }, [reduceMotion])

  const playAvatarOnHover = () => {
    const video = avatarVideo.current
    if (!video || reduceMotion) return
    if (video.ended || avatarFinished) {
      video.currentTime = 0
      setAvatarFinished(false)
    }
    void video.play().catch(() => undefined)
  }

  return <main>
    <Background />
    <Header />
    <section className="hero" id="top">
      <motion.div className="hero-copy" {...fadeUp}><p className="eyebrow"><span /> HELLO, I&apos;M</p><h1>SYLVIA<span className="period">.</span></h1><p className="hero-line">{site.hero.tagline}</p><p className="hero-intro">{site.hero.intro}</p><div className="hero-actions"><a className="button button-dark" href="#projects">See my projects <ArrowDown size={16} /></a><a className="button button-light" href={`mailto:${site.links.email}`}>Say hi <Mail size={16} /></a></div></motion.div>
      <motion.div className="avatar-stage" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}><div className="avatar-orbit"><div className="avatar-halo" aria-hidden="true" /><motion.div className="avatar-wrap" animate={reduceMotion ? {} : {}}><video ref={avatarVideo} className={avatarReady && !avatarFinished ? 'avatar-video is-ready' : 'avatar-video'} muted playsInline preload="auto" onLoadedData={() => setAvatarReady(true)} onEnded={() => setAvatarFinished(true)} aria-label="Sylvia 的动态粉黑风格 3D 玩偶形象"><source src="/sylvia-avatar.mp4" type="video/mp4" /></video><img className={avatarFinished ? 'avatar-final is-visible' : 'avatar-final'} src="/sylvia-avatar-final.webp" alt="Sylvia 的粉黑风格 3D 玩偶形象" /></motion.div><div className="avatar-hit-area" onPointerEnter={playAvatarOnHover} aria-hidden="true" /></div><motion.div className="sticker sticker-now" animate={reduceMotion ? {} : { y: [0, -7, 0], rotate: [2, -2, 2] }} transition={{ duration: 4.5, repeat: Infinity }}><span>NOW</span><strong>building<br />with AI</strong></motion.div><motion.div className="sticker sticker-spark" animate={reduceMotion ? {} : { rotate: [0, 12, 0] }} transition={{ duration: 4, repeat: Infinity }}><Sparkles size={19} /></motion.div></motion.div>
    </section>
    <section className="section about" id="about"><motion.div {...fadeUp}><p className="section-index">01 / ABOUT ME</p><h2>把好奇心，<br />做成可以运行的东西。</h2></motion.div><motion.div className="about-note" {...fadeUp}><p>{site.about}</p><div className="stack-list">{site.stack.map((item) => <span key={item}>{item}</span>)}</div></motion.div></section>
    <section className="section projects" id="projects"><motion.div className="section-heading" {...fadeUp}><p className="section-index">02 / SELECTED BUILDS</p><h2>两件正在生长的作品。</h2><p>从可验证的知识检索，到有边界的本地 coding agent。</p></motion.div><div className="project-grid">{site.projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div></section>
    <section className="section moments" id="moments"><motion.div className="section-heading" {...fadeUp}><p className="section-index">03 / SMALL MOMENTS</p><h2>也给生活留一点镜头。</h2></motion.div><div className="moment-grid"><motion.article className="photo-card" {...fadeUp}><div className="placeholder-photo"><span>PHOTO</span><p>摄影作品<br />coming soon</p></div><div><p className="project-number">01</p><h3>Through my lens</h3><p>一张留给光和日常的照片。</p></div></motion.article><motion.article className="video-card" {...fadeUp}><button className="video-placeholder" onClick={() => setShowVideo(true)} aria-label="播放 AIGC 转场视频"><span className="video-glow" /><span className="play-icon"><Play size={22} fill="currentColor" /></span><span>AIGC transition · video coming soon</span></button><div><p className="project-number">02</p><h3>A tiny AIGC experiment</h3><p>一个收获千赞的转场视频，等素材到位后在这里播放。</p></div></motion.article></div></section>
    <Contact />
    {showVideo && <div className="video-modal" role="dialog" aria-modal="true" aria-label="AIGC 视频占位提示" onClick={() => setShowVideo(false)}><div className="modal-card" onClick={(event) => event.stopPropagation()}><button onClick={() => setShowVideo(false)} aria-label="关闭">×</button><Sparkles size={32} /><h3>Video coming soon</h3><p>在 <code>src/site.ts</code> 填入视频与封面路径后，这里会显示你的 AIGC 转场视频。</p></div></div>}
  </main>
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return <motion.article className={`project-card project-${index + 1}`} {...fadeUp}>
    <div className="project-visual" aria-label={`${project.title} 项目预览`}>{project.image ? <><img src={project.image} alt="Moka 终端界面预览" loading="lazy" /><span className="project-visual-meta"><Terminal size={14} /> {project.visualLabel}</span></> : <GraphVisual />}</div>
    <div className="project-body"><p className="project-number">0{index + 1}</p><h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p><ul>{project.highlights.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><a className="project-detail-link" href={`#/projects/${project.slug}`}>技术详情 <ChevronRight size={16} /></a><a className="project-link" href={project.href} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} /></a></div></div>
  </motion.article>
}

function ProjectDetail({ project }: { project: Project }) {
  return <main className="detail-page">
    <Background />
    <Header detail />
    <article className="case-study" id="top">
      <motion.div className="case-hero" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}><a className="case-back" href="#projects"><ArrowLeft size={16} /> Back to projects</a><p className="section-index">{project.detail.eyebrow}</p><h1 dangerouslySetInnerHTML={{ __html: project.detail.headline }} /><p>{project.detail.intro}</p><div className="case-actions"><a className="button button-dark" href={project.href} target="_blank" rel="noreferrer"><Code2 size={17} /> View on GitHub</a><a className="button button-light" href="#projects">All projects <ArrowDown size={16} /></a></div></motion.div>
      <motion.section className="case-flow-card" {...fadeUp}><div className="case-flow-head"><p className="section-index">SYSTEM FLOW</p><span>{project.subtitle}</span></div><FlowDiagram steps={project.detail.flow} project={project.slug} /></motion.section>
      <section className="case-section"><motion.div className="case-section-heading" {...fadeUp}><p className="section-index">HOW IT IS BUILT</p><h2>把能力拆成<br />可验证的工程模块。</h2></motion.div><div className="case-system-grid">{project.detail.systems.map((item, index) => <motion.article className="case-system-card" key={item.title} {...fadeUp}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></motion.article>)}</div></section>
      {project.image && <motion.section className="case-screenshot" {...fadeUp}><div><p className="section-index">RUNTIME SNAPSHOT</p><h2>一个真正工作的<br />终端工作区。</h2><p>同一个 runtime 提供 TUI、REPL 与 one-shot 入口。界面不只是聊天窗口，也承载工具结果、状态、命令补全和当前 session 的上下文。</p></div><img src={project.image} alt="Moka TUI 终端工作区截图" loading="lazy" /></motion.section>}
      <motion.section className="case-evidence" {...fadeUp}><div><p className="section-index">{project.detail.evidence.label}</p><strong>{project.detail.evidence.value}</strong></div><p>{project.detail.evidence.note}</p></motion.section>
    </article>
    <Contact />
  </main>
}

function FlowDiagram({ steps, project }: { steps: readonly string[], project: string }) {
  return <div className={`flow-diagram flow-${project}`}>{steps.map((step, index) => <div className="flow-item" key={step}><motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></motion.div>{index < steps.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>
}

function GraphVisual() { return <div className="graph-visual"><div className="graph-label">LIVE / EVIDENCE FLOW</div><div className="graph-lines"><i /><i /><i /><i /><i /></div><div className="graph-node node-a">query</div><div className="graph-node node-b">graph</div><div className="graph-node node-c">proof</div><div className="graph-status"><ShieldCheck size={16} /> sources<br /><strong>required</strong></div></div> }

function Contact() { return <motion.section className="contact" id="contact" {...fadeUp}><p className="section-index">04 / LET&apos;S TALK</p><h2>Let&apos;s make<br />something nice<span className="period">.</span></h2><p>{site.contactCopy}</p><div className="contact-actions"><a className="button button-pink" href={`mailto:${site.links.email}`}><Mail size={17} /> Write me</a><a className="button button-outline" href={site.links.github} target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a></div><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></motion.section> }

function Background() { return <><div className="background-orb orb-one" aria-hidden="true" /><div className="background-orb orb-two" aria-hidden="true" /><div className="bubble bubble-one" aria-hidden="true" /><div className="bubble bubble-two" aria-hidden="true" /></> }

export default App
