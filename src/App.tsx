import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, Code2, Mail, Menu, Sparkles, Terminal, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site } from './site'
import './App.css'

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65 } }
type Project = typeof site.projects[number]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [avatarReady, setAvatarReady] = useState(false)
  const [avatarFinished, setAvatarFinished] = useState(false)
  const reduceMotion = useReducedMotion()
  const avatarVideo = useRef<HTMLVideoElement>(null)
  const closeMenu = () => setMenuOpen(false)

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
    <header className="site-header">
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Sylvia 主页"><span className="brand-mark">S</span><span>SYLVIA</span></a>
      <button className="menu-button" aria-label="打开导航" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="主导航">{site.navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}</nav>
      <a className="header-github" href={site.links.github} target="_blank" rel="noreferrer"><Code2 size={16} /> GitHub</a>
    </header>
    <section className="hero" id="top">
      <motion.div className="hero-copy" {...fadeUp}><p className="eyebrow"><span /> HELLO, I&apos;M</p><h1>SYLVIA<span className="period">.</span></h1><p className="hero-line">{site.hero.tagline}</p><p className="hero-intro">{site.hero.intro}</p><div className="hero-actions"><a className="button button-dark" href="#projects">See my projects <ArrowDown size={16} /></a><a className="button button-light" href={`mailto:${site.links.email}`}>Say hi <Mail size={16} /></a></div></motion.div>
      <motion.div className="avatar-stage" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}><div className="avatar-orbit"><div className="avatar-halo" aria-hidden="true" /><motion.div className="avatar-wrap" animate={reduceMotion ? {} : {}}><video ref={avatarVideo} className={avatarReady && !avatarFinished ? 'avatar-video is-ready' : 'avatar-video'} muted playsInline preload="auto" onLoadedData={() => setAvatarReady(true)} onEnded={() => setAvatarFinished(true)} aria-label="Sylvia 的动态粉黑风格 3D 玩偶形象"><source src="/sylvia-avatar.mp4" type="video/mp4" /></video><img className={avatarFinished ? 'avatar-final is-visible' : 'avatar-final'} src="/sylvia-avatar-final.webp" alt="Sylvia 的粉黑风格 3D 玩偶形象" /></motion.div><div className="avatar-hit-area" onPointerEnter={playAvatarOnHover} aria-hidden="true" /></div><motion.div className="sticker sticker-now" animate={reduceMotion ? {} : { y: [0, -7, 0], rotate: [2, -2, 2] }} transition={{ duration: 4.5, repeat: Infinity }}><span>NOW</span><strong>building<br />with AI</strong></motion.div><motion.div className="sticker sticker-spark" animate={reduceMotion ? {} : { rotate: [0, 12, 0] }} transition={{ duration: 4, repeat: Infinity }}><Sparkles size={19} /></motion.div></motion.div>
    </section>
    <section className="section about" id="about"><motion.div {...fadeUp}><p className="section-index">01 / ABOUT ME</p><h2>把好奇心，<br />做成可以运行的东西。</h2></motion.div><motion.div className="about-note" {...fadeUp}><p>{site.about}</p><div className="stack-list">{site.stack.map((item) => <span key={item}>{item}</span>)}</div></motion.div></section>
    <section className="section projects" id="projects"><motion.div className="section-heading" {...fadeUp}><p className="section-index">02 / SELECTED BUILDS</p><h2>两件正在生长的作品。</h2><p>从可验证的知识检索，到有边界的本地 coding agent。</p></motion.div><div className="project-grid">{site.projects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}</div></section>
    <section className="section moments" id="moments"><motion.div className="section-heading" {...fadeUp}><p className="section-index">03 / SMALL MOMENTS</p><h2>也给生活留一点镜头。</h2></motion.div><div className="moment-grid"><motion.article className="photo-card" {...fadeUp}><div className="placeholder-photo"><span>PHOTO</span><p>摄影作品<br />coming soon</p></div><div><p className="project-number">01</p><h3>Through my lens</h3><p>一张留给光和日常的照片。</p></div></motion.article><motion.article className="video-card" {...fadeUp}><video className="aigc-video" src="/aigc-transition.mp4?v=2" autoPlay loop muted playsInline controls preload="metadata" aria-label="AIGC 转场视频" /><div><p className="project-number">02</p><h3>A tiny AIGC experiment</h3><p>抖音 2.6 万播放 · 1021 点赞的 AIGC 转场小实验。</p></div></motion.article></div></section>
    <Contact />
  </main>
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return <motion.article className={`project-card project-${index + 1}`} {...fadeUp}>
    <div className="project-visual" aria-label={`${project.title} 项目预览`}>{'previewSlides' in project ? <ProductPreviewCarousel slides={project.previewSlides} /> : project.image ? <><img src={project.image} alt="Moka 终端界面预览" loading="lazy" /><span className="project-visual-meta"><Terminal size={14} /> {project.visualLabel}</span></> : null}</div>
    <div className="project-body"><p className="project-number">0{index + 1}</p><h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p><ul>{project.highlights.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="project-link" href={project.href} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={17} /></a></div>
  </motion.article>
}

function ProductPreviewCarousel({ slides }: { slides: readonly { src: string, label: string, caption: string, alt: string }[] }) {
  const reduceMotion = useReducedMotion()
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 3500)
    return () => window.clearInterval(timer)
  }, [reduceMotion, slides.length])

  return <div className="project-carousel" role="region" aria-label="LiveGraphRAG 产品界面预览">
    {slides.map((slide, index) => <img className={index === activeSlide ? 'carousel-image is-active' : 'carousel-image'} src={slide.src} alt={slide.alt} key={slide.src} />)}
    <div className="carousel-caption"><span>{String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span><strong>{slides[activeSlide].label}</strong><p>{slides[activeSlide].caption}</p></div>
    <div className="carousel-dots" aria-label="切换产品截图">{slides.map((slide, index) => <button className={index === activeSlide ? 'is-active' : ''} type="button" onClick={() => setActiveSlide(index)} aria-label={`显示：${slide.label}`} aria-pressed={index === activeSlide} key={slide.src} />)}</div>
  </div>
}

function Contact() { return <motion.section className="contact" id="contact" {...fadeUp}><p className="section-index">04 / LET&apos;S TALK</p><h2>Let&apos;s make<br />something nice<span className="period">.</span></h2><p>{site.contactCopy}</p><div className="contact-actions"><a className="button button-pink" href={`mailto:${site.links.email}`}><Mail size={17} /> Write me</a><a className="button button-outline" href={site.links.github} target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a></div><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></motion.section> }
function Background() { return <><div className="background-orb orb-one" aria-hidden="true" /><div className="background-orb orb-two" aria-hidden="true" /><div className="bubble bubble-one" aria-hidden="true" /><div className="bubble bubble-two" aria-hidden="true" /></> }
export default App
