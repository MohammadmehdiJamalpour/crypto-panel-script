# Crypto Script Panel

A front-end control panel UI for a crypto mining operation. It simulates monitoring racks, power usage, security, and withdrawals with mocked data and actions.

## What it is for
- A dashboard-style panel to visualize mining status, power usage, and rack health.
- A UI demo to model security controls, camera management, and withdrawal flows.
- A starting point for wiring real APIs and hardware telemetry.

## Features
- Login modal with basic validation.
- Draggable panel shell with compact layout.
- Status, power usage, yield, and overall miner health.
- Rack control: add racks, view rack status, per-miner health and repair request.
- Security: motion sensor install flow and add/remove cameras.
- Withdraw flow: choose coin and submit an address.
- Password reset modal.
- Remote access mode to restrict destructive actions.

## Tech stack
- React 19 for the component-based UI.
- Vite 7 for fast development and builds.
- Tailwind CSS for utility-first styling (see src/index.css and tailwind.config.js).
- Headless UI for accessible modal dialogs and transitions.
- Heroicons for the icon set.
- ESLint for linting.

## Getting started
### Prerequisites
- Node.js LTS and npm.

### Install
```bash
npm install
```

### Run (dev)
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Configuration and customization
- Edit mock data in src/data.js (profile, racks, coins, status, security, power usage).
- Auth and finance are mocked in src/services/auth.js and src/services/finance.js. Replace with real APIs.
- Remote access mode: set remoteAccessMode to true in src/data.js to skip login and apply restricted actions (see remoteLimitations).

## Default credentials
- Username: admin
- Password: admin123

## Project structure
- src/components: UI pieces and feature panels.
- src/layout: app shell and layout sections.
- src/services: mock service functions (swap for API calls).
- src/utils: helpers like scrolling and draggable panel behavior.

## Notes
- This project is UI-only; it does not connect to real mining hardware or blockchain APIs.

