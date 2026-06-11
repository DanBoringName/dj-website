// Dumb presentational pieces for the explainer: a labelled slider, a stat tile,
// and a preset button row. They hold no distribution logic — values in, events out.

import { SLIDER } from "./presets";

interface SliderRowProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function SliderRow({ id, label, value, onChange }: SliderRowProps) {
  return (
    <div className="bd-row">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={SLIDER.min}
        max={SLIDER.max}
        step={SLIDER.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <output>{value}</output>
    </div>
  );
}

interface StatTileProps {
  label: string;
  value: string | number;
}

export function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="bd-stat">
      <div className="lbl">{label}</div>
      <div className="val">{value}</div>
    </div>
  );
}

interface PresetButtonProps {
  label: string;
  onClick: () => void;
}

export function PresetButton({ label, onClick }: PresetButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}
