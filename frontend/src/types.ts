export type Quality = 'good' | 'stale' | 'error' | 'unconfigured' | 'simulated'
export type ActuatorState = 'on' | 'off' | 'unknown' | 'error'

export interface SensorPoint {
  id: string
  name: string
  area: string
  kind: 'temperature' | 'humidity' | 'air-quality' | 'illuminance' | 'generic'
  value: number | null
  unit: string
  quality: Quality
  updatedAt: string
}

export interface ActuatorPoint {
  id: string
  name: string
  area: string
  kind: 'light' | 'hvac' | 'fan' | 'blind' | 'generic'
  state: ActuatorState
  quality: Quality
  updatedAt: string
  writable: boolean
}

export interface TrendPoint {
  time: string
  temperature: number
  humidity: number
}
