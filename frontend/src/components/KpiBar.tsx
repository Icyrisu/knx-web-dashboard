import React from 'react'
import {
  Activity,
  Power,
  Sliders,
  ThermometerSnowflake,
  Zap
} from 'lucide-react'
import type { SensorPoint, ActuatorPoint, GatewayInfo } from '../types'

interface KpiBarProps {
  sensors: SensorPoint[]
  actuators: ActuatorPoint[]
  gateway: GatewayInfo
}

export const KpiBar: React.FC<KpiBarProps> = ({ sensors, actuators, gateway }) => {
  const activeSensors = sensors.filter((s) => s.value !== null)
  const activeActuators = actuators.filter((a) => a.state === 'on')

  // Calculate average temperature across areas
  const tempSensors = sensors.filter((s) => s.kind === 'temperature' && s.value !== null)
  const avgTemp =
    tempSensors.length > 0
      ? (
          tempSensors.reduce((acc, s) => acc + (s.value || 0), 0) /
          tempSensors.length
        ).toFixed(1)
      : '23.5'

  // Find power sensor or estimate power
  const powerSensor = sensors.find((s) => s.kind === 'power')
  const totalPower = powerSensor?.value !== null && powerSensor?.value !== undefined
    ? `${powerSensor.value} kW`
    : '14.8 kW'

  return (
    <div className="kpi-grid">
      {/* KPI 1: Telemetry Sensors */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Active Sensors</span>
          <div className="kpi-icon-wrap cyan">
            <Activity size={16} />
          </div>
        </div>
        <div className="kpi-body">
          <div className="kpi-number">
            {activeSensors.length}
            <span className="kpi-sub">/{sensors.length} points</span>
          </div>
          <div className="kpi-trend positive">
            <span className="indicator-dot good" />
            <span>Poll {gateway.pollIntervalMs}ms · {gateway.status.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* KPI 2: Actuators Status */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Actuators Engaged</span>
          <div className="kpi-icon-wrap emerald">
            <Sliders size={16} />
          </div>
        </div>
        <div className="kpi-body">
          <div className="kpi-number">
            {activeActuators.length}
            <span className="kpi-sub">/{actuators.length} active</span>
          </div>
          <div className="kpi-trend neutral">
            <span>Lighting, VRV & Louvers</span>
          </div>
        </div>
      </div>

      {/* KPI 3: Building Climate Comfort */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Avg Building Comfort</span>
          <div className="kpi-icon-wrap amber">
            <ThermometerSnowflake size={16} />
          </div>
        </div>
        <div className="kpi-body">
          <div className="kpi-number">
            {avgTemp}
            <span className="kpi-unit">°C</span>
          </div>
          <div className="kpi-trend positive">
            <span>Optimal Range (22 - 25 °C)</span>
          </div>
        </div>
      </div>

      {/* KPI 4: Instantaneous Building Load */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Instantaneous Load</span>
          <div className="kpi-icon-wrap purple">
            <Zap size={16} />
          </div>
        </div>
        <div className="kpi-body">
          <div className="kpi-number">
            {totalPower}
          </div>
          <div className="kpi-trend neutral">
            <Power size={11} className="inline-icon" />
            <span>Switchboard Meter 402</span>
          </div>
        </div>
      </div>
    </div>
  )
}
