"use client";

import { useState } from "react";

/**
 * Foto dengan fallback. Banyak URL dari API bisa 404 atau hotlink-protected,
 * jadi kalau gagal muat kita ganti ke inisial nama, bukan ikon rusak.
 */
export function Shot({
  src,
  alt,
  shape = "portrait",
  children,
}: {
  src?: string;
  alt: string;
  shape?: "portrait" | "wide";
  children?: React.ReactNode;
}) {
  const [broken, setBroken] = useState(!src);

  const initial = alt.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className={`shot shot-${shape}`}>
      {broken ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-display)",
            fontSize: "2.6rem",
            color: "rgba(230,235,245,0.2)",
            background:
              "linear-gradient(145deg, var(--ink-2), rgba(225,29,76,0.12))",
          }}
        >
          {initial}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setBroken(true)}
        />
      )}
      {children}
    </div>
  );
}
