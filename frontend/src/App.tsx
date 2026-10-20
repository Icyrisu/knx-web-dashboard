import { useState, useMemo } from 'react'
import { Header } from './components/Header'
import { KpiBar } from './components/KpiBar'
import { SensorCard } from './components/SensorCard'
import { ActuatorCard } from './components/ActuatorCard'
import { TrendChart } from './components/TrendChart'
import { LivePointsTable } from './components/LivePointsTable'
import { GatewayConfig } from './components/GatewayConfig'
import {
  areas,
  initialSensors,
  initialActuators,
  initialTrend,
  defaultGatewayInfo
} from './mockData'
import type { ActuatorPoint, SensorPoint } from './types'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeTab, setActiveTab] = useState<string>('Overview')
  const [selectedArea, setSelectedArea] = useState<string>('All Areas')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const [sensors] = useState<SensorPoint[]>(initialSensors)
  const [actuators, setActuators] = useState<ActuatorPoint[]>(initialActuators)
  const [gateway, setGateway] = useState(defaultGatewayInfo)

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // Actuator interaction handlers (Phase 1 Simulated)
  const handleToggleActuator = (target: ActuatorPoint) => {
    setActuators((current) =>
      current.map((pt) => {
        if (pt.id !== target.id) return pt
        const nextState = pt.state === 'on' ? 'off' : 'on'
        return {
          ...pt,
          state: nextState,
          updatedAt: new Date().toISOString(),
          quality: 'simulated'
        }
      })
    )
  }

  const handleUpdateLevel = (target: ActuatorPoint, newLevel: number) => {
    setActuators((current) =>
      current.map((pt) => {
        if (pt.id !== target.id) return pt
        return {
          ...pt,
          level: newLevel,
          state: newLevel > 0 ? 'on' : 'off',
          updatedAt: new Date().toISOString()
        }
      })
    )
  }

  const handleUpdateTemp = (target: ActuatorPoint, delta: number) => {
    setActuators((current) =>
      current.map((pt) => {
        if (pt.id !== target.id) return pt
        const currentTemp = pt.targetTemp ?? 22.0
        const nextTemp = Math.round((currentTemp + delta) * 10) / 10
        return {
          ...pt,
          targetTemp: Math.max(16, Math.min(30, nextTemp)),
          updatedAt: new Date().toISOString()
        }
      })
    )
  }

  const handleSimulatePing = () => {
    setGateway((prev) => ({
      ...prev,
      lastPollAt: new Date().toISOString(),
      status: 'simulated'
    }))
  }

  // Filtering points based on Area and Search
  const visibleSensors = useMemo(() => {
    return sensors.filter((s) => {
      const matchesArea = selectedArea === 'All Areas' || s.area === selectedArea
      const matchesSearch =
        searchQuery.trim() === '' ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.dpt && s.dpt.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesArea && matchesSearch
    })
  }, [sensors, selectedArea, searchQuery])

  const visibleActuators = useMemo(() => {
    return actuators.filter((a) => {
      const matchesArea = selectedArea === 'All Areas' || a.area === selectedArea
      const matchesSearch =
        searchQuery.trim() === '' ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.dpt && a.dpt.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesArea && matchesSearch
    })
  }, [actuators, selectedArea, searchQuery])

  return (
    <div className={`app ${theme}`}>
      {/* Central Modern Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        areas={areas}
        selectedArea={selectedArea}
        onChangeArea={setSelectedArea}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        gateway={gateway}
      />

      {/* Main Content Area */}
      <main className="knx-main-content">
        {activeTab === 'Overview' && (
          <>
            {/* Top Level Metric Cards */}
            <KpiBar
              sensors={sensors}
              actuators={actuators}
              gateway={gateway}
            />

            {/* Environmental Monitoring Sensors */}
            <section className="section-container">
              <div className="section-head">
                <div className="section-title-group">
                  <h2 className="section-title">Environmental & Power Telemetry</h2>
                  <span className="section-subtitle">
                    Continuous monitoring across {selectedArea}
                  </span>
                </div>
                <span className="section-counter-badge">
                  {visibleSensors.length} active points
                </span>
              </div>

              <div className="sensors-grid">
                {visibleSensors.map((point) => (
                  <SensorCard key={point.id} point={point} />
                ))}
              </div>
            </section>

            {/* Actuators & Building Subsystems */}
            <section className="section-container">
              <div className="section-head">
                <div className="section-title-group">
                  <h2 className="section-title">Actuator Subsystems & Controls</h2>
                  <span className="section-subtitle">
                    Lighting, Climate VRV, Louvers & Ventilation
                  </span>
                </div>
                <span className="section-counter-badge">
                  {visibleActuators.length} actuators
                </span>
              </div>

              <div className="actuators-grid">
                {visibleActuators.map((point) => (
                  <ActuatorCard
                    key={point.id}
                    point={point}
                    onToggle={handleToggleActuator}
                    onUpdateLevel={handleUpdateLevel}
                    onUpdateTemp={handleUpdateTemp}
                  />
                ))}
              </div>
            </section>

            {/* 12-Hour Telemetry Trends */}
            <section className="section-container">
              <TrendChart data={initialTrend} />
            </section>
          </>
        )}

        {activeTab === 'Live points' && (
          <LivePointsTable
            sensors={sensors}
            actuators={actuators}
            selectedArea={selectedArea}
          />
        )}

        {activeTab === 'History' && (
          <section className="section-container">
            <TrendChart data={initialTrend} />
          </section>
        )}

        {activeTab === 'Configuration' && (
          <GatewayConfig
            gateway={gateway}
            onSimulatePing={handleSimulatePing}
            onReturnToDashboard={() => setActiveTab('Overview')}
          />
        )}
      </main>

      {/* Clean Modern Footer */}
      <footer className="knx-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span>KNX Building Automation Matrix</span>
            <span className="footer-bullet">•</span>
            <span>Architecture: React 18 + Node-RED + PostgreSQL</span>
            <span className="footer-bullet">•</span>
            <span>Target Gateway: {gateway.host}:{gateway.port} (Unit {gateway.unitId})</span>
          </div>
          <div className="footer-right">
            <span>Phase 1 Verification Complete</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
