---
name: angular-dry-principle
description: Apply the DRY (Don't Repeat Yourself) principle to eliminate code duplication. Use when you notice repeated code patterns, identical lines, or similar logic that could be extracted into helper functions.
---

# Angular DRY Principle

Eliminate code duplication by extracting repeated patterns into reusable functions.

## Rule of Thumb

**If you see 2+ lines of code doing exactly the same thing, create a helper function.**

**Objective:** Avoid code duplication, improve maintainability, reduce errors.

## How to Detect Duplication

Look for these patterns:

- ✅ **2+ identical lines** → Create helper function
- ✅ **Same pattern repeated** → Create helper function
- ✅ **Same logic with small variations** → Create parameterized function
- ✅ **Similar validation repeated** → Create validation method
- ✅ **Similar transformations repeated** → Create transformation function

## Example: Navigation Duplication

❌ **BAD - Duplicated navigation:**

```typescript
private handleResponse(response: any): void {
  if (response?.needsAuth) {
    this.showMessage('Requires authorization');
    this.router.navigate(['/home']);  // ❌ Duplicated
    return;
  }

  if (response?.hasPending) {
    this.router.navigate(['/home']);  // ❌ Duplicated
    return;
  }

  if (response?.success) {
    this.showSuccess('Operation successful');
    this.router.navigate(['/home']);  // ❌ Duplicated
    return;
  }
}
```

✅ **GOOD - Helper function:**

```typescript
private handleResponse(response: any): void {
  if (response?.needsAuth) {
    this.showMessage('Requires authorization');
    this.returnToHome();  // ✅ Function call
    return;
  }

  if (response?.hasPending) {
    this.returnToHome();  // ✅ Function call
    return;
  }

  if (response?.success) {
    this.showSuccess('Operation successful');
    this.returnToHome();  // ✅ Function call
    return;
  }
}

private returnToHome(): void {
  this.router.navigate(['/home']);
}
```

## Example: Validation Duplication

❌ **BAD - Repeated validation:**

```typescript
saveUser(): void {
  if (!this.form.valid) {
    this.showError('Form is invalid');
    return;
  }
  if (!this.user) {
    this.showError('User not found');
    return;
  }
  // Save logic
}

deleteUser(): void {
  if (!this.form.valid) {
    this.showError('Form is invalid');
    return;
  }
  if (!this.user) {
    this.showError('User not found');
    return;
  }
  // Delete logic
}
```

✅ **GOOD - Validation method:**

```typescript
saveUser(): void {
  if (!this.validateBeforeAction()) return;
  // Save logic
}

deleteUser(): void {
  if (!this.validateBeforeAction()) return;
  // Delete logic
}

private validateBeforeAction(): boolean {
  if (!this.form.valid) {
    this.showError('Form is invalid');
    return false;
  }
  if (!this.user) {
    this.showError('User not found');
    return false;
  }
  return true;
}
```

## Example: Parameterized Helper

When logic is similar but with variations, use parameters:

❌ **BAD - Similar logic repeated:**

```typescript
loadUsers(): void {
  this.isLoadingUsers.set(true);
  this.userService.getAll().subscribe({
    next: (data) => this.users.set(data),
    error: () => this.isLoadingUsers.set(false),
    complete: () => this.isLoadingUsers.set(false)
  });
}

loadProducts(): void {
  this.isLoadingProducts.set(true);
  this.productService.getAll().subscribe({
    next: (data) => this.products.set(data),
    error: () => this.isLoadingProducts.set(false),
    complete: () => this.isLoadingProducts.set(false)
  });
}
```

✅ **GOOD - Parameterized helper:**

```typescript
loadUsers(): void {
  this.loadData(
    this.userService.getAll(),
    this.users,
    this.isLoadingUsers
  );
}

loadProducts(): void {
  this.loadData(
    this.productService.getAll(),
    this.products,
    this.isLoadingProducts
  );
}

private loadData<T>(
  source$: Observable<T[]>,
  target: WritableSignal<T[]>,
  loading: WritableSignal<boolean>
): void {
  loading.set(true);
  source$.subscribe({
    next: (data) => target.set(data),
    error: () => loading.set(false),
    complete: () => loading.set(false)
  });
}
```

## Benefits of DRY

- 🎯 **Maintainability:** Change logic in one place
- 🐛 **Fewer errors:** No risk of updating one instance and forgetting others
- 📖 **Readability:** Function name documents intent
- ♻️ **Reusability:** Function can be used in multiple places
- 🧪 **Testability:** Test one function instead of many duplicates

## When to Apply DRY

| Situation                     | Action                          |
| ----------------------------- | ------------------------------- |
| 2+ identical lines            | Create private helper function  |
| Same logic with variations    | Create function with parameters |
| Repeated validation code      | Create validation method        |
| Repeated data transformations | Create transformation function  |
| Repeated signal updates       | Create update helper            |
| Repeated subscriptions        | Create subscription helper      |

## Naming Helper Functions

Helper functions should have clear, descriptive names:

```typescript
// ✅ GOOD - Clear intent
private returnToHome(): void { }
private validateBeforeAction(): boolean { }
private loadDataWithLoading<T>(): void { }
private transformUserResponse(data: any): User { }

// ❌ BAD - Unclear
private helper1(): void { }
private doIt(): void { }
private process(): void { }
```

## Where to Place Helpers

**In the same component:**

```typescript
// Helper is specific to this component
private validateUserForm(): boolean { }
```

**In a service:**

```typescript
// Helper is used by multiple components
@Injectable({ providedIn: 'root' })
export class ValidationService {
  validateUserForm(form: FormGroup): boolean {}
}
```

**In utilities:**

```typescript
// Helper is a pure function, no dependencies
// src/app/shared/utils/form-validators/form-validators.util.ts
export function isFormValid(form: FormGroup): boolean {}
```

## DRY with Signals

Extract repeated signal patterns:

❌ **BAD - Repeated pattern:**

```typescript
updateUser(): void {
  const current = this.users();
  const updated = current.map(u => u.id === id ? newUser : u);
  this.users.set(updated);
}

updateProduct(): void {
  const current = this.products();
  const updated = current.map(p => p.id === id ? newProduct : p);
  this.products.set(updated);
}
```

✅ **GOOD - Generic helper:**

```typescript
updateUser(id: string, newUser: User): void {
  this.updateItem(this.users, id, newUser);
}

updateProduct(id: string, newProduct: Product): void {
  this.updateItem(this.products, id, newProduct);
}

private updateItem<T extends { id: string }>(
  signal: WritableSignal<T[]>,
  id: string,
  newItem: T
): void {
  const current = signal();
  const updated = current.map(item => item.id === id ? newItem : item);
  signal.set(updated);
}
```

## Common Duplication Patterns to Look For

### Subscription Boilerplate

```typescript
// ❌ Repeated everywhere
this.service.getData().subscribe({
  next: (data) => this.data.set(data),
  error: (err) => this.handleError(err)
});

// ✅ Extract to helper
private subscribeAndSet<T>(
  source$: Observable<T>,
  target: WritableSignal<T>
): void {
  source$.subscribe({
    next: (data) => target.set(data),
    error: (err) => this.handleError(err)
  });
}
```

### Error Handling

```typescript
// ❌ Repeated error handling
.subscribe({
  error: (err) => {
    console.error(err);
    this.showError('Operation failed');
  }
});

// ✅ Extract to method
private handleError(error: any, message: string = 'Operation failed'): void {
  console.error(error);
  this.showError(message);
}
```

## Checklist

- [ ] Look for 2+ identical lines in your component
- [ ] Check for similar validation patterns
- [ ] Review subscription patterns for duplication
- [ ] Identify repeated data transformations
- [ ] Extract helpers with descriptive names
- [ ] Consider if helper should be in service/utils
- [ ] Test that extraction didn't break functionality
