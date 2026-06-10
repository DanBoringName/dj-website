// Chart.js data + options builders, isolated from the React component so the
// presentation tier stays declarative and the styling lives in one place.

import type { ChartData, ChartOptions } from "chart.js";
import { sampleBetaCurve } from "./beta";

// Tuned to read well against the site's near-black surfaces.
const LINE = "#a78bfa";
const FILL = "rgba(167, 139, 250, 0.16)";
const AXIS = "#afb0b6";
const GRID = "rgba(175, 176, 182, 0.12)";

export function buildChartData(a: number, b: number): ChartData<"line"> {
  const { xs, ys } = sampleBetaCurve(a, b);
  return {
    labels: xs.map((v) => v.toFixed(2)),
    datasets: [
      {
        data: ys,
        borderColor: LINE,
        backgroundColor: FILL,
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  };
}

export const CHART_OPTIONS: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 0 },
  plugins: { legend: { display: false } },
  scales: {
    x: {
      title: { display: true, text: "p(heads)", color: AXIS },
      ticks: { maxTicksLimit: 6, color: AXIS },
      grid: { color: GRID },
    },
    y: {
      title: { display: true, text: "density", color: AXIS },
      beginAtZero: true,
      ticks: { color: AXIS },
      grid: { color: GRID },
    },
  },
};
