---
name: angular-naming-conventions
description: Apply consistent naming conventions for files, classes, methods, properties, and selectors in Angular projects. Use when creating new files, components, services, or refactoring existing code to follow project standards.
---

# Angular Naming Conventions

Standards for naming files, classes, methods, properties, constants, and selectors in Angular projects.

## File Naming

### Rule

**Files must always have the same name as the component/class they contain, but in kebab-case.**

Add suffixes according to the file type.

### Examples

| Type      | Class Name           | File Name                 |
| --------- | -------------------- | ------------------------- |
| Component | `UserList`           | `user-list.component.ts`  |
| Service   | `UserService`        | `user-service.service.ts` |
| Directive | `HighlightDirective` | `highlight.directive.ts`  |
| Pipe      | `DateFormatPipe`     | `date-format.pipe.ts`     |
| Interface | `UserModel`          | `user.model.ts`           |
| Constant  | `APP_CONFIG`         | `app.constants.ts`        |
| Utility   | `formatDate`         | `format-date.util.ts`     |

### Components

```
user-list/
├── user-list.component.ts
├── user-list.component.html
├── user-list.component.scss
└── user-list.component.spec.ts
```

## Class Naming

### Components

**DO NOT include `Component` suffix in the class name.**

❌ **BAD:**

```typescript
export class UserListComponent {}
export class ButtonComponent {}
```

✅ **GOOD:**

```typescript
export class UserList {}
export class Button {}
```

### Services, Directives, Pipes

**DO include type suffix in the class name.**

✅ **GOOD:**

```typescript
export class UserService {}
export class HighlightDirective {}
export class DateFormatPipe {}
```

## Method and Property Naming

### Use camelCase

```typescript
export class UserList {
  // Properties
  userList: User[] = [];
  isLoading = false;
  selectedUserId: string | null = null;

  // Methods
  getUserList(): void {}
  searchUsers(query: string): void {}
  handleClick(): void {}
}
```

### Event Handlers

**Preferably indicate the action to perform and the element that invokes it.**

✅ **PREFERRED - Action-focused:**

```typescript
searchUsers(): void { }          // What it does
deleteUser(id: string): void { } // What it does
saveForm(): void { }             // What it does
```

✅ **ACCEPTABLE - Event-focused (when multiple elements trigger same action):**

```typescript
onSearchButtonClicked(): void { }
onDeleteIconClicked(id: string): void { }
onFormSubmitted(): void { }
```

❌ **BAD - Too generic:**

```typescript
onClick(): void { }      // Which click?
handleEvent(): void { }  // Which event?
doSomething(): void { }  // What something?
```

### Boolean Properties

Prefix with `is`, `has`, `can`, `should`.

```typescript
isLoading = signal(false);
hasErrors = computed(() => this.errors().length > 0);
canEdit = computed(() => this.user()?.role === 'admin');
shouldShowModal = signal(false);
```

### Computed Signals

Use descriptive names that indicate they're derived values.

```typescript
// ✅ GOOD
protected readonly filteredUsers = computed(() =>
  this.users().filter(u => u.isActive)
);

protected readonly totalPrice = computed(() =>
  this.items().reduce((sum, item) => sum + item.price, 0)
);

protected readonly canSubmit = computed(() =>
  this.form.valid && !this.isLoading()
);
```

## Constant Naming

### Use UPPER_SNAKE_CASE

```typescript
// Constants file: app.constants.ts
export const MAX_USER_COUNT = 100;
export const DEFAULT_PAGE_SIZE = 20;
export const API_BASE_URL = 'https://api.example.com';

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING'
} as const;

export const ROUTES = {
  HOME: '/home',
  PROFILE: '/profile',
  SETTINGS: '/settings'
} as const;
```

### Usage

```typescript
import { MAX_USER_COUNT, USER_STATUS } from './constants/app.constants';

export class UserList {
  private readonly maxUsers = MAX_USER_COUNT;

  filterActiveUsers(): User[] {
    return this.users.filter(u => u.status === USER_STATUS.ACTIVE);
  }
}
```

## Selector Naming

### Components and Directives

**Use the prefix defined in `angular.json`.**

For MedVida project, the prefix is `mvda`.

```typescript
// Component
@Component({
  selector: 'mvda-user-list',  // ✅ Prefix + kebab-case
  ...
})
export class UserList { }

// Directive (attribute)
@Directive({
  selector: '[mvdaHighlight]',  // ✅ Prefix + camelCase (attribute)
  ...
})
export class HighlightDirective { }

// Directive (structural)
@Directive({
  selector: '[mvdaIf]',  // ✅ Prefix + camelCase
  ...
})
export class IfDirective { }
```

### Usage in Templates

```html
<!-- Component -->
<mvda-user-list [users]="users()" />

<!-- Directive -->
<div mvdaHighlight [color]="'yellow'">Highlighted text</div>
```

## Folder Structure for Shared Resources

### Critical Rule

**When creating directives, utilities, or shared services in `src/app/shared/`, ALWAYS create a dedicated folder for each file, don't place them directly in the parent folder.**

#### ❌ BAD - Files loose in parent folder

```
shared/
├── utils/
│   ├── typed-key.util.ts          ❌ Loose in utils/
│   ├── format-date.util.ts        ❌ Loose in utils/
│   └── transform-data.util.ts     ❌ Loose in utils/
├── directives/
│   ├── highlight.directive.ts     ❌ Loose in directives/
│   └── tooltip.directive.ts       ❌ Loose in directives/
```

#### ✅ GOOD - Each file in its own folder

```
shared/
├── utils/
│   ├── typed-key/                 ✅ Own folder
│   │   ├── typed-key.util.ts
│   │   └── typed-key.util.spec.ts
│   ├── format-date/               ✅ Own folder
│   │   ├── format-date.util.ts
│   │   └── format-date.util.spec.ts
│   └── transform-data/            ✅ Own folder
│       ├── transform-data.util.ts
│       └── transform-data.util.spec.ts
├── directives/
│   ├── debug-field-ids/           ✅ Own folder
│   │   ├── debug-field-ids.directive.ts
│   │   └── debug-field-ids.directive.spec.ts
│   └── highlight/                 ✅ Own folder
│       ├── highlight.directive.ts
│       └── highlight.directive.spec.ts
```

### Benefits

- 📁 **Organization:** Avoids having 50+ loose files in a single folder
- 🧪 **Tests:** Allows placing test file (`.spec.ts`) next to code
- 📚 **Documentation:** Can add README.md if utility is complex
- 🔧 **Maintainability:** Easier to locate and manage related files

### Also Applies To

- Shared services in `shared/services/`
- Shared pipes in `shared/pipes/`
- Shared models in `shared/models/` (when they have associated logic)

## Service Naming

### Types of Services

```typescript
// Data service (API calls)
export class UserService {}

// State management service
export class UserStateService {}

// Utility service
export class ValidationService {}

// Feature service
export class AuthService {}
```

### Service Files

```
user-service/
├── user.service.ts
├── user.service.spec.ts
└── user.model.ts (optional)
```

## Interface and Type Naming

### Interfaces

Use descriptive names without `I` prefix.

```typescript
// ✅ GOOD
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserFilter {
  status?: string;
  role?: string;
}

// ❌ BAD
export interface IUser {} // Don't use I prefix
export interface UserInterface {} // Don't use Interface suffix
```

### Type Aliases

```typescript
export type UserId = string;
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';
export type UserRole = 'ADMIN' | 'USER' | 'GUEST';
```

## Language Choice

### Priority Order

1. **English** (preferred for most cases)
2. **Spanish** (only when necessary for domain-specific terms)

```typescript
// ✅ GOOD - English
export class UserList { }
searchUsers(): void { }
getUserById(id: string): User { }

// ✅ ACCEPTABLE - Spanish for domain terms
export class Beneficiario { }  // Domain-specific Spanish term
export class Poliza { }         // Domain-specific Spanish term
```

## Complete Example

```typescript
// File: user-list.component.ts
import { Component, inject, signal, computed } from '@angular/core';
import { UserService } from './user.service';

const MAX_USERS_PER_PAGE = 20;  // ✅ Constant

@Component({
  selector: 'mvda-user-list',  // ✅ Prefix + kebab-case
  ...
})
export class UserList {  // ✅ No Component suffix
  // Services
  private readonly userService = inject(UserService);

  // Properties (camelCase)
  protected readonly users = signal<User[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly searchQuery = signal('');

  // Computed (descriptive names)
  protected readonly filteredUsers = computed(() =>
    this.users().filter(u =>
      u.name.toLowerCase().includes(this.searchQuery().toLowerCase())
    )
  );

  protected readonly totalUsers = computed(() => this.filteredUsers().length);
  protected readonly hasUsers = computed(() => this.totalUsers() > 0);

  // Methods (camelCase, descriptive)
  searchUsers(query: string): void {
    this.searchQuery.set(query);
    this.loadUsers();
  }

  deleteUser(userId: string): void {
    if (!this.canDelete(userId)) return;
    this.performDelete(userId);
  }

  private loadUsers(): void {
    this.isLoading.set(true);
    this.userService.getUsers().subscribe({
      next: (users) => this.handleUsersLoaded(users),
      error: (error) => this.handleError(error)
    });
  }

  private canDelete(userId: string): boolean {
    return this.users().some(u => u.id === userId);
  }

  private performDelete(userId: string): void {
    this.userService.delete(userId).subscribe();
  }

  private handleUsersLoaded(users: User[]): void {
    this.users.set(users);
    this.isLoading.set(false);
  }

  private handleError(error: any): void {
    console.error('Error loading users:', error);
    this.isLoading.set(false);
  }
}
```

---

## Descriptive Names vs Comments

### Golden Rule

**Prefer LONG and DESCRIPTIVE names instead of extensive comments.**

Code should be self-documenting. If you need comments to explain what the code does, the names aren't clear enough.

### Method Naming

#### ❌ BAD - Needs comments

```typescript
// Gets user list from server applying filters and pagination
get(): Observable<User[]> { }

// Validates form and saves user data to database
save(): void { }

// Checks if user has admin permissions
check(): boolean { }
```

#### ✅ GOOD - Self-documenting

```typescript
getUsersWithFiltersAndPagination(): Observable<User[]> { }

validateAndSaveUserData(): void { }

hasAdminPermissions(): boolean { }
```

### Don't Repeat Return Type in Name

**If the return type is already explicit, DO NOT include it in the function name.**

#### ❌ Redundant

```typescript
// Type already indicates Observable<FormArray>
searchPersonsAndReturnFormArray(): Observable<FormArray> { }
getUsersAsFormArray(): Observable<FormArray> { }
getProductsAsArray(): Product[] { }
checkAndReturnBoolean(): boolean { }
```

#### ✅ Clean

```typescript
// Type is self-explanatory
searchPersonsWithPagination(): Observable<FormArray> { }
getUsersWithFilters(): Observable<User[]> { }
getProducts(): Product[] { }
canEditUser(): boolean { }
```

### Variable Naming

#### ❌ BAD - Unclear

```typescript
const u = this.getUser();
const d = new Date();
const temp = users.filter(u => u.active);
const arr = this.getData();
const obj = { name: 'John' };
```

#### ✅ GOOD - Descriptive

```typescript
const currentUser = this.getUser();
const createdDate = new Date();
const activeUsers = users.filter(u => u.active);
const userList = this.getData();
const userProfile = { name: 'John' };
```

### When Comments Are Acceptable

Comments should explain **WHY**, not **WHAT**.

✅ **GOOD - Explains WHY:**

```typescript
// HACK: IE11 doesn't support this feature, using polyfill
private initFeature(): void { }

// TODO: Replace with new API once backend is ready
private fetchLegacyData(): void { }

// NOTE: This must run before authentication
private initApp(): void { }

// WARNING: Changing this will break mobile app compatibility
const API_VERSION = 'v1';
```

❌ **BAD - Explains WHAT (code already does):**

```typescript
// Get the user
const user = this.getUser();

// Check if user is active
if (user.isActive) {
}

// Loop through the users
users.forEach(u => {});
```

### Long Names Are Better Than Comments

Don't be afraid of long, descriptive method names.

#### ❌ BAD - Short name + comment

```typescript
// Searches for active users created in the last 30 days
// with valid email addresses
search(): Observable<User[]> { }
```

#### ✅ GOOD - Long descriptive name

```typescript
searchActiveUsersCreatedInLast30DaysWithValidEmail(): Observable<User[]> { }

// Or split if too long:
searchRecentActiveUsersWithValidEmail(): Observable<User[]> { }
```

### Signal Naming

Signals should have clear, descriptive names that indicate their purpose.

```typescript
// ✅ GOOD - Clear purpose
protected readonly filteredUsers = computed(() =>
  this.users().filter(u => u.isActive)
);

protected readonly hasUnsavedChanges = computed(() =>
  this.form.dirty && this.form.valid
);

protected readonly canSubmitForm = computed(() =>
  this.form.valid && !this.isSubmitting()
);

// ❌ BAD - Unclear
protected readonly data = computed(() => this.users());
protected readonly check = computed(() => this.form.valid);
protected readonly flag = signal(false);
```

### Avoid Abbreviations

Unless the abbreviation is universally known, spell it out.

```typescript
// ✅ GOOD
currentUser: User;
userRepository: UserRepository;
maximumRetries: number;

// ❌ BAD (unless domain-specific)
currUsr: User;
usrRepo: UserRepository;
maxRet: number;

// ✅ OK - Common abbreviations
userId: string; // ID is universally known
btnLabel: string; // btn for button is acceptable
```

### Boolean Naming

Always use predicates that read naturally.

```typescript
// ✅ GOOD - Reads naturally in conditionals
if (isUserActive()) {
}
if (hasPermission()) {
}
if (canEdit()) {
}
if (shouldShowModal()) {
}

// ❌ BAD - Doesn't read naturally
if (userActive()) {
}
if (permission()) {
}
if (edit()) {
}
if (modal()) {
}
```

### Name Length Guidelines

| Element  | Ideal Length | Example                              |
| -------- | ------------ | ------------------------------------ |
| Variable | 2-4 words    | `currentUser`, `selectedItems`       |
| Method   | 2-5 words    | `getUserById`, `saveFormData`        |
| Boolean  | 2-4 words    | `isLoading`, `canEdit`               |
| Computed | 2-5 words    | `filteredUsers`, `hasUnsavedChanges` |
| Constant | 2-4 words    | `MAX_RETRY_COUNT`                    |

## Summary Checklist

- [ ] Files in kebab-case with appropriate suffix
- [ ] Component classes without `Component` suffix
- [ ] Service/Directive/Pipe classes with type suffix
- [ ] Methods and properties in camelCase
- [ ] Constants in UPPER_SNAKE_CASE
- [ ] Boolean properties with is/has/can/should prefix
- [ ] Descriptive event handler names
- [ ] Selector with project prefix (mvda)
- [ ] Each shared utility/directive in its own folder
- [ ] English preferred, Spanish only for domain terms
- [ ] Interfaces without I prefix
