/* Work index page */

const ALL_WORK = [
  { slug: "omg-commerce.html", t: "OMG Commerce", c: ["Web", "Brand"], y: "2025", role: "Lead Designer", tint: 1 },
  { slug: "#", t: "Juxly Medical App", c: ["App", "UX"], y: "2024", role: "Senior PD", tint: 6 },
  { slug: "#", t: "LAC Branding", c: ["Brand"], y: "2023", role: "Art Director", tint: 4 },
  { slug: "#", t: "Mother's Brewery", c: ["Brand", "Packaging"], y: "2023", role: "Designer", tint: 5 },
  { slug: "#", t: "Big Blanket Co.", c: ["Brand", "Web"], y: "2024", role: "Lead Designer", tint: 2 },
  { slug: "#", t: "Vantage Conservatory", c: ["Brand", "Environmental"], y: "2022", role: "Art Director", tint: 6 },
  { slug: "#", t: "Helix Health", c: ["App", "UX"], y: "2024", role: "Consulting", tint: 3 },
  { slug: "#", t: "Kingsbury Coffee", c: ["Brand", "Packaging"], y: "2022", role: "Designer", tint: 4 },
  { slug: "#", t: "Foundry Athletics", c: ["Web", "Campaign"], y: "2023", role: "Art Director", tint: 1 },
  { slug: "#", t: "Marrow CMS", c: ["Product", "UX"], y: "2025", role: "Design Lead", tint: 6 },
  { slug: "#", t: "Hollow Hills Trail Co.", c: ["Brand"], y: "2021", role: "Designer", tint: 5 },
  { slug: "#", t: "Soundboard FM", c: ["App", "Brand"], y: "2023", role: "Art Director", tint: 3 },
];

const FILTERS = ["All", "Brand", "Web", "App", "Packaging", "Campaign"];

function WorkHero() {
  return (
    <section style={{ paddingTop: 96, paddingBottom: 60 }}>
      <div className="container">
        <h1 className="display h-xl reveal" style={{ margin: 0, maxWidth: "14ch" }}>
          Selected works
        </h1>
      </div>
    </section>
  );
}

function WorkList() {
  const [filter, setFilter] = React.useState("All");
  const [hover, setHover] = React.useState(null);
  const isFirstRender = React.useRef(true);

  const filtered = filter === "All" ? ALL_WORK : ALL_WORK.filter(w => w.c.includes(filter));

  React.useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    requestAnimationFrame(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach(el => el.classList.add("in"));
    });
  }, [filter]);

  return (
    <section style={{ paddingTop: 40, paddingBottom: 80 }}>
      <div className="container">
        <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48, paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>
          {FILTERS.map(f => (
            <button key={f} className="tag" onClick={() => setFilter(f)} style={{
              background: filter === f ? "var(--ink)" : "transparent",
              color: filter === f ? "var(--bg)" : "var(--ink-2)",
              borderColor: filter === f ? "var(--ink)" : "var(--line)",
              cursor: "pointer", transition: "all 200ms"
            }}>{f}</button>
          ))}
          <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", alignSelf: "center" }}>
            {filtered.length} of {ALL_WORK.length}
          </span>
        </div>

        <div style={{ position: "relative" }}>
          {filtered.map((w, i) => (
            <a
              href={w.slug} key={w.t}
              className="reveal"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 1.5fr 200px 80px",
                gap: 32,
                padding: "32px 12px",
                borderBottom: "1px solid var(--line)",
                borderTop: i === 0 ? "1px solid var(--line)" : "none",
                alignItems: "center",
                transition: "background 240ms, padding 240ms",
                background: hover === i ? "color-mix(in oklab, var(--ink) 4%, transparent)" : "transparent"
              }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)" }}>{w.t}</span>
              <span style={{ color: "var(--ink-2)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {w.c.join(" · ")}
              </span>
              <span style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {w.role}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--ink-2)", letterSpacing: "0.08em", textAlign: "right" }}>
                {w.y} →
              </span>
            </a>
          ))}

          {hover !== null && (
            <div style={{
              position: "fixed",
              right: 80,
              top: "30%",
              width: 320,
              pointerEvents: "none",
              zIndex: 30,
              transition: "opacity 200ms",
              opacity: 1
            }}>
              <window.Placeholder label={filtered[hover].t} kind="preview" tint={filtered[hover].tint} ratio="4 / 3" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Work() {
  window.useReveal();
  return (
    <>
      <window.Nav active="work" />
      <WorkHero />
      <WorkList />
      <window.Footer />
      <window.PeacockeryTweaks />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<Work />);
