/* Home page */

/* ─── Data ─── */

const FEATURED = [
  {
    slug: "projects/techstack.html",
    title: "TechStack",
    role: "Brand + Web App",
    year: "2025",
    tint: 1,
    big: true,
    image: {
      src: "assets/techstack-onboarding-hero.jpg",
      srcSet: "assets/techstack-onboarding-hero.jpg 1x, assets/techstack-onboarding-hero@2x.jpg 2x",
      alt: "TechStack workspace dashboard showing spend and location data.",
      objectPosition: "left center",
    },
  },
  {
    slug: "projects/bible-engagement-project.html",
    title: "Bible Engagement Project",
    role: "App + Product",
    year: "2024",
    tint: 3,
    image: {
      src: "assets/bible-engagement-cover.png",
      alt: "Bible Engagement app home screen with daily devotion, resources, and reading plan.",
      objectPosition: "center center",
    },
  },
  {
    slug: "#",
    title: "Juxly",
    role: "Product UX",
    year: "2024",
    tint: 6,
  },
  {
    slug: "#",
    title: "Mother's Brewery",
    role: "Identity + Packaging",
    year: "2023",
    tint: 5,
  },

  {
    slug: "#",
    title: "LAC Branding",
    role: "Brand",
    year: "2023",
    tint: 3,
  }
];

/** First featured row waits for hero lines (710ms + 1400ms) and marquee (1150ms + 800ms). */
const FEATURED_LOAD_START_MS = 900;

const FEATURED_ROWS = [
  [FEATURED[0]],
  [FEATURED[1], FEATURED[2]],
  [FEATURED[3], FEATURED[4]],
];

/* ─── Hero ─── */

function Hero() {
  return (
    <section className="hero">
      <window.ParticleCanvas />
      <div className="container hero__layer">

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
        <div className="hero-enter hero-cta-row" style={{ animationDelay: "950ms" }}>
          <div aria-hidden="true" />
          <p className="hero__intro">
            I'm currently leading experience design at <span className="hero__highlight">TechStack</span> and <span className="hero__highlight">TierOne</span>. I bring a over a decade of experience transforming brands, creating digital products, and making people feel something when they use them.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── MarqueeStrip ─── */

function MarqueeStrip() {
  const items = ["Product Design", "Brand Identity", "Storytelling", "Art Direction", "Brand Strategy", "Design Systems"];
  const list = [...items, ...items, ...items];
  return (
    <div className="marquee-strip load-rise" style={{ animationDelay: "1150ms" }}>
      <div className="marquee marquee-strip__inner">
        {list.map((t, i) => (
          <span key={i} className="marquee-strip__item">
            <span>{t}</span>
            <span className="marquee-strip__dot"></span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── FeaturedCard ─── */

function featuredTags(role) {
  return role.split(/\s*\+\s*/).map((t) => t.trim()).filter(Boolean);
}

function FeaturedCard({ p, index }) {
  const isBig = p.big;
  return (
    <a
      href={p.slug}
      className={`featured-card${isBig ? " featured-card--big" : ""}`}
    >
      <div className="featured-card__top">
        <div className="featured-card__titleline">
          <span className="featured-card__index">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="display">
            {p.title}
          </h3>
        </div>
        <div className="featured-card__tags">
          {featuredTags(p.role).map((tag) => (
            <span key={tag} className="featured-card__tag">{tag}</span>
          ))}
        </div>
      </div>
      {p.image ? (
        <window.LiquidThumbnail
          ratio={isBig ? "16 / 8" : "4 / 3"}
          src={p.image.src}
          srcSet={p.image.srcSet}
          alt={p.image.alt}
          objectPosition={p.image.objectPosition}
        />
      ) : (
        <window.LiquidThumbnail
          ratio={isBig ? "16 / 8" : "4 / 3"}
          tint={p.tint}
        />
      )}
    </a>
  );
}

function FeaturedRow({ row, startIndex }) {
  const isFull = row.length === 1;
  return (
    <div className={`featured-row featured-grow${isFull ? " featured-row--full" : ""}`}>
      {row.map((p, i) => (
        <div key={p.title} className="featured-grow__cell">
          <FeaturedCard p={p} index={startIndex + i} />
        </div>
      ))}
    </div>
  );
}

/* ─── Featured ─── */

function Featured() {
  let cardIndex = 0;
  return (
    <section className="home-featured">
      <div className="container">
        <div className="featured-grid">
          {FEATURED_ROWS.map((row, i) => {
            const startIndex = cardIndex;
            cardIndex += row.length;
            return <FeaturedRow key={i} row={row} startIndex={startIndex} />;
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── StickyAbout ─── */

function StickyAbout() {
  return (
    <section className="home-about">
      <div className="container">
        <div className="about-intro-grid">
          <div className="sticky-label reveal">
            <span className="sticky-label__sub">(02 / About)</span>
          </div>
          <div>
            <p className="display home-about__lead reveal">
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
              <div className="home-about__text-col">
                <p className="home-about__copy">
                My first real love was designing physical spaces, learning how light, materials, and spatial sequence shape the way people feel and move through the world (aka architecture). That knowledge was at the foundation of who I have become as a designer for the past 15+ years.
                </p>
                <a href="about.html" className="pill home-about__more">
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

/* ─── ClientsRow ─── */

function ClientsRow() {
  const clients = ["Mountaire Farms", "Assemblies of God", "Unilever", "Stok Coffee", "Danone", "Mother's Brewery", "Big Blanket", "Bass Pro"];
  return (
    <section className="home-clients">
      <div className="container">
        <div className="eyebrow reveal">Selected clients — past + present</div>
        <div className="reveal clients-grid">
          {clients.map((c) => (
            <div key={c} className="client-cell">
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Home (root component) ─── */

function Home() {
  window.useReveal();
  window.useFeaturedGrow(FEATURED_LOAD_START_MS);
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
