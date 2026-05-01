/* Shared building blocks for Peacockery pages.
   Exported to window so each page script can use them. */

const NAV_LINKS = [
  { href: "index.html", label: "Index", key: "index" },
  { href: "work.html", label: "Work", key: "work" },
  { href: "about.html", label: "About", key: "about" },
  { href: "contact.html", label: "Contact", key: "contact" },
];

function ThemeBoot() {
  React.useEffect(() => {
    const t = localStorage.getItem("peacockery-theme") || "dark";
    const ty = localStorage.getItem("peacockery-type") || "sans";
    const palette = localStorage.getItem("peacockery-palette") || "ink";
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.setAttribute("data-type", ty);
    document.documentElement.setAttribute("data-palette", palette);
  }, []);
  return null;
}

function ThemeToggle() {
  const [theme, setTheme] = React.useState(
    () => typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") || "dark"
  );
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("peacockery-theme", next);
  };
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: theme === "light" ? "var(--ink)" : "var(--accent)" }}></span>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}

function Nav({ active }) {
  return (
    <nav className="nav" style={{ backgroundColor: "rgb(14, 14, 14)" }}>
      <div className="container nav-inner">
        <a href="index.html" className="nav-logo">
          Peacockery<span className="dot">.</span>
        </a>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.key} href={l.href} className={active === l.key ? "active" : ""}>
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Let's make something</div>
            <div className="display h-l" style={{ marginBottom: 18 }}>
              Got a project in mind?
            </div>
            <a href="mailto:hello@peacockery.co" className="pill solid">
              hello@peacockery.co <span className="arrow">↗</span>
            </a>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Elsewhere</div>
            <a className="footer-link" href="#"><span>LinkedIn</span><span className="arrow">↗</span></a>
            <a className="footer-link" href="#"><span>Dribbble</span><span className="arrow">↗</span></a>
            <a className="footer-link" href="#"><span>Read.cv</span><span className="arrow">↗</span></a>
            <a className="footer-link" href="#"><span>Instagram</span><span className="arrow">↗</span></a>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Currently</div>
            <p style={{ margin: 0, color: "var(--ink-2)", maxWidth: 260 }}>
              Experience Design Director at <span style={{ color: "var(--ink)" }}>TierOne</span>.
              Selectively taking on consulting + advisory work.
            </p>
          </div>
        </div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Michael Peacock</span>
          <span>Made in Springfield, MO</span>
          <span>v 4.0 — 2026</span>
        </div>
      </div>
    </footer>
  );
}

function Placeholder({ label, kind, tint = 1, ratio = "16 / 10", style }) {
  return (
    <div className={`placeholder tinted-${tint}`} style={{ aspectRatio: ratio, width: "100%", ...style }}>
      <div className="ph-label">
        <span className="ph-dot"></span>
        <span>{kind || "image"}</span>
        <span style={{ opacity: 0.5 }}>—</span>
        <span>{label}</span>
      </div>
    </div>
  );
}

function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
    els.forEach((el) => io.observe(el));
    const failsafe = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("in");
        }
      });
    }, 200);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);
}

Object.assign(window, { Nav, Footer, ThemeBoot, ThemeToggle, Placeholder, useReveal, NAV_LINKS });
