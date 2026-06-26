import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowRight, ChevronDown, Menu, Sparkles, X } from 'lucide-react';
import heroImage from './assets/images/hero.png';
import card1 from './assets/images/card1.png';
import card2 from './assets/images/card2.png';
import card3 from './assets/images/card3.png';
import card4 from './assets/images/card4.png';
import transformationImage from './assets/images/TRANSFORMATION.png';
import logoImage from './assets/images/Logo.png';
import aboutHeroImage from './assets/images/About/ChatGPT Image Jun 26, 2026, 11_22_59 PM.png';
import aboutPortraitImage from './assets/images/About/ChatGPT Image Jun 26, 2026, 10_52_02 PM.png';
import aboutCreamBg from './assets/images/About/ChatGPT Image Jun 26, 2026, 11_27_26 PM.png';
import aboutRedBg from './assets/images/About/ChatGPT Image Jun 26, 2026, 10_51_46 PM.png';
import aboutCtaImage from './assets/images/About/ChatGPT Image Jun 26, 2026, 10_50_35 PM.png';
import aboutCredentialBg from './assets/images/About/ChatGPT Image Jun 26, 2026, 10_52_52 PM.png';
import aboutMobileCtaImage from './assets/images/About/mobile/mob.png';
import aboutMobileJourneyBg from './assets/images/About/mobile/ChatGPT Image Jun 27, 2026, 01_31_51 AM.png';
import aboutMobileCredentialBg from './assets/images/About/mobile/ChatGPT Image Jun 27, 2026, 01_41_01 AM.png';
import aboutMobileHeroImage from './assets/images/About/mobile/hero.png';
import lotusIcon from './assets/images/About/icons/ChatGPT Image Jun 26, 2026, 11_07_35 PM.png';
import shieldIcon from './assets/images/About/icons/ChatGPT Image Jun 26, 2026, 11_02_12 PM.png';
import eyeIcon from './assets/images/About/icons/ChatGPT Image Jun 26, 2026, 11_05_42 PM.png';
import dropIcon from './assets/images/About/icons/ChatGPT Image Jun 26, 2026, 11_10_24 PM.png';
import mandalaIcon from './assets/images/About/icons/ChatGPT Image Jun 26, 2026, 11_12_36 PM.png';
import tarotIcon from './assets/images/About/icons/ChatGPT Image Jun 26, 2026, 11_17_27 PM.png';

gsap.registerPlugin(ScrollTrigger);

const iconModules = import.meta.glob('./assets/icons/*.png', {
  eager: true,
  import: 'default',
});

const iconSet = Object.values(iconModules);

const services = [
  {
    title: 'Tarot Readings',
    copy: "Gain clarity and insight into your life's path. Our intuitive tarot readings reveal hidden truths and illuminate your next steps.",
    image: card1,
  },
  {
    title: 'EFT Tapping',
    copy: 'Release emotional blockages and stress. EFT tapping helps you heal from within and restore inner balance.',
    image: card2,
  },
  {
    title: 'Tantra Sessions',
    copy: 'Explore sacred connection, energy flow, and deeper intimacy through ancient tantric wisdom.',
    image: card3,
  },
  {
    title: 'Compassionate Counselling',
    copy: 'Receive empathetic support in a safe space. Navigate life challenges with clarity and emotional strength.',
    image: card4,
  },
];

const pillars = [
  ['Ancient Wisdom', 'Timeless practices for modern life'],
  ['Sacred Space', 'Safe, nurturing and inclusive'],
  ['Transformative', 'Real and lasting change'],
  ['Holistic Healing', 'Mind, body and soul'],
];

const journeySteps = [
  {
    icon: lotusIcon,
    copy: 'After years of personal transformation and study across multiple disciplines, I discovered that true abundance flows when we align our inner wisdom with practical action.',
  },
  {
    icon: tarotIcon,
    copy: 'My path began with a profound spiritual awakening that led me to explore tarot, energy healing, and sacred practices from around the world.',
  },
  {
    icon: eyeIcon,
    copy: 'Through my own healing journey, I witnessed the power of combining intuitive guidance with evidence-based techniques like EFT tapping and counselling.',
  },
  {
    icon: mandalaIcon,
    copy: 'Today, I guide others on their transformative journeys, helping them unlock abundance, heal emotional wounds, and step into authentic power.',
  },
];

const philosophyCards = [
  {
    icon: lotusIcon,
    title: 'Holistic Healing',
    copy: 'We believe in addressing the whole person - mind, body, and spirit. Each modality works synergistically to create lasting change.',
  },
  {
    icon: dropIcon,
    title: 'Sacred Space',
    copy: 'Every session is held in a container of safety, respect, and non-judgment. Your pace is honored and your transformation is never rushed.',
  },
  {
    icon: shieldIcon,
    title: 'Empowerment Through Wisdom',
    copy: 'Our goal is not to create dependency, but to empower you with tools, insights, and practices you can carry forward.',
  },
];

const credentials = [
  ['Certified Tarot Reader & Intuitive Guide', tarotIcon],
  ['Licensed EFT Practitioner', dropIcon],
  ['Tantra & Sacred Sexuality Coach', mandalaIcon],
  ['Professional Counsellor & Life Coach', lotusIcon],
];

const navItems = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/#services'],
  ['Shop', '/#shop'],
  ['Testimonials', '/#testimonials'],
  ['Blog', '/#blog'],
  ['Contact', '/#contact'],
];

function IconOrb({ src, index, className = '' }) {
  return (
    <motion.div
      className={`icon-orb ${className}`}
      initial={false}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: 'easeOut' }}
    >
      {src ? <img src={src} alt="" /> : <Sparkles size={30} />}
    </motion.div>
  );
}

function SiteHeader({ variant = 'home' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canUseDom = typeof document !== 'undefined';

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', isMenuOpen);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`site-nav ${variant === 'about' ? 'about-site-nav' : ''}`}>
        <a className="brand" href="/">
          <span className="brand-mark logo-mark">
            <img src={logoImage} alt="Midas Touch Magick logo" />
          </span>
          <span>
            Midas Touch
            <strong>Magick</strong>
          </span>
        </a>

        <div className="nav-links">
          <a className={variant === 'home' ? 'active' : ''} href="/">Home</a>
          <a className={variant === 'about' ? 'active' : ''} href="/about">About</a>
          <a href="/#services">Services <ChevronDown size={14} /></a>
          <a href="/#shop">Shop</a>
          <a href="/#testimonials">Testimonials</a>
          <a href="/#blog">Blog</a>
          <a href="/#contact">Contact</a>
        </div>

        <a className="nav-cta" href="#booking">
          Book a Session <ArrowRight size={17} />
        </a>
        <div className="mobile-page-links" aria-label="Main pages">
          <a className={variant === 'home' ? 'active' : ''} href="/">Home</a>
          <a className={variant === 'about' ? 'active' : ''} href="/about">About</a>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {canUseDom && createPortal((
      <div className={`royal-menu ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
        <button
          className="royal-menu-backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
        />
        <aside className="royal-menu-panel" aria-label="Mobile navigation">
          <div className="royal-menu-head">
            <a className="brand" href="/" onClick={() => setIsMenuOpen(false)}>
              <span className="brand-mark logo-mark">
                <img src={logoImage} alt="Midas Touch Magick logo" />
              </span>
              <span>
                Midas Touch
                <strong>Magick</strong>
              </span>
            </a>
            <button className="royal-close" type="button" aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="royal-menu-mark">
            <img src={lotusIcon} alt="" />
          </div>

          <div className="royal-menu-links">
            {navItems.map(([label, href]) => (
              <a
                className={(variant === 'home' && label === 'Home') || (variant === 'about' && label === 'About') ? 'active' : ''}
                href={href}
                key={label}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{label}</span>
                <ArrowRight size={16} />
              </a>
            ))}
          </div>

          <a className="royal-menu-cta" href="#booking" onClick={() => setIsMenuOpen(false)}>
            Book Your Session <ArrowRight size={17} />
          </a>
        </aside>
      </div>
      ), document.body)}
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer px-5 pb-8 pt-16 md:px-10 lg:px-16">
      <div className="footer-panel mx-auto w-full">
        <div className="footer-brand">
          <a className="brand" href="/">
            <span className="brand-mark logo-mark">
              <img src={logoImage} alt="Midas Touch Magick logo" />
            </span>
            <span>
              Midas Touch
              <strong>Magick</strong>
            </span>
          </a>
          <p>
            Ancient wisdom, modern healing, and compassionate guidance for your
            transformation journey.
          </p>
          <a className="primary-button compact footer-cta" href="#booking">
            Book a Session <ArrowRight size={17} />
          </a>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <a href="/about">About</a>
          <a href="/#services">Services</a>
          <a href="/#shop">Shop</a>
          <a href="/#testimonials">Testimonials</a>
        </div>

        <div className="footer-column">
          <h4>Sacred Services</h4>
          <a href="/#services">Tarot Readings</a>
          <a href="/#services">EFT Tapping</a>
          <a href="/#services">Tantra Sessions</a>
          <a href="/#services">Counselling</a>
        </div>

        <div className="footer-column footer-contact">
          <h4>Connect</h4>
          <span>Online & In-Person Sessions</span>
          <span>Worldwide Guidance</span>
          <span>Safe & Confidential</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Midas Touch Magick</span>
        <span>Ancient Wisdom. Modern Healing.</span>
      </div>
    </footer>
  );
}

function HomePage({ icons }) {
  return (
    <>
      <section className="hero relative isolate min-h-screen px-5 py-5 md:px-10 lg:px-16">
        <img className="hero-bg" src={heroImage} alt="Golden abundance healing goddess" />
        <div className="hero-veils" />
        <div className="hero-glow" />
        <SiteHeader />

        <div className="hero-content relative z-10 mx-auto grid w-full pt-20 md:pt-28 lg:grid-cols-[0.55fr_0.45fr]">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, x: -26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div className="eyebrow">
              <span />
              Ancient Wisdom. Modern Healing.
              <span />
            </div>
            <h1>
              Unlock <em>Abundance</em>
              <br />
              Transform Your Life
            </h1>
            <div className="subline">
              <span />
              Through Ancient Wisdom
              <span />
            </div>
            <p>
              Experience profound transformation through tarot, EFT tapping, tantra, and
              compassionate counselling. Your journey to healing begins here.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#services">
                Explore Services <ArrowRight size={18} />
              </a>
              <a className="secondary-button" href="#booking">
                Book a Session <Sparkles size={15} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="after-hero relative z-20 px-5 pb-12 pt-10 md:px-10 lg:px-16">
        <div className="mx-auto w-full">
          <div className="pillars-panel reveal-up">
            {pillars.map(([title, copy], index) => (
              <div className="pillar" key={title}>
                <IconOrb src={icons[index + 2]} index={index} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section-wrap px-5 py-14 md:px-10 lg:px-16">
        <div className="section-heading reveal-up">
          <div className="decor-line">
            <span />
            Our Sacred Services
            <span />
          </div>
          <p>Ancient practices. Modern healing. Lasting transformation.</p>
        </div>

        <div className="services-grid mx-auto mt-8 grid w-full gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-icon">
                <IconOrb src={icons[index + 5]} index={index} className="service-orb" />
              </div>
              <div className="service-body">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <a href="#booking">
                  Learn More <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="home-transformation" className="transformation px-5 pb-20 pt-6 md:px-10 lg:px-16">
        <div className="transformation-panel mx-auto grid w-full items-center gap-8">
          <motion.div
            className="video-card"
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <img src={transformationImage} alt="Sacred transformation room" />
          </motion.div>

          <div className="transform-content">
            <div className="transform-copy reveal-up">
              <span>Begin Your</span>
              <h2>Transformation</h2>
              <p>
                Each session is crafted with intention, blending ancient wisdom with modern
                understanding to create lasting change in your life.
              </p>
              <strong>Step into your power and discover the abundance that awaits.</strong>
              <a className="primary-button compact" href="/about">
                Learn More About Our Approach <ArrowRight size={17} />
              </a>
            </div>

            <div className="guidance-list reveal-up">
              {['Personalized Guidance', 'Safe & Confidential', 'Heart-Centered Approach', 'Proven Transformations'].map((item, index) => (
                <div key={item}>
                  <IconOrb src={icons[index + 7]} index={index} className="tiny" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-stats mx-auto mt-8 grid w-full gap-4">
          {[
            ['500+', 'Lives Transformed'],
            ['10+', 'Years of Experience'],
            ['Worldwide', 'Online & In-Person Sessions'],
            ['100%', 'Compassionate Care'],
          ].map(([value, label], index) => (
            <div className="bottom-stat reveal-up" key={label}>
              <IconOrb src={icons[index]} index={index} className="small" />
              <div className="bottom-stat-copy">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <picture>
          <source media="(max-width: 640px)" srcSet={aboutMobileHeroImage} />
          <img className="about-hero-img" src={aboutHeroImage} alt="Sacred candle healing room" />
        </picture>
        <div className="about-hero-cream" />
        <SiteHeader variant="about" />
        <div className="about-hero-copy about-reveal">
          <span className="about-kicker">About Midas Touch Magick</span>
          <h1>
            <span className="about-heading-line">Where Ancient</span>
            <span className="about-heading-line"><strong>Wisdom</strong> Meets</span>
            <span className="about-heading-line">Modern Healing</span>
          </h1>
          <div className="about-title-mark">
            <span />
            <img src={lotusIcon} alt="" />
            <span />
          </div>
          <p>
            Midas Touch Magick was born from a deep calling to bridge the ancient mystical
            arts with modern healing practices to unlock your true potential.
          </p>
        </div>
      </section>

      <section
        className="about-journey"
        style={{
          backgroundImage: `url("${aboutCreamBg}")`,
          '--about-mobile-journey-bg': `url("${aboutMobileJourneyBg}")`,
        }}
      >
        <div className="about-journey-image about-reveal">
          <img src={aboutPortraitImage} alt="Sacred ritual with candles and crystals" />
        </div>

        <div className="about-journey-copy about-reveal">
          <span className="about-kicker">A Journey Of</span>
          <h2>Transformation</h2>
          <div className="about-small-line" />
          <div className="journey-list">
            {journeySteps.map((step, index) => (
              <div className="journey-step" key={step.copy}>
                <div className="journey-icon">
                  <img src={step.icon} alt="" />
                </div>
                <p>{step.copy}</p>
              </div>
            ))}
          </div>
          <div className="about-note">
            <img src={lotusIcon} alt="" />
            <span>Each session is a sacred space where ancient wisdom meets modern understanding.</span>
          </div>
        </div>
      </section>

      <section
        className="about-philosophy"
        style={{ backgroundImage: `url("${aboutRedBg}")` }}
      >
        <div className="about-section-title">
          <span />
          <h2>Our Philosophy</h2>
          <span />
        </div>
        <div className="philosophy-grid">
          {philosophyCards.map((card) => (
            <article className="philosophy-card about-reveal" key={card.title}>
              <div className="philosophy-icon">
                <img src={card.icon} alt="" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="about-credentials"
        style={{
          backgroundImage: `url("${aboutCredentialBg}")`,
          '--about-mobile-credentials-bg': `url("${aboutMobileCredentialBg}")`,
        }}
      >
        <div className="about-section-title cream">
          <span />
          <h2>Credentials & Training</h2>
          <span />
        </div>
        <p>Years of dedicated study and practice across multiple healing modalities</p>
        <div className="credential-grid">
          {credentials.map(([label, icon]) => (
            <div className="credential-item about-reveal" key={label}>
              <div className="credential-icon">
                <img src={icon} alt="" />
              </div>
              <h3>{label}</h3>
            </div>
          ))}
        </div>
      </section>

      <section
        className="about-cta-band"
        style={{
          backgroundImage: `url("${aboutCtaImage}")`,
          '--about-mobile-cta-bg': `url("${aboutMobileCtaImage}")`,
        }}
      >
        <div className="about-quote">
          <span>&ldquo;</span>
          <p>Your transformation journey is unique, sacred, and powerful.</p>
          <strong>I am honored to walk beside you.</strong>
        </div>
        <div className="about-ready">
          <h2>Ready to begin your transformation?</h2>
          <p>Let's create the life of abundance, purpose, and authentic power that you deserve.</p>
          <a className="primary-button compact footer-cta" href="#booking">
            Book Your Session <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </div>
  );
}

function App() {
  const rootRef = useRef(null);
  const isAboutPage = window.location.pathname.replace(/\/$/, '') === '/about';

  const icons = useMemo(() => {
    const fallback = new Array(8).fill(null);
    return iconSet.length ? iconSet : fallback;
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const updateLenis = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      if (isAboutPage) {
        gsap.from('.about-reveal', {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
        });
        return;
      }

      if (document.querySelector('.after-hero')) {
        gsap.from('.reveal-up', {
          y: 44,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.after-hero',
            start: 'top 82%',
          },
        });
      }

      if (document.querySelector('.services-grid')) {
        gsap.from('.service-card', {
          y: 58,
          opacity: 0,
          duration: 0.85,
          stagger: 0.11,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 78%',
          },
        });
      }

      if (document.querySelector('.hero-glow')) {
        gsap.to('.hero-glow', {
          yPercent: 7,
          rotate: 4,
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [isAboutPage]);

  return (
    <main ref={rootRef} className={`min-h-screen overflow-hidden bg-[#fff7ed] text-[#2b1712] ${isAboutPage ? 'about-shell' : ''}`}>
      {isAboutPage ? <AboutPage /> : <HomePage icons={icons} />}
      <SiteFooter />
    </main>
  );
}

export default App;
