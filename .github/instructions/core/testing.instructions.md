---
description: Guia de desarrollo especifica los tests
applyTo: '**/*.spec.ts'
---

# 🧪 Buenas Prácticas de Testing Front-End Angular

## Principios Generales

- Todo componente, servicio, pipe o directiva debe tener tests asociados.
- La cobertura mínima recomendada es del 80% de líneas y ramas.
- Los tests deben ser claros, independientes y fáciles de mantener.
- Usa nombres descriptivos para los tests y describe el comportamiento esperado.

## Herramientas

- Usa siempre Jest y Spectator para los tests unitarios y de integración.
- Utiliza la función `generateTestBedDependenciesOverrides()` para mocks automáticos en componentes standalone.

## Estructura de los tests

- Los archivos de test deben llamarse igual que el archivo original, añadiendo el sufijo `.spec.ts`.
  Ejemplo: `my-component.component.spec.ts` para `my-component.component.ts`.
- Organiza los tests en carpetas `__tests__` si el módulo es complejo, o junto al archivo si es simple.

## Buenas prácticas específicas

- Testea siempre los casos principales de uso y los edge cases.
- Mockea dependencias externas (servicios, pipes, etc) usando mocks o spies.
- No testees código de librerías externas, solo tu lógica.
- Usa `TestBed` para configurar el entorno de pruebas y aislar el componente.
- Usa `Spectator` para simplificar la creación y manipulación de componentes.
- Usa `fakeAsync` y `tick` para tests asíncronos.
- Evita los tests frágiles que dependan de detalles de implementación.

## Ejemplo básico de test

```typescript
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MyComponent } from './my-component.component';

describe('MyComponent', () => {
  let spectator: Spectator<MyComponent>;
  const createComponent = createComponentFactory(MyComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should render the title', () => {
    spectator.setInput('title', 'Hello');
    expect(spectator.query('h1')).toHaveText('Hello');
  });
});
```

## Consejos adicionales

- Usa `jest.spyOn` para espiar métodos de servicios.
- Usa `jest.clearAllMocks()` en el `afterEach` para limpiar mocks.
- Si un bug es detectado, añade un test que lo reproduzca antes de arreglarlo.
- Los tests deben ser parte obligatoria de cualquier PR.
