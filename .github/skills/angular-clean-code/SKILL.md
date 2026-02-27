---
name: angular-clean-code
description: Write clean, readable code with early returns, guard clauses, and reduced nesting. Use when writing conditionals, validations, or refactoring deeply nested code for better readability.
---

# Angular Clean Code Patterns

Patterns for writing clean, readable code with minimal nesting and clear control flow.

## Early Returns (Guard Clauses)

**Objective:** Reduce nesting and improve readability by validating conditions early and returning immediately.

### The Pattern

Instead of nesting conditions, check for invalid states first and return early.

❌ **BAD - Deeply nested:**

```typescript
private processData(data: any): void {
  if (data) {
    if (data.isValid) {
      if (data.hasContent) {
        if (data.permissions.canEdit) {
          this.doSomething(data);
        }
      }
    }
  }
}
```

✅ **GOOD - Guard clauses:**

```typescript
private processData(data: any): void {
  if (!data) return;
  if (!data.isValid) return;
  if (!data.hasContent) return;
  if (!data.permissions.canEdit) return;

  this.doSomething(data);
}
```

### Benefits

- 📖 **Readability:** Main logic is at the bottom, clearly visible
- 🎯 **Focus:** Each condition is independent and easy to understand
- 🔍 **Debugging:** Easy to add logging or breakpoints per condition
- 🧹 **Clean:** No deep nesting pyramids

## One-Line Statements

**Objective:** For simple operations, omit braces to save space and improve readability.

### When to Use

Use one-liners for:

- Simple returns
- Single signal updates
- Simple assignments
- Early returns in guard clauses

❌ **BAD - Unnecessary braces:**

```typescript
if (!beneficiario) {
  return undefined;
}

if (data.length === 0) {
  this.isLoading.set(false);
}

if (this.user === null) {
  this.user = DEFAULT_USER;
}
```

✅ **GOOD - One-line statements:**

```typescript
if (!beneficiario) return undefined;

if (data.length === 0) this.isLoading.set(false);

if (this.user === null) this.user = DEFAULT_USER;
```

### When NOT to Use

❌ **DON'T use for complex logic:**

```typescript
// ❌ TOO COMPLEX for one line
if (user && user.isActive) (this.loadData(), this.showWelcome(), this.trackEvent());

// ✅ Use braces for multiple statements
if (user && user.isActive) {
  this.loadData();
  this.showWelcome();
  this.trackEvent();
}
```

## Combined Pattern: Guard Clauses + One-Line

Real-world example combining both patterns:

```typescript
private getSavedDataFromCache(): Observable<any> {
  // Early returns (guard clauses) as one-liners
  if (this.cachedData() !== undefined) return of(this.cachedData());
  if (!this.isOnline()) return of(null);

  const savedData = this.dataService.getData();
  if (!savedData) return of(undefined);

  // Main logic at the bottom
  const convertedData = this.convertData(savedData);
  this.cacheData.set(convertedData);
  return of(convertedData);
}
```

## Avoid Else Blocks with Early Returns

**Principle:** If you return early, you don't need `else`.

❌ **BAD - Unnecessary else:**

```typescript
private checkPermission(user: User): boolean {
  if (user.role === 'admin') {
    return true;
  } else {
    if (user.permissions.includes('read')) {
      return true;
    } else {
      return false;
    }
  }
}
```

✅ **GOOD - No else needed:**

```typescript
private checkPermission(user: User): boolean {
  if (user.role === 'admin') return true;
  if (user.permissions.includes('read')) return true;
  return false;
}
```

## Extract Complex Conditions

When conditions become complex, extract them to computed signals or methods.

❌ **BAD - Complex inline condition:**

```typescript
private processOrder(order: Order): void {
  if (order && order.isValid && order.items.length > 0 && order.total > 0 && !order.isCancelled) {
    this.submitOrder(order);
  }
}
```

✅ **GOOD - Extract to method:**

```typescript
private processOrder(order: Order): void {
  if (!this.canProcessOrder(order)) return;

  this.submitOrder(order);
}

private canProcessOrder(order: Order | null): boolean {
  return !!order
    && order.isValid
    && order.items.length > 0
    && order.total > 0
    && !order.isCancelled;
}
```

### Extract to Computed Signal

For template conditions, use computed signals:

❌ **BAD - Complex template condition:**

```html
@if (user && user.isActive && user.role === 'admin' && !user.isLocked &&
user.permissions.includes('edit')) {
<button>Edit</button>
}
```

✅ **GOOD - Computed signal:**

```typescript
protected readonly canEdit = computed(() => {
  const user = this.user();
  return !!user
    && user.isActive
    && user.role === 'admin'
    && !user.isLocked
    && user.permissions.includes('edit');
});
```

```html
@if (canEdit()) {
<button>Edit</button>
}
```

## Refactoring Nested Code

### Step-by-Step Process

1. **Identify the deepest nesting**
2. **Find the invalid/edge cases**
3. **Create guard clauses for each**
4. **Keep main logic at bottom**

### Example Refactoring

**Before:**

```typescript
private validateAndSave(data: any): void {
  if (data) {
    if (this.form.valid) {
      if (this.user) {
        if (this.user.canEdit) {
          this.saveData(data);
          this.showSuccess();
        } else {
          this.showError('No permission');
        }
      } else {
        this.showError('User not found');
      }
    } else {
      this.showError('Form invalid');
    }
  } else {
    this.showError('No data');
  }
}
```

**After:**

```typescript
private validateAndSave(data: any): void {
  // Guard clauses with error messages
  if (!data) {
    this.showError('No data');
    return;
  }

  if (!this.form.valid) {
    this.showError('Form invalid');
    return;
  }

  if (!this.user) {
    this.showError('User not found');
    return;
  }

  if (!this.user.canEdit) {
    this.showError('No permission');
    return;
  }

  // Happy path at the bottom
  this.saveData(data);
  this.showSuccess();
}
```

## Ternary Operators

Use ternary for simple assignments, not for complex logic.

✅ **GOOD - Simple ternary:**

```typescript
const status = isActive ? 'active' : 'inactive';
const label = count > 1 ? 'items' : 'item';
this.color = hasError ? 'red' : 'green';
```

❌ **BAD - Nested/complex ternary:**

```typescript
// ❌ TOO COMPLEX
const status = user
  ? user.isActive
    ? user.isPremium
      ? 'premium'
      : 'standard'
    : 'inactive'
  : 'guest';

// ✅ Use if/else or switch
let status: string;
if (!user) {
  status = 'guest';
} else if (!user.isActive) {
  status = 'inactive';
} else if (user.isPremium) {
  status = 'premium';
} else {
  status = 'standard';
}
```

## Null/Undefined Checks

Use modern patterns for null checking.

✅ **GOOD - Optional chaining:**

```typescript
if (!user?.profile?.email) return;

const name = user?.profile?.name ?? 'Anonymous';
```

✅ **GOOD - Nullish coalescing:**

```typescript
const timeout = config.timeout ?? 5000; // Only null/undefined
const port = config.port || 3000; // Any falsy value
```

❌ **BAD - Verbose null checks:**

```typescript
if (!user || !user.profile || !user.profile.email) return;

const name = user && user.profile && user.profile.name ? user.profile.name : 'Anonymous';
```

## Switch Statements

For multiple conditions on same value, use switch or template @switch.

✅ **GOOD - Switch for multiple cases:**

```typescript
private getUserStatus(status: string): string {
  switch (status) {
    case 'ACTIVE': return 'Active User';
    case 'INACTIVE': return 'Inactive User';
    case 'PENDING': return 'Pending Approval';
    case 'BLOCKED': return 'Blocked';
    default: return 'Unknown';
  }
}
```

✅ **GOOD - Template @switch:**

```html
@switch (status()) { @case ('ACTIVE') {
<span class="badge badge--success">Active</span>
} @case ('INACTIVE') {
<span class="badge badge--warning">Inactive</span>
} @case ('BLOCKED') {
<span class="badge badge--danger">Blocked</span>
} @default {
<span class="badge">Unknown</span>
} }
```

## Real-World Examples

### API Call with Validation

```typescript
private loadUserData(userId: string): void {
  // Guard clauses
  if (!userId) return;
  if (!this.isUserLoggedIn()) return;
  if (this.isLoading()) return;

  // Main logic
  this.isLoading.set(true);
  this.userService.getById(userId).subscribe({
    next: (user) => this.handleUserLoaded(user),
    error: (err) => this.handleError(err)
  });
}
```

### Form Submission

```typescript
submitForm(): void {
  // Early returns for invalid states
  if (this.form.invalid) return this.showValidationErrors();
  if (this.isSubmitting()) return;
  if (!this.hasChanges()) return this.showInfo('No changes to save');

  // Submit logic
  this.isSubmitting.set(true);
  this.saveFormData();
}
```

## Checklist

- [ ] Use guard clauses for validation
- [ ] Return early for edge cases
- [ ] Use one-line statements for simple operations
- [ ] Avoid else after return
- [ ] Extract complex conditions to methods/signals
- [ ] Keep main logic at bottom of function
- [ ] Use optional chaining for null checks
- [ ] Use switch for multiple conditions on same value
- [ ] Avoid nested ternary operators
- [ ] Keep nesting under 2-3 levels max
