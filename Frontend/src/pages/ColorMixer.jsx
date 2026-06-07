import { useState } from "react";

// style on index.css
export default function ColorMixer() {
  const color = JSON.parse(localStorage.getItem("color"));

  const [r, setR] = useState(color && color.r ? color.r : 0);
  const [g, setG] = useState(color && color.g ? color.g : 0);
  const [b, setB] = useState(color && color.b ? color.b : 0);

  function save() {
    localStorage.setItem("color", JSON.stringify({ r, g, b }));
  }

  return (
    <section className="color-mixer-section">
      <h1>color mixer</h1>

      <div
        className="box"
        style={{
          backgroundColor: "rgb(" + r + "," + g + "," + b + ")",
        }}
      ></div>

      <input
        type="range"
        value={r}
        min={0}
        max={255}
        onChange={(e) => setR(e.target.value)}
      />

      <input
        type="range"
        value={g}
        min={0}
        max={255}
        onChange={(e) => setG(e.target.value)}
      />

      <input
        type="range"
        value={b}
        min={0}
        max={255}
        onChange={(e) => setB(e.target.value)}
      />

      <h2>R : {r}</h2>
      <h2>G : {g} </h2>
      <h2>B : {b} </h2>

      <button onClick={save}>Save color</button>
    </section>
  );
}
