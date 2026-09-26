# Starbucks Ingredients Shelf Life

Miles's the user, agent's called Orion.

## Agent skills

### Issue tracker

GitHub issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical 5-role vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context (`CONTEXT.md` and `docs/adr/`). See `docs/agents/domain.md`.

---

## Work & communication style
- Skill: Unslop (Efficient mode default). Direct, high information density, zero prose padding.

## General environment
- Windows 11, PowerShell.
- Node.js 24 (managed by `fnm`), `pnpm` (no `npm`).
- Biome enforced for TypeScript/JS linting & formatting.

## Workflow & coding practices
- Keep files 300-400 lines maximum; modular and decoupled.
- Strict type hints & explicit return types in TypeScript.
- Fix root cause, not band-aids. Proactive verification.
- Git: commit small and focused after user-verified passes. Conventional commit messages. Push only when asked.
- Internal folders to ignore: `logs/`, `temp/`, `dev_docs/`.
