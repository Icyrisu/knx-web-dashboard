import React, { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Thermometer, Droplets, Zap } from 'lucide-react'
import type { TrendPoint } from '../types'

interface TrendChartProps {
  data: TrendPoint[]
}

type MetricKey = 'temperature' | 'humidity' | 'power'

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState<MetricKey>('temperature')
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '12h' | '24h'>('12h')

  const metricConfig = {
    temperature: {
      name: 'Temperature',
      unit: '°C',
      stroke: '#0284c7',
      fillStart: 'rgba(2, 132, 199, 0.28)',
      fillEnd: 'rgba(2, 132, 199, 0.01)',
      icon: Thermometer
    },
    humidity: {
      name: 'Relative Humidity',
      unit: '%RH',
      stroke: '#0ea5e9',
      fillStart: 'rgba(14, 165, 233, 0.28)',
      fillEnd: 'rgba(14, 165, 233, 0.01)',
      icon: Droplets
    },
    power: {
      name: 'Building Load',
      unit: 'kW',
      stroke: '#a855f7',
      fillStart: 'rgba(168, 85, 247, 0.28)',
      fillEnd: 'rgba(168, 85, 247, 0.01)',
      icon: Zap
    }
  }

  const currentCfg = metricConfig[activeMetric]

  // Filter data according to timeRange
  const displayedData = timeRange === '1h'
    ? data.slice(-4)
    : timeRange === '6h'
      ? data.slice(-6)
      : data

  return (
    <div className="trend-panel">
      <div className="trend-header">
        <div className="trend-title-wrap">
          <h3 className="trend-heading">Environmental & Power Telemetry</h3>
          <p className="trend-subheading">
            Continuous 12-hour trend simulation · Database persistent ingestion in Phase 2
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="trend-controls-row">
          <div className="metric-toggle-group">
            <button
              type="button"
              className={`metric-btn ${activeMetric === 'temperature' ? 'active' : ''}`}
              onClick={() => setActiveMetric('temperature')}
            >
              <Thermometer size={13} />
              <span>Temp (°C)</span>
            </button>
            <button
              type="button"
              className={`metric-btn ${activeMetric === 'humidity' ? 'active' : ''}`}
              onClick={() => setActiveMetric('humidity')}
            >
              <Droplets size={13} />
              <span>Humidity (%)</span>
            </button>
            <button
              type="button"
              className={`metric-btn ${activeMetric === 'power' ? 'active' : ''}`}
              onClick={() => setActiveMetric('power')}
            >
              <Zap size={13} />
              <span>Power (kW)</span>
            </button>
          </div>

          <div className="time-range-group">
            {(['1h', '6h', '12h'] as const).map((r) => (
              <button
                key={r}
                type="button"
                className={`range-pill ${timeRange === r ? 'active' : ''}`}
                onClick={() => setTimeRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-canvas-wrap">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={displayedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={currentCfg.stroke} stopOpacity={0.35} />
                <stop offset="95%" stopColor={currentCfg.stroke} stopOpacity={0.00} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--chart-grid)"
            />
            <XAxis
              dataKey="time"
              tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
              axisLine={false}
              tickLine={false}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="custom-chart-tooltip">
                      <div className="tooltip-time">{label} hrs</div>
                      <div className="tooltip-val-row">
                        <span
                          className="tooltip-dot"
                          style={{ backgroundColor: currentCfg.stroke }}
                        />
                        <span className="tooltip-metric">{currentCfg.name}:</span>
                        <b className="tooltip-value">
                          {payload[0].value} {currentCfg.unit}
                        </b>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey={activeMetric}
              name={currentCfg.name}
              stroke={currentCfg.stroke}
              strokeWidth={2}
              fill="url(#metricGradient)"
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
