---
name: angular-refactoring
description: Identify code smells and refactor large functions, magic values, and complex logic. Use when functions are too long, code is hard to understand, or when reviewing legacy code that needs improvement.
---

# Angular Refactoring Patterns

Identify when and how to refactor code for better maintainability and readability.

## ⚠️ When NOT to Refactor

- Code is already simple and readable
- Refactor adds unnecessary abstraction
- Performance-critical sections where splitting harms performance

## 🤖 Refactoring Strategy

When invoked:

1. Identify biggest code smell
2. Apply minimal refactor first
3. Preserve behavior
4. Prefer small incremental changes over big rewrites

## Function Length Guidelines

### Size Targets

- **Ideal:** 5-15 lines
- **Acceptable:** Up to 30 lines
- **Refactor:** 50+ lines (split into smaller functions)

### Why Size Matters

- 📖 **Readability:** Easier to understand at a glance
- 🧪 **Testability:** Small functions are easier to test
- 🐛 **Debugging:** Easier to locate issues
- ♻️ **Reusability:** Small functions can be reused
- 📝 **Naming:** Short functions are easier to name descriptively

## When to Split a Function

Split when the function:

- ❌ Does multiple distinct things
- ❌ Contains multiple levels of abstraction
- ❌ Is hard to understand without comments
- ❌ Has deeply nested conditions (3+ levels)
- ❌ Has multiple responsibilities
- ❌ Is difficult to name descriptively

## Refactoring Example: Too Long

❌ **BAD - Too long (30+ lines):**

```typescript
private processUserData(user: User): void {
  // Validate
  if (!user) {
    console.error('User is null');
    return;
  }
  if (!user.email) {
    console.error('Email is required');
    return;
  }

  // Transform
  const fullName = user.firstName + ' ' + user.lastName;
  const email = user.email.toLowerCase().trim();
  const formattedPhone = this.formatPhone(user.phone);

  // Build request
  const updateRequest = {
    id: user.id,
    name: fullName,
    email: email,
    phone: formattedPhone,
    updatedAt: new Date()
  };

  // Save
  this.userService.update(updateRequest).subscribe({
    next: (response) => {
      this.users.update(users =>
        users.map(u => u.id === response.id ? response : u)
      );
      this.showSuccess('User updated successfully');
    },
    error: (error) => {
      console.error('Update failed:', error);
      this.showError('Failed to update user');
    }
  });

  // Log
  console.log('User updated:', user.id);
  this.analyticsService.track('user_updated', { userId: user.id });
}
```

✅ **GOOD - Split into focused functions:**

```typescript
private processUserData(user: User): void {
  if (!this.isValidUser(user)) return;

  const transformed = this.transformUserData(user);
  this.saveUser(transformed);
  this.logUserUpdate(user.id);
}

private isValidUser(user: User | null): user is User {
  if (!user) {
    console.error('User is null');
    return false;
  }
  if (!user.email) {
    console.error('Email is required');
    return false;
  }
  return true;
}

private transformUserData(user: User): UpdateUserRequest {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email.toLowerCase().trim(),
    phone: this.formatPhone(user.phone),
    updatedAt: new Date()
  };
}

private saveUser(request: UpdateUserRequest): void {
  this.userService.update(request).subscribe({
    next: (response) => this.handleUserSaved(response),
    error: (error) => this.handleSaveError(error)
  });
}

private handleUserSaved(user: User): void {
  this.users.update(users =>
    users.map(u => u.id === user.id ? user : u)
  );
  this.showSuccess('User updated successfully');
}

private handleSaveError(error: any): void {
  console.error('Update failed:', error);
  this.showError('Failed to update user');
}

private logUserUpdate(userId: string): void {
  console.log('User updated:', userId);
  this.analyticsService.track('user_updated', { userId });
}
```

### Benefits of Splitting

- ✅ Each function has one clear responsibility
- ✅ Easy to test each function independently
- ✅ Easy to reuse validation, transformation, etc.
- ✅ Main function reads like documentation
- ✅ Error handling is isolated and clear

## Extract Magic Values

**Magic values** are hardcoded strings, numbers, or values without context.

### Problem: Magic Strings

❌ **BAD - Magic strings:**

```typescript
if (status === 'ACTIVE') { ... }
if (userType === 'admin') { ... }
this.router.navigate(['/dashboard']);
if (count > 100) { ... }
```

### Solution: Named Constants

✅ **GOOD - Named constants:**

```typescript
// constants/user.constants.ts
export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING'
} as const;

export const USER_TYPE = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
} as const;

export const MAX_USERS_PER_PAGE = 100;

// constants/routes.constants.ts
export const APP_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings'
} as const;
```

```typescript
// Usage
if (status === USER_STATUS.ACTIVE) { ... }
if (userType === USER_TYPE.ADMIN) { ... }
this.router.navigate([APP_ROUTES.DASHBOARD]);
if (count > MAX_USERS_PER_PAGE) { ... }
```

### Benefits

- 🔍 **Type safety:** Catch typos at compile time
- 🔄 **Refactoring:** Change value in one place
- 📖 **Documentation:** Names explain meaning
- 🧪 **Testing:** Easier to mock and test
- 🔎 **Find usages:** Easy to find all usages

## Extract Complex Logic

### Problem: Complex Inline Logic

❌ **BAD - Complex inline:**

```typescript
protected readonly totalPrice = computed(() => {
  return this.items()
    .filter(item => !item.isDeleted && item.quantity > 0)
    .map(item => {
      const discount = item.hasDiscount ? item.price * 0.1 : 0;
      const tax = (item.price - discount) * 0.21;
      return (item.price - discount + tax) * item.quantity;
    })
    .reduce((sum, price) => sum + price, 0);
});
```

### Solution: Extract Steps

✅ **GOOD - Extracted logic:**

```typescript
protected readonly totalPrice = computed(() => {
  const activeItems = this.getActiveItems();
  return this.calculateTotalPrice(activeItems);
});

private getActiveItems(): CartItem[] {
  return this.items().filter(item =>
    !item.isDeleted && item.quantity > 0
  );
}

private calculateTotalPrice(items: CartItem[]): number {
  return items
    .map(item => this.calculateItemTotal(item))
    .reduce((sum, price) => sum + price, 0);
}

private calculateItemTotal(item: CartItem): number {
  const basePrice = this.getItemBasePrice(item);
  const tax = this.calculateTax(basePrice);
  return (basePrice + tax) * item.quantity;
}

private getItemBasePrice(item: CartItem): number {
  const discount = item.hasDiscount ? item.price * 0.1 : 0;
  return item.price - discount;
}

private calculateTax(price: number): number {
  return price * 0.21;
}
```

## Extract Complex Conditions

### Problem: Long Boolean Expressions

❌ **BAD - Complex condition:**

```typescript
if (
  user &&
  user.isActive &&
  user.roles.includes('admin') &&
  !user.isLocked &&
  user.lastLogin &&
  Date.now() - user.lastLogin.getTime() < 86400000
) {
  // Do something
}
```

### Solution: Extract to Method

✅ **GOOD - Named condition:**

```typescript
if (this.isActiveAdmin(user)) {
  // Do something
}

private isActiveAdmin(user: User | null): boolean {
  if (!user || !user.isActive || user.isLocked) return false;
  if (!user.roles.includes('admin')) return false;
  if (!user.lastLogin) return false;

  const oneDayMs = 24 * 60 * 60 * 1000;
  const timeSinceLogin = Date.now() - user.lastLogin.getTime();
  return timeSinceLogin < oneDayMs;
}
```

## Deep Nesting Refactoring

### Problem: Pyramid of Doom

❌ **BAD - Deep nesting:**

```typescript
private processOrder(order: Order): void {
  if (order) {
    if (order.isValid) {
      if (order.items.length > 0) {
        if (order.total > 0) {
          if (!order.isCancelled) {
            if (this.hasStock(order)) {
              if (this.canShip(order)) {
                this.submitOrder(order);
              }
            }
          }
        }
      }
    }
  }
}
```

### Solution: Guard Clauses

✅ **GOOD - Flat structure:**

```typescript
private processOrder(order: Order): void {
  if (!this.canProcessOrder(order)) return;
  if (!this.hasStock(order)) return;
  if (!this.canShip(order)) return;

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

## Code Smells to Watch For

### 1. Long Parameter Lists

❌ **BAD - Too many parameters:**

```typescript
createUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  country: string,
  zipCode: string
): User { ... }
```

✅ **GOOD - Use object:**

```typescript
interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}

interface Address {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

createUser(dto: CreateUserDto): User { ... }
```

### 2. Feature Envy

Function uses more data from another class than its own:

❌ **BAD - Feature envy:**

```typescript
// In OrderComponent
calculateDiscount(): number {
  return this.user.points * 0.01 * this.user.membershipLevel;
}
```

✅ **GOOD - Move to User class/service:**

```typescript
// In UserService
calculateDiscount(user: User): number {
  return user.points * 0.01 * user.membershipLevel;
}

// In OrderComponent
calculateDiscount(): number {
  return this.userService.calculateDiscount(this.user);
}
```

### 3. Comments as Deodorant

If you need comments to explain what code does, refactor it:

❌ **BAD - Comments explaining code:**

```typescript
// Check if user is active admin and logged in recently
if (u && u.a && u.r.includes('admin') && !u.l && u.ll && Date.now() - u.ll.getTime() < 86400000) {
```

✅ **GOOD - Self-documenting:**

```typescript
if (this.isActiveAdminWithRecentLogin(user)) {
```

## Refactoring Workflow

### Step-by-Step Process

1. **Identify the problem**
   - Function too long?
   - Deep nesting?
   - Magic values?
   - Unclear intent?

2. **Write tests first** (if they don't exist)
   - Ensure current behavior is captured

3. **Extract small pieces**
   - Start with the innermost/deepest logic
   - Move to helper functions
   - Give descriptive names

4. **Run tests**
   - Verify behavior hasn't changed

5. **Review and iterate**
   - Can it be clearer?
   - Are names descriptive?
   - Is it DRY?

## Common Refactoring Patterns

### Extract Method

```typescript
// Before
const name = user.firstName + ' ' + user.lastName + (user.middleName ? ' ' + user.middleName : '');

// After
const name = this.buildFullName(user);
```

### Extract Variable

```typescript
// Before
if (order.items.filter(i => i.quantity > 0).length > 0) {

// After
const hasActiveItems = order.items.filter(i => i.quantity > 0).length > 0;
if (hasActiveItems) {
```

### Replace Magic Number with Constant

```typescript
// Before
if (daysSinceLogin > 30) {

// After
const MAX_INACTIVE_DAYS = 30;
if (daysSinceLogin > MAX_INACTIVE_DAYS) {
```

## Checklist

- [ ] Functions under 30 lines
- [ ] No magic strings or numbers
- [ ] No deep nesting (3+ levels)
- [ ] Complex conditions extracted to methods
- [ ] Each function has single responsibility
- [ ] Clear, descriptive function names
- [ ] Constants defined in separate files
- [ ] Complex logic broken into steps
- [ ] No long parameter lists (use objects)
- [ ] Comments explain WHY, not WHAT
