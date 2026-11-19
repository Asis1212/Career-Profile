"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`site-header${stuck ? " is-stuck" : ""}`}>
      <div className="wrap">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="mark" aria-hidden="true">
            EA
          </span>
          <span className="brand-name">Elad Asis</span>
        </a>
        <nav className="nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="say-hello" href="#contact">
            Say hello
          </a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5.2 5.2l13.6 13.6M18.8 5.2L5.2 18.8" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="4.5" width="18" height="3" rx="1.5" />
              <rect x="3" y="10.5" width="18" height="3" rx="1.5" />
              <rect x="3" y="16.5" width="18" height="3" rx="1.5" />
            </svg>
          )}
        </button>
      </div>
      <nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label="Mobile">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="mailto:asiselad12@gmail.com" onClick={() => setOpen(false)}>
          Email
        </a>
      </nav>
    </header>
  );
}
