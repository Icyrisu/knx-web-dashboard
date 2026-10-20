import React from 'react'
import {
  Layers,
  LayoutDashboard,
  TableProperties,
  LineChart,
  Cpu,
  Moon,
  Sun,
  Radio,
  Search,
  Building
} from 'lucide-react'
import type { GatewayInfo } from '../types'

interface HeaderProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  activeTab: string
  onChangeTab: (tab: string) => void
  areas: string[]
  selectedArea: string
  onChangeArea: (area: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  gateway: GatewayInfo
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  activeTab,
  onChangeTab,
  areas,
  selectedArea,
  onChangeArea,
  searchQuery,
  onSearchChange,
  gateway
}) => {
  const tabs = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'Live points', label: 'Live Points', icon: TableProperties },
    { id: 'History', label: 'Telemetry Trends', icon: LineChart },
    { id: 'Configuration', label: 'Gateway & Config', icon: Cpu }
  ]

  return (
    <header className="knx-header">
      {/* Top Utility Bar */}
      <div className="knx-header-top">
        <div className="brand-group">
          <div className="brand-badge">
            <Layers className="brand-icon" size={20} />
          </div>
          <div className="brand-titles">
            <div className="brand-main">
              <span className="brand-logo-text">KNX</span>
              <span className="brand-divider">/</span>
              <span className="brand-sub">BUILDING OS</span>
            </div>
            <div className="brand-gateway-status">
              <span className={`status-pulse ${gateway.status}`} />
              <span className="gateway-address">
                GW {gateway.host}:{gateway.port} (Unit {gateway.unitId})
              </span>
              <span className="gateway-mode-tag">PHASE 1 SIMULATOR</span>
            </div>
          </div>
        </div>

        {/* Global Controls & Search */}
        <div className="header-actions">
          <div className="search-box">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Search points, areas, DPT..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="pill-simulation">
            <Radio size={12} className="pulse-icon" />
            <span>MOCK ENGINE</span>
          </div>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Main Navigation & Area Filter Bar */}
      <div className="knx-header-nav">
        {/* Navigation Tabs */}
        <nav className="nav-tabs" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => onChangeTab(tab.id)}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Area Pills */}
        <div className="area-filters-container">
          <div className="area-filter-label">
            <Building size={13} />
            <span>Area:</span>
          </div>
          <div className="area-pills">
            {areas.map((areaName) => (
              <button
                key={areaName}
                type="button"
                className={`area-pill ${selectedArea === areaName ? 'active' : ''}`}
                onClick={() => onChangeArea(areaName)}
              >
                {areaName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
