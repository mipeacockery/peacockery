/* Peacockery Tweaks: Palette + Type direction */

function PeacockeryTweaks() {
  const defaults = {
    "palette": "ink",
    "type": "sans"
  };

  const [tweaks, setTweak] = window.useTweaks(defaults);
  const [surfaceTheme, setSurfaceTheme] = React.useState(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.getAttribute("data-theme") || "dark";
  });

  React.useEffect(() => {
    const onTheme = (e) => {
      const t = e && e.detail && e.detail.theme;
      if (t === "light" || t === "dark") setSurfaceTheme(t);
    };
    window.addEventListener("peacockery-themechange", onTheme);
    return () => window.removeEventListener("peacockery-themechange", onTheme);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-palette", tweaks.palette);
    document.documentElement.setAttribute("data-type", tweaks.type);
    localStorage.setItem("peacockery-palette", tweaks.palette);
    localStorage.setItem("peacockery-type", tweaks.type);
    const root = document.documentElement.style;
    const palettes = {
      warm:  { bg:"#f3efe7", bg2:"#ebe5d8", ink:"#161412", ink2:"#3d362f", muted:"#7a6f63", line:"#d9d1c0", accent:"#FF6532" },
      crisp: { bg:"#fafafa", bg2:"#f0f0f0", ink:"#0a0a0a", ink2:"#2a2a2a", muted:"#777777", line:"#e3e3e3", accent:"#FF6532" },
      earth: { bg:"#eeece4", bg2:"#e1ddd0", ink:"#1f3a2f", ink2:"#2e4a3c", muted:"#6e7a6c", line:"#c9c4b3", accent:"#FF6532" },
      ink:   { bg:"#0e0e0e", bg2:"#1a1916", ink:"#fafafa", ink2:"#cfc8b8", muted:"#8a8174", line:"#2a2723", accent:"#FF6532" }
    };
    const paletteKey =
      surfaceTheme === "light" && tweaks.palette === "ink" ? "crisp" : tweaks.palette;
    const p = palettes[paletteKey] || palettes.ink;
    Object.entries(p).forEach(([k, v]) => {
      const cssKey = k === "bg2" ? "--bg-2" : k === "ink2" ? "--ink-2" : `--${k}`;
      root.setProperty(cssKey, v);
    });
  }, [tweaks.palette, tweaks.type, surfaceTheme]);

  return (
    <window.TweaksPanel title="Tweaks" defaultPosition={{ right: 24, bottom: 24 }}>
      <window.TweakSection title="Palette">
        <window.TweakRadio
          value={tweaks.palette}
          onChange={(v) => setTweak("palette", v)}
          options={[
            { value: "warm",  label: "Warm" },
            { value: "crisp", label: "Crisp" },
            { value: "earth", label: "Earth" },
            { value: "ink",   label: "Ink" }
          ]}
        />
      </window.TweakSection>
      <window.TweakSection title="Type direction">
        <window.TweakRadio
          value={tweaks.type}
          onChange={(v) => setTweak("type", v)}
          options={[
            { value: "serif",  label: "Serif" },
            { value: "sans",   label: "Sans" },
            { value: "italic", label: "Italic" },
            { value: "mono",   label: "Mono" }
          ]}
        />
      </window.TweakSection>
    </window.TweaksPanel>
  );
}

window.PeacockeryTweaks = PeacockeryTweaks;
