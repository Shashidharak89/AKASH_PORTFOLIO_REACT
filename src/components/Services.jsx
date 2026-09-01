import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiTruck, FiHome, FiStar, FiCalendar, FiFilm, FiCamera } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { Icon: FiTruck,    title: 'Bus & Vehicle Edits',       desc: 'Dynamic, cinematic edits for buses, cars, bikes, and all types of vehicles. High-energy cuts synced to music that make every vehicle look legendary.' },
  { Icon: FiHome,     title: 'Housewarming Ceremonies',   desc: 'Capturing the warmth and joy of your new beginning. From the ritual moments to celebrations — beautifully documented.' },
  { Icon: FiStar,     title: 'Poojas & Rituals',          desc: 'Sacred moments deserve cinematic treatment. We capture every detail of your devotion with reverence and artistry.' },
  { Icon: FiCalendar, title: 'Events & Celebrations',     desc: 'Birthdays, anniversaries, cultural events — every celebration deserves a cinematic highlight reel that lasts forever.' },
  { Icon: FiFilm,     title: 'Cinematic Reels',           desc: 'Short-form content that stops the scroll. Vertical reels with professional transitions, color grading, and music sync.' },
  { Icon: FiCamera,   title: 'Photoshoot Videos',         desc: 'Behind-the-scenes and photoshoot highlight videos that elevate your personal or professional photography.' },
]

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const cardsRef   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true } })

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: card, start: 'top 85%', once: true } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="container">
        <div className="services-header" ref={headerRef} style={{ opacity: 0 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>What I Do</div>
          <h2 className="section-title">Specialties &amp; <span className="gold-text">Services</span></h2>
          <p>From shooting to final edit — every frame crafted with passion, creativity, and cinematic vision.</p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={s.title} className="glass-card service-card"
              ref={el => (cardsRef.current[i] = el)} style={{ opacity: 0 }}>
              <div className="service-number">0{i + 1}</div>
              <s.Icon className="service-ri-icon" />
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
