import React from 'react'
import {
  Lightbulb,
  Fan,
  Thermometer,
  ShieldAlert,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import type { ActuatorPoint } from '../types'

interface ActuatorCardProps {
  point: ActuatorPoint
  onToggle: (point: ActuatorPoint) => void
  onUpdateLevel?: (point: ActuatorPoint, newLevel: number) => void
  onUpdateTemp?: (point: ActuatorPoint, delta: number) => void
}

export const ActuatorCard: React.FC<ActuatorCardProps> = ({
  point,
  onToggle,
  onUpdateLevel,
  onUpdateTemp
}) => {
  const getIcon = () => {
    switch (point.kind) {
      case 'light':
        return <Lightbulb size={16} />
      case 'hvac':
        return <Thermometer size={16} />
      case 'fan':
        return <Fan size={16} className={point.state === 'on' ? 'spinning-icon' : ''} />
      case 'blind':
        return <Sliders size={16} />
      default:
        return <Lightbulb size={16} />
    }
  }

  const isOn = point.state === 'on'

  return (
    <div className={`actuator-card ${point.kind} ${isOn ? 'active-state' : 'inactive-state'}`}>
      <div className="actuator-header">
        <div className="actuator-info-group">
          <div className={`actuator-icon-box ${point.kind} ${isOn ? 'glow' : ''}`}>
            {getIcon()}
          </div>
          <div className="actuator-titles">
            <span className="actuator-name" title={point.name}>{point.name}</span>
            <div className="actuator-meta-row">
              <span className="actuator-area">{point.area}</span>
              {point.dpt && <span className="actuator-dpt">{point.dpt}</span>}
            </div>
          </div>
        </div>

        {/* Tactile Toggle Switch */}
        <div className="actuator-switch-wrap">
          <button
            type="button"
            className={`tactile-switch ${isOn ? 'switch-on' : 'switch-off'}`}
            onClick={() => onToggle(point)}
            aria-label={`Toggle ${point.name}`}
            title={`Toggle ${point.name} state (Simulation)`}
          >
            <span className="switch-thumb" />
          </button>
          <span className={`switch-status-label ${isOn ? 'on' : 'off'}`}>
            {isOn ? 'ENGAGED' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Sub-controls based on Actuator Kind */}
      <div className="actuator-controls-body">
        {/* Dimmer for Lighting */}
        {point.kind === 'light' && point.level !== undefined && (
          <div className="control-slider-group">
            <div className="slider-label-row">
              <span className="control-label">Intensity Level</span>
              <span className="control-val">{isOn ? `${point.level}%` : '0%'}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={isOn ? point.level : 0}
              disabled={!isOn}
              onChange={(e) => onUpdateLevel?.(point, Number(e.target.value))}
              className="modern-range-slider"
            />
          </div>
        )}

        {/* Thermostat controls for HVAC */}
        {point.kind === 'hvac' && point.targetTemp !== undefined && (
          <div className="control-hvac-group">
            <div className="hvac-temp-row">
              <span className="control-label">Target Setpoint</span>
              <div className="stepper-wrap">
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => onUpdateTemp?.(point, -0.5)}
                  disabled={!isOn}
                  aria-label="Decrease temperature"
                >
                  <ChevronDown size={14} />
                </button>
                <span className="hvac-target-display">{point.targetTemp.toFixed(1)}°C</span>
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={() => onUpdateTemp?.(point, 0.5)}
                  disabled={!isOn}
                  aria-label="Increase temperature"
                >
                  <ChevronUp size={14} />
                </button>
              </div>
            </div>
            <div className="hvac-modes">
              <span className={`mode-chip ${point.mode === 'cool' ? 'active' : ''}`}>COOL</span>
              <span className={`mode-chip ${point.mode === 'auto' ? 'active' : ''}`}>AUTO</span>
              <span className={`mode-chip ${point.mode === 'heat' ? 'active' : ''}`}>HEAT</span>
            </div>
          </div>
        )}

        {/* Position slider for Blinds */}
        {point.kind === 'blind' && point.level !== undefined && (
          <div className="control-slider-group">
            <div className="slider-label-row">
              <span className="control-label">Louver Aperture</span>
              <span className="control-val">{point.level}% Closed</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={point.level}
              onChange={(e) => onUpdateLevel?.(point, Number(e.target.value))}
              className="modern-range-slider"
            />
          </div>
        )}

        {/* Speed presets for Fan */}
        {point.kind === 'fan' && (
          <div className="control-fan-group">
            <span className="control-label">Blower Velocity</span>
            <div className="fan-chips">
              <span className={`fan-chip ${!isOn ? 'active' : ''}`}>OFF</span>
              <span className={`fan-chip ${isOn && (point.level || 0) <= 50 ? 'active' : ''}`}>MEDIUM</span>
              <span className={`fan-chip ${isOn && (point.level || 0) > 50 ? 'active' : ''}`}>MAX BOOST</span>
            </div>
          </div>
        )}
      </div>

      <div className="actuator-footer">
        <span className="safety-tag">
          <ShieldAlert size={11} />
          <span>Simulation write (Locked for physical hardware)</span>
        </span>
      </div>
    </div>
  )
}
