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
  { src: reel1,  type: 'featured' },
  { src: reel2,  type: 'tall'     },
  { src: reel3,  type: 'standard' },
  { src: reel4,  type: 'wide'     },
  { src: reel5,  type: 'wide'     },
  { src: reel6,  type: 'tall'     },
  { src: reel7,  type: 'standard' },
  { src: reel8,  type: 'featured' },
  { src: reel9,  type: 'standard' },
  { src: reel10, type: 'wide'     },
]

/* ─── Customized Bento Reel Card ─────────────────────────────── */
function ReelCard({ reel, index, onPlay }) {
  const cardRef  = useRef(null)
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

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

  /* IntersectionObserver + Hover Play Logic */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play automatically once visible in view
          const playPromise = video.play()
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Fallback if browser blocks un-interacted autoplay
            })
          }
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    const video = videoRef.current
    if (video) {
      if (video.readyState < 2) {
        video.load()
      }
      video.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={`bento-reel-card bento-${reel.type}${isHovered ? ' hovered' : ''}`}
      style={{ opacity: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onPlay(reel.src)}
    >
      <video
        ref={videoRef}
        className="bento-reel-video"
        src={reel.src}
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Expand hint icon on hover */}
      <div className="reel-play-btn" aria-label="Expand Reel">
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
          <p>Hover to load &amp; preview · Click to open 9:16 vertical fullscreen player</p>
        </div>

        {/* Customized Bento Layout Grid */}
        <div className="bento-reels-grid">
          {reels.map((reel, i) => (
            <ReelCard key={i} reel={reel} index={i} onPlay={handlePlay} />
          ))}
        </div>
      </div>

      {/* ── 9:16 Fullscreen Vertical Video Modal Player ── */}
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
