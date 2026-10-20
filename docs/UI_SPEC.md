# UI Specification

- Industrial dashboard with dark navy default and a user-toggleable light theme.
- Sidebar navigation: Dashboard, Live points, History, Configuration.
- Area selector starts with placeholder values and must be configurable later.
- Summary cards: active sensor count, actuator count, gateway status, data quality.
- Sensor cards: label, value, unit, point area, quality badge, updated time.
- Actuator list: state, point name, area, type. Demo toggle only in mock mode.
- Trend chart uses mock samples in the starter; live history will use PostgreSQL via Node-RED API.
- Configuration view explains gateway endpoint and missing register map.
- Every mock value has a visible simulation indicator.
- Real control remains disabled until point mapping, write permission, and safety review are complete.
- Responsive: four-column summary and point grid on wide screens, two columns on tablet, one column on narrow phones.
