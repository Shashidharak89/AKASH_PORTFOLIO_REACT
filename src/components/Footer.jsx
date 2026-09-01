import { FiExternalLink, FiCode } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-logo">AKASH KULAL</span>
        <p className="footer-copy">
          © {year} Akash Kulal. All rights reserved. · Udupi, Karnataka
        </p>
      </div>

      <div className="footer-center">
        <span className="footer-tagline">"Shoot. Edit. Create. Tell a Story."</span>
      </div>

      <div className="footer-right">
        <div className="developer-credit">
          <span className="dev-caption">Designed &amp; Developed with <span className="gold-text">♥</span> by</span>
          <a
            href="https://shashi-k.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="developer-link"
          >
            <FiCode className="dev-icon" />
            <span>Shashidhara K</span>
            <FiExternalLink className="dev-ext-icon" />
          </a>
        </div>
      </div>
    </footer>
  )
}
