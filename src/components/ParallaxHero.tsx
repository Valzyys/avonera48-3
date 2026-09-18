"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type Props = {
  liveCount?: number;
  video?: string;
  poster?: string;
};

export function ParallaxHero({ liveCount = 0, video, poster }: Props) {
  const hostRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      host.style.setProperty("--p", "0");
      host.style.setProperty("--shift", "0");
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = host.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), travel);

      // progress video -> banner
      const p = scrolled / travel;
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      host.style.setProperty("--p", eased.toFixed(4));

      // drift buat layer parallax — video pelan, teks lebih cepat ke arah lawan
      host.style.setProperty("--shift", (scrolled * 0.22).toFixed(2));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="hero"
      ref={hostRef as any}
      style={{ "--p": 0, "--shift": 0 } as any}
    >
      <div className="hero-sticky">
        <div className="hero-frame">
          <video
            className="hero-video"
            src={video || process.env.NEXT_PUBLIC_HERO_VIDEO || "/hero.mp4"}
            poster={poster || process.env.NEXT_PUBLIC_HERO_POSTER || "/hero-poster.jpg"}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="hero-veil" />

          <div className="hero-copy">
            <span className="hero-tag">
              {liveCount > 0 ? (
                <>
                  <b>{liveCount}</b> member lagi siaran
                </>
              ) : (
                <>Panggung lagi kosong</>
              )}
            </span>
            <h1 className="display d1">
              Panggungnya jalan terus.
              <br />
              Lo tinggal nonton.
            </h1>
            <p className="lede">
              Siapa yang lagi siaran, jadwal theater minggu ini, dan kabar
              terbaru — semuanya di satu halaman.
            </p>
          </div>

          <div className="hero-band">
            <span className="display d3">avonera48</span>
            <span className="hero-rule" />
            <span className="pill pill-spot">
              {liveCount > 0 ? `${liveCount} live` : "sepi"}
            </span>
            <Link href="/live" className="btn">
              Lihat live
            </Link>
          </div>

          <span className="scroll-hint">
            scroll
            <i />
          </span>
        </div>
      </div>
    </section>
  );
}
