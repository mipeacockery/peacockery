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
                <span className="h1-playfair hero-gradient-reverse">Hello,</span>
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

              <window.ElsewhereLinks />
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
    <label style={{ display: "block", paddingTop: 24, paddingBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>
        <span>{label}</span>
        {optional && <span>Optional</span>}
      </div>
      {textarea ? (
        <textarea name={name} rows="3" style={textareaFieldStyle} required={!optional} />
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
  borderBottom: "1px solid var(--muted)",
  background: "var(--primary-bg-color)",
  boxSizing: "border-box",
  height: 48,
  minHeight: 40,
  fontFamily: "var(--font-display)",
  fontSize: "1.5rem",
  color: "var(--ink)",
  outline: "none",
  padding: 0,
  resize: "vertical",
};

const textareaFieldStyle = {
  ...fieldStyle,
  height: 120,
  minHeight: 120,
};

ReactDOM.createRoot(document.getElementById("app")).render(<Contact />);
