export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <span className="footer-logo">AKASH KULAL</span>
      <p className="footer-copy">
        © {year} Akash Kulal. All rights reserved. · Udupi, Karnataka
      </p>
      <span className="footer-tagline">"Shoot. Edit. Create. Tell a Story."</span>
    </footer>
  )
}
