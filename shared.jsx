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
            viewBox="0 0 214 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M205.009 28.7357C204.521 30.0472 204.006 31.2043 203.466 32.2072C202.952 33.2357 202.386 34.11 201.769 34.83C201.152 35.55 200.458 36.1029 199.686 36.4886C198.941 36.8743 198.066 37.0672 197.063 37.0672C196.472 37.0672 195.868 37.0157 195.251 36.9129C194.659 36.81 194.081 36.6686 193.515 36.4886V32.5157C194.003 32.6957 194.466 32.8243 194.903 32.9015C195.341 33.0043 195.816 33.0557 196.331 33.0557C196.819 33.0557 197.256 32.9657 197.642 32.7857C198.053 32.6057 198.439 32.31 198.799 31.8986C199.159 31.4872 199.493 30.9472 199.802 30.2786C200.136 29.61 200.483 28.8 200.843 27.8486L192.628 8.87146H197.333L202.888 23.2972H203.003L208.365 8.87146H213.032L205.009 28.7357Z"
              fill="var(--ink)"
            />
            <path
              d="M179.238 8.87144H183.211L183.481 14.1172H183.597C183.854 12.24 184.458 10.8643 185.41 9.99002C186.361 9.09002 187.66 8.64001 189.305 8.64001H191.543V12.3814H188.611C187.66 12.3814 186.85 12.5486 186.181 12.8829C185.538 13.1914 185.011 13.6543 184.6 14.2714C184.214 14.8629 183.931 15.5829 183.751 16.4314C183.571 17.28 183.481 18.2314 183.481 19.2857V27.7714H179.238V8.87144Z"
              fill="var(--ink)"
            />
            <path
              d="M170.3 20.9057H174.775C174.595 22.0371 174.222 23.0529 173.656 23.9529C173.09 24.8529 172.383 25.6243 171.535 26.2671C170.712 26.8843 169.748 27.3729 168.642 27.7329C167.536 28.0671 166.34 28.2343 165.055 28.2343C163.512 28.2343 162.11 27.99 160.85 27.5014C159.616 27.0129 158.549 26.3314 157.649 25.4571C156.749 24.5829 156.055 23.5414 155.566 22.3329C155.078 21.1243 154.833 19.7871 154.833 18.3214C154.833 16.8557 155.078 15.5186 155.566 14.31C156.055 13.0757 156.736 12.0343 157.61 11.1857C158.51 10.3114 159.578 9.63 160.812 9.14143C162.072 8.65286 163.448 8.40857 164.939 8.40857C166.405 8.40857 167.742 8.64 168.95 9.10286C170.185 9.56571 171.239 10.2214 172.113 11.07C172.988 11.9186 173.669 12.9343 174.158 14.1171C174.672 15.2743 174.929 16.56 174.929 17.9743C174.929 18.1029 174.929 18.2571 174.929 18.4371C174.929 18.6171 174.929 18.7971 174.929 18.9771H159.269C159.295 19.8257 159.449 20.61 159.732 21.33C160.04 22.0243 160.439 22.6286 160.928 23.1429C161.442 23.6314 162.046 24.0171 162.74 24.3C163.435 24.5829 164.193 24.7243 165.016 24.7243C165.659 24.7243 166.263 24.6343 166.829 24.4543C167.395 24.2743 167.909 24.0171 168.372 23.6829C168.835 23.3486 169.22 22.95 169.529 22.4871C169.863 22.0243 170.12 21.4971 170.3 20.9057ZM159.308 17.01H170.455C170.352 16.2643 170.146 15.5829 169.838 14.9657C169.529 14.3486 169.13 13.8214 168.642 13.3843C168.179 12.9214 167.626 12.5614 166.983 12.3043C166.34 12.0471 165.646 11.9186 164.9 11.9186C164.129 11.9186 163.422 12.0471 162.779 12.3043C162.136 12.5357 161.57 12.8829 161.082 13.3457C160.619 13.7829 160.22 14.31 159.886 14.9271C159.578 15.5443 159.385 16.2386 159.308 17.01Z"
              fill="var(--ink)"
            />
            <path
              d="M146.05 17.4729L154.96 27.6943V27.7714H149.598L142.848 19.6714H140.843V27.7714H136.6V0H140.843V15.8914H142.733L148.711 8.87143H153.841V8.91L146.05 17.4729Z"
              fill="var(--ink)"
            />
            <path
              d="M122.563 28.2343C121.046 28.2343 119.657 28.0029 118.397 27.54C117.163 27.0514 116.096 26.37 115.196 25.4957C114.322 24.6214 113.64 23.58 113.152 22.3714C112.689 21.1629 112.457 19.8129 112.457 18.3214C112.457 16.83 112.689 15.48 113.152 14.2714C113.64 13.0371 114.322 11.9957 115.196 11.1471C116.096 10.2729 117.163 9.60428 118.397 9.14143C119.657 8.65286 121.046 8.40857 122.563 8.40857C123.874 8.40857 125.083 8.58857 126.189 8.94857C127.32 9.30857 128.297 9.83571 129.12 10.53C129.969 11.2243 130.663 12.06 131.203 13.0371C131.743 13.9886 132.09 15.0686 132.244 16.2771H127.924C127.744 15.6086 127.487 15.0171 127.153 14.5029C126.844 13.9886 126.446 13.5514 125.957 13.1914C125.494 12.8314 124.98 12.5614 124.414 12.3814C123.849 12.2014 123.232 12.1114 122.563 12.1114C121.74 12.1114 120.969 12.2657 120.249 12.5743C119.554 12.8571 118.95 13.2814 118.436 13.8471C117.922 14.3871 117.523 15.0429 117.24 15.8143C116.957 16.56 116.816 17.3957 116.816 18.3214C116.816 19.2471 116.957 20.0957 117.24 20.8671C117.523 21.6129 117.922 22.2557 118.436 22.7957C118.95 23.3357 119.554 23.76 120.249 24.0686C120.943 24.3771 121.714 24.5314 122.563 24.5314C123.232 24.5314 123.849 24.4414 124.414 24.2614C124.98 24.0557 125.494 23.7857 125.957 23.4514C126.446 23.0914 126.857 22.6543 127.192 22.14C127.526 21.6 127.77 20.9957 127.924 20.3271H132.244C132.09 21.5357 131.743 22.6286 131.203 23.6057C130.663 24.5829 129.969 25.4186 129.12 26.1129C128.297 26.7814 127.32 27.3086 126.189 27.6943C125.083 28.0543 123.874 28.2343 122.563 28.2343Z"
              fill="var(--ink)"
            />
            <path
              d="M99.063 8.40857C100.606 8.40857 102.007 8.65286 103.267 9.14143C104.527 9.63 105.607 10.3114 106.507 11.1857C107.433 12.0343 108.14 13.0757 108.629 14.31C109.143 15.5186 109.4 16.8557 109.4 18.3214C109.4 19.7614 109.143 21.0986 108.629 22.3329C108.14 23.5414 107.433 24.5829 106.507 25.4571C105.607 26.3314 104.527 27.0129 103.267 27.5014C102.007 27.99 100.606 28.2343 99.063 28.2343C97.5458 28.2343 96.1573 27.99 94.8973 27.5014C93.6373 27.0129 92.5444 26.3314 91.6187 25.4571C90.7187 24.5829 90.0116 23.5414 89.4973 22.3329C89.0087 21.1243 88.7644 19.7871 88.7644 18.3214C88.7644 16.8557 89.0087 15.5186 89.4973 14.31C90.0116 13.0757 90.7187 12.0343 91.6187 11.1857C92.5187 10.3114 93.5987 9.63 94.8587 9.14143C96.1444 8.65286 97.5458 8.40857 99.063 8.40857ZM99.063 12.1114C98.2144 12.1114 97.4173 12.2657 96.6715 12.5743C95.9515 12.8829 95.3215 13.32 94.7815 13.8857C94.2673 14.4257 93.8558 15.0814 93.5473 15.8529C93.2644 16.5986 93.123 17.4214 93.123 18.3214C93.123 19.2214 93.2644 20.0571 93.5473 20.8286C93.8558 21.5743 94.2673 22.23 94.7815 22.7957C95.3215 23.3357 95.9515 23.76 96.6715 24.0686C97.3915 24.3771 98.1887 24.5314 99.063 24.5314C99.9373 24.5314 100.734 24.3771 101.454 24.0686C102.2 23.76 102.83 23.3357 103.344 22.7957C103.884 22.23 104.296 21.5743 104.579 20.8286C104.862 20.0571 105.003 19.2214 105.003 18.3214C105.003 17.3957 104.862 16.56 104.579 15.8143C104.296 15.0429 103.884 14.3871 103.344 13.8471C102.83 13.2814 102.2 12.8571 101.454 12.5743C100.734 12.2657 99.9373 12.1114 99.063 12.1114Z"
              fill="var(--ink)"
            />
            <path
              d="M76.2322 28.2343C74.715 28.2343 73.3265 28.0029 72.0665 27.54C70.8322 27.0514 69.765 26.37 68.865 25.4957C67.9908 24.6214 67.3093 23.58 66.8208 22.3714C66.3579 21.1629 66.1265 19.8129 66.1265 18.3214C66.1265 16.83 66.3579 15.48 66.8208 14.2714C67.3093 13.0371 67.9908 11.9957 68.865 11.1471C69.765 10.2729 70.8322 9.60428 72.0665 9.14143C73.3265 8.65286 74.715 8.40857 76.2322 8.40857C77.5436 8.40857 78.7522 8.58857 79.8579 8.94857C80.9893 9.30857 81.9665 9.83571 82.7893 10.53C83.6379 11.2243 84.3322 12.06 84.8722 13.0371C85.4122 13.9886 85.7593 15.0686 85.9136 16.2771H81.5936C81.4136 15.6086 81.1565 15.0171 80.8222 14.5029C80.5136 13.9886 80.115 13.5514 79.6265 13.1914C79.1636 12.8314 78.6493 12.5614 78.0836 12.3814C77.5179 12.2014 76.9007 12.1114 76.2322 12.1114C75.4093 12.1114 74.6379 12.2657 73.9179 12.5743C73.2236 12.8571 72.6193 13.2814 72.105 13.8471C71.5907 14.3871 71.1922 15.0429 70.9093 15.8143C70.6265 16.56 70.485 17.3957 70.485 18.3214C70.485 19.2471 70.6265 20.0957 70.9093 20.8671C71.1922 21.6129 71.5907 22.2557 72.105 22.7957C72.6193 23.3357 73.2236 23.76 73.9179 24.0686C74.6122 24.3771 75.3836 24.5314 76.2322 24.5314C76.9007 24.5314 77.5179 24.4414 78.0836 24.2614C78.6493 24.0557 79.1636 23.7857 79.6265 23.4514C80.115 23.0914 80.5265 22.6543 80.8608 22.14C81.195 21.6 81.4393 20.9957 81.5936 20.3271H85.9136C85.7593 21.5357 85.4122 22.6286 84.8722 23.6057C84.3322 24.5829 83.6379 25.4186 82.7893 26.1129C81.9665 26.7814 80.9893 27.3086 79.8579 27.6943C78.7522 28.0543 77.5436 28.2343 76.2322 28.2343Z"
              fill="var(--ink)"
            />
            <path
              d="M41.7179 18.3214C41.7179 16.8814 41.9365 15.5571 42.3736 14.3486C42.8108 13.1143 43.4279 12.06 44.225 11.1857C45.0222 10.3114 45.9608 9.63 47.0408 9.14143C48.1208 8.65286 49.3165 8.40857 50.6279 8.40857C52.4279 8.40857 53.9579 8.85857 55.2179 9.75857C56.4779 10.6329 57.3522 11.8414 57.8408 13.3843H57.9565V8.87143H62.1993V27.7714H57.9565V23.2586H57.8408C57.3522 24.8014 56.4779 26.0229 55.2179 26.9229C53.9579 27.7971 52.4279 28.2343 50.6279 28.2343C49.3422 28.2343 48.1465 27.99 47.0408 27.5014C45.9608 27.0129 45.0222 26.3314 44.225 25.4571C43.4279 24.5829 42.8108 23.5414 42.3736 22.3329C41.9365 21.0986 41.7179 19.7614 41.7179 18.3214ZM46.0765 18.3214C46.0765 19.2214 46.2179 20.0571 46.5008 20.8286C46.8093 21.5743 47.2336 22.23 47.7736 22.7957C48.3136 23.3357 48.9436 23.76 49.6636 24.0686C50.3836 24.3771 51.1679 24.5314 52.0165 24.5314C52.8908 24.5314 53.6879 24.39 54.4079 24.1071C55.1279 23.7986 55.745 23.3743 56.2593 22.8343C56.7993 22.2686 57.2108 21.6129 57.4936 20.8671C57.8022 20.0957 57.9565 19.2471 57.9565 18.3214C57.9565 17.37 57.8022 16.5214 57.4936 15.7757C57.2108 15.0043 56.7993 14.3486 56.2593 13.8086C55.745 13.2686 55.1279 12.8571 54.4079 12.5743C53.6879 12.2657 52.8908 12.1114 52.0165 12.1114C51.1679 12.1114 50.3836 12.2657 49.6636 12.5743C48.9436 12.8571 48.3136 13.2814 47.7736 13.8471C47.2336 14.3871 46.8093 15.0429 46.5008 15.8143C46.2179 16.5857 46.0765 17.4214 46.0765 18.3214Z"
              fill="var(--ink)"
            />
            <path
              d="M34.2456 20.9057H38.7199C38.5399 22.0371 38.167 23.0529 37.6013 23.9529C37.0356 24.8529 36.3284 25.6243 35.4799 26.2671C34.657 26.8843 33.6927 27.3729 32.587 27.7329C31.4813 28.0671 30.2856 28.2343 28.9999 28.2343C27.457 28.2343 26.0556 27.99 24.7956 27.5014C23.5613 27.0129 22.4942 26.3314 21.5942 25.4571C20.6942 24.5829 19.9999 23.5414 19.5113 22.3329C19.0227 21.1243 18.7784 19.7871 18.7784 18.3214C18.7784 16.8557 19.0227 15.5186 19.5113 14.31C19.9999 13.0757 20.6813 12.0343 21.5556 11.1857C22.4556 10.3114 23.5227 9.63 24.757 9.14143C26.017 8.65286 27.3927 8.40857 28.8842 8.40857C30.3499 8.40857 31.687 8.64 32.8956 9.10286C34.1299 9.56571 35.1842 10.2214 36.0584 11.07C36.9327 11.9186 37.6142 12.9343 38.1027 14.1171C38.617 15.2743 38.8742 16.56 38.8742 17.9743C38.8742 18.1029 38.8742 18.2571 38.8742 18.4371C38.8742 18.6171 38.8742 18.7971 38.8742 18.9771H23.2142C23.2399 19.8257 23.3942 20.61 23.677 21.33C23.9856 22.0243 24.3842 22.6286 24.8727 23.1429C25.387 23.6314 25.9913 24.0171 26.6856 24.3C27.3799 24.5829 28.1384 24.7243 28.9613 24.7243C29.6042 24.7243 30.2084 24.6343 30.7742 24.4543C31.3399 24.2743 31.8542 24.0171 32.317 23.6829C32.7799 23.3486 33.1656 22.95 33.4742 22.4871C33.8084 22.0243 34.0656 21.4971 34.2456 20.9057ZM23.2527 17.01H34.3999C34.297 16.2643 34.0913 15.5829 33.7827 14.9657C33.4742 14.3486 33.0756 13.8214 32.587 13.3843C32.1242 12.9214 31.5713 12.5614 30.9284 12.3043C30.2856 12.0471 29.5913 11.9186 28.8456 11.9186C28.0742 11.9186 27.367 12.0471 26.7242 12.3043C26.0813 12.5357 25.5156 12.8829 25.027 13.3457C24.5642 13.7829 24.1656 14.31 23.8313 14.9271C23.5227 15.5443 23.3299 16.2386 23.2527 17.01Z"
              fill="var(--ink)"
            />
            <path
              d="M9.46484 0C17.1785 0 20.6602 3.83054 20.6602 8.43945V8.70508L6.77539 16.5508H6.75488V17.2676L6.70898 26.1328L8.87695 27.3613V27.7715C7.98043 27.7305 6.02054 27.6895 4.45703 27.6895C2.85208 27.6895 0.997154 27.7305 0.0380859 27.7715V27.3408L2.20605 26.0918L2.25195 1.7207L0 0.429688V0C0.958938 0.040964 2.81414 0.0820246 4.33594 0.0820312C6.50409 0.0820312 8.33906 1.50605e-06 9.46484 0ZM10.2451 1.45508C9.06743 1.45508 7.99403 1.84772 7.125 2.51367C6.56938 2.9401 6.574 3.77892 7.12012 4.21973L9.17676 5.84375C9.71783 6.27982 9.71802 7.10908 9.17676 7.5498L7.12012 9.17383V9.16895C6.5788 9.60018 6.5694 10.4486 7.125 10.875C8.13644 11.6462 9.4281 12.0479 10.8193 11.8994C13.2079 11.6359 15.1411 9.70088 15.4072 7.29102C15.7491 4.13366 13.3128 1.4553 10.25 1.45508H10.2451Z"
              fill="var(--accent)"
            />
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
  uniform vec3 uRipples[${RIPPLE_MAX}];

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
    vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
    vec2 disp = vec2(0.0);

    for (int i = 0; i < ${RIPPLE_MAX}; i++) {
      vec3 r = uRipples[i];
      if (r.z >= 0.0) {
        disp += rippleDisplacement(uv, r.xy, r.z);
      }
    }

    uv += disp * ${RIPPLE_STRENGTH.toFixed(3)};
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

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

function drawLiquidFrame(glState, width, height, pool, time, intensity) {
  const {
    gl, program, buffer, aPosition, aUv, uTexture, uTime, uIntensity, uRippleLocs, texture,
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
  const [fallback, setFallback] = React.useState(!interactive);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !interactive) return;

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
        drawLiquidFrame(glState, w, h, poolRef.current, t, intensity);
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
  }, [src, tint, interactive]);

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
