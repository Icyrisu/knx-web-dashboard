export type Quality = 'good' | 'stale' | 'error' | 'unconfigured' | 'simulated'
export type ActuatorState = 'on' | 'off' | 'unknown' | 'error'
export type PointKind = 'temperature' | 'humidity' | 'air-quality' | 'illuminance' | 'power' | 'generic'
export type ActuatorKind = 'light' | 'hvac' | 'fan' | 'blind' | 'generic'

export interface SensorPoint {
  id: string
  name: string
  area: string
  kind: PointKind
  value: number | null
  unit: string
  quality: Quality
  updatedAt: string
  minVal?: number
  maxVal?: number
  optimalRange?: [number, number]
  dpt?: string // KNX Data Point Type e.g. DPT 9.001
}

export interface ActuatorPoint {
  id: string
  name: string
  area: string
  kind: ActuatorKind
  state: ActuatorState
  quality: Quality
  updatedAt: string
  writable: boolean
  level?: number // 0-100 for dimmer or blinds
  targetTemp?: number // For HVAC in °C
  mode?: 'cool' | 'heat' | 'auto' | 'fan_only'
  dpt?: string // KNX Data Point Type e.g. DPT 1.001
}

export interface TrendPoint {
  time: string
  temperature: number
  humidity: number
  power?: number
}

export interface GatewayInfo {
  host: string
  port: number
  unitId: number
  protocol: string
  status: 'online' | 'offline' | 'simulated' | 'error'
  pollIntervalMs: number
  timeoutMs: number
  lastPollAt: string | null
  registerMapConfigured: boolean
}
