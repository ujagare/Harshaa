import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowRight, ChevronDown, Menu, Sparkles } from 'lucide-react';
import heroImage from './assets/images/hero.png';
import card1 from './assets/images/card1.png';
import card2 from './assets/images/card2.png';
import card3 from './assets/images/card3.png';
import card4 from './assets/images/card4.png';
import transformationImage from './assets/images/TRANSFORMATION.png';
import logoImage from './assets/images/Logo.png';

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

function App() {
  const rootRef = useRef(null);

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
    }, rootRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen overflow-hidden bg-[#fff7ed] text-[#2b1712]">
      <section className="hero relative isolate min-h-screen px-5 py-5 md:px-10 lg:px-16">
        <img className="hero-bg" src={heroImage} alt="Golden abundance healing goddess" />
        <div className="hero-veils" />
        <div className="hero-glow" />

        <nav className="relative z-20 mx-auto flex w-full items-center justify-between">
          <a className="brand" href="#">
            <span className="brand-mark logo-mark">
              <img src={logoImage} alt="Midas Touch Magick logo" />
            </span>
            <span>
              Midas Touch
              <strong>Magick</strong>
            </span>
          </a>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services <ChevronDown size={14} /></a>
            <a href="#shop">Shop</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </div>

          <a className="nav-cta" href="#booking">
            Book a Session <ArrowRight size={17} />
          </a>
          <button className="menu-button" aria-label="Open menu">
            <Menu size={22} />
          </button>
        </nav>

        <div className="relative z-10 mx-auto grid w-full pt-20 md:pt-28 lg:grid-cols-[0.55fr_0.45fr]">
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

      <section id="about" className="transformation px-5 pb-20 pt-6 md:px-10 lg:px-16">
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
              <a className="primary-button compact" href="#about">
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

      <footer className="site-footer px-5 pb-8 pt-16 md:px-10 lg:px-16">
        <div className="footer-panel mx-auto w-full">
          <div className="footer-brand">
            <a className="brand" href="#">
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
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#shop">Shop</a>
            <a href="#testimonials">Testimonials</a>
          </div>

          <div className="footer-column">
            <h4>Sacred Services</h4>
            <a href="#services">Tarot Readings</a>
            <a href="#services">EFT Tapping</a>
            <a href="#services">Tantra Sessions</a>
            <a href="#services">Counselling</a>
          </div>

          <div className="footer-column footer-contact">
            <h4>Connect</h4>
            <span>Online & In-Person Sessions</span>
            <span>Worldwide Guidance</span>
            <span>Safe & Confidential</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Midas Touch Magick</span>
          <span>Ancient Wisdom. Modern Healing.</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
