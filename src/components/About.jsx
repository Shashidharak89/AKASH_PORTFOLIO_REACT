import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowRight, FiCamera, FiAward, FiInstagram } from 'react-icons/fi'

import bg1 from '../assets/images/bg1.jpeg'
import bg2 from '../assets/images/bg2.jpeg'
import bg3 from '../assets/images/bg3.jpeg'
import bg4 from '../assets/images/bg4.jpeg'
import bg5 from '../assets/images/bg5.jpeg'

gsap.registerPlugin(ScrollTrigger)

const SLIDES = [
  { src: bg1, caption: 'Cinematic Vehicle Shots' },
  { src: bg2, caption: 'Bus Edit — Mahaveera Express' },
  { src: bg3, caption: 'Rally Car — Cinematic Dust' },
  { src: bg4, caption: 'Nighttime Bus Frames' },
  { src: bg5, caption: 'Forest Luxury — BMW Series' },
]

const INTERVAL = 3000   // ms between slides

export default function About() {
  const sectionRef   = useRef(null)
  const textRef      = useRef(null)
  const sliderRef    = useRef(null)
  const slidesRef    = useRef([])   // individual slide img refs
  const dotsRef      = useRef([])
  const captionRef   = useRef(null)
  const [current, setCurrent] = useState(0)
  const currentRef   = useRef(0)
  const timerRef     = useRef(null)
  const animatingRef = useRef(false)

  /* ── Section entrance ──────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      )
      gsap.fromTo(sliderRef.current,
        { opacity: 0, x: 60, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── Slide transition ──────────────────────────────────────── */
  const goTo = (next) => {
    if (animatingRef.current) return
    animatingRef.current = true

    const prev = currentRef.current
    if (next === prev) { animatingRef.current = false; return }

    const prevEl    = slidesRef.current[prev]
    const nextEl    = slidesRef.current[next]
    const prevDot   = dotsRef.current[prev]
    const nextDot   = dotsRef.current[next]
    const caption   = captionRef.current

    // Stack next slide on top, slide in
    gsap.set(nextEl, { zIndex: 2, x: next > prev ? '100%' : '-100%', opacity: 1 })
    gsap.set(prevEl, { zIndex: 1 })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(prevEl, { zIndex: 0, x: 0 })
        currentRef.current  = next
        setCurrent(next)
        animatingRef.current = false
      }
    })

    // Slide images
    tl.to(prevEl,    { x: next > prev ? '-100%' : '100%', duration: 0.75, ease: 'power3.inOut' }, 0)
      .to(nextEl,    { x: '0%',                            duration: 0.75, ease: 'power3.inOut' }, 0)
      // Ken Burns zoom on incoming slide
      .fromTo(nextEl, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: 'power2.out' }, 0)
      // Caption fade
      .to(caption,   { opacity: 0, y: -10, duration: 0.25 }, 0)
      .to(caption,   { opacity: 1, y: 0,   duration: 0.35 }, 0.5)
      // Active dot pulse
      .to(prevDot,   { width: 8,  backgroundColor: 'rgba(212,168,75,0.3)', duration: 0.3 }, 0)
      .to(nextDot,   { width: 28, backgroundColor: 'var(--color-gold)',    duration: 0.3 }, 0)
  }

  /* ── Auto-advance ──────────────────────────────────────────── */
  useEffect(() => {
    const advance = () => {
      const next = (currentRef.current + 1) % SLIDES.length
      goTo(next)
    }
    timerRef.current = setInterval(advance, INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [])

  const handleDot = (i) => {
    clearInterval(timerRef.current)
    goTo(i)
    timerRef.current = setInterval(
      () => { const next = (currentRef.current + 1) % SLIDES.length; goTo(next) },
      INTERVAL
    )
  }

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">

          {/* ── Text Column ─────────────────────────────── */}
          <div className="about-text-col" ref={textRef}>
            <div className="section-label">About Me</div>

            <h2 className="section-title">
              I Don't Just Edit Videos —<br />
              I <span className="gold-text">Tell Stories</span>
            </h2>

            <p className="about-body">
              I'm <strong>Akash Kulal</strong>, a creative videographer and video editor from
              Udupi, Karnataka. I capture more than just videos — I tell stories through creative
              visuals, cinematic shots, and professional editing. My passion is turning ordinary
              moments into memorable films.
            </p>

            <p className="about-body">
              From buses and vehicles to housewarming ceremonies, poojas, events, and special
              moments — every frame is edited with creativity and passion. With 300K+ views
              across social media, I'm on a journey to 1 million.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <FiCamera className="hi-icon" />
                <div>
                  <span className="hi-title">Cinematic Quality</span>
                  <span className="hi-sub">Professional color grading &amp; transitions</span>
                </div>
              </div>
              <div className="highlight-item">
                <FiAward className="hi-icon" />
                <div>
                  <span className="hi-title">300K+ Views</span>
                  <span className="hi-sub">Growing towards 1 million</span>
                </div>
              </div>
              <div className="highlight-item">
                <FiInstagram className="hi-icon" />
                <div>
                  <span className="hi-title">@_akxsh__07</span>
                  <span className="hi-sub">Follow on Instagram</span>
                </div>
              </div>
            </div>

            <a
              href="#reels"
              className="btn-primary about-cta"
              onClick={e => { e.preventDefault(); document.querySelector('#reels')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              <FiArrowRight className="btn-icon" />
              See My Work
            </a>
          </div>

          {/* ── Image Slider Column ──────────────────────── */}
          <div className="about-slider-col" ref={sliderRef}>
            <div className="about-slider">
              {/* Slides */}
              {SLIDES.map((slide, i) => (
                <img
                  key={i}
                  ref={el => (slidesRef.current[i] = el)}
                  src={slide.src}
                  alt={slide.caption}
                  className="about-slide-img"
                  style={{
                    zIndex:    i === 0 ? 1 : 0,
                    transform: i === 0 ? 'translateX(0%)' : 'translateX(100%)',
                    opacity:   1,
                  }}
                />
              ))}

              {/* Overlay gradient */}
              <div className="about-slider-overlay" />

              {/* Caption */}
              <div className="about-slide-caption" ref={captionRef}>
                {SLIDES[current].caption}
              </div>

              {/* Gold border frame */}
              <div className="about-slider-frame" />
            </div>

            {/* Dot nav */}
            <div className="about-dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  ref={el => (dotsRef.current[i] = el)}
                  className="about-dot"
                  style={{
                    width:           i === 0 ? 28 : 8,
                    backgroundColor: i === 0 ? 'var(--color-gold)' : 'rgba(212,168,75,0.3)',
                  }}
                  onClick={() => handleDot(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
