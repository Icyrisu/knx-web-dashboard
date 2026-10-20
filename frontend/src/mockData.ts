import type { ActuatorPoint, SensorPoint, TrendPoint, GatewayInfo } from './types'

const now = new Date().toISOString()

export const areas = [
  'All Areas',
  '1F Ground Floor',
  '2F Workspaces',
  '3F Executive',
  'Technical Area'
]

export const defaultGatewayInfo: GatewayInfo = {
  host: '192.168.100.246',
  port: 502,
  unitId: 1,
  protocol: 'Modbus TCP (KNX Gateway IN701)',
  status: 'simulated',
  pollIntervalMs: 2000,
  timeoutMs: 3000,
  lastPollAt: now,
  registerMapConfigured: false
}

export const initialSensors: SensorPoint[] = [
  {
    id: 'knx-sen-101',
    name: 'Lobby Ambient Temperature',
    area: '1F Ground Floor',
    kind: 'temperature',
    value: 23.6,
    unit: '°C',
    quality: 'simulated',
    updatedAt: now,
    minVal: 16,
    maxVal: 32,
    optimalRange: [22, 25],
    dpt: 'DPT 9.001'
  },
  {
    id: 'knx-sen-102',
    name: 'Lobby Relative Humidity',
    area: '1F Ground Floor',
    kind: 'humidity',
    value: 52,
    unit: '%RH',
    quality: 'simulated',
    updatedAt: now,
    minVal: 20,
    maxVal: 90,
    optimalRange: [40, 60],
    dpt: 'DPT 9.007'
  },
  {
    id: 'knx-sen-201',
    name: 'Open Office Temperature',
    area: '2F Workspaces',
    kind: 'temperature',
    value: 24.2,
    unit: '°C',
    quality: 'simulated',
    updatedAt: now,
    minVal: 16,
    maxVal: 32,
    optimalRange: [22, 25],
    dpt: 'DPT 9.001'
  },
  {
    id: 'knx-sen-202',
    name: 'Open Office Daylight Lux',
    area: '2F Workspaces',
    kind: 'illuminance',
    value: 540,
    unit: 'lux',
    quality: 'simulated',
    updatedAt: now,
    minVal: 0,
    maxVal: 2000,
    optimalRange: [300, 750],
    dpt: 'DPT 9.004'
  },
  {
    id: 'knx-sen-203',
    name: 'Meeting Room Air Quality (CO₂)',
    area: '2F Workspaces',
    kind: 'air-quality',
    value: 620,
    unit: 'ppm',
    quality: 'simulated',
    updatedAt: now,
    minVal: 350,
    maxVal: 2000,
    optimalRange: [400, 800],
    dpt: 'DPT 9.008'
  },
  {
    id: 'knx-sen-301',
    name: 'Boardroom Climate Sensor',
    area: '3F Executive',
    kind: 'temperature',
    value: 22.8,
    unit: '°C',
    quality: 'simulated',
    updatedAt: now,
    minVal: 16,
    maxVal: 32,
    optimalRange: [21, 24],
    dpt: 'DPT 9.001'
  },
  {
    id: 'knx-sen-401',
    name: 'Server Room Rack Temp',
    area: 'Technical Area',
    kind: 'temperature',
    value: 20.4,
    unit: '°C',
    quality: 'simulated',
    updatedAt: now,
    minVal: 15,
    maxVal: 35,
    optimalRange: [18, 22],
    dpt: 'DPT 9.001'
  },
  {
    id: 'knx-sen-402',
    name: 'Main Switchboard Power Meter',
    area: 'Technical Area',
    kind: 'power',
    value: 14.8,
    unit: 'kW',
    quality: 'simulated',
    updatedAt: now,
    minVal: 0,
    maxVal: 50,
    optimalRange: [5, 30],
    dpt: 'DPT 14.056'
  },
  {
    id: 'knx-sen-999',
    name: 'Chiller Loop Pressure',
    area: 'Technical Area',
    kind: 'generic',
    value: null,
    unit: 'bar',
    quality: 'unconfigured',
    updatedAt: now,
    dpt: 'DPT 9.006'
  }
]

export const initialActuators: ActuatorPoint[] = [
  {
    id: 'knx-act-101',
    name: 'Lobby Architectural Downlights',
    area: '1F Ground Floor',
    kind: 'light',
    state: 'on',
    level: 75,
    quality: 'simulated',
    updatedAt: now,
    writable: false,
    dpt: 'DPT 5.001'
  },
  {
    id: 'knx-act-201',
    name: 'Open Office Linear Lighting',
    area: '2F Workspaces',
    kind: 'light',
    state: 'on',
    level: 90,
    quality: 'simulated',
    updatedAt: now,
    writable: false,
    dpt: 'DPT 5.001'
  },
  {
    id: 'knx-act-202',
    name: 'Meeting Room VRV Climate',
    area: '2F Workspaces',
    kind: 'hvac',
    state: 'on',
    targetTemp: 23.0,
    mode: 'cool',
    quality: 'simulated',
    updatedAt: now,
    writable: false,
    dpt: 'DPT 9.001'
  },
  {
    id: 'knx-act-203',
    name: 'South Facade Solar Louvers',
    area: '2F Workspaces',
    kind: 'blind',
    state: 'on',
    level: 40,
    quality: 'simulated',
    updatedAt: now,
    writable: false,
    dpt: 'DPT 5.001'
  },
  {
    id: 'knx-act-301',
    name: 'Executive Suite Ambience',
    area: '3F Executive',
    kind: 'light',
    state: 'off',
    level: 0,
    quality: 'simulated',
    updatedAt: now,
    writable: false,
    dpt: 'DPT 1.001'
  },
  {
    id: 'knx-act-401',
    name: 'Server Room Air Handling Unit',
    area: 'Technical Area',
    kind: 'fan',
    state: 'on',
    level: 100,
    quality: 'simulated',
    updatedAt: now,
    writable: false,
    dpt: 'DPT 1.001'
  }
]

export const initialTrend: TrendPoint[] = [
  { time: '08:00', temperature: 22.1, humidity: 55, power: 8.4 },
  { time: '09:00', temperature: 22.8, humidity: 54, power: 12.1 },
  { time: '10:00', temperature: 23.4, humidity: 53, power: 14.6 },
  { time: '11:00', temperature: 23.9, humidity: 51, power: 16.2 },
  { time: '12:00', temperature: 24.3, humidity: 49, power: 17.5 },
  { time: '13:00', temperature: 24.5, humidity: 48, power: 16.9 },
  { time: '14:00', temperature: 24.1, humidity: 50, power: 15.8 },
  { time: '15:00', temperature: 23.7, humidity: 52, power: 15.2 },
  { time: '16:00', temperature: 23.5, humidity: 53, power: 14.8 },
  { time: '17:00', temperature: 23.0, humidity: 54, power: 11.3 },
  { time: '18:00', temperature: 22.6, humidity: 56, power: 9.5 },
  { time: '19:00', temperature: 22.3, humidity: 57, power: 7.2 }
]
