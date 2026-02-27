---
name: angular-code-organization
description: Organize Angular component code with proper access modifiers, hierarchical method ordering, and structural best practices. Use when creating components, refactoring code structure, or reviewing code organization.
---

# Angular Code Organization

Guidelines for organizing component code with access modifiers, method ordering, and structural patterns.

## Access Modifiers

### Critical Rule

**Access modifiers apply differently to properties and methods.**

### Properties (services, signals, variables, FormControls, computed)

**Always use explicit modifiers based on usage:**

#### `private` - Used ONLY internally

```typescript
private readonly cdr = inject(ChangeDetectorRef);
private readonly userService = inject(UserService);
private readonly editingRowIds = signal<Set<string>>(new Set());
private subscriptions: Subscription[] = [];
```

#### `protected` - Used in HTML template

```typescript
protected readonly isDebugButtonShown = computed(() => this.debugMode());
protected readonly allRoles = computed(() => this.service.getRoles());
protected readonly tableData = signal<any[]>([]);
protected nameFormControl = new FormControl<string>('');
```

#### `public` (no modifier) - Exposed as public API

Very rare - only when property needs to be accessed from outside component.

```typescript
// Usually not needed in components
title: string = 'My Component';
```

### Computed Signals = Properties

**`computed()` are treated as properties**, so:

- If used in HTML → `protected`
- If internal only → `private`

```typescript
// ✅ Used in HTML
protected readonly filteredUsers = computed(() =>
  this.users().filter(u => u.isActive)
);

// ✅ Internal only
private readonly hasErrors = computed(() =>
  this.errors().length > 0
);
```

### Methods

**DO NOT use `protected` on methods**, only `private` when they're private.

#### Public (no modifier) - Called from HTML or other components

```typescript
onSearchButtonClicked(): void { }
isButtonEnabled(): boolean { }
handleClick(): void { }
getUserName(id: string): string { }
```

#### `private` - Used ONLY internally by other methods

```typescript
private loadSavedData(): void { }
private handlePagination(event: CustomEventBus): void { }
private formatData(data: any[]): void { }
```

### Common Mistakes

❌ **WRONG - protected on methods:**

```typescript
// ❌ INCORRECT
protected onSearchClicked(): void { }
protected getUserName(): string { }
protected handleClick(): void { }
```

✅ **CORRECT:**

```typescript
// ✅ No modifier for public methods
onSearchClicked(): void { }
getUserName(): string { }
handleClick(): void { }

// ✅ private for internal methods
private loadData(): void { }
private formatResults(): void { }
```

## Hierarchical Method Ordering

### Critical Rule

**Methods must be ordered by EXECUTION FLOW, NOT alphabetically.**

### Recommended Structure

1. **Dependency Injections** (private/protected based on usage)
2. **Properties and Signals** (private/protected based on usage, including computed)
3. **Constructor and Lifecycle Hooks** (constructor → ngOnInit → ngAfterViewInit → ngOnDestroy)
4. **Public Methods** (in order of user interaction or logical flow)
5. **Private Helper Methods** (in the order they are called)

### Complete Example

```typescript
@Component({
  selector: 'mvda-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  ...
})
export class UserList {
  // 1. Injections
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  // 2. Properties and Signals
  // Private properties
  private readonly editingIds = signal<Set<string>>(new Set());
  private subscriptions: Subscription[] = [];

  // Protected properties (used in HTML)
  protected readonly users = signal<User[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly searchQuery = signal('');

  // Computed signals
  protected readonly filteredUsers = computed(() =>
    this.users().filter(u => u.name.includes(this.searchQuery()))
  );
  protected readonly totalUsers = computed(() => this.filteredUsers().length);

  // Form controls
  protected nameControl = new FormControl<string>('');

  // 3. Constructor and Lifecycle Hooks
  constructor() {
    this.initializeFilters();
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.cleanupSubscriptions();
  }

  // 4. Public Methods (in order of execution flow)
  onSearchButtonClicked(): void {
    this.validateSearchQuery();
    this.buildSearchRequest();
    this.performSearch();
  }

  onDeleteButtonClicked(userId: string): void {
    this.confirmDeletion(userId);
  }

  getUserDisplayName(user: User): string {
    return this.formatUserName(user);
  }

  // 5. Private Helper Methods (in order of execution)

  // Called from onSearchButtonClicked() - Step 1
  private validateSearchQuery(): void {
    if (!this.searchQuery()) {
      this.showValidationError();
      return;
    }
  }

  // Called from onSearchButtonClicked() - Step 2
  private buildSearchRequest(): void {
    this.prepareFilters();
  }

  // Called from buildSearchRequest()
  private prepareFilters(): void {
    // Filter logic
  }

  // Called from onSearchButtonClicked() - Step 3
  private performSearch(): void {
    this.isLoading.set(true);
    this.userService.search(this.searchQuery()).subscribe({
      next: (data) => this.handleSearchResults(data),
      error: (error) => this.handleSearchError(error)
    });
  }

  // Callback from performSearch()
  private handleSearchResults(data: User[]): void {
    this.users.set(data);
    this.isLoading.set(false);
    this.updateUI();
  }

  // Called from handleSearchResults()
  private updateUI(): void {
    this.cdr.markForCheck();
  }

  // Callback from performSearch()
  private handleSearchError(error: any): void {
    console.error('Search failed:', error);
    this.isLoading.set(false);
    this.showErrorMessage();
  }

  // Other helpers
  private formatUserName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  private showErrorMessage(): void {
    // Show error
  }

  private showValidationError(): void {
    // Show validation error
  }

  private cleanupSubscriptions(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
```

### Flow Visualization

```
onSearchButtonClicked()              // Entry point
  ├─> validateSearchQuery()
  │     └─> showValidationError()
  ├─> buildSearchRequest()
  │     └─> prepareFilters()
  └─> performSearch()
        ├─> handleSearchResults()
        │     ├─> users.set()
        │     └─> updateUI()
        └─> handleSearchError()
              └─> showErrorMessage()
```

### Bad Example (Alphabetical Order)

❌ **WRONG - Alphabetical:**

```typescript
export class UserList {
  private buildSearchRequest() {} // ❌ Out of flow order
  private formatUserName() {} // ❌ Out of flow order
  private handleSearchError() {} // ❌ Out of flow order
  private handleSearchResults() {} // ❌ Out of flow order
  onSearchButtonClicked() {} // ❌ Should be first
  private performSearch() {} // ❌ Out of flow order
  private validateSearchQuery() {} // ❌ Out of flow order
}
```

## Component Structure Template

Use this as a template for new components:

```typescript
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';

@Component({
  selector: 'mvda-component-name',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    ...
  `,
  styles: `...`
})
export class ComponentName {
  // ==================== 1. DEPENDENCY INJECTION ====================
  private readonly service = inject(MyService);
  private readonly router = inject(Router);

  // ==================== 2. PROPERTIES AND SIGNALS ====================

  // Private properties
  private readonly internalState = signal<any>(null);

  // Protected properties (used in template)
  protected readonly data = signal<any[]>([]);
  protected readonly isLoading = signal(false);

  // Computed signals
  protected readonly filteredData = computed(() => this.data().filter(/* logic */));

  // Form controls
  protected formControl = new FormControl('');

  // ==================== 3. CONSTRUCTOR & LIFECYCLE ====================
  constructor() {
    // Initialization
  }

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  // ==================== 4. PUBLIC METHODS ====================

  onButtonClicked(): void {
    // Entry point
    this.validateInput();
    this.processData();
  }

  getData(id: string): any {
    return this.findDataById(id);
  }

  // ==================== 5. PRIVATE METHODS ====================

  private validateInput(): void {
    // Validation logic
  }

  private processData(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.service.getData().subscribe({
      next: data => this.handleData(data),
      error: error => this.handleError(error)
    });
  }

  private handleData(data: any[]): void {
    this.data.set(data);
  }

  private handleError(error: any): void {
    console.error(error);
  }

  private findDataById(id: string): any {
    return this.data().find(d => d.id === id);
  }
}
```

## Service Structure

Services follow a similar pattern:

```typescript
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  // ==================== 1. DEPENDENCY INJECTION ====================
  private readonly http = inject(HttpClient);

  // ==================== 2. STATE ====================
  private readonly users = signal<User[]>([]);

  // ==================== 3. PUBLIC API ====================

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.buildUrl());
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.buildUrl(), user).pipe(tap(() => this.refreshUsers()));
  }

  // ==================== 4. PRIVATE METHODS ====================

  private buildUrl(): string {
    return `${API_BASE_URL}/users`;
  }

  private refreshUsers(): void {
    this.getUsers().subscribe(users => this.users.set(users));
  }
}
```

## Common Patterns

### Pattern: Guard Clauses at Start

```typescript
processUser(user: User): void {
  // ✅ Guards at the start
  if (!user) return;
  if (!user.id) return;
  if (!this.canProcess(user)) return;

  // Main logic after all guards
  this.doProcessing(user);
}
```

### Pattern: Callback Methods After Parent

```typescript
loadData(): void {
  this.service.getData().subscribe({
    next: (data) => this.handleSuccess(data),  // Callback defined below
    error: (error) => this.handleError(error)  // Callback defined below
  });
}

// Callbacks immediately after the parent method
private handleSuccess(data: any[]): void {
  this.data.set(data);
}

private handleError(error: any): void {
  console.error(error);
}
```

### Pattern: Helpers at End

```typescript
onSearchClicked(): void {
  const query = this.buildQuery();  // Helper used
  this.search(query);
}

private search(query: string): void {
  // Search logic
}

// Helper methods at the end
private buildQuery(): string {
  return this.searchControl.value || '';
}
```

## Summary Checklist

- [ ] Properties use explicit `private` or `protected`
- [ ] Methods do NOT use `protected`
- [ ] Computed signals have appropriate access modifier
- [ ] Methods ordered by execution flow, not alphabetically
- [ ] Public methods before private methods
- [ ] Callback methods placed after parent method
- [ ] Helper methods at end or near usage
- [ ] Dependency injections at top
- [ ] Lifecycle hooks after constructor
- [ ] Clear sections with comments (optional)
