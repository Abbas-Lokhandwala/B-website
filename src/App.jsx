
import { useEffect, useRef, useState } from 'react';
import { content } from './content.js';
import Fireworks from './components/Fireworks.jsx';
import DailyLoveNote from './DailyLoveNote';

const STAR_POSITIONS = Array.from({ length: 72 }, (_, i) => ({
  id: i,
  x: (i * 43.735 + 7.31) % 100,
  y: (i * 27.171 + 11.6) % 100,
  size: i % 6 === 0 ? 2.7 : 1.35,
  delay: (i % 13) * -0.57,
}));

const ASSET = (path) => {
  const cleanPath = path
    .replace(/^\/+/, '')
    .replace(/^public\//, '');

  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      {STAR_POSITIONS.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      <div className="nebula nebula-left" />
      <div className="nebula nebula-right" />
    </div>
  );
}

function MoonScene({ small = false }) {
  return (
    <div
      className={`moon-scene ${small ? 'moon-scene-small' : ''}`}
      aria-hidden="true"
    >
      <div className="moon-halo" />
      <div className="moon" />
      <span className="orbit-dot orbit-dot-one">✦</span>
      <span className="orbit-dot orbit-dot-two">✧</span>
      <span className="orbit-dot orbit-dot-three">♡</span>
      <span className="orbit-ring" />
    </div>
  );
}

// December 24, 2026 at 12:00 AM IST
const birthdayMoment = Date.parse('2026-12-23T18:30:00Z');

function Counter({ now }) {
  const diff = Math.max(0, birthdayMoment - now);
  const seconds = Math.floor(diff / 1000);

  const units = [
    { label: 'DAYS', value: Math.floor(seconds / 86400) },
    { label: 'HOURS', value: Math.floor(seconds / 3600) % 24 },
    { label: 'MINUTES', value: Math.floor(seconds / 60) % 60 },
    { label: 'SECONDS', value: seconds % 60 },
  ];

  return (
    <div
      className="countdown"
      role="timer"
      aria-label="Time until Aarefa's birthday"
    >
      {units.map((unit, index) => (
        <div className="count-unit" key={unit.label}>
          <span className="count-num">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="count-label">{unit.label}</span>
          {index !== 3 && (
            <span className="count-divider" aria-hidden="true">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// COUNTDOWN + DAILY SHAYARI PAGE
// ============================================

function PreBirthday({ now }) {
  return (
    <>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="For Aarefa, home"
        >
          <span className="brand-mark">A</span>
          <span>
            for you, always <span className="heart-pink">♡</span>
          </span>
        </a>
        <span className="header-note">
          A LOVE NOTE AMONG THE STARS
        </span>
      </header>

      <main
        id="top"
        className="waiting-main has-daily-love"
      >
        <section
          className="waiting-hero"
          aria-labelledby="waiting-title"
        >
          <div className="mini-star">
            ✧ &nbsp; ✦ &nbsp; ✧
          </div>

          <MoonScene />

          <p className="eyebrow">
            SOMETHING BEAUTIFUL IS ON ITS WAY
          </p>

          <h1 id="waiting-title">
            A little universe,
            <br />
            <em>just for you, Aarefa.</em>
          </h1>

          <p className="lead waiting-lead">
            The stars are counting down to a day as
            special as you. There’s a little surprise
            waiting for you here. ♡
          </p>

          <div className="countdown-wrap">
            <div className="counter-intro">
              <span className="tiny-line" />
              UNTIL YOUR SPECIAL DAY
              <span className="tiny-line" />
            </div>

            <Counter now={now} />

            <span className="time-zone">
              DECEMBER 24, 2026 · MIDNIGHT IN INDIA (IST)
            </span>
          </div>

          <p className="wait-message">
            Psst… the universe has a surprise for you. ♡
          </p>
        </section>

        {/* NEW: Daily romantic shayari and rotating photos */}
        <DailyLoveNote />
      </main>

      <Footer />
    </>
  );
}

// ============================================
// LOVE NOTES
// ============================================

function ReasonCards() {
  const [revealed, setRevealed] = useState([]);

  function toggle(index) {
    setRevealed((old) =>
      old.includes(index)
        ? old.filter((i) => i !== index)
        : [...old, index]
    );
  }

  return (
    <div className="reason-grid">
      {content.reasons.map((reason, index) => {
        const open = revealed.includes(index);

        return (
          <button
            type="button"
            key={reason.label}
            className={`reason-card ${open ? 'is-open' : ''}`}
            onClick={() => toggle(index)}
            aria-expanded={open}
          >
            <span className="reason-label">
              {reason.label}
            </span>

            <span
              className="reason-symbol"
              aria-hidden="true"
            >
              {open ? '♥' : '♡'}
            </span>

            <span className="reason-text">
              {open
                ? reason.message
                : 'Tap this little heart to find out.'}
            </span>

            <span className="reason-bottom">
              {open ? 'CLOSE NOTE −' : 'OPEN NOTE +'}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================
// MEMORY GALLERY
// ============================================

function MemoryGallery() {
  return (
    <div className="memory-grid">
      {content.memories.map((memory, index) => (
        <article
          className="memory-card"
          key={`${memory.title}-${index}`}
        >
          <div
            className={`memory-image memory-image-${index + 1}`}
          >
            {memory.image ? (
              <img
                src={ASSET(memory.image)}
                alt={memory.title}
                loading="lazy"
              />
            ) : (
              <div
                className="memory-placeholder"
                aria-label="Add your favorite photo here"
              >
                <span
                  className="placeholder-heart"
                  aria-hidden="true"
                >
                  ♡
                </span>
                <span>your photo here</span>
              </div>
            )}
          </div>

          <div className="memory-caption">
            <span className="memory-index">
              0{index + 1} / OUR STORY
            </span>
            <h3>{memory.title}</h3>
            <p>{memory.caption}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

// ============================================
// BIRTHDAY LETTER
// ============================================

function Letter() {
  const [opened, setOpened] = useState(false);

  return (
    <div className={`letter-wrap ${opened ? 'opened' : ''}`}>
      {!opened ? (
        <button
          className="letter-envelope"
          onClick={() => setOpened(true)}
          aria-label="Open your birthday letter"
        >
          <span className="letter-envelope-flap" />
          <span className="letter-seal">
            A <small>♡</small>
          </span>
          <span className="letter-prompt">
            tap to open your letter
          </span>
        </button>
      ) : (
        <article className="letter-paper">
          <span className="letter-date">
            DECEMBER 24, 2026
          </span>

          <h3>My dearest Aarefa,</h3>

          {content.letter.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <div className="letter-signature">
            {content.signature}
          </div>

          <span
            className="letter-flourish"
            aria-hidden="true"
          >
            ✧ ♡ ✧
          </span>
        </article>
      )}
    </div>
  );
}

// ============================================
// BIRTHDAY WISH
// ============================================

function Wish({ onCelebrate }) {
  const [wished, setWished] = useState(false);

  function makeWish() {
    setWished(true);
    onCelebrate();
  }

  return (
    <div className="wish-card">
      <div className="cake" aria-hidden="true">
        <span className="cake-candle">
          <span
            className={`candle-flame ${
              wished ? 'blown-out' : ''
            }`}
          />
        </span>
        <span className="cake-frosting" />
        <span className="cake-body">
          ♡ &nbsp; Aarefa &nbsp; ♡
        </span>
        <span className="cake-plate" />
      </div>

      <h3>
        {wished
          ? 'Your wish is with the stars.'
          : 'One little birthday wish...'}
      </h3>

      <p>
        {wished
          ? 'May every beautiful thing you dream of find its way to you. ✨'
          : 'Close your eyes, think of something wonderful, and make a wish.'}
      </p>

      <button
        className="primary-button wish-button"
        onClick={makeWish}
      >
        {wished
          ? 'Wish again ✧'
          : 'Blow out the candle ♡'}
      </button>
    </div>
  );
}

// ============================================
// MAIN BIRTHDAY WEBSITE
// ============================================

function Birthday({ onFireworks }) {
  return (
    <>
      <header className="site-header birthday-header">
        <a
          className="brand"
          href="#top"
          aria-label="For Aarefa, home"
        >
          <span className="brand-mark">A</span>
          <span>
            for you, always{' '}
            <span className="heart-pink">♡</span>
          </span>
        </a>

        <span className="header-note">
          A LOVE NOTE AMONG THE STARS
        </span>
      </header>

      <main id="top" className="birthday-main">
        <section
          className="birthday-hero"
          aria-labelledby="birthday-title"
        >
          <span
            className="hero-corner corner-one"
            aria-hidden="true"
          >
            ✧
          </span>

          <span
            className="hero-corner corner-two"
            aria-hidden="true"
          >
            ♡
          </span>

          <MoonScene small />

          <p className="eyebrow">
            {content.birthday.eyebrow}
          </p>

          <h1 id="birthday-title">
            {content.birthday.heading}
            <br />
            <em>{content.name}.</em>{' '}
            <span className="hero-heart">♡</span>
          </h1>

          <p className="lead">
            {content.birthday.subtitle}
          </p>

          <div className="hero-actions">
            <a
              className="primary-button"
              href="#letter"
            >
              {content.birthday.letterButton}{' '}
              <span aria-hidden="true">↗</span>
            </a>

            <button
              className="secondary-button"
              onClick={onFireworks}
            >
              More fireworks ✧
            </button>
          </div>

          <span className="scroll-hint">
            SCROLL TO EXPLORE YOUR LITTLE UNIVERSE
            <span aria-hidden="true">↓</span>
          </span>
        </section>

        <div className="section-divider">
          <span>✧</span>
          <span>♡</span>
          <span>✧</span>
        </div>

        <section
          id="reasons"
          className="content-section reasons-section"
        >
          <p className="eyebrow">
            A MILLION LITTLE REASONS
          </p>

          <h2>
            Just a few things that make you <em>you.</em>
          </h2>

          <p className="section-description">
            Every little heart holds something
            I want you to know.
          </p>

          <ReasonCards />
        </section>

        <section
          id="memories"
          className="content-section memories-section"
        >
          <p className="eyebrow">
            LITTLE MOMENTS, BIG FEELINGS
          </p>

          <h2>
            A few pages from <em>our story.</em>
          </h2>

          <p className="section-description">
            The moments that belong in their
            own little constellation.
          </p>

          <MemoryGallery />
        </section>

        <section
          id="letter"
          className="content-section letter-section"
        >
          <p className="eyebrow">
            SOME WORDS JUST FOR YOU
          </p>

          <h2>
            One letter. <em>All my heart.</em>
          </h2>

          <p className="section-description">
            There are a few things I wanted to say...
          </p>

          <Letter />
        </section>

        <section
          id="wish"
          className="content-section wish-section"
        >
          <p className="eyebrow">
            BECAUSE IT'S YOUR DAY
          </p>

          <h2>
            And now, <em>make a wish.</em>
          </h2>

          <Wish onCelebrate={onFireworks} />
        </section>

        <div className="final-line">
          Whatever the stars have planned,
          I hope they’re kind to you. <span>♡</span>
        </div>
      </main>

      <Footer />
    </>
  );
}

// ============================================
// FOOTER
// ============================================

function Footer() {
  return (
    <footer className="site-footer">
      <span>MADE WITH ALL THE LOVE IN MY UNIVERSE</span>
      <span className="footer-heart">♡</span>
      <span>JUST FOR AAREFA · 24.12.2026</span>
    </footer>
  );
}

// ============================================
// MAIN APPLICATION
// ============================================

export default function App() {
  const [now, setNow] = useState(Date.now());
  const [fireworksKey, setFireworksKey] = useState(0);

  const countdownAudio = useRef(null);
  const birthdayAudio = useRef(null);
  const birthdayStarted = useRef(false);

  const liveBirthday = now >= birthdayMoment;

  // Preview the birthday page with ?preview=1
  const preview =
    new URLSearchParams(window.location.search)
      .get('preview') === '1';

  const isBirthday = liveBirthday || preview;

  // Update countdown every half-second
  useEffect(() => {
    const timer = window.setInterval(
      () => setNow(Date.now()),
      500
    );

    const updateWhenVisible = () => {
      if (!document.hidden) {
        setNow(Date.now());
      }
    };

    document.addEventListener(
      'visibilitychange',
      updateWhenVisible
    );

    return () => {
      window.clearInterval(timer);
      document.removeEventListener(
        'visibilitychange',
        updateWhenVisible
      );
    };
  }, []);

  // Automatically switch background music
  useEffect(() => {
    const current = isBirthday
      ? birthdayAudio.current
      : countdownAudio.current;

    const other = isBirthday
      ? countdownAudio.current
      : birthdayAudio.current;

    if (other) {
      other.pause();
      other.currentTime = 0;
    }

    if (!current) return;

    current.volume = 0.72;
    current.muted = false;

    // Audio may be blocked by browser autoplay policies
    current.play().catch(() => {});

    if (isBirthday && !birthdayStarted.current) {
      birthdayStarted.current = true;
      setFireworksKey((x) => x + 1);
    }
  }, [isBirthday]);

  // Retry sound when the visitor interacts
  useEffect(() => {
    const tryAudio = () => {
      const active = isBirthday
        ? birthdayAudio.current
        : countdownAudio.current;

      if (active?.paused) {
        active.play().catch(() => {});
      }
    };

    const events = [
      'pointerdown',
      'touchstart',
      'keydown'
    ];

    events.forEach((event) => {
      document.addEventListener(
        event,
        tryAudio,
        { passive: true }
      );
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(
          event,
          tryAudio
        );
      });
    };
  }, [isBirthday]);

  return (
    <div className="app-shell">
      <Starfield />

      <audio
        ref={countdownAudio}
        src={ASSET('music/bg1.mp3')}
        preload="auto"
        loop
        playsInline
      />

      <audio
        ref={birthdayAudio}
        src={ASSET('music/bg2.mp3')}
        preload="auto"
        loop
        playsInline
      />

      {isBirthday ? (
        <>
          <Birthday
            onFireworks={() =>
              setFireworksKey((n) => n + 1)
            }
          />

          <Fireworks burstKey={fireworksKey} />
        </>
      ) : (
        <PreBirthday now={now} />
      )}
    </div>
  );
}
