/* About page */

const TIMELINE = [
  { year: "2024 →", role: "Experience Design Director", at: "TierOne" },
  { year: "2020 — 24", role: "Design Lead", at: "OMG Commerce" },
  { year: "2015 — 20", role: "Senior Product Designer", at: "Juxly" },
  { year: "2013 — 15", role: "Senior Designer", at: "Assemblies of God" },
  { year: "2012 — 13", role: "Architectural Designer", at: "Torgerson Design Partners" },
];

const PRINCIPLES = [
  { n: "01", t: "Stay close to the work.", d: "I don't direct from the cheap seats. I'm in the file, the doc, the Slack thread, the engineering review. The fastest path to a good outcome is staying close enough to course-correct." },
  { n: "02", t: "Brand and product are one system.", d: "The places they disagree are usually the most interesting parts of the project. Treat the seam as the artifact, not a problem to paper over." },
  { n: "03", t: "Write before you draw.", d: "If I can't say what something is in a sentence, the design isn't ready. Words clarify; pixels just commit." },
  { n: "04", t: "Make the second draft, fast.", d: "First drafts are too precious to learn from. The second one is where the work actually starts." },
];

function AboutHero() {
  return (
    <section style={{ paddingTop: 96, paddingBottom: 80 }}>
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 28 }}>About / Michael Peacock</div>
        <h1 className="display h-xl reveal" style={{ margin: "0 0 56px", maxWidth: "16ch" }}>
          A designer who'd rather <em style={{ color: "var(--accent)" }}>ship</em> than narrate.
        </h1>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "start" }}>
          <p style={{ fontSize: "1.1875rem", lineHeight: 1.55, color: "var(--ink-2)", margin: 0 }}>
            I grew up in southern Missouri, the kind of place where the nearest art store
            was an hour's drive and the nearest design studio was further. I learned by making things — band posters,
            menu reprints for my parents' friends, a lot of bad logos before any good ones — and that habit
            of just <em>building</em> never really left.
            <br /><br />
            For the last decade I've worked on the kind of brands that have to do real things in the real world:
            EHRs that nurses use mid-shift, breweries that sell in gas stations, e-comm sites that have to load fast
            on someone's parents' phone. The constraint is the project. I like it that way.
          </p>
          <window.Placeholder label="portrait, studio" kind="photo" tint={2} ratio="3 / 4" />
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 60 }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div className="sticky-label reveal">
            How I work<br />
            <span style={{ color: "var(--ink)", display: "block", marginTop: 8, fontSize: "0.75rem" }}>(Principles)</span>
          </div>
          <div>
            {PRINCIPLES.map((p) => (
              <div key={p.n} className="reveal" style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr",
                gap: 32,
                padding: "40px 0",
                borderBottom: "1px solid var(--line)"
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
                  {p.n}
                </div>
                <div>
                  <h3 className="display" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", margin: "0 0 14px" }}>{p.t}</h3>
                  <p style={{ margin: 0, color: "var(--ink-2)", fontSize: "1.0625rem", lineHeight: 1.6, maxWidth: "60ch" }}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 60 }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div className="sticky-label reveal">
            Working back<br />
            <span style={{ color: "var(--ink)", display: "block", marginTop: 8, fontSize: "0.75rem" }}>(Experience)</span>
          </div>
          <div>
            {TIMELINE.map((t, i) => (
              <div key={i} className="reveal" style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr 1fr",
                gap: 24,
                padding: "28px 0",
                borderBottom: "1px solid var(--line)",
                borderTop: i === 0 ? "1px solid var(--line)" : "none",
                alignItems: "baseline"
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
                  {t.year}
                </div>
                <div className="display" style={{ fontSize: "1.375rem" }}>{t.role}</div>
                <div style={{ color: "var(--ink-2)", fontSize: "1rem" }}>{t.at}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Aside() {
  return (
    <section style={{ paddingTop: 160, paddingBottom: 60 }}>
      <div className="container">
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <window.Placeholder label="studio shelf" kind="photo" tint={1} ratio="4 / 5" />
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Off the clock</div>
            <h2 className="display h-l" style={{ margin: "0 0 24px" }}>
              Letterpress, bad fishing, <em>good coffee</em>.
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: "1.0625rem", lineHeight: 1.6, margin: 0 }}>
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

function About() {
  window.useReveal();
  return (
    <>
      <window.Nav active="about" />
      <AboutHero />
      <Principles />
      <Timeline />
      <window.Footer />
      <window.PeacockeryTweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<About />);
