---
description: Rewrite the last commit message with proper format and details
name: rewrite-commit
argument-hint: type (optional: feat, fix, refactor, style, test, docs, chore)
agent: agent
---

# Rewrite Last Commit Message

Analyze the last commit and generate an improved message following Conventional Commits.

## Input

- **Type (optional)**: If specified, force that type
- Examples:
  - `reescribir commit` → Suggest best type
  - `reescribir commit fix` → Force fix type

## Process

1. **Get last commit**: Read message with `git log -1`

2. **Analyze changes**: Use `git show HEAD` to see what was modified

3. **Determine type**:
   - **If user specified**: USE IT
   - **If not**: Suggest based on changes

4. **Generate improved message**:
   - Keep essence of original
   - Improve description and details
   - Apply correct Conventional Commits format

5. **Show amend command**

## Output

**Previous commit:**

```
fix: cambios varios
```

**Improved message:**

```
refactor(beneficiarios): centralizar transformaciones en servicio

- Mover lógica de beneficiary-utils a AddPersonsService
- Añadir métodos de conversión string<>objeto
- Actualizar componentes para usar servicio centralizado

Comando:
git commit --amend -m "refactor(beneficiarios): centralizar transformaciones en servicio

- Mover lógica de beneficiary-utils a AddPersonsService
- Añadir métodos de conversión string<>objeto"
```

⚠️ **Warning**: If already pushed, will need `git push --force-with-lease`
