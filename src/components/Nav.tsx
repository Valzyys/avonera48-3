"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/live", label: "Live" },
  { href: "/members", label: "Member" },
  { href: "/theater", label: "Theater" },
  { href: "/news", label: "Berita" },
  { href: "/events", label: "Event" },
  { href: "/birthdays", label: "Ulang tahun" },
  { href: "/shipping", label: "Ongkir" },
];

export function Nav() {
  const path = usePathname();
  const [solid, setSolid] = useState(false);

  // di beranda nav transparan dulu biar video kelihatan penuh
  useEffect(() => {
    if (path !== "/") {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  return (
    <nav className="nav" data-solid={solid}>
      <div className="shell nav-inner">
        <Link href="/" className="brand" aria-label="Avonera48, ke beranda">
          avonera<span>48</span>
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={path === l.href || path.startsWith(l.href + "/")}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
