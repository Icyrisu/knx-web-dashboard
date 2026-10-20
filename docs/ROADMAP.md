# Roadmap

## Phase 1 — dashboard starter
- [x] React + TypeScript + Vite.
- [x] Dark/light theme toggle.
- [x] Generic sensor and actuator cards.
- [x] Area filtering.
- [x] Mock chart and explicit simulation labels.
- [x] Docker Compose services and PostgreSQL schema.

## Phase 2 — data transport and persistence
- [ ] Node-RED WebSocket snapshot flow.
- [ ] React WebSocket provider, reconnect, payload validation.
- [ ] Node-RED Postgres connection and insert flow.
- [ ] History API with bounded time range and chart integration.

## Phase 3 — Modbus live data
- [ ] Obtain official IN701-KNX register mapping.
- [ ] Verify table/function code/address/data type/scale/order.
- [ ] Implement polling and readback tests.
- [ ] Add stale/offline and reconnect handling.
- [ ] Compare readings against known values.

## Phase 4 — actuator control
- [ ] Verify writable mappings and access behavior.
- [ ] Implement server-side command allowlist and range checks.
- [ ] Require authentication/authorization for writes.
- [ ] Add confirmation and command audit history.
- [ ] Test timeout, failed write, reconnect, and safe-state scenarios.
