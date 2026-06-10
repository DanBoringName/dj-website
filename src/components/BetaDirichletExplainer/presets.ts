// Named priors the user can jump to. Pure data — no behaviour.

export interface BetaParams {
  a: number;
  b: number;
}

export interface BetaPreset extends BetaParams {
  label: string;
}

export const SLIDER = {
  min: 0.5,
  max: 50,
  step: 0.5,
} as const;

export const PRESETS: BetaPreset[] = [
  { label: "flat: α=1, β=1", a: 1, b: 1 },
  { label: "confident fair: 30,30", a: 30, b: 30 },
  { label: "leans heads: 8,2", a: 8, b: 2 },
];
