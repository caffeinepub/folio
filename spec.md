# Folio

## Current State
Portfolio app with PIN-protected editing, ICP blockchain backend, and public view. Data is stored in a Motoko backend variable that gets reset on every canister upgrade, causing all saved data to be lost when new versions are deployed. Save failures occur when the actor is not ready or the backend returns false.

## Requested Changes (Diff)

### Add
- Retry logic in saveToBackend: auto-retry once if first attempt fails, with a delay
- Actor readiness check before attempting saves

### Modify
- `main.mo`: Change `var portfolioJSON` to `stable var portfolioJSON` so data survives canister upgrades; initialize to empty string instead of placeholder
- `usePortfolio.ts`: Improve saveToBackend with retry and better error handling; ensure actor is fully ready before saving

### Remove
- Placeholder initial value `{"hero": "Lancelot"}` that causes validation failure and fallback to sample data

## Implementation Plan
1. Fix `main.mo`: `stable var portfolioJSON = ""` -- preserves data across upgrades
2. Fix `usePortfolio.ts`: improve saveToBackend with retry logic
