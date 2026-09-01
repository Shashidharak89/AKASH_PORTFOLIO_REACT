import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiEye, FiFilm, FiSmile, FiAward } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { Icon: FiEye,   number: '300K+', label: 'Social Media Views'  },
  { Icon: FiFilm,  number: '50+',   label: 'Videos Completed'    },
  { Icon: FiSmile, number: '40+',   label: 'Happy Clients'       },
  { Icon: FiAward, number: '3+',    label: 'Years of Experience' },
]

function AnimatedNumber({ target }) {
  const ref         = useRef(null)
  const numericPart = parseInt(target.replace(/\D/g, ''), 10)
  const suffix      = target.replace(/[0-9]/g, '')

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: numericPart, duration: 2, ease: 'power2.out',
          onUpdate: () => {
            if (ref.current)
              ref.current.textContent = Math.round(obj.val).toLocaleString() + suffix
          },
        })
      },
    })
    return () => trigger.kill()
  }, [numericPart, suffix])

  return <span ref={ref} className="stat-number">0</span>
}

export default function Stats() {
  const sectionRef = useRef(null)
  const itemsRef   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={s.label} className="stat-item"
              ref={el => (itemsRef.current[i] = el)} style={{ opacity: 0 }}>
              <s.Icon className="stat-ri-icon" />
              <AnimatedNumber target={s.number} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
