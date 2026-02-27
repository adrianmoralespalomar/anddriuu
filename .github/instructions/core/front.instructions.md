---
description: Reglas esenciales para desarrollo frontend en Angular. Para detalles consultar skills y referencias.
applyTo: src/**
---

# ANGULAR FRONTEND - REGLAS ESENCIALES

## 📚 REFERENCIAS

### Instrucciones del Proyecto

- [`anddriuu-front.instructions.md`](../project/anddriuu-front.instructions.md) - Estructura, librerías y particularidades del proyecto
- [`testing.instructions.md`](testing.instructions.md) - Testing frontend con Jest/Spectator
- [`styles.instructions.md`](styles.instructions.md) - Estilos SCSS/CSS (rem, BEM, RTL, variables)
- [`modules/`](../project/modules/) - Instrucciones específicas por módulo

### Skills Disponibles

- **`angular-component`** - Crear componentes standalone modernos
- **`angular-forms`** - Formularios con Signal Forms API
- **`angular-http`** - HTTP con resource() y signals
- **`angular-routing`** - Routing y navegación
- **`angular-signals`** - Estado reactivo con signals
- **`angular-dry-principle`** - Eliminar duplicación de código
- **`angular-clean-code`** - Early returns, guard clauses, código limpio
- **`angular-refactoring`** - Identificar code smells y refactorizar
- **`angular-naming-conventions`** - Convenciones de nombres
- **`angular-code-organization`** - Modificadores de acceso y orden de métodos
- **`frontend-design`** - UI/UX de alta calidad
- **`select-ui-component`** - Reutilizar componentes existentes

---

## ⚠️ REGLAS CRÍTICAS

**Estas reglas son OBLIGATORIAS. No realizar cambios sin cumplirlas.**

### 🚫 PROHIBICIONES

1. ❌ **NUNCA hardcodear colores** → Usar `var(--color-*)` ([styles.instructions.md](styles.instructions.md))
2. ❌ **NUNCA crear controles nativos** → Usar componentes de `projects/components/src/lib` (OipButton, OipTextarea, etc.)
3. ❌ **NUNCA usar `any`** → Tipos específicos o crear interfaces
4. ❌ **NUNCA usar @Input/@Output** → `input()`, `output()` (skill: `angular-component`)
5. ❌ **NUNCA usar \*ngIf/\*ngFor** → `@if`, `@for`, `@switch` (skill: `angular-clean-code`)
6. ❌ **NUNCA acceder a window/document directamente** → Usar `isPlatformBrowser()`
7. ❌ **NUNCA olvidar `OnPush`** → `ChangeDetectionStrategy.OnPush`
8. ❌ **NUNCA crear componentes no-standalone** → Solo standalone
9. ❌ **NUNCA crear módulos** → Solo componentes standalone
10. ❌ **NUNCA olvidar estilos RTL** → Propiedades direccionales ([styles.instructions.md](styles.instructions.md))
11. ❌ **NUNCA usar strings mágicos** → Constantes (skill: `angular-refactoring`)

### ✅ OBLIGACIONES

1. ✅ **Componentes Standalone** siempre
2. ✅ **Signals** (`signal()`, `computed()`, `effect()`) (skill: `angular-signals`)
3. ✅ **Signal Inputs/Outputs** (`input()`, `output()`) (skill: `angular-component`)
4. ✅ **Control Flow moderno** (`@if`, `@for`, `@switch`)
5. ✅ **OnPush Change Detection** en todos los componentes
6. ✅ **`inject()`** en lugar de constructor
7. ✅ **Transformar ApiModel** (usar `.service`, nunca `.api.service` directamente)
8. ✅ **Nombres descriptivos** (skill: `angular-naming-conventions`)
9. ✅ **Inglés preferido**, español solo para términos de dominio
10. ✅ **Interfaces para objetos complejos** (no `any` ni `{ [key: string]: any }`)

---

## 🔖 CONVENCIONES DE NOMBRADO

**Para detalles completos y ejemplos, consultar skill: `angular-naming-conventions`**

### Resumen Rápido

| Elemento                      | Formato                       | Ejemplo                             |
| ----------------------------- | ----------------------------- | ----------------------------------- |
| Archivos                      | kebab-case + sufijo           | `user-list.component.ts`            |
| Clases (Componentes)          | PascalCase sin sufijo         | `UserList`                          |
| Clases (Servicios/Directivas) | PascalCase con sufijo         | `UserService`, `HighlightDirective` |
| Métodos/Propiedades           | camelCase                     | `getUserList()`, `isLoading`        |
| Constantes                    | UPPER_SNAKE_CASE              | `MAX_USER_COUNT`                    |
| Selectores                    | Prefijo + kebab-case          | `mvda-user-list`                    |
| Booleanos                     | is/has/can/should + camelCase | `isLoading`, `canEdit`              |

### Estructura de Carpetas en Shared

**REGLA CRÍTICA:** En `src/app/shared/`, cada utility/directive/service debe tener su propia carpeta.

❌ **MAL:**

```
shared/utils/
  ├── typed-key.util.ts     ❌ Suelto
  └── format-date.util.ts   ❌ Suelto
```

✅ **BIEN:**

```
shared/utils/
  ├── typed-key/
  │   └── typed-key.util.ts  ✅ En carpeta propia
  └── format-date/
      └── format-date.util.ts  ✅ En carpeta propia
```

**Beneficios:** Organización, espacio para tests, documentación y mejor mantenibilidad.

---

## 🔐 ORGANIZACIÓN DE CÓDIGO

**Para detalles completos y ejemplos, consultar skill: `angular-code-organization`**

### Modificadores de Acceso - Resumen

**REGLA CRÍTICA:** Modificadores se aplican diferente a propiedades y métodos.

#### Propiedades (signals, services, FormControls, computed)

- `private` → Usadas solo internamente
- `protected` → Usadas en el template HTML
- Sin modificador → API pública (muy raro)

#### Métodos

- Sin modificador → Métodos públicos
- `private` → Métodos internos
- ❌ **NUNCA usar `protected` en métodos**

### Orden de Código - Resumen

1. Inyecciones de dependencias
2. Propiedades y signals (incluye computed)
3. Constructor y lifecycle hooks
4. Métodos públicos (orden de flujo)
5. Métodos privados (orden de ejecución)

**Ver skill `angular-code-organization` para ejemplos completos.**

---

## 🎯 MEJORES PRÁCTICAS

**Para detalles completos y ejemplos, consultar skills:**

- **`angular-dry-principle`** - Eliminar duplicación de código
- **`angular-clean-code`** - Early returns y código limpio
- **`angular-refactoring`** - Refactorizar código complejo

### Principios Clave

1. **DRY (Don't Repeat Yourself)** - Si 2+ líneas son idénticas, crear función helper
2. **Early Returns** - Usar guard clauses en lugar de anidaciones profundas
3. **One-Line Statements** - Sin llaves para operaciones simples (`if (!data) return;`)
4. **Nombres Descriptivos** - Preferir nombres largos y claros sobre comentarios
5. **Evitar Magic Strings** - Usar constantes en lugar de strings/números hardcodeados
6. **Control Flow Moderno** - `@if`, `@for`, `@switch` en lugar de `*ngIf`, `*ngFor`

### Ejemplo Rápido: DRY

❌ **MAL:**

```typescript
if (error) this.router.navigate(["/home"]);
if (success) this.router.navigate(["/home"]);
```

✅ **BIEN:**

```typescript
if (error) this.returnToHome();
if (success) this.returnToHome();

private returnToHome(): void {
  this.router.navigate(['/home']);
}
```

**Ver skills `angular-dry-principle`, `angular-clean-code` y `angular-refactoring` para más ejemplos.**

---

## 🎨 ESTILOS

**Para reglas completas, consultar [`styles.instructions.md`](styles.instructions.md)**

### Resumen

- ✅ SCSS siempre
- ✅ Metodología BEM: `bloque__elemento--modificador`
- ✅ Variables CSS: `var(--color-*)`, nunca hardcodear
- ✅ Propiedades direccionales RTL: `margin-inline-start`, `padding-inline-end`
- ✅ Encapsulación Angular (ViewEncapsulation)
- ❌ NO usar IDs para estilos
- ❌ NO usar `!important` (salvo excepciones justificadas)
- ❌ NO anidar más de 2 niveles

### Ejemplo

```scss
.user-card {
  background: var(--color-surface);
  padding-inline: var(--spacing-md);

  &__avatar {
    border-radius: 50%;
  }

  &--highlighted {
    border: 2px solid var(--color-accent);
  }
}
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de commit, verificar:

- [ ] Componente standalone con OnPush
- [ ] Usa signals (`signal()`, `computed()`, `effect()`)
- [ ] Inputs/Outputs con `input()`, `output()`
- [ ] Control flow moderno (`@if`, `@for`, `@switch`)
- [ ] Modificadores de acceso correctos (properties: `private`/`protected`, methods: sin `protected`)
- [ ] Métodos ordenados por flujo de ejecución
- [ ] Sin código duplicado (DRY)
- [ ] Sin `any`, con interfaces cuando sea necesario
- [ ] Sin strings mágicos, usar constantes
- [ ] Estilos con variables CSS, sin hardcodear colores
- [ ] Propiedades RTL donde aplique
- [ ] Nombres descriptivos en inglés (skill: `angular-naming-conventions`)
- [ ] Early returns en lugar de anidaciones profundas
