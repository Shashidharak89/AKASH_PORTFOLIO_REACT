import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMessageSquare, FiVideo, FiScissors, FiDownload } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { Icon: FiMessageSquare, title: 'Consultation', desc: 'We discuss your vision, event details, and the story you want to tell through the video.' },
  { Icon: FiVideo,         title: 'Shooting',     desc: 'I arrive on location, capture every important moment with cinematic equipment and a creative eye.' },
  { Icon: FiScissors,      title: 'Editing',      desc: 'Your footage comes to life through transitions, color grading, music sync, and visual storytelling.' },
  { Icon: FiDownload,      title: 'Delivery',     desc: 'Final video delivered in high quality — ready to share, cherish, and go viral on social media.' },
]

export default function Process() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const stepsRef   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true } })

      stepsRef.current.forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="container">
        <div className="process-header" ref={headerRef} style={{ opacity: 0 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>How It Works</div>
          <h2 className="section-title">My Creative <span className="gold-text">Process</span></h2>
          <p>From your first message to your final video — a seamless, enjoyable experience.</p>
        </div>

        <div className="process-steps">
          <div className="process-connector" />
          {steps.map((step, i) => (
            <div key={step.title} className="process-step"
              ref={el => (stepsRef.current[i] = el)} style={{ opacity: 0 }}>
              <div className="step-circle">
                <step.Icon className="step-ri-icon" />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
