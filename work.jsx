/* Work index page */

/* ─── Data ─── */

const ALL_WORK = [
  { slug: "projects/omg-commerce.html", t: "OMG Commerce", c: ["Web", "Brand"], y: "2025", role: "Lead Designer", tint: 1 },
  { slug: "projects/bible-engagement-project.html", t: "Bible Engagement Project", c: ["App", "Product"], y: "2024", role: "Lead Designer", tint: 3 },
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

/* ─── WorkHero ─── */

function WorkHero() {
  return (
    <section className="work-hero">
      <div className="container">
        <h1 className="display h-xl work-hero__headline reveal">
          Selected works
        </h1>
      </div>
    </section>
  );
}

/* ─── WorkList ─── */

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
    <section className="work-list-section">
      <div className="container">
        <div className="reveal work-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`tag${filter === f ? " tag--active" : ""}`}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? "var(--ink)" : "transparent",
                color: filter === f ? "var(--bg)" : "var(--ink-2)",
                borderColor: filter === f ? "var(--ink)" : "var(--line)",
              }}
            >{f}</button>
          ))}
          <span className="work-list__count">
            {filtered.length} of {ALL_WORK.length}
          </span>
        </div>

        <div className="work-list__wrap">
          {filtered.map((w, i) => (
            <a
              href={w.slug} key={w.t}
              className="reveal work-list__link"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                background: hover === i ? "color-mix(in oklab, var(--ink) 4%, transparent)" : "transparent"
              }}>
              <span className="work-list__item">
                <span className="work-list__title display">{w.t}</span>
                <span className="work-list__tags">
                {w.c.join(" · ")}
                </span>
                <span className="work-list__role">
                {w.role}
                </span>
              </span>
            </a>
          ))}

          {hover !== null && (
            <div className="work-preview">
              <window.Placeholder label={filtered[hover].t} kind="preview" tint={filtered[hover].tint} ratio="4 / 3" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Work (root component) ─── */

function Work() {
  window.useReveal();
  return (
    <>
      <window.Nav active="work" />
      <WorkHero />
      <WorkList />
      <window.Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<Work />);
