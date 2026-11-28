
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './DailyLoveNote.css';

// ============================================
// 25 ROMANTIC HINGLISH SHAYARIS
// ============================================

const shayaris = [
  `Teri muskurahat meri sabse pyaari aadat hai,
Tera naam hi mere dil ki ibadat hai.`,

  `Har subah tere khayalon se shuru hoti hai,
Aur har raat teri yaadon mein kho jaati hai.`,

  `Tu paas ho ya door ho, farq itna sa hai,
Tu mere dil mein har waqt rehti hai.`,

  `Meri duniya ka sabse khoobsurat hissa tu hai,
Mere har khwaab ka sabse haseen kissa tu hai.`,

  `Tujhse milkar aisa laga jaise,
Duaon ko aakhir unka jawaab mil gaya.`,

  `Teri aankhon mein jo sukoon mila hai,
Woh poori duniya mein kahin nahi mila.`,

  `Dil karta hai har lamha tujhe dekhta rahun,
Aur har dua mein bas tujhe maangta rahun.`,

  `Tere saath har chhoti si baat bhi khaas lagti hai,
Tere bina yeh duniya thodi udaas lagti hai.`,

  `Tera saath mere liye ek khoobsurat ehsaas hai,
Tu door hokar bhi mere dil ke paas hai.`,

  `Tu meri hansi ka sabab hai,
Aur meri duaon ka sabse pyaara jawaab hai.`,

  `Teri baaton mein ek alag si mithaas hai,
Tera har andaaz mere dil ke paas hai.`,

  `Tujhe sochna bhi ek pyaari si aadat ban gayi,
Aur tujhe chaahna meri ibadat ban gayi.`,

  `Mohabbat ka matlab tab samajh aaya,
Jab mere dil ne sirf tera naam dohraya.`,

  `Tera naam sunte hi dil ko sukoon milta hai,
Jaise thak kar ghar lautne ka ehsaas milta hai.`,

  `Har pal bas yahi dua rehti hai,
Teri zindagi khushiyon se bhari rehti hai.`,

  `Tere hone se meri duniya roshan lagti hai,
Har khushi tere saath aur bhi haseen lagti hai.`,

  `Teri ek jhalak bhi din bana deti hai,
Aur teri hansi saari thakan mita deti hai.`,

  `Main chahta hoon har khushi tujhe mile,
Aur har gham mujh tak aake ruk jaaye.`,

  `Tere saath waqt ruk sa jaata hai,
Aur dil bas tujhe dekhta reh jaata hai.`,

  `Tu meri kahani ka sabse haseen hissa hai,
Jise yaad karke dil har baar muskurata hai.`,

  `Meri har dua mein tera zikr hota hai,
Mere har khwaab mein tera hi fikr hota hai.`,

  `Tere saath zindagi khoobsurat lagti hai,
Har subah ek nayi mohabbat lagti hai.`,

  `Tere bina bhi tu mere saath rehti hai,
Shayad isi ko sachchi mohabbat kehte hain.`,

  `Dil ne jab bhi kisi ko apna maana hai,
Har dafa bas tujhe hi chuna hai.`,

  `Kal tera din hai, meri jaan,
Har khushi ho tere naam.
Tu meri sabse haseen dua hai,
Aur meri mohabbat ka sabse pyaara paighaam.`
];

// ============================================
// ALL 9 ROTATING PHOTOS
// ============================================

const dailyImages = [
  'images/daily/cdi1.jpg',
  'images/daily/cdi2.jpg',
  'images/daily/cdi3.jpg',
  'images/daily/cdi4.jpg',
  'images/daily/cdi5.jpg',
  'images/daily/cdi6.jpg',
  'images/daily/cdi7.jpg',
  'images/daily/cdi8.jpg',
  'images/daily/cdi9.jpg'
];

// ============================================
// INDIAN STANDARD TIME
// ============================================

function getIndianDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const getPart = (type) =>
    Number(parts.find(part => part.type === type).value);

  return Date.UTC(
    getPart('year'),
    getPart('month') - 1,
    getPart('day')
  );
}

const birthdayDate = Date.UTC(2026, 11, 24);
const oneDay = 24 * 60 * 60 * 1000;

function getDaysRemaining() {
  return Math.max(
    0,
    Math.ceil((birthdayDate - getIndianDate()) / oneDay)
  );
}

// ============================================
// FULL-SCREEN HEART EXPLOSION
// ============================================

const HEART_COUNT = 75;

const HEART_COLORS = [
  '#f5b4d1',
  '#ff88be',
  '#d9b7ff',
  '#f3dcad',
  '#ffe2f0',
  '#c8a7ff'
];

function createHeartParticles(originX, originY) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return Array.from({ length: HEART_COUNT }, (_, i) => {
    // Spread hearts throughout the whole viewport.
    const columns = 10;
    const rows = Math.ceil(HEART_COUNT / columns);

    const column = i % columns;
    const row = Math.floor(i / columns);

    const targetX = Math.max(
      10,
      Math.min(
        width - 10,
        ((column + 0.5) / columns) * width +
          (Math.random() - 0.5) * width * 0.12
      )
    );

    const targetY = Math.max(
      10,
      Math.min(
        height - 10,
        ((row + 0.5) / rows) * height +
          (Math.random() - 0.5) * height * 0.12
      )
    );

    return {
      id: i,
      x: targetX - originX,
      y: targetY - originY,
      rotation: Math.random() * 720 - 360,
      size: 20 + Math.random() * 32,
      delay: Math.random() * 0.22,
      duration: 2.2 + Math.random() * 0.65,
      color: HEART_COLORS[i % HEART_COLORS.length],
      symbol: i % 4 === 0 ? '♥' : '♡'
    };
  });
}

function HeartExplosion({ burst }) {
  if (!burst) return null;

  return createPortal(
    <div
      className="heart-explosion-overlay"
      aria-hidden="true"
    >
      {burst.particles.map((heart) => (
        <span
          key={`${burst.id}-${heart.id}`}
          className="explosion-heart"
          style={{
            left: `${burst.originX}px`,
            top: `${burst.originY}px`,
            '--travel-x': `${heart.x}px`,
            '--travel-y': `${heart.y}px`,
            '--rotation': `${heart.rotation}deg`,
            '--heart-size': `${heart.size}px`,
            '--heart-color': heart.color,
            '--delay': `${heart.delay}s`,
            '--duration': `${heart.duration}s`
          }}
        >
          {heart.symbol}
        </span>
      ))}
    </div>,
    document.body
  );
}

// ============================================
// DAILY LOVE NOTE COMPONENT
// ============================================

export default function DailyLoveNote() {
  const [daysLeft, setDaysLeft] = useState(
    getDaysRemaining
  );

  const [heartBurst, setHeartBurst] = useState(null);
  const heartTimer = useRef(null);
  const heartBurstId = useRef(0);

  useEffect(() => {
    const update = () => setDaysLeft(getDaysRemaining());

    const interval = setInterval(update, 30000);

    document.addEventListener('visibilitychange', update);
    window.addEventListener('focus', update);

    return () => {
      clearInterval(interval);

      document.removeEventListener(
        'visibilitychange',
        update
      );

      window.removeEventListener('focus', update);
    };
  }, []);

  // Clean up animation timer when leaving the page.
  useEffect(() => {
    return () => {
      if (heartTimer.current) {
        clearTimeout(heartTimer.current);
      }
    };
  }, []);

  function releaseHearts(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    // Exact position of the clicked heart.
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    heartBurstId.current += 1;

    const newBurst = {
      id: heartBurstId.current,
      originX,
      originY,
      particles: createHeartParticles(originX, originY)
    };

    if (heartTimer.current) {
      clearTimeout(heartTimer.current);
    }

    setHeartBurst(newBurst);

    heartTimer.current = setTimeout(() => {
      setHeartBurst(null);
    }, 3300);
  }

  if (daysLeft <= 0) return null;

  // Day 25 is index 0.
  const dayIndex = Math.min(
    shayaris.length - 1,
    Math.max(0, shayaris.length - daysLeft)
  );

  const todaysShayari = shayaris[dayIndex];

  const todaysImage =
    dailyImages[dayIndex % dailyImages.length];

  const imageURL =
    `${import.meta.env.BASE_URL}${todaysImage}`;

  return (
    <section className="daily-love-section">
      <div className="daily-love-heading">
        <span className="daily-love-stars">
          ✦ ♡ ✦
        </span>

        <p className="daily-love-eyebrow">
          A LITTLE LOVE NOTE, JUST FOR YOU
        </p>

        <h2>
          Aaj Ki <em>Shayari</em> ♡
        </h2>

        <p className="daily-love-subtitle">
          A new little piece of my heart,
          every single day.
        </p>
      </div>

      <div className="daily-love-card">
        <div className="daily-love-photo">
          <img
            src={imageURL}
            alt={`A memory for day ${daysLeft}`}
            loading="eager"
          />
        </div>

        <div className="daily-love-content">
          <span className="daily-love-label">
            DAY {daysLeft} · OUR LITTLE STORY
          </span>

          {/* CLICKABLE ROMANTIC HEART */}
          <div className="love-heart-container">
            <button
              type="button"
              className="daily-love-heart-button"
              onClick={releaseHearts}
              aria-label="Send Aarefa some love"
              title="Tap to send some love"
            >
              ♡
            </button>

            <span className="love-heart-hint">
              TAP THE HEART
            </span>
          </div>

          <p className="daily-love-poem">
            {todaysShayari}
          </p>

          <div className="daily-love-divider">
            ✦
          </div>

          <p className="daily-love-signature">
            For Aarefa, with all my love ♡
          </p>
        </div>
      </div>

      <p className="daily-love-footer">
        One day closer to celebrating you ♡
      </p>

      {/* Portal keeps hearts above the entire website */}
      <HeartExplosion burst={heartBurst} />
    </section>
  );
}
