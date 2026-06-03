import React from 'react'
import { invitation } from '../data/invitation'
import { CornerOrnament, Crescent, ArabesqueDivider } from './Ornaments'
import Countdown from './Countdown'
import { googleCalendarUrl } from '../lib/calendar'

// Stop card-flip / page-nav handlers from firing when a link is tapped.
const stop = (e) => e.stopPropagation()

function EventActions({ title, event }) {
  const calUrl = googleCalendarUrl({
    title,
    start: event.start,
    end: event.end,
    details: `${title} of Zaheer Khan & Alfiya Shaikh — ${event.time}`,
    location: event.venue,
  })
  return (
    <div className="event-actions">
      <a
        className="event-action"
        href={calUrl}
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={stop}
        onClick={stop}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4.5" width="18" height="17" rx="2" />
          <path d="M3 9h18M8 2.5v4M16 2.5v4M12 13v4M10 15h4" />
        </svg>
        <span>Add to Calendar</span>
      </a>
      <a
        className="event-action"
        href={event.map}
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={stop}
        onClick={stop}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-6.3-7-11a7 7 0 0114 0c0 4.7-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span>View Location</span>
      </a>
    </div>
  )
}

function Corners() {
  return (
    <>
      <CornerOrnament className="tl" />
      <CornerOrnament className="tr" />
      <CornerOrnament className="bl" />
      <CornerOrnament className="br" />
    </>
  )
}

export function CoverFace() {
  return (
    <div className="face cover">
      <Corners />
      <div className="face-inner cover">
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Crescent size={56} />
          <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="bismillah-trans">In the name of Allah</div>
          <ArabesqueDivider />
          <div className="cover-title">Walima &amp; Nikkah</div>
          <div className="cover-sub">An invitation to celebrate love &amp; faith</div>
        </div>

        <div style={{ width: '100%', textAlign: 'center' }}>
          <div className="ayat">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </div>
          <div className="ayat-trans">
            “And among His signs is that He created for you mates from among
            yourselves, that you may dwell in tranquility with them, and He
            placed between you affection and mercy.”
          </div>
          <div className="ayat-ref">— Surah Ar-Rum 30:21</div>
        </div>

        <div style={{ width: '100%', textAlign: 'center' }}>
          <ArabesqueDivider />
          <div className="cover-couple">
            {invitation.groom.name.split(' ')[0]}
            <span className="amp">&amp;</span>
            {invitation.bride.name.split(' ')[0]}
          </div>
          <div className="cover-foot" style={{ marginTop: 18 }}>
            Click or drag to open
          </div>
        </div>
      </div>
    </div>
  )
}

export function InsideLeftFace() {
  const { groom, bride, message } = invitation
  return (
    <div className="face">
      <Corners />
      <div className="face-inner inside left-page">
        <div className="left-bismillah">
          <div className="bismillah small">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="bismillah-trans">In the name of Allah, the Most Merciful</div>
        </div>

        <div className="couple-block top">
          <div className="couple-name">{groom.name}</div>
          <span className="couple-amp">&amp;</span>
          <div className="couple-name">{bride.name}</div>
        </div>

        <ArabesqueDivider />

        <div className="grace">With the blessings of Almighty Allah</div>

        <div className="families">
          <div className="family">
            <div className="family-label">Groom</div>
            <div className="family-relation">Son of</div>
            <div className="family-name">{groom.father}</div>
            <div className="family-and">&amp;</div>
            <div className="family-name">{groom.mother}</div>
            <div className="family-city">{groom.city}</div>
          </div>

          <div className="family-divider" aria-hidden="true" />

          <div className="family">
            <div className="family-label">Bride</div>
            <div className="family-relation">Daughter of</div>
            <div className="family-name">{bride.father}</div>
            <div className="family-and">&amp;</div>
            <div className="family-name">{bride.mother}</div>
            <div className="family-city">{bride.city}</div>
          </div>
        </div>

        <p className="invite-msg">{message}</p>

        <div className="left-foot">
          <ArabesqueDivider />
          <div className="signoff">— with warm regards, the families of the bride &amp; groom —</div>
        </div>
      </div>
    </div>
  )
}

export function InsideRightFace() {
  const { nikkah, walima } = invitation
  return (
    <div className="face">
      <Corners />
      <div className="face-inner inside">
        <div>
          <h2>The Celebrations</h2>
          <div className="blessed">honour us with your presence</div>
        </div>

        <Countdown target={invitation.countdownTo} />

        <div className="event">
          <div className="event-name">Nikkah</div>
          <div className="event-date">{nikkah.date}</div>
          <div className="event-time">{nikkah.time}</div>
          <div className="event-venue">{nikkah.venue}</div>
          <EventActions title="Nikkah" event={nikkah} />
        </div>

        <ArabesqueDivider />

        <div className="event">
          <div className="event-name">Walima</div>
          <div className="event-date">{walima.date}</div>
          <div className="event-time">{walima.time}</div>
          <div className="event-venue">{walima.venue}</div>
          <EventActions title="Walima" event={walima} />
        </div>

        <div className="dua">
          <ArabesqueDivider />
          <div className="ayat">بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</div>
          <div className="ayat-trans">
            “May Allah bless you, shower His blessings upon you, and unite you in
            goodness.”
          </div>
        </div>
      </div>
    </div>
  )
}
