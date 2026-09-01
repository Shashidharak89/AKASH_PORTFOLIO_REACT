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

const GALLERY_IMAGES = [
  { src: bg1, alt: 'Cinematic Bus Edit Frame' },
  { src: bg2, alt: 'Mahaveera Express Bus Edit' },
  { src: bg3, alt: 'Rally Car Drift Frame' },
  { src: bg4, alt: 'Night Bus Edit Frame' },
  { src: bg5, alt: 'BMW Forest Cinematic Frame' },
]

export default function About() {
  const sectionRef   = useRef(null)
  const pinWrapRef   = useRef(null)
  const cardsRef     = useRef([])
  const textRef      = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinWrap = pinWrapRef.current
      const cards   = cardsRef.current.filter(Boolean)
      if (!pinWrap || cards.length === 0) return

      // Set initial positions: Card 0 is centered, Cards 1..N are offscreen to the right
      cards.forEach((card, idx) => {
        if (idx === 0) {
          gsap.set(card, { xPercent: 0, opacity: 1, scale: 1, zIndex: 10 })
        } else {
          gsap.set(card, { xPercent: 120, opacity: 0, scale: 0.9, zIndex: 10 - idx })
        }
      })

      // Timeline scrubbed to scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrap,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: `+=${cards.length * 100}%`,
          onUpdate: (self) => {
            const idx = Math.min(
              cards.length - 1,
              Math.floor(self.progress * cards.length)
            )
            setActiveIdx(idx)
          },
        },
      })

      // For each card transition: current leaves left, next arrives from right
      for (let i = 0; i < cards.length - 1; i++) {
        const curr = cards[i]
        const next = cards[i + 1]

        tl.to(curr, {
          xPercent: -120,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power2.inOut',
        }, i)
        .to(next, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.inOut',
        }, i)
      }

      // Text section entrance reveal below gallery
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>

      {/* ── 1. One-by-One Pinned Card Slider (Scroll Driven) ── */}
      <div className="about-gallery-pinned" ref={pinWrapRef}>
        <div className="about-gallery-header">
          <div className="section-label">Visual Journey</div>
          <h2 className="section-title">
            Featured <span className="gold-text">Cinematic Frames</span>
          </h2>
          <div className="card-counter-pill">
            <span>0{activeIdx + 1}</span> / <span>0{GALLERY_IMAGES.length}</span>
          </div>
        </div>

        <div className="about-card-stage">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="about-single-card"
              ref={el => (cardsRef.current[i] = el)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="about-card-img"
              />
              <div className="about-card-glow" />
              <div className="about-card-frame" />
            </div>
          ))}
        </div>

        {/* Scroll Progress Bar / Dots */}
        <div className="about-stage-dots">
          {GALLERY_IMAGES.map((_, i) => (
            <div
              key={i}
              className={`stage-dot${activeIdx === i ? ' active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* ── 2. About Me Details Block (Below Gallery) ────── */}
      <div className="container">
        <div className="about-details-block" ref={textRef}>
          <div className="section-label" style={{ justifyContent: 'center' }}>About Me</div>

          <h2 className="section-title" style={{ textAlign: 'center' }}>
            I Don't Just Edit Videos —<br />
            I <span className="gold-text">Tell Stories</span>
          </h2>

          <div className="about-text-content">
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
          </div>

          <div className="about-highlights-row">
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

          <div className="about-cta-wrapper">
            <a
              href="#reels"
              className="btn-primary about-cta"
              onClick={e => {
                e.preventDefault()
                document.querySelector('#reels')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <FiArrowRight className="btn-icon" />
              Watch My Work
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}
