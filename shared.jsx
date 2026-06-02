/* Shared building blocks for Peacockery pages.
   Exported to window so each page script can use them. */

/* ─── Site helpers ─── */

const NAV_LINKS = [
  { href: "work.html", label: "Work", key: "work" },
  { href: "about.html", label: "About", key: "about" },
  { href: "contact.html", label: "Contact", key: "contact" },
];

/** Stagger between nav pills (left → right). */
const NAV_PILL_STAGGER_MS = 90;
/** Default pages: pills begin shortly after the logo fade. */
const NAV_PILLS_BASE_MS = 320;
/** Home: after last hero line (710ms + 1400ms) plus a short pause. */
const NAV_HOME_PILLS_BASE_MS = 2240;
const NAV_PILL_ANIM_MS = 650;

function navPillDelay(index, onHome) {
  const base = onHome ? NAV_HOME_PILLS_BASE_MS : NAV_PILLS_BASE_MS;
  return base + index * NAV_PILL_STAGGER_MS;
}

function navPillsSequenceEndMs(onHome) {
  const base = onHome ? NAV_HOME_PILLS_BASE_MS : NAV_PILLS_BASE_MS;
  const lastIndex = NAV_LINKS.length - 1;
  return base + lastIndex * NAV_PILL_STAGGER_MS + NAV_PILL_ANIM_MS;
}

/** Prefix for internal .html links when a page lives under e.g. projects/ (set window.__PEACOCKERY_BASE in that page's HTML). */
function siteHref(relPath) {
  const base = typeof window !== "undefined" && window.__PEACOCKERY_BASE != null ? window.__PEACOCKERY_BASE : "";
  return base + relPath;
}

/* ─── Footer icon components ─── */

/* Footer social marks — Lucide (ISC) for LinkedIn + Dribbble; Spotify mark from Simple Icons (CC0) */
function FooterIconLinkedIn() {
  return (
    <svg
      className="footer-link__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function FooterIconDribbble() {
  return (
    <svg
      className="footer-link__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  );
}
function FooterIconSpotify() {
  return (
    <svg className="footer-link__icon footer-link__icon--fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
      />
    </svg>
  );
}

/* ─── CursorBoot ─── */

function CursorBoot() {
  React.useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = document.createElement("div");
    cursor.id = "cursor";
    document.body.appendChild(cursor);

    const TEXT = "h1, h2, h3, h4, h5, h6, p, li, dt, dd, figcaption, blockquote";
    const HOVER = "a, .featured-card";

    function caretAt(x, y) {
      if (document.caretRangeFromPoint) {
        const range = document.caretRangeFromPoint(x, y);
        if (!range) return null;
        const rects = range.getClientRects();
        const rect = rects.length ? rects[0] : range.getBoundingClientRect();
        return rect.height ? { rect, range } : null;
      }
      if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(x, y);
        if (!pos) return null;
        const range = document.createRange();
        range.setStart(pos.offsetNode, pos.offset);
        range.collapse(true);
        const rects = range.getClientRects();
        const rect = rects.length ? rects[0] : range.getBoundingClientRect();
        return rect.height ? { rect, range } : null;
      }
      return null;
    }

    function elementFromRange(range, root) {
      let node = range.startContainer;
      if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
      return node && root.contains(node) ? node : null;
    }

    function fontSizeAt(x, y, root) {
      const hit = caretAt(x, y);
      const el = hit ? elementFromRange(hit.range, root) : null;
      return parseFloat(getComputedStyle(el || root).fontSize);
    }

    function lineCenterY(x, y, root, fontSize) {
      const hit = caretAt(x, y);
      if (hit && elementFromRange(hit.range, root)) {
        return hit.rect.top + hit.rect.height / 2;
      }
      const style = getComputedStyle(root);
      const lh = parseFloat(style.lineHeight) || fontSize * 1.5;
      const rect = root.getBoundingClientRect();
      const lineIndex = Math.max(0, Math.floor((y - rect.top) / lh));
      return rect.top + lineIndex * lh + lh / 2;
    }

    function clearTextMode() {
      cursor.classList.remove("cursor--text");
      cursor.style.height = "";
    }

    function setCustomActive(active) {
      document.body.classList.toggle("cursor-custom-active", active);
    }

    function deactivate() {
      cursor.classList.remove("cursor--hover");
      clearTextMode();
      setCustomActive(false);
    }

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (e.target.closest(HOVER)) {
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
        cursor.classList.add("cursor--hover");
        clearTextMode();
        setCustomActive(true);
        return;
      }

      cursor.classList.remove("cursor--hover");

      const tEl = e.target.closest(TEXT);
      if (tEl) {
        const fontSize = fontSizeAt(x, y, tEl);
        cursor.style.left = x + "px";
        cursor.style.height = fontSize + "px";
        cursor.style.top = lineCenterY(x, y, tEl, fontSize) + "px";
        cursor.classList.add("cursor--text");
        setCustomActive(true);
        return;
      }

      deactivate();
    };

    document.addEventListener("mousemove", onMove);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.body.classList.remove("cursor-custom-active");
      cursor.remove();
    };
  }, []);
  return null;
}

/* ─── ThemeBoot / ThemeToggle ─── */

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
  const [theme, setTheme] = React.useState(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.getAttribute("data-theme") || "dark";
  });
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("peacockery-theme", next);
    window.dispatchEvent(new CustomEvent("peacockery-themechange", { detail: { theme: next } }));
  };
  return (
    <button
      className={`theme-toggle${theme === "dark" ? " theme-toggle--dark" : ""}`}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb" />
        <span className="theme-toggle__icon theme-toggle__icon--sun">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2" x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="22"/>
            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/>
            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
            <line x1="2" y1="12" x2="4" y2="12"/>
            <line x1="20" y1="12" x2="22" y2="12"/>
            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/>
            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>
          </svg>
        </span>
        <span className="theme-toggle__icon theme-toggle__icon--moon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </span>
      </span>
    </button>
  );
}

/* ─── Nav pill frost (fixed layers — backdrop-filter fails inside sticky/animated trees) ─── */

function NavPillFrost({ pillsRef, onHome }) {
  const [rects, setRects] = React.useState([]);

  React.useEffect(() => {
    const pillsEl = pillsRef.current;
    if (!pillsEl) return;

    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const pills = pillsEl.querySelectorAll(".nav-pill");
        setRects(
          [...pills].map((pill, index) => {
            const r = pill.getBoundingClientRect();
            return {
              top: r.top,
              left: r.left,
              width: r.width,
              height: r.height,
              active: pill.classList.contains("nav-pill--active"),
              delayMs: navPillDelay(index, onHome),
            };
          })
        );
      });
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(pillsEl);
    const t1 = setTimeout(measure, 150);
    const t2 = setTimeout(measure, navPillsSequenceEndMs(onHome) + 80);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pillsRef, onHome]);

  if (!rects.length) return null;

  return ReactDOM.createPortal(
    <div className="nav-pill-frost-layer" aria-hidden="true">
      {rects.map((r, i) => (
        <div
          key={i}
          className={`nav-pill-frost${r.active ? " nav-pill-frost--active" : ""}`}
          style={{
            top: `${r.top}px`,
            left: `${r.left}px`,
            width: `${r.width}px`,
            height: `${r.height}px`,
            animationDelay: `${r.delayMs}ms`,
          }}
        />
      ))}
    </div>,
    document.body
  );
}

/* ─── Nav ─── */

function Nav({ active }) {
  const onHome = active === "index";
  const pillsRef = React.useRef(null);
  const themeToggleDelayMs =
    navPillDelay(NAV_LINKS.length - 1, onHome) + NAV_PILL_STAGGER_MS + 40;
  return (
    <>
    <CursorBoot />
    <nav className={onHome ? "nav nav--home" : "nav"}>
      <div className="container nav-inner">
        <a
          href={siteHref("/")}
          className="nav-logo"
          aria-current={onHome ? "page" : undefined}
          aria-label="Peacockery"
        >
          <svg
            className="nav-logo-svg"
            viewBox="0 0 124 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <g clipPath="url(#nav-logo-clip)">
              <path
                d="M118.685 16.6362C118.402 17.3955 118.104 18.0654 117.792 18.646C117.494 19.2414 117.166 19.7476 116.809 20.1644C116.452 20.5813 116.05 20.9013 115.603 21.1246C115.172 21.3479 114.665 21.4596 114.085 21.4596C113.742 21.4596 113.393 21.4298 113.036 21.3703C112.693 21.3107 112.358 21.2288 112.031 21.1246V18.8246C112.313 18.9288 112.581 19.0033 112.834 19.048C113.088 19.1075 113.363 19.1372 113.661 19.1372C113.943 19.1372 114.196 19.0851 114.42 18.9809C114.658 18.8767 114.881 18.7055 115.09 18.4673C115.298 18.2292 115.491 17.9166 115.67 17.5295C115.864 17.1424 116.065 16.6735 116.273 16.1227L111.517 5.13625H114.241L117.457 13.4877H117.523L120.628 5.13625H123.33L118.685 16.6362Z"
                fill="var(--ink)"
              />
              <path
                d="M103.766 5.13624H106.066L106.222 8.17317H106.289C106.438 7.0864 106.788 6.28997 107.339 5.78382C107.889 5.26278 108.641 5.00226 109.594 5.00226H110.889V7.16826H109.192C108.641 7.16826 108.172 7.26506 107.785 7.45859C107.413 7.63719 107.108 7.90518 106.87 8.26244C106.646 8.60488 106.483 9.02171 106.378 9.51293C106.274 10.0042 106.222 10.555 106.222 11.1654V16.078H103.766V5.13624Z"
                fill="var(--ink)"
              />
              <path
                d="M98.591 12.1032H101.182C101.078 12.7582 100.862 13.3463 100.534 13.8673C100.206 14.3884 99.7969 14.835 99.306 15.2071C98.8296 15.5644 98.2715 15.8473 97.6312 16.0557C96.9909 16.2492 96.2985 16.346 95.5545 16.346C94.6613 16.346 93.8496 16.2045 93.1201 15.9217C92.4057 15.6389 91.788 15.2443 91.267 14.7382C90.746 14.2321 90.3442 13.6291 90.0611 12.9295C89.7786 12.2298 89.6367 11.4556 89.6367 10.6071C89.6367 9.75857 89.7786 8.98448 90.0611 8.28479C90.3442 7.57021 90.7384 6.96731 91.2444 6.47603C91.7654 5.96988 92.3837 5.57539 93.0981 5.29255C93.8276 5.0097 94.6242 4.86827 95.4874 4.86827C96.3361 4.86827 97.1101 5.00225 97.8095 5.27022C98.5245 5.53817 99.1347 5.91777 99.6406 6.40905C100.147 6.90033 100.541 7.48835 100.825 8.17311C101.122 8.84305 101.271 9.58738 101.271 10.4062C101.271 10.4806 101.271 10.5699 101.271 10.6741C101.271 10.7783 101.271 10.8825 101.271 10.9867H92.2049C92.2199 11.478 92.3091 11.932 92.4729 12.3489C92.6512 12.7508 92.8822 13.1007 93.1653 13.3984C93.4629 13.6812 93.8125 13.9045 94.2143 14.0683C94.6167 14.2321 95.0555 14.3139 95.532 14.3139C95.9042 14.3139 96.2539 14.2618 96.5816 14.1576C96.9092 14.0534 97.2068 13.9045 97.4749 13.711C97.7429 13.5175 97.9658 13.2867 98.1447 13.0188C98.338 12.7508 98.4868 12.4456 98.591 12.1032ZM92.2274 9.8479H98.6808C98.6211 9.41619 98.5019 9.02171 98.3236 8.66439C98.1447 8.30713 97.9137 8.00192 97.6312 7.74887C97.3631 7.48088 97.043 7.27247 96.6707 7.12363C96.2985 6.97472 95.8967 6.90033 95.4648 6.90033C95.0185 6.90033 94.6092 6.97472 94.2369 7.12363C93.8647 7.25759 93.537 7.45859 93.2545 7.72652C92.9864 7.97963 92.7554 8.28479 92.5621 8.64204C92.3837 8.99936 92.272 9.40131 92.2274 9.8479Z"
                fill="var(--ink)"
              />
              <path
                d="M84.5519 10.1159L89.7102 16.0334V16.078H86.606L82.6982 11.3887H81.5375V16.078H79.0811V0.000335693H81.5375V9.20034H82.6316L86.0925 5.13627H89.0624V5.1586L84.5519 10.1159Z"
                fill="var(--ink)"
              />
              <path
                d="M70.9547 16.346C70.0764 16.346 69.2723 16.212 68.5428 15.944C67.8284 15.6612 67.2107 15.2667 66.6897 14.7605C66.1837 14.2544 65.7889 13.6515 65.5064 12.9518C65.2383 12.2521 65.104 11.4706 65.104 10.6071C65.104 9.74369 65.2383 8.96213 65.5064 8.26244C65.7889 7.54787 66.1837 6.94497 66.6897 6.45369C67.2107 5.94759 67.8284 5.5605 68.5428 5.29255C69.2723 5.0097 70.0764 4.86827 70.9547 4.86827C71.7136 4.86827 72.4136 4.97248 73.0539 5.18089C73.7086 5.38931 74.2743 5.69448 74.7507 6.09643C75.2422 6.49838 75.644 6.98219 75.9566 7.54786C76.2692 8.09872 76.4701 8.72396 76.5593 9.4236H74.0583C73.9541 9.03658 73.8053 8.69415 73.612 8.39646C73.4331 8.09872 73.2027 7.84561 72.9196 7.63719C72.6515 7.42878 72.3539 7.27247 72.0263 7.16826C71.6992 7.06405 71.342 7.01195 70.9547 7.01195C70.4782 7.01195 70.0319 7.10128 69.615 7.27994C69.2127 7.44366 68.863 7.6893 68.5654 8.0168C68.2679 8.32942 68.0369 8.70908 67.873 9.15567C67.7092 9.58738 67.6276 10.0712 67.6276 10.6071C67.6276 11.143 67.7092 11.6343 67.873 12.0809C68.0369 12.5127 68.2679 12.8848 68.5654 13.1974C68.863 13.51 69.2127 13.7557 69.615 13.9343C70.0168 14.1129 70.4632 14.2023 70.9547 14.2023C71.342 14.2023 71.6992 14.1502 72.0263 14.0459C72.3539 13.9269 72.6515 13.7706 72.9196 13.577C73.2027 13.3686 73.4406 13.1155 73.6345 12.8178C73.8279 12.5052 73.9692 12.1553 74.0583 11.7683H76.5593C76.4701 12.468 76.2692 13.1007 75.9566 13.6663C75.644 14.2321 75.2422 14.7159 74.7507 15.1178C74.2743 15.5049 73.7086 15.8101 73.0539 16.0334C72.4136 16.2418 71.7136 16.346 70.9547 16.346Z"
                fill="var(--ink)"
              />
              <path
                d="M57.3504 4.86827C58.2436 4.86827 59.0547 5.0097 59.7842 5.29255C60.5136 5.57539 61.1389 5.96988 61.6599 6.47603C62.196 6.96731 62.6053 7.57021 62.8884 8.28479C63.186 8.98448 63.3348 9.75857 63.3348 10.6071C63.3348 11.4408 63.186 12.2149 62.8884 12.9295C62.6053 13.6291 62.196 14.2321 61.6599 14.7382C61.1389 15.2443 60.5136 15.6389 59.7842 15.9217C59.0547 16.2045 58.2436 16.346 57.3504 16.346C56.472 16.346 55.6682 16.2045 54.9387 15.9217C54.2093 15.6389 53.5765 15.2443 53.0406 14.7382C52.5196 14.2321 52.1102 13.6291 51.8125 12.9295C51.5296 12.2298 51.3882 11.4556 51.3882 10.6071C51.3882 9.75857 51.5296 8.98448 51.8125 8.28479C52.1102 7.57021 52.5196 6.96731 53.0406 6.47603C53.5617 5.96988 54.1869 5.57539 54.9164 5.29255C55.6607 5.0097 56.472 4.86827 57.3504 4.86827ZM57.3504 7.01195C56.8591 7.01195 56.3976 7.10128 55.9658 7.27994C55.549 7.45859 55.1843 7.71164 54.8717 8.03915C54.574 8.35177 54.3358 8.73137 54.1572 9.17802C53.9934 9.60972 53.9115 10.0861 53.9115 10.6071C53.9115 11.1281 53.9934 11.612 54.1572 12.0586C54.3358 12.4903 54.574 12.8699 54.8717 13.1974C55.1843 13.51 55.549 13.7557 55.9658 13.9343C56.3827 14.1129 56.8442 14.2023 57.3504 14.2023C57.8565 14.2023 58.3177 14.1129 58.7346 13.9343C59.1665 13.7557 59.5312 13.51 59.8288 13.1974C60.1414 12.8699 60.3799 12.4903 60.5437 12.0586C60.7076 11.612 60.7892 11.1281 60.7892 10.6071C60.7892 10.0712 60.7076 9.58738 60.5437 9.15567C60.3799 8.70908 60.1414 8.32942 59.8288 8.0168C59.5312 7.6893 59.1665 7.44366 58.7346 7.27994C58.3177 7.10128 57.8565 7.01195 57.3504 7.01195Z"
                fill="var(--ink)"
              />
              <path
                d="M44.1327 16.346C43.2544 16.346 42.4505 16.212 41.7211 15.944C41.0065 15.6612 40.3887 15.2667 39.8676 14.7605C39.3615 14.2544 38.967 13.6515 38.6842 12.9518C38.4162 12.2521 38.2822 11.4706 38.2822 10.6071C38.2822 9.74369 38.4162 8.96213 38.6842 8.26244C38.967 7.54787 39.3615 6.94497 39.8676 6.45369C40.3887 5.94759 41.0065 5.5605 41.7211 5.29255C42.4505 5.0097 43.2544 4.86827 44.1327 4.86827C44.8919 4.86827 45.5916 4.97248 46.2317 5.18089C46.8867 5.38931 47.4525 5.69448 47.9288 6.09643C48.4201 6.49838 48.822 6.98219 49.1347 7.54786C49.4473 8.09872 49.6482 8.72396 49.7376 9.4236H47.2366C47.1324 9.03658 46.9835 8.69415 46.79 8.39646C46.6113 8.09872 46.3806 7.84561 46.0978 7.63719C45.8298 7.42878 45.532 7.27247 45.2045 7.16826C44.877 7.06405 44.5197 7.01195 44.1327 7.01195C43.6563 7.01195 43.2097 7.10128 42.7929 7.27994C42.3909 7.44366 42.0411 7.6893 41.7434 8.0168C41.4456 8.32942 41.2149 8.70908 41.0511 9.15567C40.8874 9.58738 40.8055 10.0712 40.8055 10.6071C40.8055 11.143 40.8874 11.6343 41.0511 12.0809C41.2149 12.5127 41.4456 12.8848 41.7434 13.1974C42.0411 13.51 42.3909 13.7557 42.7929 13.9343C43.1949 14.1129 43.6414 14.2023 44.1327 14.2023C44.5197 14.2023 44.877 14.1502 45.2045 14.0459C45.532 13.9269 45.8298 13.7706 46.0978 13.577C46.3806 13.3686 46.6188 13.1155 46.8124 12.8178C47.0058 12.5052 47.1473 12.1553 47.2366 11.7683H49.7376C49.6482 12.468 49.4473 13.1007 49.1347 13.6663C48.822 14.2321 48.4201 14.7159 47.9288 15.1178C47.4525 15.5049 46.8867 15.8101 46.2317 16.0334C45.5916 16.2418 44.8919 16.346 44.1327 16.346Z"
                fill="var(--ink)"
              />
              <path
                d="M24.1519 10.6071C24.1519 9.77348 24.2784 9.0068 24.5315 8.30716C24.7846 7.59259 25.1418 6.98222 25.6033 6.47607C26.0648 5.96991 26.6082 5.57542 27.2334 5.29258C27.8587 5.00973 28.5509 4.8683 29.3101 4.8683C30.3522 4.8683 31.238 5.12882 31.9674 5.64986C32.6969 6.15603 33.203 6.85567 33.4859 7.7489H33.5529V5.13626H36.0092V16.078H33.5529V13.4654H33.4859C33.203 14.3586 32.6969 15.0658 31.9674 15.5868C31.238 16.0929 30.3522 16.346 29.3101 16.346C28.5658 16.346 27.8736 16.2046 27.2334 15.9217C26.6082 15.6389 26.0648 15.2444 25.6033 14.7382C25.1418 14.2321 24.7846 13.6291 24.5315 12.9295C24.2784 12.2149 24.1519 11.4408 24.1519 10.6071ZM26.6752 10.6071C26.6752 11.1282 26.757 11.612 26.9208 12.0586C27.0994 12.4903 27.3451 12.8699 27.6577 13.1974C27.9703 13.5101 28.335 13.7557 28.7519 13.9344C29.1687 14.113 29.6227 14.2023 30.114 14.2023C30.6202 14.2023 31.0816 14.1204 31.4985 13.9566C31.9153 13.778 32.2726 13.5324 32.5703 13.2198C32.8829 12.8923 33.1212 12.5127 33.2849 12.0809C33.4635 11.6343 33.5529 11.1431 33.5529 10.6071C33.5529 10.0563 33.4635 9.56506 33.2849 9.13335C33.1212 8.68677 32.8829 8.30716 32.5703 7.99454C32.2726 7.68192 31.9153 7.44369 31.4985 7.27997C31.0816 7.10131 30.6202 7.01198 30.114 7.01198C29.6227 7.01198 29.1687 7.10131 28.7519 7.27997C28.335 7.44369 27.9703 7.68933 27.6577 8.01683C27.3451 8.32945 27.0994 8.70911 26.9208 9.1557C26.757 9.60229 26.6752 10.0861 26.6752 10.6071Z"
                fill="var(--ink)"
              />
              <path
                d="M19.826 12.1033H22.4163C22.3121 12.7583 22.0962 13.3463 21.7687 13.8674C21.4412 14.3884 21.0318 14.835 20.5406 15.2071C20.0642 15.5645 19.5059 15.8473 18.8658 16.0557C18.2257 16.2492 17.5334 16.346 16.7891 16.346C15.8959 16.346 15.0846 16.2046 14.3551 15.9217C13.6405 15.6389 13.0228 15.2444 12.5017 14.7382C11.9807 14.2321 11.5787 13.6291 11.2959 12.9295C11.013 12.2298 10.8716 11.4557 10.8716 10.6071C10.8716 9.7586 11.013 8.98451 11.2959 8.28482C11.5787 7.57024 11.9732 6.96734 12.4794 6.47607C13.0004 5.96991 13.6182 5.57542 14.3328 5.29258C15.0622 5.00973 15.8587 4.8683 16.7221 4.8683C17.5707 4.8683 18.3448 5.00228 19.0445 5.27025C19.759 5.5382 20.3694 5.9178 20.8755 6.40908C21.3816 6.90036 21.7762 7.48838 22.059 8.17314C22.3567 8.84308 22.5056 9.58741 22.5056 10.4062C22.5056 10.4806 22.5056 10.5699 22.5056 10.6741C22.5056 10.7783 22.5056 10.8825 22.5056 10.9867H13.4396C13.4545 11.478 13.5438 11.9321 13.7075 12.3489C13.8862 12.7509 14.1169 13.1007 14.3998 13.3984C14.6975 13.6813 15.0473 13.9045 15.4493 14.0683C15.8512 14.2321 16.2904 14.314 16.7668 14.314C17.139 14.314 17.4888 14.2619 17.8163 14.1577C18.1438 14.0534 18.4416 13.9045 18.7095 13.7111C18.9775 13.5175 19.2008 13.2868 19.3794 13.0188C19.5729 12.7509 19.7218 12.4456 19.826 12.1033ZM13.4619 9.84793H19.9153C19.8558 9.41622 19.7367 9.02174 19.558 8.66442C19.3794 8.30716 19.1487 8.00195 18.8658 7.7489C18.5979 7.48091 18.2778 7.2725 17.9056 7.12366C17.5334 6.97476 17.1315 6.90036 16.6998 6.90036C16.2532 6.90036 15.8438 6.97476 15.4716 7.12366C15.0994 7.25762 14.7719 7.45862 14.4891 7.72655C14.2212 7.97966 13.9904 8.28482 13.7969 8.64207C13.6182 8.99939 13.5066 9.40134 13.4619 9.84793Z"
                fill="var(--ink)"
              />
              <path
                d="M5.47948 0.000335693C9.94515 0.000335693 11.9608 2.21795 11.9608 4.88619V5.03997L3.92248 9.58209H3.9106V9.99707L3.88403 15.1294L5.13913 15.8406V16.0781C4.62011 16.0544 3.48547 16.0306 2.58031 16.0306C1.65115 16.0306 0.577282 16.0544 0.0220491 16.0781V15.8287L1.27715 15.1057L1.30372 0.9965L0 0.249095V0.000335693C0.555158 0.024051 1.62919 0.0478222 2.51021 0.047826C3.76541 0.047826 4.82773 0.000336565 5.47948 0.000335693ZM5.93119 0.842725C5.24941 0.842725 4.62798 1.07004 4.12488 1.45557C3.80321 1.70245 3.80589 2.18807 4.12205 2.44326L5.3127 3.38346C5.62594 3.63591 5.62605 4.11599 5.3127 4.37114L4.12205 5.31134V5.30852C3.80866 5.55817 3.80322 6.04934 4.12488 6.2962C4.71043 6.74267 5.45821 6.97523 6.26362 6.88925C7.64645 6.73671 8.76564 5.61647 8.91969 4.22133C9.11762 2.39343 7.70718 0.842852 5.93403 0.842725H5.93119Z"
                fill="var(--ink)"
              />
            </g>
            <defs>
              <clipPath id="nav-logo-clip">
                <rect width="123.891" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </a>
        <div className="nav-links">
          <div className="nav-pills" ref={pillsRef} role="list">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.key}
                href={siteHref(l.href)}
                className={`nav-pill nav-pill-enter${active === l.key ? " nav-pill--active" : ""}`}
                role="listitem"
                aria-current={active === l.key ? "page" : undefined}
                style={{ animationDelay: `${navPillDelay(i, onHome)}ms` }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="theme-toggle-wrap" style={{ animationDelay: `${themeToggleDelayMs}ms` }}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
    {!onHome && <div className="nav-spacer" aria-hidden="true" />}
    <NavPillFrost pillsRef={pillsRef} onHome={onHome} />
    </>
  );
}

/* ─── ElsewhereLinks ─── */

function ElsewhereLinks() {
  return (
    <>
      <div className="eyebrow elsewhere__eyebrow">Elsewhere</div>
      <a className="footer-link" href="https://www.linkedin.com/in/peacockery/">
        <span className="footer-link__start">
          <FooterIconLinkedIn />
          <span>LinkedIn</span>
        </span>
        <span className="arrow">↗</span>
      </a>
      <a className="footer-link" href="https://dribbble.com/Peacockery">
        <span className="footer-link__start">
          <FooterIconDribbble />
          <span>Dribbble</span>
        </span>
        <span className="arrow">↗</span>
      </a>
      <a className="footer-link" href="https://open.spotify.com/user/1244262106?si=a91f3588f90b48f0">
        <span className="footer-link__start">
          <FooterIconSpotify />
          <span>Spotify</span>
        </span>
        <span className="arrow">↗</span>
      </a>
    </>
  );
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="eyebrow footer__cta-label">Let's make something</div>
            <div className="display h-l footer__cta-headline">
              Get in touch
            </div>
            <a href="mailto:hello@peacockery.co" className="pill solid">
              hello@peacockery.co <span className="arrow">↗</span>
            </a>
          </div>
          <div>
            <ElsewhereLinks />
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

/* ─── LiquidThumbnail (WebGL water ripples — Framer Ripple–style) ─── */
/* https://www.framer.com/marketplace/components/ripple/ */

const LIQUID_TINT_BG = {
  1: "#e8d8c5",
  2: "#d6cab6",
  3: "#2a2826",
  4: "#c4a98a",
  5: "#b6491f",
  6: "#5e6b56",
};

const RIPPLE_MAX = 10;
const RIPPLE_LIFE = 3.6;
const RIPPLE_SPEED = 0.42;
const RIPPLE_SPAWN_DIST = 0.04;
const RIPPLE_SPAWN_MS = 70;
const RIPPLE_STRENGTH = 0.04;

const LIQUID_VS = `
  attribute vec2 aPosition;
  attribute vec2 aUv;
  varying vec2 vUv;
  void main() {
    vUv = aUv;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const LIQUID_FS = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uImageAspect;
  uniform float uViewAspect;
  uniform vec2 uObjectPos;
  uniform float uUseCover;
  uniform vec3 uRipples[${RIPPLE_MAX}];

  vec2 coverUv(vec2 uv) {
    if (uUseCover < 0.5) return uv;
    vec2 result = uv;
    if (uViewAspect > uImageAspect) {
      float scale = uImageAspect / uViewAspect;
      result.y = uv.y * scale + (1.0 - scale) * (1.0 - uObjectPos.y);
    } else if (uViewAspect < uImageAspect) {
      float scale = uViewAspect / uImageAspect;
      result.x = uv.x * scale + (1.0 - scale) * uObjectPos.x;
    }
    return result;
  }

  vec2 rippleDisplacement(vec2 uv, vec2 origin, float birth) {
    float age = uTime - birth;
    if (age < 0.0 || age > ${RIPPLE_LIFE.toFixed(1)}) return vec2(0.0);

    vec2 d = uv - origin;
    float dist = length(d);
    if (dist < 0.0002) return vec2(0.0);

    float radius = age * ${RIPPLE_SPEED.toFixed(2)};
    float life = 1.0 - age / ${RIPPLE_LIFE.toFixed(1)};
    float fade = life * life * exp(-age * 1.35);
    float ring = sin((dist - radius) * 50.0);
    float crest = exp(-pow((dist - radius) * 16.0, 2.0));
    float spread = exp(-dist * 5.0);
    float amp = ring * crest * fade * spread * uIntensity;

    return normalize(d) * amp;
  }

  void main() {
    vec2 displayUv = vUv;
    vec2 disp = vec2(0.0);

    for (int i = 0; i < ${RIPPLE_MAX}; i++) {
      vec3 r = uRipples[i];
      if (r.z >= 0.0) {
        // Pointer coords are top-down; vUv is bottom-up — convert origin only.
        disp += rippleDisplacement(displayUv, vec2(r.x, 1.0 - r.y), r.z);
      }
    }

    displayUv += disp * ${RIPPLE_STRENGTH.toFixed(3)};
    gl_FragColor = texture2D(uTexture, coverUv(displayUv));
  }
`;

function parseObjectPosition(value = "center center") {
  const H = { left: 0, center: 0.5, right: 1 };
  const V = { top: 0, center: 0.5, bottom: 1 };

  function parseToken(token) {
    if (!token) return null;
    if (token.endsWith("%")) return parseFloat(token) / 100;
    if (H[token] !== undefined) return { axis: "x", v: H[token] };
    if (V[token] !== undefined) return { axis: "y", v: V[token] };
    return null;
  }

  const parts = value.trim().split(/\s+/);
  let x = 0.5;
  let y = 0.5;

  if (parts.length === 1) {
    const p = parseToken(parts[0]);
    if (typeof p === "number") x = p;
    else if (p?.axis === "x") x = p.v;
    else if (p?.axis === "y") y = p.v;
  } else {
    const a = parseToken(parts[0]);
    const b = parseToken(parts[1]);
    if (typeof a === "number") x = a;
    else if (a?.axis === "x") x = a.v;
    else if (a?.axis === "y") y = a.v;
    if (typeof b === "number") y = b;
    else if (b?.axis === "y") y = b.v;
    else if (b?.axis === "x") x = b.v;
  }

  return { x, y };
}

function createRipplePool() {
  return {
    ripples: [],
    lastSpawnX: 0.5,
    lastSpawnY: 0.5,
    lastSpawnAt: 0,
  };
}

function pruneRipples(pool, now) {
  pool.ripples = pool.ripples.filter((r) => now - r.t < RIPPLE_LIFE);
  while (pool.ripples.length > RIPPLE_MAX) pool.ripples.shift();
}

function spawnRipple(pool, x, y, now, force = false) {
  const dx = x - pool.lastSpawnX;
  const dy = y - pool.lastSpawnY;
  const dist = Math.hypot(dx, dy);
  const elapsed = (now - pool.lastSpawnAt) * 1000;

  if (!force && dist < RIPPLE_SPAWN_DIST && elapsed < RIPPLE_SPAWN_MS) return;

  pool.ripples.push({ x, y, t: now });
  pool.lastSpawnX = x;
  pool.lastSpawnY = y;
  pool.lastSpawnAt = now;
  pruneRipples(pool, now);
}

function clearRipplePool(pool) {
  pool.ripples = [];
  pool.lastSpawnX = 0.5;
  pool.lastSpawnY = 0.5;
  pool.lastSpawnAt = 0;
}

function ripplesAreActive(pool, now) {
  return pool.ripples.some((r) => now - r.t < RIPPLE_LIFE - 0.05);
}

function drawPlaceholderTexture(canvas, tint) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const bg = LIQUID_TINT_BG[tint] || LIQUID_TINT_BG[1];
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  ctx.save();
  ctx.strokeStyle = "rgba(0,0,0,0.05)";
  ctx.lineWidth = 1;
  const span = Math.hypot(w, h);
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-Math.PI / 4);
  for (let x = -span; x < span; x += 14) {
    ctx.beginPath();
    ctx.moveTo(x, -span);
    ctx.lineTo(x, span);
    ctx.stroke();
  }
  ctx.restore();
}

function createLiquidGl(canvas) {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false });
  if (!gl) return null;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vs = compile(gl.VERTEX_SHADER, LIQUID_VS);
  const fs = compile(gl.FRAGMENT_SHADER, LIQUID_FS);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;

  const positions = new Float32Array([
    -1, -1, 0, 0,
    1, -1, 1, 0,
    -1, 1, 0, 1,
    1, 1, 1, 1,
  ]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(program, "aPosition");
  const aUv = gl.getAttribLocation(program, "aUv");
  const uTexture = gl.getUniformLocation(program, "uTexture");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uIntensity = gl.getUniformLocation(program, "uIntensity");
  const uImageAspect = gl.getUniformLocation(program, "uImageAspect");
  const uViewAspect = gl.getUniformLocation(program, "uViewAspect");
  const uObjectPos = gl.getUniformLocation(program, "uObjectPos");
  const uUseCover = gl.getUniformLocation(program, "uUseCover");
  const uRippleLocs = [];
  for (let i = 0; i < RIPPLE_MAX; i++) {
    uRippleLocs.push(gl.getUniformLocation(program, `uRipples[${i}]`));
  }

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  return {
    gl,
    program,
    buffer,
    aPosition,
    aUv,
    uTexture,
    uTime,
    uIntensity,
    uImageAspect,
    uViewAspect,
    uObjectPos,
    uUseCover,
    uRippleLocs,
    texture,
  };
}

function uploadLiquidTexture(glState, source) {
  const { gl, texture } = glState;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
}

function drawLiquidFrame(glState, width, height, pool, time, intensity, cover = {}) {
  const {
    gl, program, buffer, aPosition, aUv, uTexture, uTime, uIntensity,
    uImageAspect, uViewAspect, uObjectPos, uUseCover, uRippleLocs, texture,
  } = glState;
  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(aUv);
  gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(uTexture, 0);
  gl.uniform1f(uTime, time);
  gl.uniform1f(uIntensity, intensity);
  gl.uniform1f(uImageAspect, cover.imageAspect ?? 1);
  gl.uniform1f(uViewAspect, cover.viewAspect ?? 1);
  gl.uniform2f(uObjectPos, cover.objectPos?.x ?? 0.5, cover.objectPos?.y ?? 0.5);
  gl.uniform1f(uUseCover, cover.useCover ? 1 : 0);

  for (let i = 0; i < RIPPLE_MAX; i++) {
    const r = pool.ripples[i];
    if (r && uRippleLocs[i]) {
      gl.uniform3f(uRippleLocs[i], r.x, r.y, r.t);
    } else if (uRippleLocs[i]) {
      gl.uniform3f(uRippleLocs[i], 0, 0, -1);
    }
  }

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

/**
 * Featured / work thumbnails — water ripples on hover (Framer Ripple–style).
 * Pass `src` for a photo, or `tint` alone for placeholder-style blocks.
 */
function LiquidThumbnail({
  ratio = "16 / 10",
  src,
  srcSet,
  alt = "",
  tint = 1,
  objectPosition = "center center",
  interactive = true,
  className = "",
  style,
}) {
  const wrapRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const glStateRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const poolRef = React.useRef(createRipplePool());
  const pointerRef = React.useRef({ x: 0.5, y: 0.5 });
  const hoveringRef = React.useRef(false);
  const timeRef = React.useRef(0);
  const sizeRef = React.useRef({ w: 0, h: 0 });
  const coverRef = React.useRef({ useCover: false, imageAspect: 1, viewAspect: 1, objectPos: { x: 0.5, y: 0.5 } });
  const [fallback, setFallback] = React.useState(!interactive);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !interactive) return;

    const objectPos = parseObjectPosition(objectPosition);

    function updateCover(w, h) {
      const img = imgRef.current;
      if (src && img?.naturalWidth) {
        coverRef.current = {
          useCover: true,
          imageAspect: img.naturalWidth / img.naturalHeight,
          viewAspect: w / h,
          objectPos,
        };
      } else {
        coverRef.current = {
          useCover: false,
          imageAspect: 1,
          viewAspect: w / h,
          objectPos,
        };
      }
    }

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) {
      setFallback(true);
      return;
    }

    const glState = createLiquidGl(canvas);
    if (!glState) {
      setFallback(true);
      return;
    }
    glStateRef.current = glState;

    const offscreen = document.createElement("canvas");
    let disposed = false;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(wrap.clientWidth * dpr));
      const h = Math.max(1, Math.floor(wrap.clientHeight * dpr));
      updateCover(w, h);
      if (w === sizeRef.current.w && h === sizeRef.current.h) return;
      sizeRef.current = { w, h };
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      if (src && imgRef.current?.complete && imgRef.current.naturalWidth) {
        uploadLiquidTexture(glState, imgRef.current);
      } else if (!src) {
        offscreen.width = w;
        offscreen.height = h;
        drawPlaceholderTexture(offscreen, tint);
        uploadLiquidTexture(glState, offscreen);
      }
    }

    function paintTexture() {
      if (disposed) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(wrap.clientWidth * dpr));
      const h = Math.max(1, Math.floor(wrap.clientHeight * dpr));
      updateCover(w, h);
      if (src && imgRef.current?.complete && imgRef.current.naturalWidth) {
        uploadLiquidTexture(glState, imgRef.current);
      } else if (!src) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        offscreen.width = Math.max(1, Math.floor(wrap.clientWidth * dpr));
        offscreen.height = Math.max(1, Math.floor(wrap.clientHeight * dpr));
        drawPlaceholderTexture(offscreen, tint);
        uploadLiquidTexture(glState, offscreen);
      }
      resize();
    }

    const ro = new ResizeObserver(() => {
      resize();
      paintTexture();
    });
    ro.observe(wrap);
    resize();

    function setPointer(e) {
      const rect = wrap.getBoundingClientRect();
      pointerRef.current.x = (e.clientX - rect.left) / rect.width;
      pointerRef.current.y = (e.clientY - rect.top) / rect.height;
    }

    function onMove(e) {
      setPointer(e);
      if (hoveringRef.current) {
        spawnRipple(poolRef.current, pointerRef.current.x, pointerRef.current.y, timeRef.current);
      }
      kick();
    }
    function onEnter(e) {
      hoveringRef.current = true;
      const pt = e.touches?.[0] || e;
      setPointer(pt);
      spawnRipple(poolRef.current, pointerRef.current.x, pointerRef.current.y, timeRef.current, true);
      kick();
    }
    function onLeave() {
      hoveringRef.current = false;
      kick();
    }

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    let last = performance.now();

    function renderFrame() {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) {
        const t = timeRef.current;
        const intensity =
          hoveringRef.current || ripplesAreActive(poolRef.current, t) ? 1 : 0;
        drawLiquidFrame(glState, w, h, poolRef.current, t, intensity, coverRef.current);
      }
    }

    function tick(now) {
      if (disposed) return;
      const t = now / 1000;
      timeRef.current = t;
      pruneRipples(poolRef.current, t);

      renderFrame();

      const settling = hoveringRef.current || ripplesAreActive(poolRef.current, t);

      if (settling) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    }

    function kick() {
      if (!rafRef.current) {
        last = performance.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function onTouch(e) {
      if (e.touches.length) onMove(e.touches[0]);
    }

    wrap.addEventListener("mouseenter", kick);
    wrap.addEventListener("mousemove", kick);
    wrap.addEventListener("touchstart", onEnter, { passive: true });
    wrap.addEventListener("touchmove", onTouch, { passive: true });
    wrap.addEventListener("touchend", onLeave, { passive: true });
    wrap.addEventListener("touchcancel", onLeave, { passive: true });

    renderFrame();

    function onImgLoad() {
      paintTexture();
      renderFrame();
    }

    const img = imgRef.current;
    if (img) {
      if (img.complete) onImgLoad();
      else img.addEventListener("load", onImgLoad);
    } else {
      paintTexture();
      renderFrame();
    }

    return () => {
      disposed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("mouseenter", kick);
      wrap.removeEventListener("mousemove", kick);
      wrap.removeEventListener("touchstart", onEnter);
      wrap.removeEventListener("touchmove", onTouch);
      wrap.removeEventListener("touchend", onLeave);
      wrap.removeEventListener("touchcancel", onLeave);
      if (img) img.removeEventListener("load", onImgLoad);
      const ext = glState.gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
      glStateRef.current = null;
    };
  }, [src, tint, interactive, objectPosition]);

  const wrapClass = `liquid-thumb${interactive ? " liquid-thumb--interactive" : ""}${className ? ` ${className}` : ""}`;

  if (fallback || !interactive) {
    if (src) {
      return (
        <div className={wrapClass} style={{ aspectRatio: ratio, ...style }} ref={wrapRef}>
          <img
            className="liquid-thumb__fallback"
            src={src}
            srcSet={srcSet}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition }}
          />
        </div>
      );
    }
    return (
      <div className={wrapClass} style={{ aspectRatio: ratio, ...style }} ref={wrapRef}>
        <div className={`placeholder tinted-${tint}`} style={{ height: "100%", aspectRatio: "auto" }}>
          <div className="ph-label" aria-hidden="true">
            <span className="ph-dot"></span>
            <span>preview</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={wrapClass}
      style={{ aspectRatio: ratio, ...style }}
      ref={wrapRef}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
    >
      <canvas ref={canvasRef} className="liquid-thumb__canvas" aria-hidden="true" />
      {src ? (
        <img
          ref={imgRef}
          className="liquid-thumb__source"
          src={src}
          srcSet={srcSet}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition }}
        />
      ) : null}
    </div>
  );
}

/* ─── Placeholder ─── */

function Placeholder({ label, kind, tint = 1, ratio = "16 / 10", style }) {
  return (
    <div className={`placeholder tinted-${tint}`} style={{ aspectRatio: ratio, ...style }}>
      <div className="ph-label">
        <span className="ph-dot"></span>
        <span>{kind || "image"}</span>
        <span style={{ opacity: 0.5 }}>—</span>
        <span>{label}</span>
      </div>
    </div>
  );
}

/* ─── ParticleCanvas ─── */

/** Interactive dot grid background — used by homepage and Contact hero */
function ParticleCanvas() {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Respect reduced motion: keep the static dot grid only.
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const SPACING = 25;
    const INFLUENCE_R = 2000;
    const REST_FILAMENT = 16;
    const FILAMENT_EASE = 0.14;
    const ANGLE_EASE = 0.18;

    let dots = [];
    let logicalW = 0, logicalH = 0;
    const mouse = { x: -9999, y: -9999 };

    function buildGrid() {
      const cols = Math.ceil(logicalW / SPACING) + 1;
      const rows = Math.ceil(logicalH / SPACING) + 1;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            ox: c * SPACING,
            oy: r * SPACING,
            // Magnetic filings state
            angle: 0,
            filament: 0,
          });
        }
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      logicalW = canvas.offsetWidth;
      logicalH = canvas.offsetHeight;
      canvas.width = logicalW * dpr;
      canvas.height = logicalH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    }

    resize();

    const section = canvas.parentElement;

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999; }

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    function wrapAnglePi(a) {
      // Normalize to [-PI, PI] for shortest-path interpolation.
      a = (a + Math.PI) % (Math.PI * 2);
      if (a < 0) a += Math.PI * 2;
      return a - Math.PI;
    }

    function draw() {
      ctx.clearRect(0, 0, logicalW, logicalH);

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const dotColor = isDark ? "rgba(255,253,245,0.22)" : "rgba(0,0,0,0.13)";

      ctx.fillStyle = dotColor;
      ctx.strokeStyle = dotColor;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";

      for (const d of dots) {
        const x = d.ox;
        const y = d.oy;
        if (x < -SPACING || x > logicalW + SPACING || y < -SPACING || y > logicalH + SPACING) continue;

        // Single coherent "source" (like Motion's example) when not cursor-influenced.
        const sourceX = logicalW * 0.5;
        const sourceY = logicalH * 0.5;
        const baseTargetAngle = Math.atan2(sourceY - y, sourceX - x);
        const baseTargetFilament = REST_FILAMENT;

        if (!prefersReduced) {
          const mx = mouse.x;
          const my = mouse.y;
          const hasMouse = mx > -1000 && my > -1000;
          if (hasMouse) {
            const dx = mx - x;
            const dy = my - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0 && dist < INFLUENCE_R) {
              const targetAngle = Math.atan2(dy, dx);
              d.filament += (baseTargetFilament - d.filament) * FILAMENT_EASE;
              d.angle += wrapAnglePi(targetAngle - d.angle) * ANGLE_EASE;
            } else {
              d.filament += (baseTargetFilament - d.filament) * FILAMENT_EASE;
              d.angle += wrapAnglePi(baseTargetAngle - d.angle) * (ANGLE_EASE * 0.6);
            }
          } else {
            d.filament += (baseTargetFilament - d.filament) * FILAMENT_EASE;
            d.angle += wrapAnglePi(baseTargetAngle - d.angle) * (ANGLE_EASE * 0.6);
          }
        } else {
          // Static filings only (no cursor-driven animation).
          d.filament = baseTargetFilament;
          d.angle = baseTargetAngle;
        }

        // Centered filing — fixed length keeps a visible gap at the cursor.
        const len = d.filament;
        const hx = Math.cos(d.angle) * (len * 0.5);
        const hy = Math.sin(d.angle) * (len * 0.5);
        ctx.beginPath();
        ctx.moveTo(x - hx, y - hy);
        ctx.lineTo(x + hx, y + hy);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
    />
  );
}

/* ─── useFeaturedGrow ─── */

function useFeaturedGrow(readyDelayMs = 0) {
  React.useEffect(() => {
    const rows = document.querySelectorAll(".featured-grow");
    if (!rows.length) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      rows.forEach((row) => row.classList.add("in"));
      return;
    }

    const STAGGER_MS = 90;
    let homeReady = readyDelayMs <= 0;
    const pending = new Set();

    function revealRow(row) {
      if (row.classList.contains("in")) return;
      row.querySelectorAll(".featured-grow__cell").forEach((cell, i) => {
        cell.style.setProperty("--grow-delay", i * STAGGER_MS + "ms");
      });
      row.classList.add("in");
      pending.delete(row);
    }

    function tryReveal(row) {
      if (!homeReady) {
        pending.add(row);
        return false;
      }
      revealRow(row);
      return true;
    }

    const readyTimer =
      readyDelayMs > 0
        ? setTimeout(() => {
            homeReady = true;
            pending.forEach((row) => {
              const r = row.getBoundingClientRect();
              if (r.top < window.innerHeight && r.bottom > 0) revealRow(row);
            });
          }, readyDelayMs)
        : null;

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((e) => {
            if (tryReveal(e.target)) io.unobserve(e.target);
          });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    rows.forEach((row) => io.observe(row));

    return () => {
      io.disconnect();
      if (readyTimer) clearTimeout(readyTimer);
    };
  }, [readyDelayMs]);
}

/* ─── useReveal ─── */

function useReveal() {
  React.useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const els = document.querySelectorAll(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const STAGGER_MS = 90;
    const MAX_STEPS = 5;

    const io = new IntersectionObserver(
      (entries) => {
        // Elements that cross the threshold in the same batch (e.g. a row of
        // cards) cascade top-to-bottom, left-to-right for an intentional feel.
        const incoming = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const ra = a.boundingClientRect;
            const rb = b.boundingClientRect;
            return ra.top - rb.top || ra.left - rb.left;
          });

        incoming.forEach((e, i) => {
          const step = Math.min(i, MAX_STEPS);
          e.target.style.setProperty("--reveal-delay", step * STAGGER_MS + "ms");
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
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

Object.assign(window, { Nav, Footer, ElsewhereLinks, ThemeBoot, ThemeToggle, Placeholder, LiquidThumbnail, ParticleCanvas, useReveal, useFeaturedGrow, NAV_LINKS, CursorBoot, siteHref });
