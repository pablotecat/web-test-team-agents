# Ejemplos de Handoffs

Este directorio contiene ejemplos reales de handoffs para cada transición entre agentes.

## Archivos

- `handoff_documentation_to_planner.json` - Ejemplo: Documentation → Planner
- `handoff_planner_to_priorization.json` - Ejemplo: Planner → Priorization
- `handoff_feedback_gap_escalation.json` - Ejemplo: Planner escalate a Documentation por gaps

## Cómo Usar

1. **Para validación:** Usar como referencia para estructura correcta
2. **Para testing:** Validar ejemplos contra schema
3. **Para debugging:** Comparar tu handoff con el ejemplo más similar

## Contexto de Ejemplos

Los ejemplos usan un proyecto ficticio con las funcionalidades:
- **Auth Module:** Login, logout, session management
- **Registration Module:** Sign-up, email validation, password strength
- **User Management:** List users, update profile, delete account

Este contexto es suficientemente rico para mostrar gaps, dependencies y trade-offs realistas.
