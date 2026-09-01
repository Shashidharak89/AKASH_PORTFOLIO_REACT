import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../assets/hero.png'
import bgImg from '../assets/images/bg1.jpeg'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const imgMainRef = useRef(null)
  const imgAccentRef = useRef(null)
  const badgeRef = useRef(null)
  const labelRef = useRef(null)
  const titleRef = useRef(null)
  const bodyRef = useRef(null)
  const specsRef = useRef(null)
  const quoteRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        }
      })

      tl.fromTo(imgMainRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }
      )
      .fromTo(imgAccentRef.current,
        { opacity: 0, x: -30, y: 30 },
        { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(badgeRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo([labelRef.current, titleRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(specsRef.current.querySelectorAll('.specialty-item'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(quoteRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(btnRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const specialties = [
    'Bus & Vehicle Edits', 'Cinematic Reels', 'Housewarming Ceremonies',
    'Poojas & Rituals', 'Events & Celebrations', 'Photoshoot Videos',
    'Color Grading', 'Music Sync', 'Motion Transitions', 'Wedding Highlights',
  ]

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          {/* Image Side */}
          <div className="about-image-side">
            <img
              ref={imgMainRef}
              className="about-img-main"
              src={bgImg}
              alt="Akash Kulal filming"
              style={{ opacity: 0 }}
            />
            <img
              ref={imgAccentRef}
              className="about-img-accent"
              src={profileImg}
              alt="Akash Kulal portrait"
              style={{ opacity: 0 }}
            />
            <div ref={badgeRef} className="about-years-badge" style={{ opacity: 0 }}>
              <span className="badge-num">3+</span>
              <span className="badge-text">Yrs of Creativity</span>
            </div>
          </div>

          {/* Text Side */}
          <div className="about-text-side">
            <div ref={labelRef} className="section-label" style={{ opacity: 0 }}>
              About Me
            </div>

            <h2 ref={titleRef} className="section-title" style={{ opacity: 0 }}>
              I Don't Just Edit Videos — <span className="gold-text">I Create Stories</span>
            </h2>

            <p ref={bodyRef} className="about-body" style={{ opacity: 0 }}>
              I'm <strong>Akash Kulal</strong>, a creative videographer and video editor from <strong>Udupi, Karnataka</strong>.
              I capture more than just videos — I tell stories through creative visuals, cinematic shots, and professional editing.
              <br /><br />
              My passion is turning ordinary moments into memorable films. From shooting to final editing, I focus on
              <strong> creativity, storytelling, transitions, music,</strong> and cinematic visuals to make every video unique.
              My journey has already reached up to <strong>300K views</strong> on social media, and my next goal is to reach
              <strong> 1 million views</strong> and beyond.
            </p>

            <div ref={specsRef} className="about-specialties">
              {specialties.map(s => (
                <div key={s} className="specialty-item">
                  <span className="specialty-dot" />
                  {s}
                </div>
              ))}
            </div>

            <div ref={quoteRef} className="about-quote" style={{ opacity: 0 }}>
              <p>"🎥 Shoot. Edit. Create. Tell a Story."</p>
            </div>

            <div ref={btnRef} style={{ opacity: 0 }}>
              <a
                href="#reels"
                className="btn-primary"
                onClick={e => { e.preventDefault(); document.querySelector('#reels').scrollIntoView({ behavior: 'smooth' }) }}
              >
                ▶ View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
