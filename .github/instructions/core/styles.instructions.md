---
description: Guía de estilos (SCSS/CSS) para el proyecto MedVida. Define convenciones, mejores prácticas y reglas obligatorias para mantener consistencia y escalabilidad.
applyTo: '**/*.scss'
---

# 🎨 Instrucciones de Estilos - MedVida

## ⚠️ REGLAS CRÍTICAS DE ESTILOS

### 🚫 PROHIBICIONES ABSOLUTAS

1. ❌ **NUNCA usar píxeles (`px`)** → Usar **`rem`** para todo
   - Excepción única: bordes de 1px (`border: 1px solid`)
   - Motivo: Escalabilidad, accesibilidad y responsive design

2. ❌ **NUNCA hardcodear colores** → `var(--color-*)` o variables SCSS
   - Usar siempre las variables definidas en `src/theme/_variables.scss`
   - Usar CSS custom properties para temas dinámicos

3. ❌ **NUNCA usar `!important`** → Resolver con especificidad correcta
   - Excepción: Sobrescribir estilos de terceros (PrimeNG) cuando no hay otra opción

4. ❌ **NUNCA usar selectores globales sin contexto** → Anidar en contenedor específico

   ```scss
   /* ❌ MAL */
   .button { ... }

   /* ✅ BIEN */
   .my-component {
     .button { ... }
   }
   ```

5. ❌ **NUNCA usar propiedades no-RTL** → Siempre direccionales
   - `margin-left` → `margin-inline-start`
   - `padding-right` → `padding-inline-end`
   - `left` → `inset-inline-start`

### ✅ OBLIGACIONES ABSOLUTAS

1. ✅ **Usar `rem` para todas las medidas**
   - Base: `1rem = 16px` (tamaño de fuente raíz del navegador)
   - Cálculo: `valor_en_px / 16 = valor_en_rem`
   - Ejemplos:
     ```scss
     font-size: 0.875rem; /* 14px */
     padding: 0.5rem 1rem; /* 8px 16px */
     margin-top: 1.5rem; /* 24px */
     border-radius: 0.25rem; /* 4px */
     ```

2. ✅ **Anidar estilos siguiendo la jerarquía HTML**

   ```scss
   .my-section {
     background: var(--surface-ground);
     padding: 1rem;

     .my-section__header {
       font-size: 1.25rem;
       margin-bottom: 0.5rem;

       .my-section__title {
         font-weight: 600;
       }
     }

     .my-section__content {
       .my-section__item {
         padding: 0.5rem;
       }
     }
   }
   ```

3. ✅ **Usar metodología BEM** (Bloque, Elemento, Modificador)

   ```scss
   .card {
     /* Bloque */
     &__header {
       /* Elemento */
       font-size: 1rem;
     }

     &__body {
       /* Elemento */
       padding: 1rem;
     }

     &--highlighted {
       /* Modificador */
       border: 0.125rem solid var(--primary-color);
     }
   }
   ```

4. ✅ **Usar variables CSS para valores reutilizables**

   ```scss
   :root {
     --spacing-xs: 0.25rem; /* 4px */
     --spacing-sm: 0.5rem; /* 8px */
     --spacing-md: 1rem; /* 16px */
     --spacing-lg: 1.5rem; /* 24px */
     --spacing-xl: 2rem; /* 32px */
   }
   ```

5. ✅ **Usar propiedades lógicas (RTL-ready)**

   ```scss
   /* ❌ MAL - No soporta RTL */
   margin-left: 1rem;
   padding-right: 0.5rem;
   text-align: left;

   /* ✅ BIEN - RTL ready */
   margin-inline-start: 1rem;
   padding-inline-end: 0.5rem;
   text-align: start;
   ```

## 📐 Conversión px → rem

### Tabla de Referencia Rápida

| Píxeles | REM       | Uso común           |
| ------- | --------- | ------------------- |
| 1px     | 0.0625rem | Bordes finos        |
| 2px     | 0.125rem  | Bordes, separadores |
| 4px     | 0.25rem   | Espaciado mínimo    |
| 8px     | 0.5rem    | Espaciado pequeño   |
| 12px    | 0.75rem   | Fuentes pequeñas    |
| 14px    | 0.875rem  | Fuente base small   |
| 16px    | 1rem      | Fuente base         |
| 18px    | 1.125rem  | Fuente mediana      |
| 20px    | 1.25rem   | Subtítulos          |
| 24px    | 1.5rem    | Títulos             |
| 32px    | 2rem      | Títulos grandes     |
| 48px    | 3rem      | Espaciado grande    |

### Cálculo Manual

```scss
// Fórmula: px_value / 16 = rem_value

// Ejemplo 1: 14px → rem
14 / 16 = 0.875rem

// Ejemplo 2: 20px → rem
20 / 16 = 1.25rem

// Ejemplo 3: 4px → rem
4 / 16 = 0.25rem
```

## 🔗 Anidación de Estilos

### Regla de Anidación Jerárquica

**SIEMPRE** anidar los estilos siguiendo la estructura del HTML:

```html
<!-- HTML -->
<section class="product-card">
  <div class="product-card__header">
    <h2 class="product-card__title">Título</h2>
  </div>
  <div class="product-card__body">
    <p class="product-card__description">Descripción</p>
  </div>
</section>
```

```scss
// SCSS - Anidación siguiendo jerarquía HTML
.product-card {
  padding: 1rem;
  border: 0.0625rem solid var(--surface-border);

  .product-card__header {
    margin-bottom: 0.5rem;

    .product-card__title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }
  }

  .product-card__body {
    .product-card__description {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
  }
}
```

### Límite de Anidación

- **Máximo 4 niveles** de anidación SCSS
- Si necesitas más, refactoriza en componentes más pequeños

```scss
/* ❌ MAL - Demasiada anidación */
.component {
  .section {
    .container {
      .wrapper {
        .item {
          .content { /* 6 niveles! */ }
        }
      }
    }
  }
}

/* ✅ BIEN - Refactorizar en componentes */
.component-section { ... }
.component-item { ... }
.component-content { ... }
```

## 🌍 Soporte RTL (Right-to-Left)

### Propiedades Lógicas Obligatorias

| ❌ No RTL           | ✅ RTL Ready           | Descripción            |
| ------------------- | ---------------------- | ---------------------- |
| `margin-left`       | `margin-inline-start`  | Margen inicio inline   |
| `margin-right`      | `margin-inline-end`    | Margen fin inline      |
| `padding-left`      | `padding-inline-start` | Padding inicio inline  |
| `padding-right`     | `padding-inline-end`   | Padding fin inline     |
| `border-left`       | `border-inline-start`  | Borde inicio inline    |
| `border-right`      | `border-inline-end`    | Borde fin inline       |
| `left`              | `inset-inline-start`   | Posición inicio inline |
| `right`             | `inset-inline-end`     | Posición fin inline    |
| `text-align: left`  | `text-align: start`    | Alineación inicio      |
| `text-align: right` | `text-align: end`      | Alineación fin         |
| `float: left`       | `float: inline-start`  | Float inicio           |
| `float: right`      | `float: inline-end`    | Float fin              |

### Propiedades Block (verticales - no afectadas por RTL)

Estas propiedades **no necesitan** cambios para RTL:

- `margin-top` / `margin-bottom`
- `padding-top` / `padding-bottom`
- `border-top` / `border-bottom`
- `top` / `bottom`

## 🎨 Variables y Colores

### Uso de Variables CSS

```scss
// ✅ BIEN - Usar variables definidas
.my-component {
  color: var(--text-primary);
  background: var(--surface-ground);
  border: 0.0625rem solid var(--surface-border);
}

// ❌ MAL - Hardcodear colores
.my-component {
  color: #333;
  background: #ffffff;
  border: 1px solid #e0e0e0;
}
```

### Variables Disponibles

Consultar `src/theme/_variables.scss` para el listado completo. Principales categorías:

- **Colores de texto:** `--text-primary`, `--text-secondary`, `--text-tertiary`
- **Colores de superficie:** `--surface-ground`, `--surface-card`, `--surface-border`
- **Colores de marca:** `--primary-color`, `--secondary-color`
- **Estados:** `--success-color`, `--error-color`, `--warning-color`, `--info-color`

## 📝 Ejemplos Completos

### Ejemplo 1: Card Component

```scss
.product-card {
  padding: 1rem;
  background: var(--surface-card);
  border: 0.0625rem solid var(--surface-border);
  border-radius: 0.5rem;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 0.0625rem solid var(--surface-border);

    .product-card__title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .product-card__badge {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      background: var(--primary-color);
      color: #fff;
      border-radius: 0.25rem;
    }
  }

  &__body {
    margin-bottom: 1rem;

    .product-card__description {
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--text-secondary);
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 0.5rem;
    border-top: 0.0625rem solid var(--surface-border);
  }

  &--highlighted {
    border-width: 0.125rem;
    border-color: var(--primary-color);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  }
}
```

### Ejemplo 2: Form Field

```scss
.form-field {
  margin-bottom: 1rem;

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  &__input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 0.0625rem solid var(--surface-border);
    border-radius: 0.25rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 0.125rem rgba(var(--primary-color-rgb), 0.2);
    }

    &:disabled {
      background: var(--surface-ground);
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__error {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: var(--error-color);
  }
}
```

## 🔍 Checklist de Revisión de Estilos

Antes de hacer commit, verifica:

- [ ] ✅ Todos los valores están en `rem` (no `px`)
- [ ] ✅ Los colores usan variables CSS (`var(--color-*)`)
- [ ] ✅ La anidación sigue la jerarquía del HTML
- [ ] ✅ Se usa metodología BEM para nombres de clases
- [ ] ✅ Las propiedades direccionales son RTL-ready
- [ ] ✅ No hay selectores globales sin contenedor
- [ ] ✅ No se usa `!important` (salvo excepciones justificadas)
- [ ] ✅ Los estilos están en el archivo correspondiente (component.scss o theme/)

## 📚 Referencias

- [MDN: CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [BEM Methodology](https://getbem.com/)
- [PrimeNG Theming](https://primeng.org/theming)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
