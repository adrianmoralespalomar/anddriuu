---
description: Generate commit message following Conventional Commits analyzing git changes
name: commit
argument-hint: type (optional: feat, fix, refactor, style, test, docs, chore)
agent: agent
---

# Generate Commit Message

Analyze git changes and generate a commit message following Conventional Commits format.

## Input

- **Type (optional)**: If user specifies type (feat, fix, refactor, etc.), **ALWAYS USE THAT TYPE** without questioning
- Examples:
  - `commit` → Auto-detect type
  - `commit feat` → Force feat type
  - `commit fix` → Force fix type

## Process

1. **Get changed files**: Use `get_changed_files` to retrieve all modified files (staged and unstaged)

2. **Determine commit type**:
   - **If user specified type**: **USE IT** (prevalence rule)
   - **If not specified**: Auto-detect:
     - `feat`: New files created OR new functionality added
     - `fix`: Words "error", "fix", "bug", "corregir" in diffs
     - `refactor`: Modifications without new functionality
     - `style`: Only `.scss`, `.css` changes
     - `test`: Only `.spec.ts` changes
     - `docs`: Only `.md` file changes
     - `chore`: `package.json`, config files

3. **Detect scope**: Analyze file paths
   - Common scopes: `beneficiarios`, `participantes`, `economico`, `contratacion`, `gestion-clientes`, `core`, `ui`

4. **Generate message**:

   ```
   <type>(<scope>): <clear description in Spanish>

   - Specific change 1
   - Specific change 2
   - Specific change 3
   ```

5. **Show git command** ready to copy

## Output

```
feat(beneficiarios): centralizar lógica en AddPersonsService

- Crear AddPersonsService con signal personsAddedData
- Mover transformaciones string<>objeto desde utils
- Añadir métodos loadDataIntoFormArray y syncFormArrayToSignal

Comando:
git add .
git commit -m "feat(beneficiarios): centralizar lógica en AddPersonsService

- Crear AddPersonsService con signal personsAddedData
- Mover transformaciones string<>objeto desde utils"
```

## Rules

✅ **DO**:

- Respect user's specified type ALWAYS
- Use clear, direct language in Spanish
- Group related changes
- Mention key files (max 3-4)

❌ **DON'T**:

- Question the type if user specifies it
- Include auto-formatter changes
- Mention every file if many
- Use unnecessary technical jargon
