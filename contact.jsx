/* Contact page */

function Contact() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <>
      <window.Nav active="contact" />
      <section
        className="hero"
        style={{
          paddingTop: 96,
          paddingBottom: 120,
          minHeight: "calc(100vh - 200px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <window.ParticleCanvas />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow hero-enter" style={{ marginBottom: 28, animationDelay: "80ms" }}>
            Contact
          </div>
          <h1 className="display h-xl" style={{ margin: "0 0 56px", maxWidth: "16ch" }}>
            <span className="h1-line-wrap">
              <span className="h1-line" style={{ animationDelay: "200ms" }}>
                <em style={{ color: "var(--accent)" }}>Hello —</em>
              </span>
            </span>
            <span className="h1-line-wrap">
              <span className="h1-line" style={{ animationDelay: "370ms" }}>
                tell me what you're cooking up.
              </span>
            </span>
          </h1>

          <div className="hero-enter contact-main-grid" style={{ animationDelay: "950ms" }}>
            <div>
              {!submitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <Field label="Your name" name="name" />
                  <Field label="Email" name="email" type="email" />
                  <Field label="Company / context" name="company" optional />
                  <Field label="Tell me a bit more" name="brief" textarea />
                  <button type="submit" className="pill solid" style={{ marginTop: 24 }}>
                    Send it <span className="arrow">↗</span>
                  </button>
                </form>
              ) : (
                <div style={{ padding: "48px 0" }}>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>Message sent</div>
                  <h2 className="display h-l" style={{ margin: "0 0 24px", maxWidth: "16ch" }}>
                    Got it. <em style={{ color: "var(--accent)" }}>Thanks.</em>
                  </h2>
                  <p style={{ color: "var(--ink-2)", fontSize: "1.125rem", maxWidth: "50ch", margin: 0 }}>
                    I read every note that comes in and reply within a couple of business days.
                    If it's urgent, my email is in the panel on the right.
                  </p>
                </div>
              )}
            </div>

            <aside className="contact-aside" style={{ borderLeft: "1px solid var(--line)", paddingLeft: 48 }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>Or reach me directly</div>
              <a href="mailto:hello@peacockery.co" className="display" style={{ display: "block", fontSize: "1.375rem", marginBottom: 32 }}>
                hello@peacockery.co
              </a>

              <div className="eyebrow" style={{ marginBottom: 14 }}>Elsewhere</div>
              <a className="footer-link" href="#"><span>LinkedIn</span><span className="arrow">↗</span></a>
              <a className="footer-link" href="#"><span>Dribbble</span><span className="arrow">↗</span></a>
              <a className="footer-link" href="#"><span>Read.cv</span><span className="arrow">↗</span></a>

              <div className="eyebrow" style={{ marginTop: 40, marginBottom: 14 }}>Currently</div>
              <p style={{ color: "var(--ink-2)", margin: 0, fontSize: "0.9375rem", lineHeight: 1.6 }}>
                Booking new consulting engagements for <span style={{ color: "var(--ink)" }}>Q3 2026</span>.
                Best fit: brand-led product teams between Series A and Series C.
              </p>
            </aside>
          </div>
        </div>
      </section>
      <window.Footer />
      <window.PeacockeryTweaks />
    </>
  );
}

function Field({ label, name, type = "text", textarea, optional }) {
  return (
    <label style={{ display: "block", paddingTop: 24, paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
        <span>{label}</span>
        {optional && <span>Optional</span>}
      </div>
      {textarea ? (
        <textarea name={name} rows="3" style={fieldStyle} required={!optional} />
      ) : (
        <input type={type} name={name} style={fieldStyle} required={!optional} />
      )}
    </label>
  );
}

function SelectField({ label, name, options }) {
  const [val, setVal] = React.useState(options[0]);
  return (
    <div style={{ paddingTop: 24, paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>
      <div style={{ marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map(o => (
          <button key={o} type="button" onClick={() => setVal(o)} className="tag" style={{
            cursor: "pointer",
            background: val === o ? "var(--ink)" : "transparent",
            color: val === o ? "var(--bg)" : "var(--ink-2)",
            borderColor: val === o ? "var(--ink)" : "var(--line)"
          }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

const fieldStyle = {
  width: "100%",
  border: "none",
  background: "transparent",
  fontFamily: "var(--font-display)",
  fontSize: "1.5rem",
  color: "var(--ink)",
  outline: "none",
  padding: 0,
  resize: "vertical",
};

ReactDOM.createRoot(document.getElementById("app")).render(<Contact />);
