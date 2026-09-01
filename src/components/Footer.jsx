import { FiExternalLink, FiCode, FiMail, FiPhone, FiInstagram } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-top-row">

        {/* Brand info */}
        <div className="footer-brand-col">
          <span className="footer-logo">AKASH KULAL</span>
          <span className="footer-subtitle">Creative Video Editor &amp; Cinematographer</span>
          <p className="footer-copy">
            © {year} Akash Kulal. All rights reserved. · Udupi, Karnataka
          </p>
        </div>

        {/* Quick Contact Links */}
        <div className="footer-contact-col">
          <span className="footer-col-title">Quick Contact</span>
          <div className="footer-quick-links">
            <a href="mailto:akashkulal909@gmail.com" className="footer-quick-link">
              <FiMail className="fq-icon" />
              <span>akashkulal909@gmail.com</span>
            </a>
            <a href="tel:+918660028363" className="footer-quick-link">
              <FiPhone className="fq-icon" />
              <span>+91 86600 28363</span>
            </a>
            <a
              href="https://www.instagram.com/_akxsh__07"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-quick-link"
            >
              <FiInstagram className="fq-icon" />
              <span>@_akxsh__07</span>
            </a>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="footer-dev-col">
          <span className="footer-tagline">"Shoot. Edit. Create. Tell a Story."</span>
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

      </div>
    </footer>
  )
}
