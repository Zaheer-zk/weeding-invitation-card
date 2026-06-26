import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { invitation } from '../data/invitation'
import { googleCalendarUrl } from '../lib/calendar'
import {
  DiamondDivider,
  TildeDivider,
  CalendarDecor,
  CandlesDecor,
  BouquetDecor,
  RingsDecor,
  VenueDecor,
  EnvelopeDecor,
  MonogramRing,
} from './Decor'

const firstName = (full) => full.split(' ')[0]
const G = firstName(invitation.groom.name) // Zaheer
const B = firstName(invitation.bride.name) // Alfiya
const INITIALS = `${G[0]} & ${B[0]}`

/* Fade-and-rise wrapper that triggers as the element scrolls into view. */
function Reveal({ children, className = '', delay = 0, y = 28, as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  )
}

/* ===================== Hero ===================== */
export function Hero({ onOpen }) {
  return (
    <section className="sec hero" id="top">
      <div className="sec-frame">
        <Reveal className="eyebrow" as="p">The Wedding Of</Reveal>
        <Reveal delay={0.1}><DiamondDivider className="gold" /></Reveal>
        <Reveal delay={0.2} className="hero-monogram">{INITIALS}</Reveal>
        <Reveal delay={0.35} className="hero-names" as="p">
          {invitation.groom.name} &amp; {invitation.bride.name}
        </Reveal>
        <Reveal delay={0.5} className="hero-date" as="p">24&nbsp;.&nbsp;07&nbsp;.&nbsp;2026</Reveal>
        <Reveal delay={0.65}>
          <button type="button" className="btn-outline" onClick={onOpen}>
            Open Invitation
          </button>
        </Reveal>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}

/* ===================== Families ===================== */
export function Families() {
  return (
    <section className="sec families cream">
      <div className="sec-frame">
        <Reveal className="eyebrow ink" as="p">Together With Their Families</Reveal>
        <Reveal delay={0.1}><DiamondDivider className="gold" /></Reveal>
        <Reveal delay={0.2} className="script-names">
          <span className="sn-line">{G}<em className="amp">&amp;</em></span>
          <span className="sn-line">{B}</span>
        </Reveal>
        <Reveal delay={0.35}><DiamondDivider className="gold" /></Reveal>
        <Reveal delay={0.45} className="lede" as="p">request the honour of your presence</Reveal>
        <Reveal delay={0.55} className="lede-sub" as="p">at the celebration of their marriage</Reveal>
        <Reveal delay={0.8} className="scroll-hint" as="p">Scroll to unfold</Reveal>
      </div>
    </section>
  )
}

/* ===================== Invitation (Bismillah + ayat) ===================== */
export function Invitation() {
  return (
    <section className="sec invitation cream">
      <div className="sec-frame">
        <Reveal className="section-title ink" as="h2">Our Invitation</Reveal>
        <Reveal delay={0.1}><span className="title-rule" /></Reveal>

        <Reveal delay={0.2} className="invite-card">
          <MonogramRing initials={INITIALS} />
          <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="ayat">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا
            إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="invite-body">
            On a day that brings together joy and love, we are honoured to share the
            moments we have long awaited with hearts full of love, as
          </p>
          <div className="invite-couple">
            <span>{G}</span>
            <span className="ic-amp">&amp;</span>
            <span>{B}</span>
          </div>
          <p className="invite-body">
            are united in marriage — hoping you will share this joy and complete it
            with your presence.
          </p>
          <p className="invite-body soft">Your presence delights us and brightens our hearts.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ===================== Countdown ===================== */
function diff(target) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now())
  const total = Math.floor(ms / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    done: ms === 0,
  }
}

export function CountdownSection() {
  const [t, setT] = useState(() => diff(invitation.countdownTo))
  useEffect(() => {
    const id = setInterval(() => setT(diff(invitation.countdownTo)), 1000 * 30)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="sec countdown-sec cream">
      <div className="sec-frame">
        <Reveal className="cd-top-art ink"><CalendarDecor /></Reveal>
        <Reveal delay={0.1} className="big-title ink" as="h2">Countdown</Reveal>
        <Reveal delay={0.2} className="big-sub ink" as="p">to the day our hearts unite</Reveal>

        <Reveal delay={0.3} className="cd-clock">
          {t.done ? (
            <p className="cd-done">The blessed day is here — Alhamdulillah</p>
          ) : (
            <>
              <div className="cd-cell">
                <span className="cd-num">{String(t.days).padStart(3, '0')}</span>
                <span className="cd-lbl">Days</span>
              </div>
              <span className="cd-dot">.</span>
              <div className="cd-cell">
                <span className="cd-num">{String(t.hours).padStart(2, '0')}</span>
                <span className="cd-lbl">Hours</span>
              </div>
              <span className="cd-dot">.</span>
              <div className="cd-cell">
                <span className="cd-num">{String(t.minutes).padStart(2, '0')}</span>
                <span className="cd-lbl">Minutes</span>
              </div>
            </>
          )}
        </Reveal>

        <div className="cd-foot-art" aria-hidden="true">
          <Reveal delay={0.2} className="ink"><CandlesDecor /></Reveal>
          <Reveal delay={0.35} className="ink"><BouquetDecor /></Reveal>
        </div>
      </div>
    </section>
  )
}

/* ===================== Venue ===================== */
const stop = (e) => e.stopPropagation()

function EventBlock({ label, event, delay }) {
  const calUrl = googleCalendarUrl({
    title: `${label} — ${G} & ${B}`,
    start: event.start,
    end: event.end,
    details: `${label} of ${invitation.groom.name} & ${invitation.bride.name} — ${event.time}`,
    location: event.venue,
  })
  return (
    <Reveal delay={delay} className="venue-block">
      <p className="venue-label">{label}</p>
      <p className="venue-name">{event.venue}</p>
      <p className="venue-line">
        Join us for an evening of vows, blessings and celebration.
      </p>
      <div className="venue-actions">
        <a className="btn-outline small" href={event.map} target="_blank" rel="noopener noreferrer" onClick={stop}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-6.3-7-11a7 7 0 0114 0c0 4.7-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          View on the Map
        </a>
        <a className="btn-text" href={calUrl} target="_blank" rel="noopener noreferrer" onClick={stop}>
          Add to Calendar
        </a>
      </div>
      <TildeDivider className="gold" />
      <p className="venue-time">{event.time}</p>
      <p className="venue-day">{event.date}</p>
    </Reveal>
  )
}

export function Venue() {
  return (
    <section className="sec venue">
      <div className="sec-frame">
        <Reveal className="big-title light" as="h2">The Venue</Reveal>
        <Reveal delay={0.1} className="big-sub light" as="p">Where we celebrate</Reveal>
        <Reveal delay={0.2}><TildeDivider className="gold" /></Reveal>
        <Reveal delay={0.3} className="venue-illu"><VenueDecor /></Reveal>

        <EventBlock label="Nikkah" event={invitation.nikkah} delay={0.15} />
        <EventBlock label="Walima" event={invitation.walima} delay={0.15} />

        <Reveal delay={0.2} className="venue-note" as="p">
          Please be on time to enjoy every blessed moment, Insha’Allah.
        </Reveal>
      </div>
    </section>
  )
}

/* ===================== Closing ===================== */
export function Closing() {
  return (
    <section className="sec closing">
      <div className="sec-frame">
        <Reveal className="invite-card dua-card">
          <EnvelopeDecor />
          <p className="dua-ar">بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</p>
          <p className="dua-en">
            “May Allah bless you, shower His blessings upon you, and unite you in goodness.”
          </p>
        </Reveal>

        <Reveal delay={0.2} className="closing-names" as="h2">
          {G} &amp; {B}
        </Reveal>
        <Reveal delay={0.3}><TildeDivider className="gold" /></Reveal>
        <Reveal delay={0.4} className="closing-date" as="p">July 24 – 25, 2026</Reveal>
        <Reveal delay={0.5} className="light"><RingsDecor /></Reveal>
        <Reveal delay={0.7} className="closing-sign" as="p">
          With warm regards, the families of {invitation.groom.family} &amp; {invitation.bride.family}
        </Reveal>
      </div>
    </section>
  )
}
