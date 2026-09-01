import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import all reels
import reel1 from '../assets/reels/reel1.mp4'
import reel2 from '../assets/reels/reel2.mp4'
import reel3 from '../assets/reels/reel3.mp4'
import reel4 from '../assets/reels/reel4.mp4'
import reel5 from '../assets/reels/reel5.mp4'
import reel7 from '../assets/reels/reel7.mp4'
import reel8 from '../assets/reels/reel8.mp4'
import reel9 from '../assets/reels/reel9.mp4'

gsap.registerPlugin(ScrollTrigger)

const reels = [
  { src: reel1, label: 'Cinematic Reel', badge: 'Featured', featured: true },
  { src: reel2, label: 'Bus Edit',        badge: 'Popular'              },
  { src: reel3, label: 'Vehicle Edit',    badge: ''                     },
  { src: reel4, label: 'Event Highlights',badge: ''                     },
  { src: reel5, label: 'Housewarming',    badge: '300K Views', wide: true },
  { src: reel7, label: 'Pooja Ceremony',  badge: ''                     },
  { src: reel8, label: 'Creative Reel',   badge: 'Trending'             },
  { src: reel9, label: 'Event Edit',      badge: ''                     },
]

/* ─── Single reel card ──────────────────────────────────────── */
function ReelCard({ reel, index, onPlay }) {
  const cardRef  = useRef(null)
  const videoRef = useRef(null)

  /* GSAP entrance */
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
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

  /* IntersectionObserver — auto-play when ≥40% visible, pause otherwise */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.4 }   // fire when 40 % of the card is on screen
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`reel-card${reel.featured ? ' featured' : ''}${reel.wide ? ' wide' : ''}`}
      style={{ opacity: 0 }}
      onClick={() => onPlay(reel.src)}
    >
      <video
        ref={videoRef}
        className="reel-video"
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

      {/* Play icon shown on hover (via CSS) */}
      <div className="reel-play-btn">
        <div className="play-arrow" />
      </div>
    </div>
  )
}

/* ─── Section ───────────────────────────────────────────────── */
export default function Reels() {
  const [activeVideo, setActiveVideo] = useState(null)
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const modalVideoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
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

  const handlePlay  = (src) => setActiveVideo(src)
  const handleClose = () => {
    if (modalVideoRef.current) modalVideoRef.current.pause()
    setActiveVideo(null)
  }

  return (
    <section className="reels" id="reels" ref={sectionRef}>
      <div className="container">
        <div className="reels-header" ref={headerRef} style={{ opacity: 0 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Portfolio</div>
          <h2 className="section-title">
            My Creative <span className="gold-text">Work</span>
          </h2>
          <p>Auto-plays as you scroll · Click to watch full screen · Every frame tells a story</p>
        </div>

        <div className="reels-grid">
          {reels.map((reel, i) => (
            <ReelCard key={i} reel={reel} index={i} onPlay={handlePlay} />
          ))}
        </div>
      </div>

      {/* ── Video Modal ── */}
      <div
        className={`video-modal-backdrop${activeVideo ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      >
        <div className="video-modal-content">
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close video">
            ✕
          </button>
          {activeVideo && (
            <video
              ref={modalVideoRef}
              src={activeVideo}
              controls
              autoPlay
              playsInline
            />
          )}
        </div>
      </div>
    </section>
  )
}
