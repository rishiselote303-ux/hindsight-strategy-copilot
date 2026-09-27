import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function StrategyCanvas({ chartData }) {
  const [sliderValue, setSliderValue] = useState(0);

  // Fallback data if backend dynamic state hasn't loaded yet
  const baseData = chartData && chartData.length > 0 ? chartData : [
    { month: 'Jan', sales: 120000, projected_impact: 120000 },
    { month: 'Feb', sales: 115000, projected_impact: 115000 },
    { month: 'Mar', sales: 98000, projected_impact: 98000 },
    { month: 'Apr', sales: 92000, projected_impact: 92000 },
    { month: 'May', sales: 105000, projected_impact: 105000 },
    { month: 'Jun', sales: 110000, projected_impact: 110000 }
  ];

  // Apply slider percentage adjustments dynamically to projected impact
  const simulatedData = baseData.map((d) => ({
    ...d,
    simulated_impact: Math.round(
      (d.projected_impact || d.sales) * (1 + sliderValue / 100)
    )
  }));

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#38bdf8' }}>
            Strategy Canvas ("What-If" Simulator)
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
            Revenue Projection & Mid-Market Strategy Impact
          </p>
        </div>

        <div style={{ minWidth: '220px', backgroundColor: '#1e293b', padding: '8px 12px', borderRadius: '6px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#f8fafc', marginBottom: '4px' }}>
            Adjustment: <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{sliderValue > 0 ? `+${sliderValue}` : sliderValue}%</span>
          </label>
          <input
            type="range"
            min="-50"
            max="50"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Interactive Recharts Visualization */}
      <div style={{ flex: 1, minHeight: '220px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={simulatedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' }} />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#f43f5e" name="Baseline Sales" strokeWidth={2} />
            <Line type="monotone" dataKey="simulated_impact" stroke="#10b981" name="Ground Strategy Impact" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}