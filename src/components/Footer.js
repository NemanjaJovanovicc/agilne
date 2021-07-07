import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
        AUTO-ŠKOLA AMAJLIJA        </p>
        <p className='footer-subscription-text'>
        Auto škola AMAJLIJA nije obična auto škola, 
        to je mesto gde ćete naučiti saobraćajne propise, 
        pružanje prve pomoći i savladati upravljanje vozilom..
        </p>
       
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>O nama</h2>
            <Link to='/'>Petra Drapšina 56 lokal 3, Novi Sad</Link>
            <Link to='/'>	pon-pet: 08:00 - 21:00
                            subota: 09:00 - 13:00 </Link>
            <Link to='/'>autoskola@amajlija.rs</Link>
            <Link to='/'>021-666-666</Link>
          </div>  
        </div> 
        </div>

      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              AUTO-ŠKOLA AMAJLIJA
              <i class='fas fa-dragon' />
            </Link>
          </div>
          <small class='website-rights'> ®All rights reserved by @teamAGILNE</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;