import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])
  const socialRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true }
        }
      )

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true }
          }
        )
      })

      // Social + CTA
      gsap.fromTo([socialRef.current, ctaRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const contactItems = [
    {
      icon: '📧',
      label: 'Email',
      value: 'akashkulal909@gmail.com',
      href: 'mailto:akashkulal909@gmail.com',
    },
    {
      icon: '📱',
      label: 'Phone / WhatsApp',
      value: '+91 86600 28363',
      href: 'tel:+918660028363',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Udupi, Karnataka, India',
      href: null,
    },
  ]

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className="contact-header" ref={titleRef} style={{ opacity: 0 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Get In Touch</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Let's Create <span className="gold-text">Together</span>
          </h2>
          <p className="contact-subtitle">
            Ready to turn your special moment into a cinematic masterpiece?
            Reach out — I'm always open to new projects and collaborations.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="contact-cards-row">
          {contactItems.map((item, i) => (
            <div
              key={item.label}
              className="glass-card contact-card"
              ref={el => (cardsRef.current[i] = el)}
              style={{ opacity: 0 }}
            >
              <div className="contact-card-icon">{item.icon}</div>
              <div className="contact-card-text">
                <span className="contact-card-label">{item.label}</span>
                {item.href
                  ? <a href={item.href} className="contact-card-value">{item.value}</a>
                  : <span className="contact-card-value">{item.value}</span>
                }
              </div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="contact-social-row" ref={socialRef} style={{ opacity: 0 }}>
          <a
            href="https://www.instagram.com/_akxsh__07"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill"
          >
            <span>📸</span>
            Instagram &nbsp;@_akxsh__07
          </a>
          <a
            href="https://wa.me/918660028363"
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill"
          >
            <span>💬</span>
            WhatsApp Me
          </a>
        </div>

        {/* Big CTA */}
        <div className="contact-cta-block" ref={ctaRef} style={{ opacity: 0 }}>
          <p className="contact-cta-tagline">"🎥 Your moment. My creativity. One unforgettable frame."</p>
          <a
            href="https://wa.me/918660028363?text=Hi%20Akash!%20I'd%20like%20to%20book%20a%20video%20shoot."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            💬 Book Me on WhatsApp
          </a>
        </div>

      </div>
    </section>
  )
}
