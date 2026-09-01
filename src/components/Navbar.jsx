import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { FiMenu, FiX, FiMail } from 'react-icons/fi'
import faviconImg from '../assets/images/favicon.png'

const NAV_LINKS = [
  { label: 'About',    href: '#about'   },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#reels'   },
  { label: 'Process',  href: '#process' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const navRef  = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 2.8 }
    )
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), menuOpen ? 320 : 0)
  }

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} ref={navRef}>
        <a className="navbar-logo" href="#home" onClick={e => go(e, '#home')} aria-label="Home">
          <img src={faviconImg} alt="Akash Kulal Logo" className="navbar-logo-img" />
          <span>AK</span>
        </a>

        <ul className="navbar-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} onClick={e => go(e, href)}>{label}</a>
            </li>
          ))}
          <li>
            <a className="navbar-cta" href="#contact" onClick={e => go(e, '#contact')}>
              <FiMail className="btn-icon" />
              Book a Shoot
            </a>
          </li>
        </ul>

        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <FiMenu className="hamburger-icon" />
        </button>
      </nav>

      {/* ── Backdrop ─────────────────────────────────────────── */}
      <div
        className={`mobile-backdrop${menuOpen ? ' visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Slide-in drawer ──────────────────────────────────── */}
      <aside className={`mobile-drawer${menuOpen ? ' open' : ''}`} aria-label="Navigation">
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <FiX className="close-icon" />
        </button>

        <div className="mobile-brand-block">
          <img src={faviconImg} alt="Akash Kulal Logo" className="mobile-brand-img" />
          <span className="mobile-brand">AKASH KULAL</span>
          <span className="mobile-brand-sub">Creative Video Editor</span>
        </div>

        <nav className="mobile-nav">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="mobile-link" onClick={e => go(e, href)}>
              {label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="mobile-cta" onClick={e => go(e, '#contact')}>
          <FiMail className="btn-icon" />
          Book a Shoot
        </a>
      </aside>
    </>
  )
}
