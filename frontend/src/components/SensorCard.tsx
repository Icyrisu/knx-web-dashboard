import React from 'react'
import {
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Zap,
  Activity
} from 'lucide-react'
import type { SensorPoint } from '../types'

interface SensorCardProps {
  point: SensorPoint
}

export const SensorCard: React.FC<SensorCardProps> = ({ point }) => {
  const getIcon = () => {
    switch (point.kind) {
      case 'temperature':
        return <Thermometer size={16} />
      case 'humidity':
        return <Droplets size={16} />
      case 'illuminance':
        return <Sun size={16} />
      case 'air-quality':
        return <Wind size={16} />
      case 'power':
        return <Zap size={16} />
      default:
        return <Activity size={16} />
    }
  }

  // Calculate percentage for range bar if min/max available
  let percent = 50
  if (point.value !== null && point.minVal !== undefined && point.maxVal !== undefined) {
    const clamped = Math.max(point.minVal, Math.min(point.maxVal, point.value))
    percent = Math.round(((clamped - point.minVal) / (point.maxVal - point.minVal)) * 100)
  }

  const isUnconfigured = point.value === null || point.quality === 'unconfigured'

  return (
    <div className={`sensor-card ${point.kind} ${isUnconfigured ? 'unconfigured' : ''}`}>
      <div className="sensor-card-top">
        <div className="sensor-meta">
          <div className={`sensor-icon-box ${point.kind}`}>
            {getIcon()}
          </div>
          <div className="sensor-titles">
            <span className="sensor-name" title={point.name}>{point.name}</span>
            <div className="sensor-location-row">
              <span className="sensor-area">{point.area}</span>
              {point.dpt && <span className="sensor-dpt">{point.dpt}</span>}
            </div>
          </div>
        </div>

        <span className={`quality-badge ${point.quality}`}>
          {point.quality.toUpperCase()}
        </span>
      </div>

      <div className="sensor-reading-container">
        {isUnconfigured ? (
          <div className="reading-unconfigured">
            <span className="unconfigured-dash">—</span>
            <span className="unconfigured-label">Register Unmapped</span>
          </div>
        ) : (
          <div className="reading-value-wrap">
            <span className="reading-number">{point.value}</span>
            <span className="reading-unit">{point.unit}</span>
          </div>
        )}
      </div>

      {/* Visual Telemetry Bar */}
      {!isUnconfigured && point.minVal !== undefined && point.maxVal !== undefined && (
        <div className="sensor-range-container">
          <div className="range-track">
            <div
              className={`range-fill ${point.kind}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="range-labels">
            <span>{point.minVal}{point.unit}</span>
            {point.optimalRange && (
              <span className="optimal-label">
                Norm {point.optimalRange[0]}-{point.optimalRange[1]}
              </span>
            )}
            <span>{point.maxVal}{point.unit}</span>
          </div>
        </div>
      )}

      <div className="sensor-card-footer">
        <span className="sensor-point-id">ID: {point.id}</span>
        <span className="sensor-update-time">Simulated realtime</span>
      </div>
    </div>
  )
}
