import React, { useState } from 'react'
import {
  Copy,
  Check,
  Search,
  Filter,
  Activity,
  Sliders
} from 'lucide-react'
import type { SensorPoint, ActuatorPoint } from '../types'

interface LivePointsTableProps {
  sensors: SensorPoint[]
  actuators: ActuatorPoint[]
  selectedArea: string
}

export const LivePointsTable: React.FC<LivePointsTableProps> = ({
  sensors,
  actuators,
  selectedArea
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'sensor' | 'actuator'>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Merge points into unified matrix
  const allPoints = [
    ...sensors.map((s) => ({
      id: s.id,
      name: s.name,
      area: s.area,
      category: 'Sensor' as const,
      kind: s.kind,
      dpt: s.dpt || 'DPT 9.xxx',
      displayValue: s.value !== null ? `${s.value} ${s.unit}` : '— (Unconfigured)',
      rawState: s.value !== null ? 'active' : 'unconfigured',
      quality: s.quality,
      updatedAt: s.updatedAt
    })),
    ...actuators.map((a) => ({
      id: a.id,
      name: a.name,
      area: a.area,
      category: 'Actuator' as const,
      kind: a.kind,
      dpt: a.dpt || 'DPT 1.xxx',
      displayValue: a.state === 'on'
        ? (a.level !== undefined ? `ON (${a.level}%)` : (a.targetTemp ? `ON (${a.targetTemp}°C)` : 'ON'))
        : 'OFF / STANDBY',
      rawState: a.state,
      quality: a.quality,
      updatedAt: a.updatedAt
    }))
  ]

  // Filter logic
  const filteredPoints = allPoints.filter((pt) => {
    const matchesArea = selectedArea === 'All Areas' || pt.area === selectedArea
    const matchesType = typeFilter === 'all' || pt.category.toLowerCase() === typeFilter
    const matchesSearch =
      searchTerm.trim() === '' ||
      pt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pt.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pt.dpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesArea && matchesType && matchesSearch
  })

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  return (
    <div className="table-panel">
      <div className="table-header-row">
        <div>
          <h3 className="table-title">Unified KNX Point Directory</h3>
          <p className="table-subtitle">
            Showing {filteredPoints.length} configured telemetry and actuator registers
          </p>
        </div>

        <div className="table-actions-row">
          <div className="table-search-box">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Filter by name, ID or DPT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="table-search-input"
            />
          </div>

          <div className="type-filter-group">
            <Filter size={13} className="filter-icon" />
            <button
              type="button"
              className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setTypeFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`filter-btn ${typeFilter === 'sensor' ? 'active' : ''}`}
              onClick={() => setTypeFilter('sensor')}
            >
              Sensors
            </button>
            <button
              type="button"
              className={`filter-btn ${typeFilter === 'actuator' ? 'active' : ''}`}
              onClick={() => setTypeFilter('actuator')}
            >
              Actuators
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive-wrap">
        <table className="knx-matrix-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Point Identifier</th>
              <th>Point Name</th>
              <th>Area</th>
              <th>Category</th>
              <th>KNX DPT</th>
              <th>Current Reading / State</th>
              <th>Signal Quality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPoints.length === 0 ? (
              <tr>
                <td colSpan={9} className="table-empty">
                  No points matching the active filter criteria.
                </td>
              </tr>
            ) : (
              filteredPoints.map((pt) => (
                <tr key={pt.id} className="table-row">
                  <td>
                    <span
                      className={`status-indicator-dot ${
                        pt.rawState === 'active' || pt.rawState === 'on'
                          ? 'active'
                          : pt.rawState === 'unconfigured'
                            ? 'unconfigured'
                            : 'idle'
                      }`}
                    />
                  </td>
                  <td>
                    <code className="point-id-code">{pt.id}</code>
                  </td>
                  <td className="point-name-cell">
                    <b>{pt.name}</b>
                  </td>
                  <td>
                    <span className="point-area-badge">{pt.area}</span>
                  </td>
                  <td>
                    <span className="point-category-badge">
                      {pt.category === 'Sensor' ? (
                        <Activity size={12} className="cat-icon sensor" />
                      ) : (
                        <Sliders size={12} className="cat-icon actuator" />
                      )}
                      {pt.category}
                    </span>
                  </td>
                  <td>
                    <span className="dpt-chip">{pt.dpt}</span>
                  </td>
                  <td>
                    <span className="point-value-display">{pt.displayValue}</span>
                  </td>
                  <td>
                    <span className={`quality-badge ${pt.quality}`}>
                      {pt.quality.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="copy-id-btn"
                      onClick={() => handleCopy(pt.id)}
                      title="Copy point ID"
                      aria-label={`Copy point ID ${pt.id}`}
                    >
                      {copiedId === pt.id ? (
                        <Check size={13} className="copied-icon" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
