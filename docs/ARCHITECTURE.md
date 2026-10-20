# Architecture

```text
KNX devices
   ↕
KNX–Modbus TCP gateway (192.168.100.246:502, Unit ID 1)
   ↕ Modbus TCP (server-side only)
Node-RED ───── PostgreSQL
   │             ├─ point_configuration
   │             └─ point_history
   └─ WebSocket / REST
          ↕
React + TypeScript dashboard
```

## Responsibilities
- React: visualization, area filters, theme, client-side freshness, charting.
- Node-RED: polling, decoding, scaling, quality flags, writes (later), WebSocket/API.
- PostgreSQL: point configuration and persistent history.
- Docker Compose: service orchestration and persistent volumes.

## Safety boundary
No real write command is available in the starter. The UI's switches only mutate local mock state. When real control is added, React should request a named point command from Node-RED; it must not send raw register addresses from the browser. Node-RED must validate the point's approved writable mapping, range, state, and authorization.

## Data flow
1. Node-RED polls only verified mappings.
2. It decodes raw registers using documented type/scale/order.
3. It emits normalized snapshot JSON to WebSocket clients.
4. Valid samples are stored in PostgreSQL.
5. React updates cards and charts and flags stale data.
6. History charts query a bounded time range through a server-side API.

## Network
The Docker host must route to the gateway LAN. Verify connectivity from the host/container and firewall rules. Do not expose Node-RED or PostgreSQL to the public internet without authentication, TLS, and network restrictions.
