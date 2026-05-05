/* Home page */

const FEATURED = [
  {
    slug: "projects/omg-commerce.html",
    title: "Bible Engagement Project",
    role: "Brand + Web",
    year: "2025",
    summary: "Reimagining the agency's digital storefront for a new chapter of Amazon and Google Ads expertise.",
    tint: 1,
    label: "agency homepage hero",
    big: true
  }, 
  {
    slug: "projects/omg-commerce.html",
    title: "OMG Commerce",
    role: "Brand + Web",
    year: "2025",
    summary: "Reimagining the agency's digital storefront for a new chapter of Amazon and Google Ads expertise.",
    tint: 1,
    label: "agency homepage hero",
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
      <window.ParticleCanvas />
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
            <span className="h1-line" style={{ animationDelay: "710ms" }}>based out of <span className="h1-playfair hero-gradient">the Midwest.</span></span>
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
        <div className="about-intro-grid">
          <div className="sticky-label reveal">
            
            <span style={{ color: "var(--ink)", display: "block", marginTop: 8, fontSize: "0.75rem" }}>(02 / About)</span>
          </div>
          <div>
            <p className="display reveal" style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)", lineHeight: 1.15, margin: 0 }}>
              I've spent 15 years in the seam between <em className="accent-playfair">brand</em> and <em className="accent-playfair">product</em>, crafting
              design systems that survive contact with engineering, and product UX that respects the brand it's wearing.
            </p>
            <div className="reveal about-portrait-grid">
              <div className="thumb thumb--portrait">
                <img
                  src="assets/me-laughing-bw.png"
                  alt="Portrait of Michael Peacock laughing."
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <p style={{ margin: 0, color: "var(--ink-2)", fontSize: "1.0625rem", lineHeight: 1.6 }}>
                My first real love was designing physical spaces, learning how light, materials, and spatial sequence shape the way people feel and move through the world (aka architecture). That knowledge was at the foundation of who I have become as a designer for the past 15+ years.
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
  const clients = ["Mountaire Farms", "Assemblies of God", "Unilever", "Stok Coffee", "Danone", "Mother's Brewery", "Big Blanket", "Bass Pro"];
  return (
    <section style={{ paddingTop: 160, paddingBottom: 80 }}>
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 32 }}>Selected clients — past + present</div>
        <div className="reveal clients-grid">
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
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<Home />);
