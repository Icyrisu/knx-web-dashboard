# KNX Dashboard Starter

Configurable KNX building dashboard with React + TypeScript, Node-RED, PostgreSQL, and Docker Compose.

## Current status
- Dashboard UI uses clearly labeled mock data.
- Generic area, sensor, and actuator models are in place.
- Dark/light theme toggle is implemented.
- Actuator actions are simulated only. Real Modbus writes remain locked until verified register mapping and safety checks are supplied.
- PostgreSQL service is included for persistent history; persistence flow/API wiring is the next integration step.
- Node-RED is included as an integration service.

## Start
Requirements: Docker Desktop with Compose.

```bash
docker compose up --build
```

Open:
- Dashboard: http://localhost:8080
- Node-RED: http://localhost:1880 (secure this before exposing outside a trusted LAN)
- PostgreSQL: localhost:5432 (development only; do not expose publicly in production)

Copy `.env.example` to `.env` and adjust values if needed.

## Important
The Modbus gateway is configured as `192.168.100.246:502`, Unit ID `1`, but the register map is not known. The starter deliberately does not poll invented register addresses. UI data is marked `SIMULASI`.

See `docs/` for requirements, architecture, data model, safety, and roadmap.
