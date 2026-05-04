/* Home page */

function ParticleCanvas() {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const SPACING = 12;       // grid cell size
    const DOT_R = 1.5;        // dot radius
    const PUSH_RADIUS = 400;  // mouse influence radius
    const MAX_PUSH = 55;      // max displacement in px
    const SPRING = 0.12;      // spring-back stiffness
    const DAMP = 0.72;        // velocity damping

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
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
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

    function draw() {
      ctx.clearRect(0, 0, logicalW, logicalH);

      // detect dark theme
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const dotColor = isDark ? "rgba(255,253,245,0.22)" : "rgba(0,0,0,0.13)";

      ctx.fillStyle = dotColor;

      for (const d of dots) {
        // spring toward rest
        const ax = -d.dx * SPRING;
        const ay = -d.dy * SPRING;

        // mouse push
        const px = d.ox + d.dx - mouse.x;
        const py = d.oy + d.dy - mouse.y;
        const dist = Math.sqrt(px * px + py * py);
        if (dist < PUSH_RADIUS && dist > 0) {
          const t = 1 - dist / PUSH_RADIUS;
          const force = t * t * MAX_PUSH * 0.18;
          d.vx += (px / dist) * force;
          d.vy += (py / dist) * force;
        }

        d.vx = (d.vx + ax) * DAMP;
        d.vy = (d.vy + ay) * DAMP;
        d.dx += d.vx;
        d.dy += d.vy;

        // clamp max displacement
        const dispLen = Math.sqrt(d.dx * d.dx + d.dy * d.dy);
        if (dispLen > MAX_PUSH) {
          d.dx = (d.dx / dispLen) * MAX_PUSH;
          d.dy = (d.dy / dispLen) * MAX_PUSH;
        }

        const x = d.ox + d.dx;
        const y = d.oy + d.dy;
        if (x < -SPACING || x > logicalW + SPACING || y < -SPACING || y > logicalH + SPACING) continue;

        ctx.beginPath();
        ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
        ctx.fill();
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
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        opacity: 0.5,
      }}
    />
  );
}

const FEATURED = [
  {
    slug: "omg-commerce.html",
    title: "OMG Commerce",
    role: "Brand + Web",
    year: "2025",
    summary: "Reimagining the agency's digital storefront for a new chapter of Amazon and Google Ads expertise.",
    tint: 1,
    label: "agency homepage hero",
    big: true
  },
  {
    slug: "#",
    title: "Juxly",
    role: "Product UX",
    year: "2024",
    summary: "An EHR-integrated medical app the floor staff actually wants to open.",
    tint: 6,
    label: "ipad health dashboard"
  },
  {
    slug: "#",
    title: "Mother's Brewery",
    role: "Identity + Packaging",
    year: "2023",
    summary: "A 30-can refresh anchored on a hand-set wordmark and Ozark-blue field.",
    tint: 5,
    label: "can lineup, top-down"
  },
  {
    slug: "#",
    title: "Big Blanket Co.",
    role: "Brand System",
    year: "2024",
    summary: "Editorial + e-comm system for a DTC home brand growing into retail.",
    tint: 4,
    label: "lifestyle photography"
  },
  {
    slug: "#",
    title: "LAC Branding",
    role: "Brand",
    year: "2023",
    summary: "Identity refresh and guidelines for a logistics collective outgrowing its clip-art era.",
    tint: 3,
    label: "brand deck spread"
  }
];

function Hero() {
  return (
    <section className="hero" style={{ paddingTop: 96, paddingBottom: 120, position: "relative", overflow: "hidden" }}>
      <ParticleCanvas />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        
        <h1 className="display h-xxl" style={{ margin: 0 }}>
          <span className="h1-line-wrap">
            <span className="h1-line" style={{ animationDelay: "200ms" }}>Hola, I'm Michael, a</span>
          </span>
          <span className="h1-line-wrap">
            <span className="h1-line" style={{ animationDelay: "370ms" }}>product designer &</span>
          </span>
          <span className="h1-line-wrap">
            <span className="h1-line" style={{ animationDelay: "540ms" }}>creative director currently</span>
          </span>
          <span className="h1-line-wrap">
            <span className="h1-line" style={{ animationDelay: "710ms" }}>based out of <span className="h1-playfair">the Midwest.</span></span>
          </span>
        </h1>
        <div className="hero-enter hero-cta-row" style={{ marginTop: 56, animationDelay: "950ms" }}>
          <div aria-hidden="true" />
          <p style={{ fontSize: "1.5rem", lineHeight: 1.45, color: "var(--ink-2)", margin: 0, maxWidth: 520 }}>
            I'm currently leading experience design at <span style={{ color: "var(--ink)" }}>TechStack</span> and <span style={{ color: "var(--ink)" }}>TierOne</span>. I bring a over a decade of experience transforming brands, creating digital products, and making people feel something when they use them.
          </p>
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = ["Product Design", "Brand Identity", "Storytelling", "Art Direction", "Brand Strategy", "Design Systems"];
  const list = [...items, ...items, ...items];
  return (
    <div style={{
      borderTop: "1px solid var(--line)",
      borderBottom: "1px solid var(--line)",
      overflow: "hidden",
      padding: "20px 0"
    }}>
      <div style={{
        display: "flex", gap: 48, whiteSpace: "nowrap",
        animation: "marq 36s linear infinite",
        fontFamily: "var(--font-mono)", fontSize: "0.75rem",
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: "var(--ink-2)"
      }}>
        {list.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 48 }}>
            <span>{t}</span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }}></span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marq { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
    </div>
  );
}

function FeaturedCard({ p, index }) {
  const isBig = p.big;
  return (
    <a
      href={p.slug}
      className="reveal featured-card"
      style={{
        gridColumn: isBig ? "1 / -1" : "auto",
        transition: "transform 600ms cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <div className="featured-card__top">
        <div className="featured-card__titleline">
          <span className="featured-card__index">{String(index + 1).padStart(2, "0")}</span>
          <h3
            className="display"
            style={{ fontSize: isBig ? "clamp(2.5rem, 5vw, 4.5rem)" : "clamp(1.75rem, 3vw, 2.5rem)", margin: 0 }}
          >
            {p.title}
          </h3>
        </div>
        <div className="featured-card__meta">
          {p.role} · {p.year}
        </div>
      </div>
      <window.Placeholder label={p.label} kind="project" tint={p.tint} ratio={isBig ? "16 / 8" : "4 / 3"} />
      <div className="featured-card__foot">
        <p className="featured-card__summary">{p.summary}</p>
        <span className="featured-card__cta">
          View case <span className="featured-card__cta-arrow">→</span>
        </span>
      </div>
    </a>
  );
}

function Featured() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 40 }}>
      <div className="container">
        <div className="featured-grid">
          {FEATURED.map((p, i) => <FeaturedCard key={p.title} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function StickyAbout() {
  return (
    <section style={{ paddingTop: 160, paddingBottom: 60 }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div className="sticky-label reveal">
            On the bench<br />
            <span style={{ color: "var(--ink)", display: "block", marginTop: 8, fontSize: "0.75rem" }}>(02 / About)</span>
          </div>
          <div>
            <p className="display reveal" style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)", lineHeight: 1.15, margin: 0 }}>
              I've spent 15 years in the seam between <em style={{ color: "var(--accent)" }}>brand</em> and <em style={{ color: "var(--accent)" }}>product</em>, crafting
              design systems that survive contact with engineering, and product UX that respects the brand it's wearing.
            </p>
            <div className="reveal" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <window.Placeholder label="portrait, candid" kind="photo" tint={2} ratio="3 / 4" />
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <p style={{ margin: 0, color: "var(--ink-2)", fontSize: "1.0625rem", lineHeight: 1.6 }}>
                  Born in the Ozarks. Trained as a graphic designer, dragged into UX by curiosity, kept in it
                  by the kind of problems where typography and data structures share a sketchbook page.
                  I work fast, write a lot, and prefer projects where the brand and the product
                  are arguing — that's where the good work lives.
                </p>
                <a href="about.html" className="pill" style={{ alignSelf: "flex-start", marginTop: 32 }}>
                  Read the longer version <span className="arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientsRow() {
  const clients = ["TierOne", "OMG Commerce", "Juxly", "Mother's Brewery", "Big Blanket", "LAC", "Vantage", "Bass Pro"];
  return (
    <section style={{ paddingTop: 160, paddingBottom: 80 }}>
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 32 }}>Selected clients — past + present</div>
        <div className="reveal" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid var(--line)"
        }}>
          {clients.map((c, i) => (
            <div key={c} style={{
              padding: "32px 20px",
              borderBottom: "1px solid var(--line)",
              borderRight: (i + 1) % 4 !== 0 ? "1px solid var(--line)" : "none",
              fontFamily: "var(--font-display)",
              fontSize: "1.375rem",
              color: "var(--ink-2)"
            }}>
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  window.useReveal();
  return (
    <>
      <window.Nav active="index" />
      <Hero />
      <MarqueeStrip />
      <Featured />
      <StickyAbout />
      <ClientsRow />
      <window.Footer />
      <window.PeacockeryTweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<Home />);
