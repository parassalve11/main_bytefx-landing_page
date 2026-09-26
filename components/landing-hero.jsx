"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import SmartLink from "./smart-link";
import Icon from "./icon";
import { site } from "@/lib/content";
import styles from "./landing-hero.module.css";

/* ------------------------------------------------------------------
   Landing hero — two slides on one lit stage.

   Reference: fpmarkets.com. What is borrowed is the structure, not the
   art: a full-bleed blue stage that never changes, slides that swap only
   the words and the cut-out on top of it, a split headline (thin line,
   bold line), large thin figures under hairline dividers, and a progress
   cursor that shows the next slide coming.

   Slide 1 puts the art on the right and the copy on the left. Slide 2 is
   the mirror — the phone bleeds off the bottom-left corner and the copy
   moves to the right — which is the composition of the supplied mock.

   Both slides are always rendered and stacked in one grid cell, so the
   hero is as tall as its tallest slide and never jumps on a change. The
   inactive slide is `inert` and hidden from assistive tech.

   The pointer drives three things through CSS variables on the section:
   a soft light that follows it, a slow parallax on the streaks, and a
   small 3D tilt on the art. Fine pointers only; off under reduced motion.
   All three are transforms, so moving the mouse never triggers a paint.

   Adapted from the supplied landing-page ZIP. SiteHeader selects its glass
   surface from the current route; the previous HeroSlot remains available.
   ------------------------------------------------------------------ */

const DWELL_MS = 7000;

const SLIDES = [
  {
    id: "markets",
    label: "Global markets",
    layout: "right",
    headingLevel: "h1",
    light: "Markets move fast.",
    bold: "Move with clarity.",
    lead: "Trade forex, metals, indices and crypto on MetaTrader 5, with clear conditions and support built around the markets.",
    primary: { label: "Open live account", href: site.liveAccountUrl },
    secondary: { label: "Explore demo", href: site.demoAccountUrl },
    stats: [
      { value: "1:2000", label: "Leverage up to" },
      { value: "0.0", label: "Pip spreads from" },
      { value: "150+", label: "Instruments" },
    ],
    art: {
      src: "/assets/hero/hero-trader.webp",
      width: 1122,
      height: 1370,
      sizes: "(max-width: 1023px) 80vw, 46vw",
      alt: "A trader checking live EUR/USD and NAS100 charts on his phone",
    },
  },
  {
    id: "mobile",
    label: "Mobile trading",
    layout: "left",
    headingLevel: "h2",
    light: "Every market,",
    bold: "one tap away.",
    lead: "Watch prices, place orders and fund your account from the app — one account across every device.",
    primary: { label: "Open live account", href: site.liveAccountUrl },
    secondary: { label: "Get the app", href: "/trading/mobile-app" },
    stats: [
      { value: "~20ms", label: "Order execution" },
      { value: "$20", label: "Minimum deposit" },
      { value: "24/6", label: "Client support" },
    ],
    art: {
      src: "/assets/hero/hero-phone.webp",
      width: 1558,
      height: 845,
      sizes: "(max-width: 1023px) 130vw, 58vw",
      alt: "A hand holding a phone with a EUR/USD chart and Buy and Sell buttons",
    },
  },
];

function useMedia(query) {
  const subscribe = useCallback((sync) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [query]);
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

/* The stage. Everything here is decoration and pointer-events: none.

   The silk is two pre-blurred WebP layers (public/assets/hero/silk-*.webp),
   not live SVG filters: a 70px Gaussian blur re-rasterised on every frame
   of a drift is far too expensive, and baked it costs ~110 KB once. Both
   layers, the parallax and the pointer light only ever change `transform`
   or `opacity`, so the whole stage moves on the compositor. The one live
   vector is the hairline and the comet that runs along it. */
function Backdrop() {
  const streak = "M-120 800 C 330 650, 660 700, 990 500 S 1450 150, 1800 110";

  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.base} />

      <div className={styles.silkWrap}>
        <div className={`${styles.layer} ${styles.far}`} />
        <div className={`${styles.layer} ${styles.near}`}>
          <svg
            className={styles.lines}
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <defs>
              <linearGradient id="hx-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset=".12" stopColor="#dce9ff" stopOpacity="0" />
                <stop offset=".55" stopColor="#e6f0ff" stopOpacity=".85" />
                <stop offset=".88" stopColor="#dce9ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={streak} fill="none" stroke="url(#hx-line)" strokeWidth="2" />
            <path
              className={styles.comet}
              d={streak}
              pathLength="1000"
              fill="none"
              stroke="#9cc5ff"
              strokeOpacity=".35"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              className={styles.comet}
              d={streak}
              pathLength="1000"
              fill="none"
              stroke="#f4f8ff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className={styles.spot} />
      <div className={styles.vignette} />
      <div className={styles.grain} />
    </div>
  );
}

/* The cursor. Rendered inside each slide's copy column (so it never sits
   on top of the art), but only the live copy runs the meter — the hidden
   slide's copy is inert and static. */
function Cursor({
  live,
  active,
  onSelect,
  autoplay,
  running,
  userPaused,
  onTogglePause,
  onFillEnd,
  cycle,
}) {
  const onKeyDown = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    onSelect((active + step + SLIDES.length) % SLIDES.length, true);
  };

  return (
    <div className={styles.cursor} role="group" aria-label="Choose a slide" onKeyDown={onKeyDown}>
      {SLIDES.map((slide, index) => {
        const current = index === active;

        return (
          <button
            key={slide.id}
            type="button"
            className={styles.dot}
            data-current={current ? "true" : undefined}
            aria-current={current ? "true" : undefined}
            aria-label={`Slide ${index + 1} of ${SLIDES.length}: ${slide.label}`}
            onClick={() => onSelect(index, true)}
          >
            <span className={`${styles.dotNum} tnum`}>0{index + 1}</span>
            <span className={styles.dotLabel}>{slide.label}</span>
            <span className={styles.dotTrack} aria-hidden="true">
              {current ? (
                live && autoplay ? (
                  <span
                    key={`${active}-${cycle}`}
                    className={styles.dotFill}
                    style={{
                      animationDuration: `${DWELL_MS}ms`,
                      animationPlayState: running ? "running" : "paused",
                    }}
                    onAnimationEnd={onFillEnd}
                  />
                ) : (
                  <span className={styles.dotFillStatic} />
                )
              ) : null}
            </span>
          </button>
        );
      })}

      {autoplay ? (
        <button
          type="button"
          className={styles.pause}
          onClick={onTogglePause}
          aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {userPaused ? <path d="m7 4 14 8-14 8z" /> : <path d="M6 4h4v16H6zm8 0h4v16h-4z" />}
          </svg>
        </button>
      ) : null}
    </div>
  );
}

function Slide({ slide, index, isActive, renderCursor, onHold }) {
  const Heading = slide.headingLevel;

  return (
    <div
      className={styles.slide}
      data-layout={slide.layout}
      data-active={isActive ? "true" : "false"}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${SLIDES.length}: ${slide.label}`}
      aria-hidden={isActive ? undefined : "true"}
      inert={!isActive}
    >
      {/* Art: a glow pooled under it, the cut-out, and the pointer tilt. */}
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.art}>
        <div className={styles.tilt}>
          <Image
            src={slide.art.src}
            alt={slide.art.alt}
            width={slide.art.width}
            height={slide.art.height}
            sizes={slide.art.sizes}
            preload={index === 0}
            className={styles.artImg}
          />
        </div>
      </div>

      <div className={styles.frame}>
        <div
          className={styles.copy}
          onPointerEnter={() => onHold(true)}
          onPointerLeave={() => onHold(false)}
        >
          <Heading className={styles.title}>
            <span className={`${styles.in} ${styles.titleLight}`} style={{ "--d": "0s" }}>
              {slide.light}
            </span>{" "}
            <span className={`${styles.in} ${styles.titleBold}`} style={{ "--d": "0.08s" }}>
              {slide.bold}
            </span>
          </Heading>

          <div className={styles.aside}>
            <p className={`${styles.in} ${styles.lead}`} style={{ "--d": "0.16s" }}>
              {slide.lead}
            </p>

            <div className={`${styles.in} ${styles.actions}`} style={{ "--d": "0.24s" }}>
              <SmartLink href={slide.primary.href} className={`${styles.cta} ${styles.ctaPrimary}`}>
                {slide.primary.label}
                <Icon name="arrow" size={16} />
              </SmartLink>
              <SmartLink href={slide.secondary.href} className={`${styles.cta} ${styles.ctaSecondary}`}>
                {slide.secondary.label}
              </SmartLink>
            </div>
          </div>

          <div className={styles.foot}>
            <dl className={`${styles.in} ${styles.stats}`} style={{ "--d": "0.32s" }}>
              {slide.stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt className={styles.statLabel}>{stat.label}</dt>
                  <dd className={`${styles.statValue} tnum`}>{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div className={`${styles.in} ${styles.cursorSlot}`} style={{ "--d": "0.4s" }}>
              {renderCursor(isActive)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingHero() {
  const rootRef = useRef(null);
  const touchRef = useRef(null);

  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [intro, setIntro] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [inView, setInView] = useState(true);

  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const autoplay = !reduced;
  const running = autoplay && !userPaused && !held && !focusInside && inView;

  const select = useCallback((index, fromUser = false) => {
    setIntro(false);
    setActive(index);
    setCycle((value) => value + 1);
    if (fromUser) setHeld(false);
  }, []);

  const next = useCallback(() => {
    // The global reduced-motion rule shortens every animation to ~0ms, so an
    // `animationend` can still arrive there — never let it drive the run.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setIntro(false);
    setActive((value) => (value + 1) % SLIDES.length);
    setCycle((value) => value + 1);
  }, []);

  /* Pause while the stage is scrolled out of view. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  /* Pointer light and depth, written straight to CSS variables on the
     section and eased on rAF, so nothing re-renders while the mouse moves. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches || reduced) return undefined;

    const target = { x: 0, y: 0, mx: 0, my: 0 };
    const now = { x: 0, y: 0, mx: 0, my: 0 };
    let frame = 0;
    let seeded = false;

    const step = () => {
      now.x += (target.x - now.x) * 0.07;
      now.y += (target.y - now.y) * 0.07;
      now.mx += (target.mx - now.mx) * 0.14;
      now.my += (target.my - now.my) * 0.14;

      root.style.setProperty("--hx-px", now.x.toFixed(4));
      root.style.setProperty("--hx-py", now.y.toFixed(4));
      root.style.setProperty("--hx-mx", `${now.mx.toFixed(1)}px`);
      root.style.setProperty("--hx-my", `${now.my.toFixed(1)}px`);

      const settled =
        Math.abs(target.x - now.x) < 0.0008 &&
        Math.abs(target.y - now.y) < 0.0008 &&
        Math.abs(target.mx - now.mx) < 0.3 &&
        Math.abs(target.my - now.my) < 0.3;

      frame = settled ? 0 : requestAnimationFrame(step);
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (event) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      target.x = (x / rect.width - 0.5) * 2;
      target.y = (y / rect.height - 0.5) * 2;
      target.mx = x;
      target.my = y;

      if (!seeded) {
        now.mx = x;
        now.my = y;
        seeded = true;
      }

      root.dataset.pointer = "on";
      kick();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      seeded = false;
      root.dataset.pointer = "off";
      kick();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  /* Swipe between slides on touch. Horizontal intent only, so a vertical
     page scroll that starts on the hero is left alone. */
  const onTouchStart = (event) => {
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) return;

    const step = dx < 0 ? 1 : -1;
    select((active + step + SLIDES.length) % SLIDES.length, true);
  };

  const renderCursor = (live) => (
    <Cursor
      live={live}
      active={active}
      onSelect={select}
      autoplay={autoplay}
      running={running}
      userPaused={userPaused}
      onTogglePause={() => setUserPaused((value) => !value)}
      onFillEnd={next}
      cycle={cycle}
    />
  );

  return (
    <section
      ref={rootRef}
      data-intro={intro ? "true" : "false"}
      aria-roledescription="carousel"
      aria-label="Highlights"
      className={styles.hero}
      onFocusCapture={() => setFocusInside(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusInside(false);
        }
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Backdrop />

      <div className={styles.stage} aria-live={running ? "off" : "polite"}>
        {SLIDES.map((slide, index) => (
          <Slide
            key={slide.id}
            slide={slide}
            index={index}
            isActive={index === active}
            renderCursor={renderCursor}
            onHold={setHeld}
          />
        ))}
      </div>
    </section>
  );
}
