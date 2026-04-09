import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          <div className="footer-section">
            <h3 className="footer-logo">LEGO<span>STORE</span></h3>
            <p className="footer-text">
              Najboljša izbira LEGO setov za vse generacije. Od Star Wars klasike do Technic izzivov.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Povezave</h4>
            <ul className="footer-links">
              <li>Trgovina</li>
              <li>O nas</li>
              <li>Kontakt</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Kontakt</h4>
            <div className="contact-info">
              <p>📍 Dunajska cesta 15, Ljubljana</p>
              <p>📧 info@legostore.si</p>
            </div>
          </div>

        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Lego Store Slovenia. Vse pravice pridržane.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;