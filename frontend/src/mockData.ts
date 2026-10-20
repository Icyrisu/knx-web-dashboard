import type { ActuatorPoint, SensorPoint, TrendPoint } from './types'

const now = new Date().toISOString()
export const areas = ['Overview', '1F', '2F', '3F', 'Custom area']

export const initialSensors: SensorPoint[] = [
  { id: 'temp-lobby', name: 'Lobby Temperature', area: '1F', kind: 'temperature', value: 24.6, unit: '°C', quality: 'simulated', updatedAt: now },
  { id: 'humidity-lobby', name: 'Lobby Humidity', area: '1F', kind: 'humidity', value: 58, unit: '%', quality: 'simulated', updatedAt: now },
  { id: 'temp-meeting', name: 'Meeting Room Temperature', area: '2F', kind: 'temperature', value: 23.8, unit: '°C', quality: 'simulated', updatedAt: now },
  { id: 'lux-office', name: 'Office Illuminance', area: '2F', kind: 'illuminance', value: 420, unit: 'lux', quality: 'simulated', updatedAt: now },
  { id: 'air-lobby', name: 'Air Quality', area: '1F', kind: 'air-quality', value: null, unit: '', quality: 'unconfigured', updatedAt: now },
]

export const initialActuators: ActuatorPoint[] = [
  { id: 'light-lobby', name: 'Lobby Lighting', area: '1F', kind: 'light', state: 'on', quality: 'simulated', updatedAt: now, writable: false },
  { id: 'hvac-meeting', name: 'Meeting Room HVAC', area: '2F', kind: 'hvac', state: 'off', quality: 'simulated', updatedAt: now, writable: false },
  { id: 'fan-office', name: 'Office Fan', area: '2F', kind: 'fan', state: 'off', quality: 'simulated', updatedAt: now, writable: false },
]

export const initialTrend: TrendPoint[] = Array.from({ length: 12 }, (_, i) => ({
  time: `${String(9 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`,
  temperature: Number((23 + Math.sin(i / 2) * 1.4 + i * 0.08).toFixed(1)),
  humidity: Math.round(56 + Math.cos(i / 2) * 4)
}))
