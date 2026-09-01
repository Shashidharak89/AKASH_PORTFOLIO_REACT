import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const fillRef = useRef(null)
  const logoRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power3.inOut',
          onComplete
        })
      }
    })

    tl.fromTo(logoRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo(subRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')
      .fromTo(fillRef.current, { width: '0%' }, { width: '100%', duration: 1.4, ease: 'power2.inOut' }, '-=0.2')
      .to([logoRef.current, subRef.current], { opacity: 0, duration: 0.3 }, '-=0.1')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader-logo" ref={logoRef}>AKASH KULAL</div>
      <div className="loader-sub" ref={subRef}>Creative Video Editor · Udupi</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" ref={fillRef} />
      </div>
    </div>
  )
}
