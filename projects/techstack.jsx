/* TechStack case study */

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
          Tech<br />Stack
        </h1>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "200px 200px 200px 1fr", gap: 32, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Client</div>
            <div style={{ fontSize: "1rem" }}>TechStack</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Year</div>
            <div style={{ fontSize: "1rem" }}>2025</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Role</div>
            <div style={{ fontSize: "1rem" }}>Head of Product</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Scope</div>
            <div style={{ fontSize: "1rem" }}>Brand · Web app · Onboarding · Design system</div>
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
        <window.LiquidThumbnail
          className="liquid-thumb--case"
          ratio="16 / 9"
          interactive={false}
          src="../assets/techstack-onboarding-hero.jpg"
          srcSet="../assets/techstack-onboarding-hero.jpg 1x, ../assets/techstack-onboarding-hero@2x.jpg 2x"
          alt="TechStack workspace dashboard showing spend and location data."
          objectPosition="left center"
        />
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
    { n: "−38%", l: "time-to-first-workspace after onboarding redesign" },
    { n: "+51%", l: "activation through guided setup, first 90 days" },
    { n: "2", l: "surfaces unified — marketing site and product shell" },
    { n: "1", l: "design system spanning brand, app, and sales collateral" },
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
    { l: "workspace dashboard — spend overview", t: 1, r: "16 / 9" },
    { l: "onboarding — location + stack setup", t: 2, r: "4 / 3" },
    { l: "login / sign-in experience", t: 1, r: "4 / 3" },
    { l: "location detail + map patterns", t: 3, r: "16 / 9" },
    { l: "type + color system", t: 4, r: "4 / 3" },
    { l: "component library, tables + filters", t: 6, r: "4 / 3" },
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
          <em style={{ color: "var(--accent)" }}>"</em>Michael took a product that felt like three tools stitched together and gave us one
          calm workspace — the kind of clarity our ops teams could actually run on.<em style={{ color: "var(--accent)" }}>"</em>
        </p>
        <div style={{ marginTop: 32, fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
          — Leadership · TechStack
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
            <window.LiquidThumbnail
              ratio="4 / 3"
              src="../assets/bible-engagement-cover.png"
              alt="Bible Engagement app home screen."
              objectPosition="center center"
            />
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
        title="One product, three mental models."
        body={<>
          <p>TechStack helps multi-location operators see spend, stacks, and site data in one place — but the product had
          grown feature-by-feature. New customers bounced between onboarding steps, and power users kept rebuilding the
          same views in spreadsheets.</p>
          <p>The brief: unify brand and product, shorten time-to-value, and make the workspace feel like a single system
          — not a dashboard bolted onto a signup flow.</p>
        </>}
      />
      <CaseChapter
        n="02"
        eyebrow="Approach"
        title="Onboarding is the product's first chapter."
        body={<>
          <p>We rebuilt the signup path around guided setup — locations, integrations, and the first meaningful dashboard
          — so teams see real data before the trial ends. Marketing and app now share typography, color, and motion so
          the handoff from site to workspace feels continuous.</p>
          <p>In parallel, we simplified the core shell: predictable navigation, filter patterns that scale across spend and
          location views, and empty states that teach instead of shrug.</p>
        </>}
      >
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <window.Placeholder label="onboarding flow, steps 1–4" kind="research" tint={2} ratio="4 / 3" />
          <window.Placeholder label="workspace IA + nav model" kind="diagram" tint={1} ratio="4 / 3" />
        </div>
      </CaseChapter>
      <CaseChapter
        n="03"
        eyebrow="System"
        title="Built for operators, not slide decks."
        body={<>
          <p>The design system prioritized dense data tables, legible charts at a glance, and components that work in
          light contexts (sales) and dark contexts (in-product). Documentation called out when to use filters vs. drill-downs
          so engineering and design stayed aligned as the roadmap accelerated.</p>
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
