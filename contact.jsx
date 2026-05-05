/* Contact page */

/* ─── Field ─── */

function Field({ label, name, type = "text", textarea, optional }) {
  return (
    <label className="field">
      <div className="field__label">
        <span>{label}</span>
        {optional && <span>Optional</span>}
      </div>
      {textarea ? (
        <textarea name={name} rows="3" className="field__textarea" required={!optional} />
      ) : (
        <input type={type} name={name} className="field__input" required={!optional} />
      )}
    </label>
  );
}

/* ─── SelectField ─── */

function SelectField({ label, name, options }) {
  const [val, setVal] = React.useState(options[0]);
  return (
    <div className="select-field">
      <div className="select-field__label">{label}</div>
      <div className="select-field__options">
        {options.map(o => (
          <button
            key={o}
            type="button"
            onClick={() => setVal(o)}
            className={`tag${val === o ? " tag--active" : ""}`}
            style={{
              background: val === o ? "var(--ink)" : "transparent",
              color: val === o ? "var(--bg)" : "var(--ink-2)",
              borderColor: val === o ? "var(--ink)" : "var(--line)"
            }}
          >{o}</button>
        ))}
      </div>
    </div>
  );
}

/* ─── Contact (root component) ─── */

function Contact() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <>
      <window.Nav active="contact" />
      <section className="hero contact-hero">
        <window.ParticleCanvas />
        <div className="container hero__layer">
          <div className="eyebrow hero-enter" style={{ animationDelay: "80ms" }}>
            Contact
          </div>
          <h1 className="display h-xl contact-hero__headline">
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
                  <button type="submit" className="pill solid contact-form__submit">
                    Send it <span className="arrow">↗</span>
                  </button>
                </form>
              ) : (
                <div className="contact-success">
                  <div className="eyebrow">Message sent</div>
                  <h2 className="display h-l contact-success__title">
                    Got it. <em style={{ color: "var(--accent)" }}>Thanks.</em>
                  </h2>
                  <p className="contact-success__body">
                    I read every note that comes in and reply within a couple of business days.
                    If it's urgent, my email is in the panel on the right.
                  </p>
                </div>
              )}
            </div>

            <aside className="contact-aside">
              <div className="eyebrow">Or reach me directly</div>
              <a href="mailto:hello@peacockery.co" className="display contact-email">
                hello@peacockery.co
              </a>

              <window.ElsewhereLinks />
            </aside>
          </div>
        </div>
      </section>
      <window.Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<Contact />);
