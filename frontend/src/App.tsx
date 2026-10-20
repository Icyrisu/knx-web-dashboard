import { useMemo, useState } from 'react'
import {
  Activity, Building2, CheckCircle2, CircleHelp, Clock3, Droplets,
  History, LayoutDashboard, Lightbulb, Moon, Network, Sun, Thermometer,
  Wind, SlidersHorizontal, ShieldAlert, Menu
} from 'lucide-react'
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import { areas, initialActuators, initialSensors, initialTrend } from './mockData'
import type { ActuatorPoint, SensorPoint } from './types'

function qualityLabel(q: string) {
  return ({ simulated: 'SIMULASI', unconfigured: 'BELUM DIKONFIGURASI', good: 'LIVE', stale: 'DATA LAMA', error: 'ERROR' } as Record<string, string>)[q] ?? q.toUpperCase()
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [area, setArea] = useState('Overview')
  const [sensors] = useState(initialSensors)
  const [actuators, setActuators] = useState(initialActuators)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [showMenu, setShowMenu] = useState(false)

  const visibleSensors = useMemo(() => area === 'Overview' ? sensors : sensors.filter(p => p.area === area), [area, sensors])
  const visibleActuators = useMemo(() => area === 'Overview' ? actuators : actuators.filter(p => p.area === area), [area, actuators])

  function simulateToggle(point: ActuatorPoint) {
    // Local demo only. Real writes are intentionally not implemented.
    setActuators(current => current.map(p => p.id === point.id ? {
      ...p, state: p.state === 'on' ? 'off' : 'on', updatedAt: new Date().toISOString(), quality: 'simulated'
    } : p))
  }

  const iconFor = (point: SensorPoint) => {
    if (point.kind === 'temperature') return <Thermometer />
    if (point.kind === 'humidity') return <Droplets />
    if (point.kind === 'air-quality') return <Wind />
    return <Activity />
  }

  return (
    <div className={`app ${theme}`}>
      <aside className={`sidebar ${showMenu ? 'open' : ''}`}>
        <div className="brand"><div className="brand-mark"><Building2 size={22}/></div><div><b>KNX Monitor</b><small>BUILDING AUTOMATION</small></div></div>
        <div className="nav-label">WORKSPACE</div>
        {[
          ['Dashboard', <LayoutDashboard size={18}/>],
          ['Live points', <Network size={18}/>],
          ['History', <History size={18}/>],
          ['Configuration', <SlidersHorizontal size={18}/>]
        ].map(([label, icon]) => <button key={label as string} className={`nav-item ${activeNav === label ? 'selected' : ''}`} onClick={() => setActiveNav(label as string)}>{icon}{label}</button>)}
        <div className="sidebar-bottom"><div className="gateway-icon"><Network size={17}/><span className="status-dot"/></div><div><b>KNX Gateway</b><small>Not connected</small></div><span className="offline-pill">OFFLINE</span></div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="heading">
            <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setShowMenu(v => !v)}><Menu/></button>
            <div><div className="eyebrow">BUILDING MANAGEMENT / OVERVIEW</div><h1>{activeNav}</h1></div>
          </div>
          <div className="top-actions">
            <span className="demo-pill"><span/> SIMULATION MODE</span>
            <button className="icon-button" aria-label="Toggle theme" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</button>
            <div className="avatar">KM</div>
          </div>
        </header>

        <section className="welcome-row">
          <div><h2>Building overview</h2><p>Monitor your KNX devices, sensors, and actuators in one place.</p></div>
          <div className="updated"><Clock3 size={15}/><span>Demo data · {new Date().toLocaleTimeString()}</span></div>
        </section>

        <section className="area-row">
          <div className="area-tabs">{areas.map(a => <button key={a} onClick={() => setArea(a)} className={area === a ? 'active' : ''}>{a}</button>)}</div>
          <button className="secondary-button" onClick={() => setActiveNav('Configuration')}><SlidersHorizontal size={15}/> Configure dashboard</button>
        </section>

        {activeNav === 'Configuration' ? (
          <section className="panel config-panel">
            <div className="panel-title"><div><h3>Point configuration</h3><p>Generic points are ready to be mapped when the register list is available.</p></div><CircleHelp/></div>
            <div className="notice"><ShieldAlert size={19}/><div><b>Modbus mapping required</b><p>Real reads and actuator writes are locked until register addresses, data types, scaling, and write permissions are verified.</p></div></div>
            <div className="config-grid"><div><small>Gateway host</small><b>192.168.100.246</b></div><div><small>TCP port</small><b>502</b></div><div><small>Unit ID</small><b>1</b></div><div><small>Register map</small><b>Not configured</b></div></div>
            <button className="primary-button" onClick={() => setActiveNav('Dashboard')}>Back to dashboard</button>
          </section>
        ) : activeNav === 'History' ? (
          <section className="panel"><div className="panel-title"><div><h3>History</h3><p>Trend preview from mock data. Persistent history is planned through PostgreSQL.</p></div><History/></div><TrendChart data={initialTrend}/></section>
        ) : activeNav === 'Live points' ? (
          <section className="panel">
            <div className="panel-title">
              <div>
                <h3>All points</h3>
                <p>Generic sensor and actuator points.</p>
              </div>
              <Network />
            </div>
            <div className="point-list">
              {[
                ...visibleSensors.map(p => ({
                  id: p.id,
                  name: p.name,
                  area: p.area,
                  type: 'Sensor',
                  state: p.value === null ? 'Unconfigured' : `${p.value} ${p.unit}`,
                  quality: p.quality
                })),
                ...visibleActuators.map(p => ({
                  id: p.id,
                  name: p.name,
                  area: p.area,
                  type: 'Actuator',
                  state: p.state.toUpperCase(),
                  quality: p.quality
                }))
              ].map(p => (
                <div className="point-row" key={p.id}>
                  <span>
                    {p.name}
                    <small>{p.area} · {p.type}</small>
                  </span>
                  <b>{p.state}</b>
                  <span className="quality">{qualityLabel(p.quality)}</span>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            <section className="stats-grid">
              <div className="stat-card"><div className="stat-top"><span>Active sensors</span><span className="stat-icon blue"><Activity size={18}/></span></div><div className="stat-value">{visibleSensors.filter(s => s.value !== null).length}<small> points</small></div><div className="stat-foot">Using simulated readings</div></div>
              <div className="stat-card"><div className="stat-top"><span>Actuators</span><span className="stat-icon amber"><Lightbulb size={18}/></span></div><div className="stat-value">{visibleActuators.length}<small> points</small></div><div className="stat-foot">{visibleActuators.filter(a => a.state === 'on').length} currently shown as ON</div></div>
              <div className="stat-card"><div className="stat-top"><span>Gateway status</span><span className="stat-icon red"><Network size={18}/></span></div><div className="stat-value text-value">Offline</div><div className="stat-foot">Modbus integration not enabled</div></div>
              <div className="stat-card"><div className="stat-top"><span>Data quality</span><span className="stat-icon green"><CheckCircle2 size={18}/></span></div><div className="stat-value text-value">Demo</div><div className="stat-foot">No live device data yet</div></div>
            </section>

            <section className="section-heading"><div><h2>Environmental monitoring</h2><p>Live points will appear here after mapping is configured.</p></div><span className="section-count">{visibleSensors.length} points</span></section>
            <section className="sensor-grid">
              {visibleSensors.map(point => <div className="sensor-card" key={point.id}>
                <div className="card-heading"><div className={`sensor-icon ${point.kind}`}>{iconFor(point)}</div><span className={`quality-tag ${point.quality}`}>{qualityLabel(point.quality)}</span></div>
                <div className="sensor-name">{point.name}</div>
                <div className="sensor-reading">{point.value === null ? '—' : point.value}<small>{point.unit}</small></div>
                <div className="sensor-bottom"><span>{point.area}</span><span>{point.value === null ? 'Awaiting mapping' : 'Simulated value'}</span></div>
              </div>)}
            </section>

            <section className="lower-grid">
              <div className="panel chart-panel"><div className="panel-title"><div><h3>Environmental trends</h3><p>Illustrative data · not from the gateway</p></div><span className="chart-legend"><i/>Temperature</span></div><TrendChart data={initialTrend}/></div>
              <div className="panel"><div className="panel-title"><div><h3>Actuator status</h3><p>Controls are simulation-only at this stage.</p></div><Lightbulb/></div>
                <div className="actuator-list">{visibleActuators.map(point => <div className="actuator-row" key={point.id}><div className="actuator-symbol"><Lightbulb size={19}/></div><div className="actuator-info"><b>{point.name}</b><small>{point.area} · {point.kind.toUpperCase()}</small></div><div className="actuator-action"><button className={`toggle ${point.state === 'on' ? 'on' : ''}`} onClick={() => simulateToggle(point)} aria-label={`Simulate ${point.name} toggle`}><span/></button><small>{point.state === 'on' ? 'ON' : point.state === 'off' ? 'OFF' : 'UNKNOWN'}</small></div></div>)}
                {visibleActuators.length === 0 && <div className="empty">No actuator points configured for this area.</div>}</div>
                <div className="safety-note"><ShieldAlert size={15}/> Demo toggles change local mock state only. No real device commands are sent.</div>
              </div>
            </section>
          </>
        )}
        <footer><span>KNX BUILDING MONITOR</span><span>Gateway 192.168.100.246 · TCP 502 · Unit ID 1</span></footer>
      </main>
    </div>
  )
}

function TrendChart({ data }: { data: typeof initialTrend }) {
  return <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}><defs><linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#39b9e9" stopOpacity={0.24}/><stop offset="100%" stopColor="#39b9e9" stopOpacity={0.01}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)"/><XAxis dataKey="time" tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false}/><YAxis tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false}/><Tooltip contentStyle={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)' }}/><Area type="monotone" dataKey="temperature" name="Temperature °C" stroke="#39b9e9" strokeWidth={2.5} fill="url(#tempFill)"/></AreaChart></ResponsiveContainer></div>
}
