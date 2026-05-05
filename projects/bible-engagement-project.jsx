/* Bible Engagement Project case study */

function CaseHero() {
  return (
    <section style={{ paddingTop: 96, paddingBottom: 80 }}>
      <div className="container">
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <a href="../work.html" style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--ink-2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ← Back to work
          </a>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            02 / 24 — Case study
          </div>
        </div>
        <h1 className="display reveal" style={{ fontSize: "clamp(3.5rem, 11vw, 10.5rem)", margin: "0 0 48px", lineHeight: 0.92 }}>
          Bible Engagement<br />Project
        </h1>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "200px 200px 200px 1fr", gap: 32, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Client</div>
            <div style={{ fontSize: "1rem" }}>Faith-based nonprofit</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Year</div>
            <div style={{ fontSize: "1rem" }}>2024</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Role</div>
            <div style={{ fontSize: "1rem" }}>Lead Designer</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Scope</div>
            <div style={{ fontSize: "1rem" }}>Product UX · Content model · Design system · Research</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseImage() {
  return (
    <section style={{ paddingTop: 24, paddingBottom: 80 }}>
      <div className="container reveal">
        <window.Placeholder label="Bible Engagement — app home / today" kind="key visual" tint={5} ratio="16 / 9" />
      </div>
    </section>
  );
}

function CaseChapter({ n, eyebrow, title, body, children }) {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 60 }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div className="sticky-label reveal">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--ink)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
              Chapter {n}
            </div>
            <div>{eyebrow}</div>
          </div>
          <div>
            <h2 className="display h-l reveal" style={{ margin: "0 0 32px", maxWidth: "18ch" }}>{title}</h2>
            <div className="reveal" style={{ color: "var(--ink-2)", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "62ch" }}>
              {body}
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: "+62%", l: "weekly return rate after onboarding redesign" },
    { n: "3.4×", l: "avg. chapters completed per active user, post-launch" },
    { n: "4.8", l: "App Store rating, first six months" },
    { n: "1", l: "shared component library across iOS, Android, web" },
  ];
  return (
    <section style={{ paddingTop: 120, paddingBottom: 60 }}>
      <div className="container reveal">
        <div className="eyebrow" style={{ marginBottom: 32 }}>Outcome — by the numbers</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--line)" }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "40px 24px 32px 0",
              borderBottom: "1px solid var(--line)",
              borderRight: (i + 1) % 4 !== 0 ? "1px solid var(--line)" : "none",
              paddingLeft: i === 0 ? 0 : 24
            }}>
              <div className="display" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", color: "var(--accent)", lineHeight: 1 }}>{s.n}</div>
              <div style={{ marginTop: 12, color: "var(--ink-2)", fontSize: "0.875rem", lineHeight: 1.5, maxWidth: "30ch" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    { l: "today screen, reading streak + plan", t: 4, r: "1 / 3" },
    { l: "plan builder flow", t: 1, r: "4 / 3" },
    { l: "study notes + highlights", t: 2, r: "4 / 3" },
    { l: "community group invite", t: 5, r: "16 / 9" },
    { l: "typography scale, scripture + UI", t: 3, r: "4 / 3" },
    { l: "component library, core patterns", t: 6, r: "4 / 3" },
  ];
  return (
    <section style={{ paddingTop: 120, paddingBottom: 60 }}>
      <div className="container reveal">
        <div className="eyebrow" style={{ marginBottom: 32 }}>Gallery — selected artifacts</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {items.map((item, idx) => (
            <window.Placeholder key={idx} label={item.l} kind="artifact" tint={item.t} ratio={item.r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pull() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 60 }}>
      <div className="container reveal" style={{ maxWidth: 980 }}>
        <p className="display" style={{ fontSize: "clamp(1.75rem, 3.6vw, 3rem)", lineHeight: 1.2, margin: 0 }}>
          <em style={{ color: "var(--accent)" }}>"</em>Michael helped us turn a crowded feature list into a single,
          calm daily habit — without dumbing down the depth people come here for.<em style={{ color: "var(--accent)" }}>"</em>
        </p>
        <div style={{ marginTop: 32, fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
          — Product lead · Faith-based nonprofit
        </div>
      </div>
    </section>
  );
}

function NextProject() {
  return (
    <section style={{ paddingTop: 160, paddingBottom: 80 }}>
      <div className="container">
        <a href="./omg-commerce.html" className="reveal" style={{ display: "block" }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>Next project</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <h2 className="display" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", margin: 0, lineHeight: 0.95 }}>
              OMG<br />Commerce
            </h2>
            <window.Placeholder label="next: OMG Commerce" kind="next" tint={1} ratio="4 / 3" />
          </div>
        </a>
      </div>
    </section>
  );
}

function CaseStudy() {
  window.useReveal();
  return (
    <>
      <window.Nav active="work" />
      <CaseHero />
      <CaseImage />
      <CaseChapter
        n="01"
        eyebrow="Brief"
        title="A beloved product that had outgrown its first shell."
        body={<>
          <p>The app already had a loyal audience and years of content — but new readers bounced hard, and power users
          felt buried in toggles. Leadership wanted growth without turning the experience into a gamified checklist.</p>
          <p>The brief: redesign the core reading loop, simplify navigation, and give groups a clearer on-ramp — while
          preserving trust, accessibility, and the tone users expect from scripture-first software.</p>
        </>}
      />
      <CaseChapter
        n="02"
        eyebrow="Approach"
        title="Start with the daily habit, not the feature grid."
        body={<>
          <p>We mapped real sessions — morning commutes, bedtime catch-up, small-group prep — and rebuilt the home
          experience around one question: what should I do today? Everything else moved behind predictable entry points.</p>
          <p>In parallel we defined a content model for plans, notes, and shared reading so engineering could ship
          incrementally without painting the product into a corner.</p>
        </>}
      >
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <window.Placeholder label="research synthesis, week 2" kind="research" tint={2} ratio="4 / 3" />
          <window.Placeholder label="journey + IA sketch" kind="diagram" tint={1} ratio="4 / 3" />
        </div>
      </CaseChapter>
      <CaseChapter
        n="03"
        eyebrow="System"
        title="One rhythm for three surfaces."
        body={<>
          <p>The design system prioritized legibility at small sizes, predictable spacing for long-form text, and
          components that worked across iOS, Android, and web without bespoke forks. Documentation called out
          accessibility checks as first-class, not an appendix.</p>
        </>}
      />
      <Pull />
      <Stats />
      <Gallery />
      <NextProject />
      <window.Footer />
      <window.PeacockeryTweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<CaseStudy />);
