# Node-RED integration service

This service is included in Compose and installs:
- `node-red-contrib-modbus` for future Modbus TCP polling.
- `node-red-contrib-postgresql` for PostgreSQL integration.

The flow is intentionally not configured to read Modbus registers because the gateway register map is not yet known. Do not add guessed addresses.

Next integration tasks:
1. Add Node-RED credentials for PostgreSQL using environment variables or credential configuration.
2. Create flow for verified point mapping and Modbus read requests.
3. Normalize values into the JSON contract in `../docs/DATA_MODEL.md`.
4. Persist confirmed samples to `point_history`.
5. Broadcast snapshots through WebSocket endpoint `/ws/dashboard`.
6. Add guarded write flows only after actuator mappings and safety review.

Secure Node-RED editor with authentication before using it beyond a trusted development LAN.
