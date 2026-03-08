import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import { BANNERS } from "../../constants/Assets";
import { defaultContent } from "../../constants/defaultContent";

export interface HeroSlide {
  title?: string;
  description?: string;
  bulletPoints?: string[] | string;
  image?: string;
  redirectUrl?: string;
}

interface HeroData {
  slides?: HeroSlide[];
  // legacy single-slide fields (backward compat)
  heading?: string;
  description?: string;
  buttonPrimary?: string;
  buttonSecondary?: string;
  backgroundImage?: string;
}

const AUTOPLAY_MS = 5000;
const DEFAULT_SLIDES: HeroSlide[] = defaultContent.home.sections.hero.slides;

const HeroSec: React.FC<{ data?: HeroData }> = ({ data }) => {
  const navigate = useNavigate();

  // Use slides from API data if available, otherwise always fall back to default slides
  const slides: HeroSlide[] =
    data?.slides && data.slides.length > 0
      ? data.slides
      : DEFAULT_SLIDES;

  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0); // triggers re-animation on slide change
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  // Navigate helpers using functional setState (avoids stale closures)
  function goTo(idx: number) {
    setCurrent(((idx % total) + total) % total);
    setAnimKey((k) => k + 1);
  }

  function next() {
    setCurrent((prev) => (prev + 1) % total);
    setAnimKey((k) => k + 1);
  }

  function prev() {
    setCurrent((prev) => (prev - 1 + total) % total);
    setAnimKey((k) => k + 1);
  }

  // Auto-play with ref-based pause check
  useEffect(() => {
    if (total <= 1) return;

    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent((c) => (c + 1) % total);
        setAnimKey((k) => k + 1);
      }
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  function handleSlideClick(url?: string) {
    if (!url) return;
    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener");
    } else {
      navigate(url);
    }
  }

  function parseBullets(bp: string[] | string | undefined): string[] {
    if (!bp) return [];
    if (Array.isArray(bp)) return bp.filter(Boolean);
    return String(bp).split("\n").map((s) => s.trim()).filter(Boolean);
  }

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* SLIDES */}
      <div className="hero-carousel__track">
        {slides.map((slide, i) => {
          const bg = slide.image || BANNERS[i % BANNERS.length];
          const isActive = i === current;
          const bullets = parseBullets(slide.bulletPoints);

          return (
            <div
              key={i}
              className={`hero-carousel__slide${isActive ? " hero-carousel__slide--active" : ""}`}
              style={{ backgroundImage: `url(${bg})` }}
              onClick={() => handleSlideClick(slide.redirectUrl)}
              role={slide.redirectUrl ? "link" : undefined}
              tabIndex={isActive && slide.redirectUrl ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSlideClick(slide.redirectUrl);
              }}
            >
              {/* dark overlay */}
              <div className="hero-carousel__overlay" />

              {/* text content — animKey forces re-mount for CSS animation restart */}
              {isActive && (
                <div className="hero-carousel__content" key={animKey}>
                  {slide.title && (
                    <h1 className="hero-carousel__title hero-anim hero-anim--1">
                      {slide.title}
                    </h1>
                  )}

                  {slide.description && (
                    <p className="hero-carousel__desc hero-anim hero-anim--2">
                      {slide.description}
                    </p>
                  )}

                  {bullets.length > 0 && (
                    <ul className="hero-carousel__bullets hero-anim hero-anim--2">
                      {bullets.map((bp, j) => (
                        <li key={j} className="hero-anim" style={{ animationDelay: `${0.35 + j * 0.1}s` }}>
                          {bp}
                        </li>
                      ))}
                    </ul>
                  )}

                  {slide.redirectUrl && (
                    <span className="hero-carousel__cta hero-anim hero-anim--3">
                      Learn More &rarr;
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ARROWS */}
      {total > 1 && (
        <>
          <button
            type="button"
            className="hero-carousel__arrow hero-carousel__arrow--prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="hero-carousel__arrow hero-carousel__arrow--next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* DOTS */}
      {total > 1 && (
        <div className="hero-carousel__dots">
          {slides.map((_, i) => (
            <button
              type="button"
              key={i}
              className={`hero-carousel__dot${i === current ? " hero-carousel__dot--active" : ""}`}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSec;
