/* About page */

/* ─── Data ─── */

const NOW = [
  {
    label: "I'm listening to",
    title: "26 Reheat",
    sub: "Michael Peacock",
    href: "https://open.spotify.com/playlist/0DabdzwSghxaOE63cYmhCL?si=37393e2183074b22",
    img: "assets/26-reheat.jpg",
  },
  {
    label: "I'm playing",
    title: "Rocket League",
    sub: "lil_dundt",
    href: "https://store.steampowered.com/app/252950/Rocket_League/",
    img: "assets/rocket-league.jpg",
  },
  {
    label: "I'm reading",
    title: "The Path of Daggers",
    sub: "Wheel of Time · Book 8",
    href: "https://www.goodreads.com/book/show/14001.The_Path_of_Daggers",
    img: "assets/path-of-daggers.jpg",
  },
];

const TIMELINE = [
  { year: "2024 →", role: "Head of Product", at: "TechStack" },
  { year: "2022 →", role: "Experience Design Director", at: "TierOne" },
  { year: "2021 — 22", role: "Lead Product Designer", at: "FineTune" },
  { year: "2018 — 21", role: "UX Director", at: "Hook" },
  { year: "2012 — 20", role: "Adjunct Professor", at: "Drury University" },
  { year: "2016 — 18", role: "Senior Art Director", at: "The Alchemedia Project" },
  { year: "2015 — 16", role: "Senior Designer", at: "Revel" },
  { year: "2013 — 15", role: "Senior Designer", at: "Assemblies of God" },
  { year: "2012 — 13", role: "Architectural Designer", at: "Torgerson Design Partners" },
];

const PRINCIPLES = [
  { n: "01", t: "Stay close to the work.", d: "I don't direct from the cheap seats. I'm in the file, the doc, the Slack thread, the engineering review. The fastest path to a good outcome is staying close enough to course-correct." },
  { n: "02", t: "Brand and product are one system.", d: "The places they disagree are usually the most interesting parts of the project. Treat the seam as the artifact, not a problem to paper over." },
  { n: "03", t: "Write before you draw.", d: "If I can't say what something is in a sentence, the design isn't ready. Words clarify; pixels just commit." },
  { n: "04", t: "Make the second draft, fast.", d: "First drafts are too precious to learn from. The second one is where the work actually starts." },
];

/* ─── AboutHero ─── */

function AboutHero() {
  return (
    <section className="about-hero-section">
      <div className="container">
        <div className="eyebrow reveal">About / Michael Peacock</div>
        <div className="reveal about-hero-grid">
          <p className="about-hero__body">
            I grew up in Mexico, spent formative years in Florida and Texas, and came to Missouri for college, where I studied both architecture and fine arts at Drury University before ever working on a screen professionally. That path shapes how I work: a spatial, systems-level way of thinking about how people experience things, whether that's a building, a brand, or a product.
          </p>
          <p className="about-hero__body about-hero-col about-hero-col--offset">
            For the past decade I've led design at agencies, SaaS companies, and startups, working across brand identity, UX, and design systems, and increasingly into live code. Peacockery is where I take on work that calls for craft, clarity, and a real point of view.
          </p>
        </div>
      </div>
      <div className="about-collage-wrap">
        <div className="container">
          <img
            className="about-collage-img"
            src="assets/collage.png"
            alt="Collage of travel, family, and candid photos"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Principles ─── */

function Principles() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-two-col">
          <div className="sticky-label reveal">
            How I work<br />
            <span className="sticky-label__sub">(Principles)</span>
          </div>
          <div>
            {PRINCIPLES.map((p) => (
              <div key={p.n} className="reveal principle-row">
                <div className="principle-row__num">{p.n}</div>
                <div>
                  <h3 className="display principle-row__title">{p.t}</h3>
                  <p className="principle-row__body">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline ─── */

function Timeline() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="about-experience-grid">
          <div className="sticky-label reveal">
            Working back<br />
            <span className="sticky-label__sub">(Experience)</span>
          </div>
          <div>
            {TIMELINE.map((t, i) => (
              <div
                key={i}
                className={`reveal about-timeline-row ${i === 0 ? "about-timeline-row--first" : ""}`}
              >
                <div className="about-timeline-role display">{t.role}</div>
                <div className="about-timeline-at">{t.at}</div>
                <div className="about-timeline-year">{t.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Aside ─── */

function Aside() {
  return (
    <section className="page-section--inset about-aside">
      <div className="container">
        <div className="reveal about-aside-grid">
          <window.Placeholder label="studio shelf" kind="photo" tint={1} ratio="4 / 5" />
          <div>
            <div className="eyebrow">Off the clock</div>
            <h2 className="display h-l about-aside__title">
              Letterpress, bad fishing, <em>good coffee</em>.
            </h2>
            <p className="about-aside__body">
              I keep a small letterpress in the garage and a cabinet of wood type that's older than I am.
              Most weekends end in a misregistered print taped above my desk. The misalignment is, I'm told,
              part of the charm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── NowThumb ─── */

function NowThumb({ src, alt }) {
  const [failed, setFailed] = React.useState(false);
  if (!src || failed) {
    return (
      <div className="now-card__thumb now-card__thumb--placeholder">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
        </svg>
      </div>
    );
  }
  return (
    <div className="now-card__thumb">
      <img src={src} alt={alt || ""} onError={() => setFailed(true)} />
    </div>
  );
}

/* ─── NowSection ─── */

function NowSection() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="now-grid reveal">
          {NOW.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="now-card"
            >
              <NowThumb src={item.img} alt={item.title} />
              <div className="now-card__body">
                <div className="now-card__overline">{item.label}</div>
                <div>
                  <div className="now-card__title">{item.title}</div>
                  <div className="now-card__sub">{item.sub}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SkillsSection ─── */

function SkillsSection() {
  const left = [
    "Product Design",
    "Research",
    "Product Positioning",
    "Prototyping",
    "Mobile App Design",
    "Design systems",
    "Websites",
  ];

  const right = [
    "Brand Strategy",
    "Brand Positioning",
    "Brand Narrative",
    "Brand Identity",
    "Creative Direction",
    "Art Direction",
    "Campaigns",
  ];

  return (
    <section className="page-section skills-section">
      <div className="container">
        <div className="eyebrow reveal">Skills</div>
        <div className="skills-grid reveal">
          {Array.from({ length: Math.max(left.length, right.length) }).map((_, row) => (
            <React.Fragment key={row}>
              <div className={`skills-cell ${row === 0 ? "skills-cell--title" : ""}`}>
                {left[row]}
              </div>
              <div className={`skills-cell ${row === 0 ? "skills-cell--title" : ""}`}>
                {right[row]}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About (root component) ─── */

function About() {
  window.useReveal();
  return (
    <>
      <window.Nav active="about" />
      <AboutHero />
      <NowSection />
      <SkillsSection />
      <Timeline />
      <window.Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<About />);
