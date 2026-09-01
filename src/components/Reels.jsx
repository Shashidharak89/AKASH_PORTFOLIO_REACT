import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiX, FiMaximize2 } from 'react-icons/fi'

import reel1  from '../assets/reels/reel1.mp4'
import reel2  from '../assets/reels/reel2.mp4'
import reel3  from '../assets/reels/reel3.mp4'
import reel4  from '../assets/reels/reel4.mp4'
import reel5  from '../assets/reels/reel5.mp4'
import reel6  from '../assets/reels/reel6.mp4'
import reel7  from '../assets/reels/reel7.mp4'
import reel8  from '../assets/reels/reel8.mp4'
import reel9  from '../assets/reels/reel9.mp4'
import reel10 from '../assets/reels/reel10.mp4'

gsap.registerPlugin(ScrollTrigger)

const reels = [
  { src: reel1,  label: 'Cinematic Reel',    badge: 'Featured' },
  { src: reel2,  label: 'Bus Edit',          badge: 'Popular'  },
  { src: reel3,  label: 'Vehicle Edit',      badge: ''         },
  { src: reel4,  label: 'Event Highlights',  badge: ''         },
  { src: reel5,  label: 'Housewarming',      badge: '300K Views' },
  { src: reel6,  label: 'Creative Cut',      badge: 'New'      },
  { src: reel7,  label: 'Pooja Ceremony',    badge: ''         },
  { src: reel8,  label: 'Creative Reel',     badge: 'Trending' },
  { src: reel9,  label: 'Event Edit',        badge: ''         },
  { src: reel10, label: 'Special Reel',      badge: 'New'      },
]

/* ─── Single 9:16 reel card ──────────────────────────────────── */
function ReelCard({ reel, index, onPlay }) {
  const cardRef  = useRef(null)
  const videoRef = useRef(null)

  /* GSAP entrance */
  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: (index % 4) * 0.08,
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%', once: true },
      }
    )
  }, [index])

  /* IntersectionObserver — auto-play when ≥35% visible */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else                      video.pause()
      },
      { threshold: 0.35 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="reel-card-916"
      style={{ opacity: 0 }}
      onClick={() => onPlay(reel.src)}
    >
      <video
        ref={videoRef}
        className="reel-video-916"
        src={reel.src}
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="reel-overlay">
        <div className="reel-top">
          {reel.badge && <span className="reel-badge">{reel.badge}</span>}
        </div>
        <div className="reel-bottom">
          <span className="reel-label">{reel.label}</span>
        </div>
      </div>

      {/* Expand hint on hover */}
      <div className="reel-play-btn" aria-label="Play Reel">
        <FiMaximize2 className="reel-expand-icon" />
      </div>
    </div>
  )
}

/* ─── Section ───────────────────────────────────────────────── */
export default function Reels() {
  const [activeVideo, setActiveVideo] = useState(null)
  const sectionRef    = useRef(null)
  const headerRef     = useRef(null)
  const modalRef      = useRef(null)
  const modalVideoRef = useRef(null)
  const closeBtnRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* Keyboard close */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  /* Animate modal open & lock body scroll */
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden'
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        gsap.fromTo(modalRef.current.querySelector('.video-modal-container'),
          { scale: 0.85, y: 40 },
          { scale: 1,    y: 0,  duration: 0.45, ease: 'back.out(1.3)' }
        )
        if (closeBtnRef.current) {
          gsap.fromTo(closeBtnRef.current,
            { opacity: 0, scale: 0.5, rotate: -90 },
            { opacity: 1, scale: 1,   rotate: 0, duration: 0.4, delay: 0.15, ease: 'back.out(2)' }
          )
        }
      }
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeVideo])

  const handlePlay = (src) => setActiveVideo(src)

  const handleClose = () => {
    if (!modalRef.current) { setActiveVideo(null); return }
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        if (modalVideoRef.current) modalVideoRef.current.pause()
        setActiveVideo(null)
      }
    })
  }

  return (
    <section className="reels" id="reels" ref={sectionRef}>
      <div className="container">
        <div className="reels-header" ref={headerRef} style={{ opacity: 0 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Portfolio</div>
          <h2 className="section-title">
            My Creative <span className="gold-text">Work</span>
          </h2>
          <p>Auto-plays as you scroll · Click to expand 9:16 fullscreen · Every frame tells a story</p>
        </div>

        {/* 9:16 Responsive Grid */}
        <div className="reels-grid-916">
          {reels.map((reel, i) => (
            <ReelCard key={i} reel={reel} index={i} onPlay={handlePlay} />
          ))}
        </div>
      </div>

      {/* ── 9:16 Fullscreen Vertical Video Modal ── */}
      {activeVideo && (
        <div
          className="video-modal-backdrop open"
          ref={modalRef}
          onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
        >
          <div className="video-modal-container">
            {/* Prominent floating close button */}
            <button
              ref={closeBtnRef}
              className="modal-close-btn-float"
              onClick={handleClose}
              aria-label="Close fullscreen video"
            >
              <FiX className="modal-close-icon" />
            </button>

            {/* 9:16 Vertical Video Player */}
            <div className="video-player-wrapper-916">
              <video
                ref={modalVideoRef}
                src={activeVideo}
                controls
                autoPlay
                playsInline
                className="modal-video-916"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
