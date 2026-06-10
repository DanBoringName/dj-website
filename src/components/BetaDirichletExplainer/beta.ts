// Pure statistics for the Beta(α, β) distribution.
// Kept free of React/Chart concerns so it can be unit-tested or reused.

const LANCZOS_G = 7;
const LANCZOS_COEFFS = [
  0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
  12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
];

// Lanczos approximation for log-gamma -> stable Beta PDF without overflow.
export function lgamma(z: number): number {
  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  }
  z -= 1;
  let x = LANCZOS_COEFFS[0];
  for (let i = 1; i < LANCZOS_G + 2; i++) x += LANCZOS_COEFFS[i] / (z + i);
  const t = z + LANCZOS_G + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

export function betaPDF(x: number, a: number, b: number): number {
  if (x <= 0 || x >= 1) return 0;
  const logDensity = (a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - (lgamma(a) + lgamma(b) - lgamma(a + b));
  return Math.exp(logDensity);
}

export interface BetaStats {
  mean: number;
  concentration: number;
}

export function betaStats(a: number, b: number): BetaStats {
  return {
    mean: a / (a + b),
    concentration: Math.round((a + b) * 10) / 10,
  };
}

// Sample the PDF over an evenly spaced grid on (0, 1).
export function sampleBetaCurve(a: number, b: number, points = 200) {
  const xs = Array.from({ length: points + 1 }, (_, i) => i / points);
  return {
    xs,
    ys: xs.map((x) => betaPDF(x, a, b)),
  };
}
