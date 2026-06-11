import { useMemo, useState } from "react";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import { betaStats } from "./beta";
import { buildChartData, CHART_OPTIONS } from "./chart";
import { PRESETS, SLIDER, type BetaParams } from "./presets";
import { PresetButton, SliderRow, StatTile } from "./BetaControls";
import "./BetaDirichletExplainer.css";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Filler);

const INITIAL: BetaParams = { a: 2, b: 2 };

const BetaDirichletExplainer = () => {
  const [{ a, b }, setParams] = useState<BetaParams>(INITIAL);

  const data = useMemo(() => buildChartData(a, b), [a, b]);
  const { mean, concentration } = useMemo(() => betaStats(a, b), [a, b]);

  const observeHeads = () => setParams((prev) => ({ ...prev, a: Math.min(SLIDER.max, prev.a + 10) }));

  return (
    <div className="bd-explainer">
      <h3>A belief about a coin: Beta Dirichlet explainer(α, β)</h3>

      <div className="bd-controls">
        <div className="bd-sliders">
          <SliderRow
            id="bd-a"
            label="α — heads count"
            value={a}
            onChange={(value) => setParams((prev) => ({ ...prev, a: value }))}
          />
          <SliderRow
            id="bd-b"
            label="β — tails count"
            value={b}
            onChange={(value) => setParams((prev) => ({ ...prev, b: value }))}
          />
        </div>
        <div className="bd-stats">
          <StatTile label="Expected p(heads)" value={mean.toFixed(2)} />
          <StatTile label="Concentration α+β" value={concentration} />
        </div>
      </div>

      <div className="bd-chart-wrap">
        <Line data={data} options={CHART_OPTIONS} />
      </div>

      <div className="bd-presets">
        {PRESETS.map((preset) => (
          <PresetButton
            key={preset.label}
            label={preset.label}
            onClick={() => setParams({ a: preset.a, b: preset.b })}
          />
        ))}
        <PresetButton label="+10 heads observed" onClick={observeHeads} />
      </div>
    </div>
  );
};

export default BetaDirichletExplainer;
