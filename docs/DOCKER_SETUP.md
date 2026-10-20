# Docker setup

Run from repository root:
```bash
cp .env.example .env
docker compose up --build
```

- Dashboard: `http://localhost:8080`
- Node-RED: `http://localhost:1880`
- PostgreSQL development port: `localhost:5432`

Change default database password in `.env`. Avoid publishing database or Node-RED ports on production hosts. Node-RED requires authentication before access on untrusted networks.

PostgreSQL initialization creates:
- `point_configuration`
- `point_history`

The UI currently uses mock data. Compose includes Node-RED and PostgreSQL, but the actual WebSocket flow, history API, and Modbus polling are intentionally pending verified register mapping and integration implementation.
