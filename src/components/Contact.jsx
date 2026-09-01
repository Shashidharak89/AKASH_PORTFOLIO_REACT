import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Build WhatsApp message
    const msg = encodeURIComponent(
      `Hello Akash! 👋\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nMessage: ${formData.message}`
    )
    window.open(`https://wa.me/918660028363?text=${msg}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-grid">
          {/* Left */}
          <div className="contact-left" ref={leftRef} style={{ opacity: 0 }}>
            <div className="contact-intro">
              <div className="section-label">Get In Touch</div>
              <h2 className="section-title">
                Let's Create <span className="gold-text">Together</span>
              </h2>
              <p>
                Ready to turn your special moment into a cinematic masterpiece? 
                Reach out and let's discuss your vision. I'm based in Udupi and serve the entire region.
              </p>
            </div>

            <div className="contact-items">
              <div className="glass-card contact-item">
                <div className="ci-icon">📧</div>
                <div className="ci-text">
                  <span className="ci-label">Email</span>
                  <a href="mailto:akashkulal909@gmail.com" className="ci-value">akashkulal909@gmail.com</a>
                </div>
              </div>

              <div className="glass-card contact-item">
                <div className="ci-icon">📱</div>
                <div className="ci-text">
                  <span className="ci-label">Phone / WhatsApp</span>
                  <a href="tel:+918660028363" className="ci-value">+91 86600 28363</a>
                </div>
              </div>

              <div className="glass-card contact-item">
                <div className="ci-icon">📍</div>
                <div className="ci-text">
                  <span className="ci-label">Location</span>
                  <span className="ci-value">Udupi, Karnataka, India</span>
                </div>
              </div>
            </div>

            <div>
              <p className="ci-label" style={{ marginBottom: '12px' }}>Follow My Work</p>
              <div className="social-row">
                <a
                  href="https://www.instagram.com/_akxsh__07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <span>📸</span>
                  Instagram
                </a>
                <a
                  href="https://wa.me/918660028363"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <span>💬</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            <div className="glass-card contact-form-card">
              <h3 className="contact-form-title">Send a Message</h3>

              {submitted ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '3rem' }}>✅</span>
                  <p style={{ color: 'var(--color-text-primary)', fontWeight: '600', fontSize: '1rem' }}>
                    Message Sent on WhatsApp!
                  </p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                    Akash will respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Your Name</label>
                      <input
                        className="form-input"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Rahul Shetty"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Phone Number</label>
                      <input
                        className="form-input"
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="service">Service Needed</label>
                    <input
                      className="form-input"
                      id="service"
                      name="service"
                      type="text"
                      placeholder="Housewarming Video, Bus Edit, Reel..."
                      value={formData.service}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Your Message</label>
                    <textarea
                      className="form-textarea"
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, event date, location..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    💬 Send via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
