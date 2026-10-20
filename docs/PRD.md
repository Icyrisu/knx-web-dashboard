# PRD — KNX Configurable Building Dashboard

**Version:** 0.2 · **Status:** Implementation starter

## Product summary
A configurable dashboard to monitor and eventually control KNX points exposed through a Modbus TCP gateway. The system uses React + TypeScript, Node-RED, PostgreSQL, and Docker Compose. UI development uses mock data until a verified register map is available.

## Confirmed decisions
- Generic configurable dashboard, not tied to fixed floors/rooms.
- Dark/light theme switch.
- Monitoring plus future actuator control.
- Persistent history in PostgreSQL.
- Point list is unknown; use generic point models and configurable cards.
- Gateway: `192.168.100.246:502`, Unit ID `1`.
- Register map: unknown.

## Goals
1. Build a responsive dashboard with reusable sensor/actuator cards.
2. Support configurable areas and generic points.
3. Show live/mock/offline/stale/unconfigured states clearly.
4. Persist verified point history to PostgreSQL.
5. Keep real actuator writes disabled until mapping and safety behavior are validated.

## Scope
### P0 — UI prototype
- Overview and area filtering.
- Dark/light mode.
- Sensor cards, actuator status cards, trends, connection indicator.
- Generic point model.
- Mock data clearly labeled.
- Responsive desktop/tablet/mobile layout.
- Docker Compose development deployment.

### P1 — integration
- Node-RED Modbus polling after register mapping is supplied.
- WebSocket updates to React.
- PostgreSQL history writes and read API for charts.
- Configurable polling and stale timeout.
- Gateway diagnostics and reconnect handling.

### P2 — controlled writes
- Explicit point-level writable flag and mapping.
- Confirm state after write/readback where supported.
- Audit log for commands.
- Access control and confirmation for consequential commands.
- Safe behavior for timeout, disconnect, and unknown state.

## Non-goals for current starter
- Guessing Modbus addresses.
- Real device control from mock UI.
- Production-grade authentication and authorization.
- Alarm delivery and multi-user role management.

## Acceptance criteria
- App starts using `docker compose up --build`.
- User can switch dark/light mode.
- User can filter points by configured area.
- Mock data and local simulated actuator changes are explicitly marked.
- Unconfigured values display `—`, not zero.
- React never connects directly to Modbus TCP.
- PostgreSQL schema supports point configuration and timestamped history.
- No real Modbus writes exist until mappings are verified.
