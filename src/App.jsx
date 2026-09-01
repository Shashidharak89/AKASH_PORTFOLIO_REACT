import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './index.css'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Reels from './components/Reels'
import Process from './components/Process'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  // ── Lenis smooth scroll ──────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,           // scroll duration (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    })

    // Hook Lenis into GSAP's RAF so ScrollTrigger stays in sync
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable GSAP's own lagSmoothing to prevent double-smoothing
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  const handleLoaderComplete = () => {
    setLoaded(true)
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }

  return (
    <>
      <CursorGlow />
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      <div
        id="main-content"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Services />
          <Stats />
          <div className="section-divider" />
          <Reels />
          <div className="section-divider" />
          <Process />
          <div className="section-divider" />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
