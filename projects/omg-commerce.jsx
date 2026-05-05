/* OMG Commerce case study */

function CaseHero() {
  return (
    <section style={{ paddingTop: 96, paddingBottom: 80 }}>
      <div className="container">
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <a href="../work.html" style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--ink-2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ← Back to work
          </a>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            01 / 24 — Featured
          </div>
        </div>
        <h1 className="display reveal" style={{ fontSize: "clamp(3.5rem, 11vw, 10.5rem)", margin: "0 0 48px", lineHeight: 0.92 }}>
          OMG<br />Commerce
        </h1>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "200px 200px 200px 1fr", gap: 32, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Client</div>
            <div style={{ fontSize: "1rem" }}>OMG Commerce</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Year</div>
            <div style={{ fontSize: "1rem" }}>2025</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Role</div>
            <div style={{ fontSize: "1rem" }}>Lead Designer</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Scope</div>
            <div style={{ fontSize: "1rem" }}>Brand refresh · Website · Design system · Campaign visuals</div>
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
        <window.Placeholder label="OMG Commerce — homepage hero" kind="key visual" tint={5} ratio="16 / 9" />
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
    { n: "+184%", l: "qualified inbound leads, first quarter post-launch" },
    { n: "−42%",  l: "time-to-quote across new sales tooling" },
    { n: "9.2",   l: "median PageSpeed score, mobile + desktop" },
    { n: "1",     l: "design system, every team off the spreadsheet" },
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
    { l: "wordmark + secondary lockups", t: 4, r: "1 / 3" },
    { l: "homepage scroll", t: 1, r: "4 / 3" },
    { l: "case study layout", t: 2, r: "4 / 3" },
    { l: "campaign film, key frame", t: 5, r: "16 / 9" },
    { l: "type system, working spread", t: 3, r: "4 / 3" },
    { l: "component library", t: 6, r: "4 / 3" },
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
          <em style={{ color: "var(--accent)" }}>"</em>Michael came in, listened for two weeks, then handed us a design
          system that finally let our marketing and product teams stop renegotiating the brand on every project.<em style={{ color: "var(--accent)" }}>"</em>
        </p>
        <div style={{ marginTop: 32, fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
          — Brett Curry · CEO, OMG Commerce
        </div>
      </div>
    </section>
  );
}

function NextProject() {
  return (
    <section style={{ paddingTop: 160, paddingBottom: 80 }}>
      <div className="container">
        <a href="./bible-engagement-project.html" className="reveal" style={{ display: "block" }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>Next project</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <h2 className="display" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", margin: 0, lineHeight: 0.95 }}>
              Bible Engagement<br />Project
            </h2>
            <window.Placeholder label="next: Bible Engagement Project" kind="next" tint={3} ratio="4 / 3" />
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
        title="A 14-year-old agency, looking older than it was."
        body={<>
          <p>OMG Commerce had grown from a scrappy Google Ads shop into a full-stack DTC growth partner — but their
          website was still telling the 2018 story. Sales calls were starting on the back foot, with prospects asking
          if the team was bigger now (it was) and what they actually did beyond ads (a lot).</p>
          <p>The brief: rebuild the digital storefront so it matches the work, the team, and the price point. Don't
          throw away brand equity, but stop apologizing for it.</p>
        </>}
      />
      <CaseChapter
        n="02"
        eyebrow="Approach"
        title="Make the case studies the protagonist."
        body={<>
          <p>We rebuilt the site around six anchor case studies and a content model that lets sales drop a relevant
          one into any conversation in two clicks. The homepage stopped trying to explain the agency and started
          letting the work do it.</p>
          <p>In parallel, a brand refresh — same wordmark family, new typographic scale, an accent palette, and a
          set of motion principles for the campaign team to riff on. Nothing precious. Everything documented.</p>
        </>}
      >
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <window.Placeholder label="discovery, week 1" kind="research" tint={2} ratio="4 / 3" />
          <window.Placeholder label="information architecture" kind="diagram" tint={1} ratio="4 / 3" />
        </div>
      </CaseChapter>
      <CaseChapter
        n="03"
        eyebrow="System"
        title="One file, eight teams, no surprises."
        body={<>
          <p>The design system shipped with documentation written for the people who'd actually use it — paid media,
          content, sales, partnerships — not just designers. Each component has a "when to reach for this" note
          that's longer than its prop list.</p>
        </>}
      />
      <Pull />
      <Stats />
      <Gallery />
      <NextProject />
      <window.Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<CaseStudy />);
