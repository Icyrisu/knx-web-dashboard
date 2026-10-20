# Coding agent instructions

Build on the existing starter instead of replacing it wholesale.

## Confirmed requirements
- React + TypeScript dashboard.
- Configurable general dashboard and generic points.
- Dark/light theme toggle.
- Node-RED handles Modbus TCP.
- PostgreSQL persistent history.
- Docker Compose deployment.
- Gateway `192.168.100.246:502`, Unit ID `1`.
- Register map not available.

## Rules
1. Never invent register addresses, function codes, scaling, or write permissions.
2. Never connect browser React directly to Modbus TCP.
3. Keep mock values visibly labeled.
4. Actuator switches only simulate state locally until the full write path is approved.
5. Separate UI components from data provider and Modbus mapping.
6. Do not display absent values as zero.
7. Preserve responsive layout and theme toggle.
8. Add no production credentials to source control.
9. Secure Node-RED and PostgreSQL before any public exposure.
10. Before claiming integration complete, test Docker build and real WebSocket/DB paths.

## Next work
Implement Node-RED WebSocket mock snapshot first; then PostgreSQL history flow/API; only then add Modbus polling after official register map arrives.
