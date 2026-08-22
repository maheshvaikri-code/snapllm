# Path resolution loop — 2026-08-22

## Root causes addressed

- A shared Docker config could retain a native Windows models path. On restart,
  that stale value could mask the `/models` mount. Deployment environment paths
  are now authoritative on every startup.
- Relative workspace/models settings depended on the daemon working directory.
  Startup now normalizes configured paths to absolute, lexically-normal paths.
- The Models page polled configuration every five seconds and overwrote a path
  being edited or selected. Dirty user paths now remain visible until replaced
  by an intentional configuration refresh.
- Browser scans swallowed daemon 400/404 path errors and displayed an empty
  folder. Those errors now surface to the page so the user sees the actual
  inaccessible path.

## Validation

`desktop-app/src/lib/api.test.ts` includes a regression test proving a daemon
path error is rejected rather than converted to an empty model list.
