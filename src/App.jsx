
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  MapPin,
  CalendarDays,
  Clock3,
  Heart,
  ArrowDown,
  Music2,
  Sparkles
} from 'lucide-react';

import { wedding } from './data';

// COUNTDOWN TIMER
function useCountdown(target) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => {
    const diff = Math.max(0, new Date(target).getTime() - now);

    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000)
    };
  }, [target, now]);
}

// OPENING ENVELOPE
function Envelope({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;

    setOpening(true);
    setTimeout(onOpen, 1100);
  };

  return (
    <motion.div
      className="envelope-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="envelope-copy">
        <span className="eyebrow">A SPECIAL INVITATION</span>

        <h1>For you, with love</h1>

        <p>We would be honoured to have you with us.</p>
      </div>

      <motion.button
        className={`envelope ${opening ? 'opened' : ''}`}
        onClick={open}
        whileTap={{ scale: 0.97 }}
        aria-label="Open invitation"
      >
        <span className="envelope-flap" />

        <span className="wax-seal">
          Sunaina <i>&</i> Atul
        </span>

        <span className="envelope-hint">
          {opening ? 'Opening…' : 'Tap to open'}
        </span>
      </motion.button>

      <span className="tiny-note">
        A celebration of love • {wedding.dateText}
      </span>
    </motion.div>
  );
}

// ANIMATED SECTION
function Section({ children, className = '' }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75 }}
    >
      {children}
    </motion.section>
  );
}

// MAIN APP
function App() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [muted, setMuted] = useState(true);

  const audio = useRef(null);

  const countdown = useCountdown(wedding.dateISO);

  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30
  });

  // START BACKGROUND MUSIC
  const startMusic = () => {
    const player = audio.current;

    if (!player) return;

    player.volume = 0.25;
    player.muted = false;

    player.play()
      .then(() => setMuted(false))
      .catch(() => setMuted(true));
  };

  // MUTE / UNMUTE MUSIC
  const toggleMusic = async () => {
    if (!audio.current) return;

    if (muted) {
      try {
        audio.current.volume = 0.25;
        audio.current.muted = false;

        await audio.current.play();

        setMuted(false);
      } catch {
        setMuted(true);
      }
    } else {
      audio.current.muted = true;
      setMuted(true);
    }
  };

  // WHATSAPP RSVP
  const rsvp = `https://wa.me/${wedding.rsvpPhone}?text=${encodeURIComponent(
    `Hello! We would love to RSVP for ${wedding.bride} and ${wedding.groom}'s wedding.`
  )}`;

  return (
    <>
      {/* SCROLL PROGRESS */}
      <motion.div
        className="scroll-progress"
        style={{ scaleY: progress }}
      />

      {/* BACKGROUND MUSIC */}
      <audio
        ref={audio}
        src={wedding.music}
        loop
        preload="none"
      />

      {!inviteOpen ? (
        <Envelope
          onOpen={() => {
            setInviteOpen(true);
            startMusic();
          }}
        />
      ) : (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >

          {/* HERO SECTION */}
          <header
            className="hero"
            style={{
              '--hero-image': `url("${wedding.heroImage}")`
            }}
          >
            <div className="hero-shade" />

            <div className="hero-top">
              <span className="monogram">✦</span>
              <span>THE WEDDING CELEBRATION</span>
              <span className="monogram">✦</span>
            </div>

            <div className="hero-names">
              <p className="script-small">
                Together with our families
              </p>

              <h1>
                {wedding.bride}
                <em>&</em>
                {wedding.groom}
              </h1>

              <div className="gold-rule">
                <span>✦</span>
              </div>

              <p className="hero-date">
                {wedding.dateText} <span>·</span> {wedding.city}
              </p>

              <p className="hero-tagline">
                {wedding.intro}
              </p>
            </div>

            <a className="scroll-cue" href="#welcome">
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown size={15} />
            </a>
          </header>

          {/* WELCOME SECTION */}
          <Section className="welcome section-pad">
            <span className="eyebrow">
              WITH JOY IN OUR HEARTS
            </span>

            <h2>
              We’re getting <i>married</i>
            </h2>

            <p className="body-copy">
              {wedding.story}
            </p>

            <div className="ornament">❦</div>
          </Section>

          {/* COUNTDOWN SECTION */}
          <Section className="countdown-section section-pad">
            <span className="eyebrow">
              THE COUNTDOWN BEGINS
            </span>

            <h2>
              Until our forever
            </h2>

            <div className="countdown">
              {Object.entries(countdown).map(([label, value]) => (
                <div className="time-unit" key={label}>
                  <strong>
                    {String(value).padStart(2, '0')}
                  </strong>

                  <span>{label}</span>
                </div>
              ))}
            </div>

            <p className="countdown-date">
              <CalendarDays size={15} />
              {wedding.dateText}
            </p>
          </Section>

          {/* WEDDING FUNCTIONS */}
          <Section className="events-section section-pad">
            <span className="eyebrow">
              SAVE THE DATES
            </span>

            <h2>
              Wedding <i>festivities</i>
            </h2>

            <p className="body-copy">
              A few beautiful moments, made more special with you.
            </p>

            <div className="event-list">
              {wedding.events.map((event, index) => (
                <motion.article
                  className="event-card"
                  key={event.name}
                  whileHover={{ y: -4 }}
                  style={{
                    '--event-color': event.color || '#a77b35'
                  }}
                >
                  <div className="event-number">
                    0{index + 1}
                  </div>

                  <div className="event-content">
                    <span className="eyebrow">
                      {event.label}
                    </span>

                    <h3>{event.name}</h3>

                    <div className="event-detail">
                      <CalendarDays size={15} />
                      {event.date}
                    </div>

                    {event.time && (
                      <div className="event-detail">
                        <Clock3 size={15} />
                        {event.time}
                      </div>
                    )}

                    <div className="event-detail">
                      <MapPin size={15} />
                      {event.venue}
                    </div>

                    <p className="dress-code">
                      Dress code: {event.dress}
                    </p>

                    <a
                      className="text-link"
                      href={event.maps}
                      target="_blank"
                      rel="noreferrer"
                    >
                      VIEW LOCATION ↗
                    </a>
                  </div>

                  <div className="event-flower">
                    ✿
                  </div>
                </motion.article>
              ))}
            </div>
          </Section>

          {/* FAMILY RESIDENCE SECTION */}
          <Section className="home-section section-pad">
            <span className="eyebrow">
              FAMILY RESIDENCE
            </span>

            <h2>
              Our <i>Home</i>
            </h2>

            <div className="ornament">❦</div>

            <h3>
              {wedding.homeAddress.title}
            </h3>

            <p className="body-copy">
              {wedding.homeAddress.address}
            </p>

            <a
              className="rsvp-button"
              href={wedding.homeAddress.maps}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={16} />
              GET HOME DIRECTIONS
            </a>
          </Section>

          {/* CLOSING SECTION */}
          <Section className="closing-section section-pad">
            <Sparkles className="sparkle" size={22} />

            <span className="eyebrow">
              YOUR PRESENCE IS OUR PRESENT
            </span>

            <h2>
              Can’t wait to celebrate <i>with you</i>
            </h2>

            <p className="body-copy">
              Please let us know if you’ll be joining us.
            </p>

            <a
              className="rsvp-button"
              href={rsvp}
              target="_blank"
              rel="noreferrer"
            >
              RSVP ON WHATSAPP
              <Heart size={16} />
            </a>

            <div className="closing-names">
              {wedding.bride}
              <span>&</span>
              {wedding.groom}
            </div>

            <p className="footer-date">
              {wedding.dateText} · {wedding.city}
            </p>
          </Section>

          {/* MUSIC CONTROL */}
          <button
            className="music-button"
            onClick={toggleMusic}
            aria-label={muted ? 'Play music' : 'Mute music'}
          >
            {muted ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}

            <span>
              {muted ? 'MUSIC OFF' : 'MUSIC ON'}
            </span>
          </button>

        </motion.main>
      )}
    </>
  );
}

export default App;
