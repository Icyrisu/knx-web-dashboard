# Data model

## Snapshot contract example (mock illustration)
```json
{
  "type": "dashboard.snapshot",
  "timestamp": "2026-10-20T04:00:00.000Z",
  "source": "mock",
  "modbus": {
    "status": "unknown",
    "host": "192.168.100.246",
    "port": 502,
    "unitId": 1,
    "lastSuccessAt": null,
    "lastError": null
  },
  "sensors": [
    {
      "id": "temp-lobby",
      "name": "Lobby Temperature",
      "area": "1F",
      "kind": "temperature",
      "value": 24.6,
      "unit": "°C",
      "quality": "simulated",
      "updatedAt": "2026-10-20T04:00:00.000Z"
    }
  ],
  "actuators": [
    {
      "id": "light-lobby",
      "name": "Lobby Lighting",
      "area": "1F",
      "kind": "light",
      "state": "on",
      "quality": "simulated",
      "updatedAt": "2026-10-20T04:00:00.000Z",
      "writable": false
    }
  ]
}
```

## Register mapping template
For every point record, document: ID, display name, area, point kind, Modbus table, function code, exact address/offset convention, register count, data type, signedness, word/byte order, scale/offset, engineering unit, valid range, access mode, polling interval, and verification note.

Do not infer any of these from the UI. The gateway's official register mapping is required.

## PostgreSQL
`point_configuration` stores named points and optional mapping JSON. `point_history` stores timestamped numeric/text values and quality. Add retention/partitioning when data volume is known.

## Quality
`good`, `stale`, `error`, `unconfigured`, `simulated`.
No reading should be represented as numeric zero merely because it is absent.
