import React, { useState } from 'react'
import {
  Network,
  ShieldCheck,
  AlertTriangle,
  Database,
  ArrowRight,
  Server,
  RefreshCw,
  FileCode2
} from 'lucide-react'
import type { GatewayInfo } from '../types'

interface GatewayConfigProps {
  gateway: GatewayInfo
  onSimulatePing: () => void
  onReturnToDashboard: () => void
}

export const GatewayConfig: React.FC<GatewayConfigProps> = ({
  gateway,
  onSimulatePing,
  onReturnToDashboard
}) => {
  const [pinging, setPinging] = useState(false)
  const [pingSuccess, setPingSuccess] = useState<boolean | null>(null)

  const handleTestPing = () => {
    setPinging(true)
    setPingSuccess(null)
    setTimeout(() => {
      setPinging(false)
      setPingSuccess(true)
      onSimulatePing()
    }, 900)
  }

  return (
    <div className="config-view-container">
      {/* Top Banner Notice */}
      <div className="banner-notice">
        <div className="banner-icon-wrap">
          <AlertTriangle size={18} />
        </div>
        <div className="banner-text">
          <b>Phase 1 Architectural Scope Notice</b>
          <p>
            Modbus TCP gateway polling and physical actuator write commands are strictly locked in Phase 1
            until the official <code>IN701-KNX</code> register mapping specification (Function codes,
            register offsets, byte order, and scaling factors) is validated.
          </p>
        </div>
      </div>

      <div className="config-layout-grid">
        {/* Left Column: Gateway Connection Details */}
        <div className="config-card">
          <div className="config-card-header">
            <div className="card-header-icon">
              <Network size={16} />
            </div>
            <div>
              <h4 className="config-card-title">Modbus TCP Gateway Interface</h4>
              <p className="config-card-desc">Hardware bridge to physical KNX twisted-pair bus</p>
            </div>
          </div>

          <div className="parameter-grid">
            <div className="param-item">
              <span className="param-label">Gateway Host IP</span>
              <code className="param-val">{gateway.host}</code>
            </div>
            <div className="param-item">
              <span className="param-label">TCP Service Port</span>
              <code className="param-val">{gateway.port}</code>
            </div>
            <div className="param-item">
              <span className="param-label">Modbus Unit ID</span>
              <code className="param-val">{gateway.unitId}</code>
            </div>
            <div className="param-item">
              <span className="param-label">Polling Interval</span>
              <span className="param-val">{gateway.pollIntervalMs} ms</span>
            </div>
            <div className="param-item">
              <span className="param-label">Response Timeout</span>
              <span className="param-val">{gateway.timeoutMs} ms</span>
            </div>
            <div className="param-item">
              <span className="param-label">Register Map State</span>
              <span className="param-badge pending">Awaiting Verification</span>
            </div>
          </div>

          <div className="config-card-actions">
            <button
              type="button"
              className="action-btn primary"
              onClick={handleTestPing}
              disabled={pinging}
            >
              <RefreshCw size={14} className={pinging ? 'spin-icon' : ''} />
              <span>{pinging ? 'Querying Socket...' : 'Test Gateway Connectivity'}</span>
            </button>
            {pingSuccess && (
              <span className="ping-result-badge success">
                <ShieldCheck size={13} />
                <span>Simulated TCP Handshake OK (2.8ms)</span>
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Database & Node-RED Architecture */}
        <div className="config-card">
          <div className="config-card-header">
            <div className="card-header-icon">
              <Database size={16} />
            </div>
            <div>
              <h4 className="config-card-title">PostgreSQL Persistence Topology</h4>
              <p className="config-card-desc">Time-series telemetry storage configured in Docker</p>
            </div>
          </div>

          <div className="db-tables-list">
            <div className="db-table-item">
              <div className="table-item-top">
                <FileCode2 size={15} />
                <code>point_history</code>
                <span className="badge-type">Timescale / History</span>
              </div>
              <p className="table-item-desc">
                Stores immutable timestamped samples (<code>numeric_value</code>, <code>text_value</code>, <code>quality</code>, <code>recorded_at</code>) with composite B-Tree indexes.
              </p>
            </div>

            <div className="db-table-item">
              <div className="table-item-top">
                <Server size={15} />
                <code>point_configuration</code>
                <span className="badge-type">Metadata</span>
              </div>
              <p className="table-item-desc">
                Houses point registry, assigned areas, scaling formulas, and optional Modbus register mapping JSONB.
              </p>
            </div>
          </div>

          <div className="config-card-actions">
            <button
              type="button"
              className="action-btn secondary"
              onClick={onReturnToDashboard}
            >
              <span>Return to Live Matrix</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
