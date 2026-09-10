import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Award, BookOpen, Camera, Check, ChevronLeft, ChevronRight, Code2, Download, Dumbbell, ExternalLink, Mail, MapPin, Menu, Music, Sparkles, Ticket, Trophy, X, ZoomIn } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site } from './site'
import './App.css'

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65 } }
type Project = typeof site.projects[number]
type ResearchOutput = typeof site.researchOutputs[number]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [avatarReady, setAvatarReady] = useState(false)
  const [avatarFinished, setAvatarFinished] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const reduceMotion = useReducedMotion()
  const avatarVideo = useRef<HTMLVideoElement>(null)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!reduceMotion) void avatarVideo.current?.play().catch(() => undefined)
  }, [reduceMotion])

  useEffect(() => {
    const sections = site.navigation.map(({ href }) => document.querySelector(href)).filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-18% 0px -62%', threshold: [0.1, 0.35, 0.6] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

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
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="主导航">{site.navigation.map((item) => <a className={activeSection === item.href.slice(1) ? 'is-active' : ''} aria-current={activeSection === item.href.slice(1) ? 'page' : undefined} key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}<a className="mobile-resume" href="/liuxinyi_resume.pdf" download="北邮-刘欣怡-简历.pdf" onClick={closeMenu}><Download size={16} /> 下载简历</a></nav>
      <a className="header-resume" href="/liuxinyi_resume.pdf" download="北邮-刘欣怡-简历.pdf"><Download size={16} /> 下载简历</a>
    </header>
    <section className="hero" id="top">
      <motion.div className="hero-copy" {...fadeUp}><p className="eyebrow"><span className="eyebrow-rule" /><span>HELLO, I&apos;M</span></p><h1>刘欣怡</h1><p className="hero-line">{site.hero.tagline}</p><p className="hero-intro">{site.hero.intro}</p><div className="hero-actions"><a className="button button-dark" href="#projects">查看项目 <ArrowDown size={16} /></a><a className="button button-light" href={site.links.github} target="_blank" rel="noreferrer">GitHub <Code2 size={16} /></a></div></motion.div>
      <motion.div className="avatar-stage" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}><div className="avatar-orbit"><div className="avatar-halo" aria-hidden="true" /><motion.div className="avatar-wrap" animate={reduceMotion ? {} : {}}><video ref={avatarVideo} className={avatarReady && !avatarFinished ? 'avatar-video is-ready' : 'avatar-video'} muted playsInline preload="auto" onLoadedData={() => setAvatarReady(true)} onEnded={() => setAvatarFinished(true)} aria-label="Sylvia 的动态粉黑风格 3D 玩偶形象"><source src="/sylvia-avatar.mp4?v=2" type="video/mp4" /></video><img className={avatarFinished ? 'avatar-final is-visible' : 'avatar-final'} src="/sylvia-avatar-final.webp?v=2" alt="Sylvia 的粉黑风格 3D 玩偶形象" /></motion.div><div className="avatar-hit-area" onPointerEnter={playAvatarOnHover} aria-hidden="true" /></div><motion.div className="sticker sticker-now" animate={reduceMotion ? {} : { y: [0, -7, 0], rotate: [2, -2, 2] }} transition={{ duration: 4.5, repeat: Infinity }}><span>NOW</span><strong>building<br />with AI</strong></motion.div><motion.div className="sticker sticker-spark" animate={reduceMotion ? {} : { rotate: [0, 12, 0] }} transition={{ duration: 4, repeat: Infinity }}><Sparkles size={19} /></motion.div></motion.div>
    </section>
    <section className="section about" id="about"><motion.figure className="about-photo" {...fadeUp}><img src="/my-photo.webp" alt="刘欣怡的个人照片" loading="lazy" decoding="async" /><figcaption>SYLVIA / 2026</figcaption></motion.figure><motion.div className="about-note" {...fadeUp}><p className="section-index">01 / ABOUT ME</p><p>我是刘欣怡，也可以叫我 Sylvia。北邮硕士在读，本科毕业于北科大。喜欢摄影和旅行，也爱自己动手折腾 —— 从 AIGC 小实验到 AI Agent，好玩的东西都愿意试一遍。</p></motion.div></section>
    <Education />
    <Internship />
    <section className="section projects" id="projects"><motion.div className="section-heading" {...fadeUp}><p className="section-index">04 / SELECTED BUILDS</p><h2>两件成形的作品。</h2><p>从可验证的知识检索，到有边界的本地 coding agent。</p></motion.div><div className="project-grid">{site.projects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}</div></section>
    <Research />
    <Awards />
    <CampusActivities />
    <section className="section moments" id="moments"><motion.div className="section-heading" {...fadeUp}><p className="section-index">08 / SMALL MOMENTS</p><h2>也给生活留一点镜头。</h2></motion.div><div className="moment-grid"><motion.article className="photo-card" {...fadeUp}><PhotoCarousel photos={site.photography} /><div><p className="project-number">01</p><h3>我和我镜头里的风景</h3><p>热爱镜头里的风景，也热爱每一个鲜活的自己。</p></div></motion.article><motion.article className="video-card" {...fadeUp}><video className="aigc-video" src="/aigc-transition.mp4?v=3" autoPlay loop muted playsInline controls preload="metadata" aria-label="AIGC 转场视频" /><div><p className="project-number">02</p><h3>AIGC 转场视频初尝试</h3><p><strong>2.6 万</strong>播放 · <strong>1021</strong>点赞的 AIGC 转场小实验。</p></div></motion.article></div></section>
    <Hobbies />
    <Contact />
  </main>
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return <motion.article className={`project-card project-${index + 1}`} {...fadeUp}>
    <div className="project-visual" aria-label={`${project.title} 项目预览`}><ProductPreviewCarousel title={project.title} slides={project.previewSlides} /></div>
    <div className="project-body"><p className="project-number">0{index + 1}</p><h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p><ul>{project.highlights.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="project-link" href={project.href} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={17} /></a></div>
  </motion.article>
}

function Research() { return <section className="section research" id="research"><motion.div className="section-heading research-heading" {...fadeUp}><p className="section-index">05 / RESEARCH OUTPUT</p><h2>让研究落到真实传输系统。</h2><p>从 GSNR 感知建模，到动态多波段光网络的传输优化。</p></motion.div><div className="research-grid">{site.researchOutputs.map((output) => <ResearchCard output={output} key={output.title} />)}</div></section> }

function ResearchCard({ output }: { output: ResearchOutput }) {
  const [modal, setModal] = useState<'image' | 'details' | null>(null)
  const [imageFailed, setImageFailed] = useState(false)
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setModal(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])
  return <motion.article className="research-card" {...fadeUp}>
    <button className="research-cover" type="button" aria-label={`放大查看${output.kind}成果图`} onClick={() => !imageFailed && setModal('image')}>{imageFailed ? <ResearchPlaceholder label={output.placeholder} /> : <><img src={output.thumbnail} alt={`${output.kind}成果配图`} loading="lazy" decoding="async" onError={() => setImageFailed(true)} /><span aria-hidden="true"><ZoomIn size={17} /></span></>}</button>
    <div className="research-body"><div className="research-meta"><span>{output.kind}</span><span>{output.date}</span></div><p className="research-venue">{output.venue}</p><h3>{output.title}</h3><p className="research-summary">{output.summary}</p><div className="research-metrics">{output.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div><div className="research-actions"><button type="button" className="research-toggle" onClick={() => setModal('details')}>查看研究详情<ArrowUpRight size={16} /></button><a href={output.href} target="_blank" rel="noreferrer">查看{output.kind === '论文' ? ' IEEE 论文' : '专利信息'}<ExternalLink size={15} /></a></div></div>
    {modal && <div className="research-modal" role="presentation" onClick={() => setModal(null)}><section className={modal === 'image' ? 'research-modal-card is-image' : 'research-modal-card'} role="dialog" aria-modal="true" aria-label={modal === 'image' ? `${output.kind}成果图预览` : `${output.kind}研究详情`} onClick={(event) => event.stopPropagation()}><button className="research-modal-close" type="button" aria-label="关闭" onClick={() => setModal(null)}><X size={18} /></button>{modal === 'image' ? <img src={output.image} alt={`${output.kind}成果图原图`} /> : <><p>{output.venue} · {output.date}</p><h3>{output.title}</h3><div>{output.details}</div></>}</section></div>}
  </motion.article>
}

function ResearchPlaceholder({ label }: { label: string }) { return <div className="research-placeholder" aria-label={label}><BookOpen size={26} strokeWidth={1.4} /><span>{label}</span></div> }

function Awards() { return <section className="section awards" id="awards"><motion.div className="section-heading awards-heading" {...fadeUp}><p className="section-index">06 / COMPETITIONS & HONORS</p><h2>把热爱做成结果。</h2><p>在一次次建模、设计与工程实践里，把好奇心变成确定的成长。</p></motion.div><div className="award-group"><div className="award-group-heading"><Trophy size={20} /><h3>大赛经历</h3></div><div className="competition-grid">{site.competitions.map((competition) => <motion.article className={'featured' in competition && competition.featured ? 'competition-card is-featured' : 'competition-card'} {...fadeUp} key={competition.title}><span>{competition.date}</span><h4>{competition.title}</h4><b>{competition.level}</b></motion.article>)}</div></div><div className="award-group honor-group"><div className="award-group-heading"><Award size={20} /><h3>奖励荣誉</h3></div><div className="honor-timeline">{site.honors.map((honor) => <motion.article className="honor-item" {...fadeUp} key={`${honor.date}-${honor.title}`}><time>{honor.date}</time><div><h4>{honor.title}</h4><span>{honor.level}</span></div></motion.article>)}</div></div></section> }

function Education() { const schools = [{ school: '北京邮电大学', date: '2024.09 — 2027.06', degree: '硕士研究生 / 信息与通信工程', note: '继续在信息技术与智能应用的交汇处探索。', image: 'https://vi.bupt.edu.cn/__local/3/32/0A/D05F3BDE83F3FFE3469BC6AC376_FE6A2291_67EFCF.jpg', alt: '北京邮电大学海淀校区西门' }, { school: '北京科技大学', date: '2020.09 — 2024.06', degree: '本科 / 通信工程', note: '在工程实践与通信技术学习中打下扎实的根基。', image: 'https://ai.ustb.edu.cn/images/2023-06/771716b536ee41abb0af7cfd420f1ad0.jpg', alt: '北京科技大学校园入口' }] as const; return <section className="section education" id="education"><motion.div className="section-heading education-heading" {...fadeUp}><p className="section-index">02 / LEARNING PATH</p><h2>我的学习坐标。</h2></motion.div><div className="education-track">{schools.map((school, index) => <motion.article className="education-card" {...fadeUp} key={school.school}><img src={school.image} alt={school.alt} /><div className="education-copy"><em>{school.date}</em><p>{school.degree}</p><h3>{school.school}</h3><span>{school.note}</span></div><b>{String(index + 1).padStart(2, '0')}</b></motion.article>)}<span className="education-line" aria-hidden="true">成长路径</span></div></section> }

function CampusActivities() { return <section className="section campus" id="campus"><motion.div className="section-heading campus-heading" {...fadeUp}><p className="section-index">07 / CAMPUS WORK</p><h2>在校园里，把事做成。</h2><p>从带队实践到服务同学，在组织与讲授中锻炼沟通、协作与担当。</p></motion.div><div className="campus-grid">{site.campusActivities.map((activity, index) => <motion.article className={'featured' in activity && activity.featured ? 'campus-card is-featured' : 'campus-card'} {...fadeUp} key={activity.role}><p>{activity.date}</p><h3>{activity.role}</h3><div className="campus-tags">{activity.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div><div><i>{String(index + 1).padStart(2, '0')}</i><p>{activity.summary}</p></div></motion.article>)}</div></section> }

function Internship() { const highlights = [{ label: '工具生命周期', copy: '将全量替换重构为“增量合并 + 双层老化淘汰”，让多轮对话中的工具复用更稳定。' }, { label: '并发互斥', copy: '设计基于数据库行的跨实例会话锁，覆盖加锁、续期、解锁与定时清理，27 项单测覆盖主路径。' }, { label: 'Agent 提示调优', copy: '建立错例收集、根因定位、策略优化与回归验证闭环，覆盖 2000+ 测评用例，准确率提升至 90% 以上。' }, { label: 'AI 工作流沉淀与分享', copy: '将接口开发 SOP 抽象为可复用 Skill，并在组内分享 AI 辅助研发的方法论与实践，覆盖 40+ 人，让个人提效经验沉淀为团队协作能力。' }] as const; return <section className="section internship" id="internship"><motion.div className="section-heading" {...fadeUp}><p className="section-index">03 / INTERNSHIP</p><h2>把 Agent 做进真实业务。</h2></motion.div><motion.article className="internship-card" {...fadeUp}><div className="internship-head"><div><p>华为技术有限公司 · 2026.06 — 2026.08</p><h3>AI 开发工程师（实习）</h3><span>网络运维 Agent · 大模型智能问答系统</span></div><b>HUAWEI</b></div><div className="internship-highlights">{highlights.map((item, index) => <div key={item.label}><span>0{index + 1}</span><h4>{item.label}</h4><p>{item.copy}</p></div>)}</div></motion.article></section> }

function ProductPreviewCarousel({ title, slides }: { title: string, slides: readonly { src: string, label: string, caption: string, alt: string }[] }) {
  const reduceMotion = useReducedMotion()
  const [activeSlide, setActiveSlide] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (reduceMotion || hovered) return
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 3500)
    return () => window.clearInterval(timer)
  }, [hovered, reduceMotion, slides.length])

  const go = (delta: number) => setActiveSlide((current) => (current + delta + slides.length) % slides.length)

  return <div className="project-carousel" role="region" aria-label={`${title} 产品界面预览`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    {slides.map((slide, index) => <img className={index === activeSlide ? 'carousel-image is-active' : 'carousel-image'} src={slide.src} alt={slide.alt} key={slide.src} />)}
    <button className="carousel-arrow carousel-arrow-prev" type="button" onClick={() => go(-1)} aria-label="上一张产品截图"><ChevronLeft size={20} /></button>
    <button className="carousel-arrow carousel-arrow-next" type="button" onClick={() => go(1)} aria-label="下一张产品截图"><ChevronRight size={20} /></button>
    <div className="carousel-caption"><span>{String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span><strong>{slides[activeSlide].label}</strong><p>{slides[activeSlide].caption}</p></div>
    <div className="carousel-dots" aria-label="切换产品截图">{slides.map((slide, index) => <button className={index === activeSlide ? 'is-active' : ''} type="button" onClick={() => setActiveSlide(index)} aria-label={`显示：${slide.label}`} aria-pressed={index === activeSlide} key={slide.src} />)}</div>
  </div>
}

function PhotoCarousel({ photos }: { photos: readonly { src: string, alt: string }[] }) {
  const reduceMotion = useReducedMotion()
  const [activePhoto, setActivePhoto] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (reduceMotion || hovered) return
    const timer = window.setInterval(() => setActivePhoto((current) => (current + 1) % photos.length), 4200)
    return () => window.clearInterval(timer)
  }, [hovered, photos.length, reduceMotion])

  const go = (delta: number) => setActivePhoto((current) => (current + delta + photos.length) % photos.length)

  const photo = photos[activePhoto]

  return <div className="photo-carousel" role="region" aria-label="Sylvia 的摄影作品轮播" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <figure className="photo-slide is-active" key={photo.src}><img className="photo-slide-blur" src={photo.src} alt="" aria-hidden="true" /><img className="photo-slide-image" src={photo.src} alt={photo.alt} loading="lazy" /></figure>
    <button className="photo-arrow photo-arrow-prev" type="button" onClick={() => go(-1)} aria-label="上一张摄影作品"><ChevronLeft size={20} /></button>
    <button className="photo-arrow photo-arrow-next" type="button" onClick={() => go(1)} aria-label="下一张摄影作品"><ChevronRight size={20} /></button>
    <span className="photo-counter">{String(activePhoto + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
    <div className="photo-dots" aria-label="切换摄影作品">{photos.map((photo, index) => <button className={index === activePhoto ? 'is-active' : ''} type="button" onClick={() => setActivePhoto(index)} aria-label={`显示第 ${index + 1} 张摄影作品`} aria-pressed={index === activePhoto} key={photo.src} />)}</div>
  </div>
}

function Contact() { return <motion.section className="contact" id="contact" {...fadeUp}><p className="section-index">10 / LET&apos;S TALK</p><h2>Let&apos;s make<br />something nice<span className="period">.</span></h2><p>{site.contactCopy}</p><div className="contact-actions"><a className="button button-pink" href={`mailto:${site.links.email}`}><Mail size={17} /> 联系我</a><a className="button button-outline" href={site.links.github} target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a></div><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>回到顶部 ↑</button></motion.section> }
function Hobbies() { const hobbies = [{ icon: Camera, title: '摄影', copy: '把路上的光、风景和鲜活瞬间留在镜头里。' }, { icon: MapPin, title: '旅游', copy: '去陌生的城市走走，收集新的视角与故事。' }, { icon: Dumbbell, title: '健身', copy: '在规律的运动中保持能量与专注。' }, { icon: Music, title: '跳舞', copy: '跟着节奏释放自己，也享受身体的表达。' }, { icon: Ticket, title: '演唱会', copy: '在现场的灯光和合唱里感受热烈的共鸣。' }] as const; return <section className="section hobbies" id="hobbies"><motion.div className="section-heading hobbies-heading" {...fadeUp}><p className="section-index">09 / OFF THE CLOCK</p><h2>工作之外的我。</h2><p>保持好奇，认真生活，也把体验变成新的创作养分。</p></motion.div><div className="hobby-grid">{hobbies.map(({ icon: Icon, title, copy }, index) => <motion.article className="hobby-card" {...fadeUp} key={title}><span className="hobby-number">0{index + 1}</span><Icon size={26} strokeWidth={1.5} /><h3>{title}</h3><p>{copy}</p></motion.article>)}</div></section> }
function Background() { return <><div className="background-orb orb-one" aria-hidden="true" /><div className="background-orb orb-two" aria-hidden="true" /><div className="bubble bubble-one" aria-hidden="true" /><div className="bubble bubble-two" aria-hidden="true" /></> }
export default App
