import { useState, useEffect } from 'react'
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

  const handleLoaderComplete = () => {
    setLoaded(true)
    // Refresh ScrollTrigger after loader removes
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }

  return (
    <>
      {/* Cursor Glow */}
      <CursorGlow />

      {/* Loader */}
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Main Site */}
      <div id="main-content" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
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
