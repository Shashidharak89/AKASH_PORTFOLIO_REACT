import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import profileImg from '../assets/hero.png'
import bgImg from '../assets/images/bg1.jpeg'

export default function Hero() {
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const eyebrowRef = useRef(null)
  const taglineRef = useRef(null)
  const descRef = useRef(null)
  const statsRef = useRef(null)
  const actionsRef = useRef(null)
  const imgRef = useRef(null)
  const tagsRef = useRef([])
  const scrollRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 })

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(nameRef.current.querySelectorAll('.first, .last'),
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(statsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(actionsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(imgRef.current,
      { opacity: 0, scale: 0.9, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=1.0'
    )
    .fromTo(tagsRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' },
      '-=0.5'
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    )

    return () => tl.kill()
  }, [])

  const addTagRef = (el) => {
    if (el && !tagsRef.current.includes(el)) tagsRef.current.push(el)
  }

  return (
    <section className="hero" id="home">
      {/* Background */}
      <div className="hero-bg">
        <img className="hero-bg-image" src={bgImg} alt="" aria-hidden="true" />
        <div className="hero-bg-overlay" />
        <div className="hero-grid-lines" />
      </div>

      {/* Content */}
      <div className="hero-content">
        {/* Text */}
        <div className="hero-text-block">
          <div className="hero-eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>
            <span className="hero-eyebrow-dot" />
            Creative Video Editor · Cinematographer
          </div>

          <h1 className="hero-name" ref={nameRef}>
            <span className="first" style={{ opacity: 0 }}>AKASH</span>
            <span className="last" style={{ opacity: 0 }}>KULAL</span>
          </h1>

          <p className="hero-tagline" ref={taglineRef} style={{ opacity: 0 }}>
            Turning ordinary moments into cinematic memories — one unforgettable frame at a time.
          </p>

          <p className="hero-description" ref={descRef} style={{ opacity: 0 }}>
            Based in Udupi, Karnataka. Specializing in bus edits, vehicle videos, housewarming ceremonies,
            poojas, events &amp; cinematic reels with 300K+ social media views.
          </p>

          <div className="hero-stats" ref={statsRef} style={{ opacity: 0 }}>
            <div className="hero-stat">
              <span className="hero-stat-number">300K+</span>
              <span className="hero-stat-label">Views</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">50+</span>
              <span className="hero-stat-label">Projects</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">3+</span>
              <span className="hero-stat-label">Years Editing</span>
            </div>
          </div>

          <div className="hero-actions" ref={actionsRef} style={{ opacity: 0 }}>
            <a href="#reels" className="btn-primary" onClick={e => { e.preventDefault(); document.querySelector('#reels').scrollIntoView({ behavior: 'smooth' }) }}>
              ▶ Watch My Work
            </a>
            <a href="#contact" className="btn-secondary" onClick={e => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) }}>
              Get in Touch
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="hero-visual">
          <div className="hero-profile-wrapper" ref={imgRef} style={{ opacity: 0 }}>
            <div className="hero-orbit" />
            <img
              src={profileImg}
              alt="Akash Kulal - Creative Video Editor"
              className="hero-profile-img"
            />
            <div className="hero-profile-glow" />

            <div className="hero-floating-tag tag--views" ref={addTagRef} style={{ opacity: 0 }}>
              <span className="tag-icon">🎬</span>
              300K+ Views
            </div>
            <div className="hero-floating-tag tag--location" ref={addTagRef} style={{ opacity: 0 }}>
              <span className="tag-icon">📍</span>
              Udupi, Karnataka
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll" ref={scrollRef} style={{ opacity: 0 }}
        onClick={() => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' })}>
        <div className="scroll-line" />
        <span className="scroll-label">Scroll</span>
      </div>
    </section>
  )
}
