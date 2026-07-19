# TypeScript Interview Notes — Beginner to Advanced

A focused, no-fluff revision guide for TypeScript interviews. Every question below is one that actually gets asked in real interviews — nothing filler. Each entry has a **plain-English explanation**, a **code example**, and a short **"Say this in the interview"** line you can use almost word-for-word.

⭐ = asked very frequently, in almost every TS interview.

---

## Table of Contents

**A. Fundamentals**
1. [What is TypeScript and why use it?](#1-what-is-typescript-and-why-use-it-) ⭐
2. [TypeScript vs JavaScript](#2-typescript-vs-javascript)
3. [Type Annotation vs Type Inference](#3-type-annotation-vs-type-inference) ⭐
4. [Basic / primitive types](#4-basic--primitive-types)

**B. Type Safety**
5. [any vs unknown vs never](#5-any-vs-unknown-vs-never-) ⭐
6. [Type Assertion](#6-type-assertion)
7. [Type Guards](#7-type-guards-) ⭐
8. [Discriminated Unions](#8-discriminated-unions)
9. [Non-null assertion operator (!)](#9-non-null-assertion-operator-)
10. [Optional chaining (?.) and nullish coalescing (??)](#10-optional-chaining--and-nullish-coalescing-)

**C. Object & Composite Types**
11. [interface vs type](#11-interface-vs-type-) ⭐
12. [Union Types](#12-union-types)
13. [Intersection Types](#13-intersection-types)
14. [Literal Types](#14-literal-types)
15. [Tuples](#15-tuples)
16. [Enums](#16-enums-) ⭐
17. [Index Signatures](#17-index-signatures)
18. [Optional (?) and readonly properties](#18-optional--and-readonly-properties)

**D. Functions**
19. [Function types, default & rest parameters](#19-function-types-default--rest-parameters)
20. [Function Overloading](#20-function-overloading)

**E. Generics & Advanced Types**
21. [Generics](#21-generics-) ⭐
22. [keyof and typeof operators](#22-keyof-and-typeof-operators)
23. [Mapped Types](#23-mapped-types)
24. [Conditional Types](#24-conditional-types)
25. [Utility Types (Partial, Pick, Omit, Record, etc.)](#25-utility-types-partial-pick-omit-record-etc-) ⭐
26. [The satisfies operator](#26-the-satisfies-operator)

**F. Object-Oriented TypeScript**
27. [Classes and access modifiers](#27-classes-and-access-modifiers-) ⭐
28. [Abstract classes](#28-abstract-classes)
29. [A class implementing an interface](#29-a-class-implementing-an-interface)

**G. Modules & Project Setup**
30. [Modules (import/export)](#30-modules-importexport)
31. [Namespaces vs Modules](#31-namespaces-vs-modules)
32. [Declaration files (.d.ts)](#32-declaration-files-dts)

**H. Async & Configuration**
33. [Promises and async/await](#33-promises-and-asyncawait)
34. [tsconfig.json and strict mode](#34-tsconfigjson-and-strict-mode-) ⭐

**I. Wrap-up**
35. [Cheat sheet — if you remember nothing else](#35-cheat-sheet--if-you-remember-nothing-else)

---

## A. Fundamentals

### 1. What is TypeScript, and why use it? ⭐

TypeScript is JavaScript **plus a type system**. It's built by Microsoft and compiles ("transpiles") down to plain JavaScript, so it can run anywhere JS runs — browsers, Node.js, etc. The browser never sees TypeScript directly; it only ever runs the compiled JS output.

You use it because JavaScript doesn't complain when you misuse a variable until the code actually runs — sometimes in production, in front of a user. TypeScript catches that mistake the moment you write it, right in your editor.

```ts
let username: string = "Gull";
let age: number = 22;
```

**Why it matters in real projects**
- Bugs are caught while typing, not after deployment
- Autocomplete and IntelliSense become far more accurate
- Refactoring large codebases is much safer (rename a field, and every broken usage lights up)
- Types double as living documentation for your functions and data

**Say this in the interview:** "TypeScript is a superset of JavaScript that adds static typing. It compiles to plain JS, and its main job is to catch type-related bugs at compile time instead of runtime."

---

### 2. TypeScript vs JavaScript

| | JavaScript | TypeScript |
|---|---|---|
| Typing | Dynamic (types decided at runtime) | Static (types checked at compile time) |
| Errors caught | Mostly while the app is running | Mostly while you're writing code |
| Runs in browser directly? | Yes | No — must compile to JS first |
| Tooling / autocomplete | Basic | Much stronger, because types are known |
| Best for | Small scripts, quick prototypes | Medium-to-large applications, teams |

**Say this in the interview:** "JavaScript is interpreted directly and is dynamically typed. TypeScript adds a compile step and a type system on top, so the same mistakes are caught earlier — and it's just JavaScript once compiled, so it doesn't change how the app actually runs."

---

### 3. Type Annotation vs Type Inference ⭐

**Type annotation** — *you* tell TypeScript the type explicitly.

```ts
let username: string = "Gull";

function greet(name: string): string {
  return `Hello, ${name}`;
}
```

**Type inference** — TypeScript figures the type out on its own, from the value you assign.

```ts
let city = "Lahore";  // inferred as string
let marks = 95;       // inferred as number
```

You don't need to annotate everything — that's noisy. A common real-world rule: let inference handle simple local variables, but write explicit annotations for **function parameters, function return types, and anything that's part of a public API** (so its contract is clear to anyone reading it later).

**Say this in the interview:** "Inference saves time when the type is obvious from the value. But for function signatures and shared/public code, explicit annotations are safer because they don't rely on the compiler guessing correctly."

---

### 4. Basic / primitive types

```ts
let isActive: boolean = true;
let score: number = 100;
let name: string = "Ali";
let values: string[] = ["a", "b"];       // array of strings
let coords: [number, number] = [10, 20]; // tuple - see Q15
let userInfo: object = { name: "Gull" };
```

**Important habit:** avoid `any` here. If you don't yet know the exact shape of something, prefer `unknown` (see Q5) over `any` — it keeps type safety intact instead of quietly disabling it.

---

## B. Type Safety

### 5. any vs unknown vs never ⭐

This is one of the most-asked TypeScript questions. All three are special types, but they solve opposite problems.

**`any`** — turns off type checking completely for that value. TypeScript trusts you blindly, which defeats the purpose of using TypeScript at all.

```ts
let value: any = 10;
value = "Hello";   // no error, TS gave up checking this
value.foo.bar;      // still no error, even though this will crash at runtime
```

**`unknown`** — also means "could be anything," but it's *safe*. You cannot use an `unknown` value until you narrow it down to a specific type first.

```ts
let value: unknown = "Hello";

value.toUpperCase();          // ❌ error — TS won't let you assume it's a string

if (typeof value === "string") {
  value.toUpperCase();        // ✅ fine now, TS knows it's a string here
}
```

**`never`** — represents a value that can genuinely never happen. Used for functions that always throw, or infinite loops, and it's very useful for making sure a `switch` statement covers every possible case.

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

**Say this in the interview:** "`any` disables type checking — avoid it. `unknown` is the type-safe alternative; you must narrow it before using it. `never` represents something that can't logically occur, like the return type of a function that always throws."

---

### 6. Type Assertion

Type assertion tells the compiler "trust me, I know this value's real type better than you do." It's a compile-time-only instruction — it does **not** convert or check anything at runtime, so using it wrongly can hide real bugs.

```ts
let value: unknown = "Hello";
let length = (value as string).length;   // "as" syntax (works everywhere)
let length2 = (<string>value).length;    // angle-bracket syntax (doesn't work in .tsx files)
```

**Say this in the interview:** "A type assertion overrides TypeScript's own inference for a value. It's purely a compile-time hint — it does nothing at runtime — so it should be used only when you're certain, not as a way to silence errors."

---

### 7. Type Guards ⭐

A type guard is any check that lets TypeScript **narrow** a broad type (usually a union) down to a more specific one inside a branch of code.

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());   // TS knows it's a string here
  } else {
    console.log(value.toFixed(2));      // TS knows it's a number here
  }
}
```

Common built-in guards:
- `typeof` — for primitives (`string`, `number`, `boolean`, etc.)
- `instanceof` — for class instances
- `in` — checks if a property exists on an object

You can also write your own **custom type guard** using a special return type:

```ts
interface Cat { meow(): void }
interface Dog { bark(): void }

function isCat(pet: Cat | Dog): pet is Cat {
  return (pet as Cat).meow !== undefined;
}
```

**Say this in the interview:** "Type guards are how you narrow a union type inside a conditional block, so TypeScript knows exactly which type you're working with at that point in the code."

---

### 8. Discriminated Unions

A very common real-world pattern: give every object in a union a shared literal property (the "discriminant"), then switch on it. TypeScript narrows the type automatically in each branch.

```ts
interface Circle {
  kind: "circle";
  radius: number;
}
interface Square {
  kind: "square";
  side: number;
}
type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;  // TS knows this is a Circle here
    case "square":
      return shape.side ** 2;              // TS knows this is a Square here
  }
}
```

**Say this in the interview:** "A discriminated union uses a common literal field, like `kind`, to let TypeScript automatically narrow which variant of the union you're dealing with — it's the standard way to model 'one of several shapes of data' safely."

---

### 9. Non-null assertion operator (!)

The `!` tells TypeScript "I know this value isn't `null` or `undefined`, even though its type says it might be." Like type assertion, it's a compile-time-only promise — if you're wrong, it will crash at runtime.

```ts
function getLength(text: string | null) {
  return text!.length;   // "trust me, text won't be null here"
}
```

Use sparingly — prefer an actual `if` check when possible, since that's verified, and `!` isn't.

---

### 10. Optional chaining (?.) and nullish coalescing (??)

Two small operators that remove a lot of defensive `if` checks, especially with deeply nested or possibly-missing data (e.g. API responses).

```ts
// Optional chaining: stop and return undefined if anything in the chain is null/undefined
const city = user?.address?.city;

// Nullish coalescing: fall back to a default only for null/undefined (not for 0, "", false)
const displayName = user.name ?? "Guest";
```

The key detail interviewers check: `??` only falls back on `null`/`undefined`, unlike `||` which also falls back on other falsy values like `0` or `""`.

---

## C. Object & Composite Types

### 11. interface vs type ⭐

Both describe the shape of an object, and for plain object shapes they're often interchangeable. The differences show up at the edges:

```ts
interface User {
  name: string;
  age: number;
}

type UserT = {
  name: string;
  age: number;
};
```

| | `interface` | `type` |
|---|---|---|
| Extending | `interface B extends A` | `type B = A & { ... }` (intersection) |
| Unions | ❌ can't represent a union | ✅ `type Id = string \| number` |
| Declaration merging | ✅ same name merges automatically | ❌ error on duplicate name |
| Best for | Object shapes / class contracts | Unions, tuples, intersections, mapped/conditional types |

**Say this in the interview:** "Use `interface` for object shapes and contracts, especially with classes, because it supports declaration merging and reads clearly with `extends`. Use `type` when you need something an interface can't express, like unions or intersections."

---

### 12. Union Types

A union means "this value is *one of* these types."

```ts
let id: string | number;
id = 101;
id = "EMP101";
```

Common real use case: an API field that might come back as either a number or a string depending on the backend, or a function that accepts a few different input shapes.

---

### 13. Intersection Types

An intersection means "this value must satisfy *all* of these types at once" — it combines them.

```ts
interface HasName { name: string }
interface HasAge  { age: number }

type Person = HasName & HasAge;

const p: Person = { name: "Ali", age: 25 };  // must have both
```

**Union vs intersection, in one line:** union = "either/or," intersection = "all combined together."

---

### 14. Literal Types

A literal type narrows a variable to one or a specific set of exact values, instead of the whole general type.

```ts
let direction: "left" | "right";
direction = "left";
// direction = "up"; // ❌ error — not one of the allowed values
```

Very useful for things like status flags, directions, or button variants where only a fixed set of strings is valid — it also plays nicely with discriminated unions (Q8).

---

### 15. Tuples

A tuple is an array with a **fixed length** and a **known type at each position** — unlike a normal array, where every element has the same type and the length is flexible.

```ts
let employee: [number, string] = [101, "Gull"];
// employee[0] is always number, employee[1] is always string
```

Common real use case: a function returning `[statusCode, message]`, or React's `useState` hook, which returns `[value, setterFunction]`.

---

### 16. Enums ⭐

An enum defines a fixed set of named constants — useful when a value should only ever be one of a small, known set of options.

```ts
// Numeric enum (auto-increments from 0 by default)
enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right   // 3
}

// String enum (values are explicit — usually preferred, easier to debug)
enum Role {
  Admin = "ADMIN",
  User = "USER"
}

const myRole: Role = Role.Admin;
```

There's also `const enum`, which is fully removed at compile time (inlined directly into the JS) for better performance — but it can't be used across some project setups (like `isolatedModules`).

**Say this in the interview:** "Enums give meaningful names to a fixed set of values, like roles or statuses. String enums are generally preferred over numeric ones because their values are self-explanatory when logged or debugged. That said, a lot of modern codebases use literal-type unions (`"ADMIN" | "USER"`) instead, since they compile away to nothing and behave more predictably."

---

### 17. Index Signatures

Used when you know the *type* of an object's keys and values, but not the exact key names in advance — e.g. a dictionary or lookup table.

```ts
interface StringDictionary {
  [key: string]: string;
}

const colors: StringDictionary = {
  red: "#ff0000",
  green: "#00ff00",
};
```

---

### 18. Optional (?) and readonly properties

```ts
interface User {
  id: number;
  name: string;
  nickname?: string;     // optional — may or may not be present
  readonly email: string; // can be set once, then never reassigned
}

const u: User = { id: 1, name: "Ali", email: "ali@test.com" };
// u.email = "new@test.com"; // ❌ error — readonly
```

`readonly` is a compile-time-only guarantee (it doesn't freeze the object at runtime like `Object.freeze` does), but it's very useful for signaling "this shouldn't change after creation," e.g. an ID.

---

## D. Functions

### 19. Function types, default & rest parameters

```ts
// Explicit parameter and return types
function add(a: number, b: number): number {
  return a + b;
}

// Default parameter
function greet(name: string, greeting: string = "Hello") {
  return `${greeting}, ${name}`;
}

// Rest parameter — collects the remaining arguments into a typed array
function sum(...nums: number[]): number {
  return nums.reduce((total, n) => total + n, 0);
}

// A variable that holds a function, typed with a function type
let multiply: (a: number, b: number) => number;
multiply = (a, b) => a * b;
```

---

### 20. Function Overloading

Overloading lets a single function accept different combinations of argument types, with TypeScript picking the right return type based on what was passed in. You write several **signatures**, then one real implementation that handles all of them.

```ts
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return typeof value === "string" ? value.trim() : value.toFixed(2);
}

format("  hi  ");  // uses the string signature
format(3.14159);   // uses the number signature
```

**Say this in the interview:** "Overloads let the function's type signature be more precise than a single union signature could be — callers see exactly which return type they'll get based on what they passed in."

---

## E. Generics & Advanced Types

### 21. Generics ⭐

Generics let you write a function, interface, or class that works with **any type**, while still keeping full type safety — instead of writing the same logic over and over for each type, or giving up and using `any`.

```ts
function identity<T>(value: T): T {
  return value;
}

const num = identity(10);       // T is inferred as number
const text = identity("Hello"); // T is inferred as string
```

Generics with constraints (limit `T` to types that have certain properties):

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("hello");     // ✅ strings have .length
getLength([1, 2, 3]);   // ✅ arrays have .length
```

Generic interface example:

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

const response: ApiResponse<string[]> = {
  data: ["a", "b"],
  success: true,
};
```

**Say this in the interview:** "Generics let you write one reusable piece of code that works across many types without losing type safety — the type is essentially a parameter, filled in when the function or class is actually used."

---

### 22. keyof and typeof operators

`keyof` produces a union of an object type's property names. `typeof` (in a type position) extracts the type of an existing variable.

```ts
interface User {
  id: number;
  name: string;
}

type UserKeys = keyof User;  // "id" | "name"

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Ali" };
type UserType = typeof user; // { id: number; name: string }
```

`keyof` is what makes functions like `getProp` above fully type-safe — you can only pass a key that actually exists on the object, and the return type is inferred correctly.

---

### 23. Mapped Types

A mapped type builds a new type by transforming every property of an existing type, in one line — this is actually how built-in utility types like `Partial` and `Readonly` (Q25) are implemented internally.

```ts
interface User {
  id: number;
  name: string;
}

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

type OptionalUser = {
  [K in keyof User]?: User[K];
};
```

---

### 24. Conditional Types

A conditional type picks between two types based on a condition — it's a type-level `if/else`.

```ts
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"
```

A common practical example is extracting a function's return type, which is exactly how the built-in `ReturnType<T>` utility works:

```ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "Ali" };
}

type UserFromFn = MyReturnType<typeof getUser>; // { id: number; name: string }
```

**Say this in the interview:** "Conditional types let a type resolve differently depending on another type — they're mostly used inside utility types rather than written by hand in everyday application code, but understanding them makes utility types much less 'magic.'"

---

### 25. Utility Types (Partial, Pick, Omit, Record, etc.) ⭐

Utility types are built into TypeScript and transform an existing type instead of making you rewrite it. These come up constantly in real code — forms, API layers, state management.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UpdateUser  = Partial<User>;              // every field optional — great for PATCH requests
type UserSummary = Pick<User, "name" | "email">; // only the picked fields
type UserNoId    = Omit<User, "id">;             // every field except "id"
type ReadOnlyUser = Readonly<User>;              // every field readonly
type UserMap      = Record<string, User>;        // dictionary keyed by string, valued as User

type Status = "active" | "inactive" | "banned";
type ActiveOnly = Exclude<Status, "banned">;      // "active" | "inactive"
type BannedOnly = Extract<Status, "banned">;      // "banned"
```

**The ones worth memorizing cold:** `Partial`, `Pick`, `Omit`, `Readonly`, `Record`. These four alone cover most day-to-day usage.

---

### 26. The satisfies operator

`satisfies` checks that a value matches a type, **without widening or losing** the value's own literal type — unlike a normal annotation, which forces the value into that broader type.

```ts
type Colors = "red" | "green" | "blue";

const palette = {
  primary: "red",
  secondary: "blue",
} satisfies Record<string, Colors>;

// palette.primary is still known as "red", not just "string"
// but TS still checked every value is a valid Colors member
```

**Say this in the interview:** "`satisfies` validates a value against a type while keeping the more specific inferred type — you get the safety of an annotation without losing precision, which a plain `: Type` annotation would cost you."

---

## F. Object-Oriented TypeScript

### 27. Classes and access modifiers ⭐

```ts
class Person {
  public name: string;      // accessible from anywhere (default if omitted)
  private age: number;      // accessible only inside this class
  protected id: number;     // accessible in this class and subclasses

  constructor(name: string, age: number, id: number) {
    this.name = name;
    this.age = age;
    this.id = id;
  }
}
```

Shorthand — you can declare and assign constructor parameters in one step:

```ts
class Person {
  constructor(
    public name: string,
    private age: number
  ) {}
}
```

**Say this in the interview:** "`public` is accessible everywhere and is the default, `private` is restricted to the declaring class only, and `protected` extends that access to subclasses too. This is compile-time enforcement — it's stripped away in the compiled JS."

---

### 28. Abstract classes

An abstract class is a base class that **cannot be instantiated directly** — it exists to be extended, and can define methods that subclasses are required to implement.

```ts
abstract class Shape {
  abstract getArea(): number;      // no body — subclasses must implement it

  describe(): string {              // a normal, shared method
    return `Area is ${this.getArea()}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

// const s = new Shape(); // ❌ error — can't instantiate an abstract class
```

**Say this in the interview:** "Abstract classes let you share common implementation across subclasses while forcing each subclass to provide its own version of certain methods — it's a middle ground between a plain base class and a pure interface."

---

### 29. A class implementing an interface

An interface can describe the contract a class must follow; the class then provides the actual implementation.

```ts
interface Printable {
  print(): void;
}

class Invoice implements Printable {
  print(): void {
    console.log("Printing invoice...");
  }
}
```

A class can implement multiple interfaces (`implements A, B`), but can only `extend` one class — this is TypeScript's way of avoiding the complications of true multiple inheritance.

---

## G. Modules & Project Setup

### 30. Modules (import/export)

Any file with a top-level `import` or `export` is treated as a module — its variables and functions are scoped to that file unless explicitly exported.

```ts
// math.ts
export function add(a: number, b: number) {
  return a + b;
}
export default function subtract(a: number, b: number) {
  return a - b;
}

// app.ts
import subtract, { add } from "./math";
```

**Say this in the interview:** "Modules keep each file's variables scoped locally instead of polluting a shared global scope, and they make dependencies between files explicit and easy to trace."

---

### 31. Namespaces vs Modules

Namespaces are an older TypeScript-only way to group related code under one name, using the global scope. Modules (ES modules, using `import`/`export`) are the modern standard and work identically to how JavaScript itself organizes code.

```ts
namespace Utils {
  export function double(n: number) {
    return n * 2;
  }
}

Utils.double(5);
```

**Say this in the interview:** "Namespaces predate ES modules and are mostly seen in older codebases or `.d.ts` files for global libraries. In modern TypeScript, ES modules (`import`/`export`) are the standard — they're portable, tree-shakeable, and match how JavaScript itself works."

---

### 32. Declaration files (.d.ts)

A `.d.ts` file contains only **type information**, no actual implementation — it's how TypeScript understands the shape of plain JavaScript libraries that don't have types built in.

```ts
// mylib.d.ts
declare function greet(name: string): string;
```

This is why installing a package sometimes involves also installing `@types/package-name` — that separate package is just its `.d.ts` declaration files.

---

## H. Async & Configuration

### 33. Promises and async/await

A `Promise` represents a value that will exist *eventually* — either resolved (success) or rejected (error). `async`/`await` is syntax that makes working with promises read like ordinary, top-to-bottom synchronous code.

```ts
function fetchUser(): Promise<{ id: number; name: string }> {
  return fetch("/api/user").then(res => res.json());
}

async function loadUser(): Promise<void> {
  try {
    const user = await fetchUser();
    console.log(user.name);
  } catch (error) {
    console.error("Failed to load user", error);
  }
}
```

An `async` function always returns a `Promise`, even if you write `return "done"` — TypeScript wraps it as `Promise<string>` automatically.

---

### 34. tsconfig.json and strict mode ⭐

`tsconfig.json` is the project's compiler configuration — it controls how TypeScript checks and compiles your files.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

Key options to know:
- **`target`** — which JavaScript version the code compiles down to
- **`module`** — which module system is used in the output (`commonjs`, `esnext`, etc.)
- **`strict`** — turns on the full set of strict type-checking rules (see below)
- **`include` / `exclude`** — which files are part of the compilation

`strict: true` is actually a shortcut that enables several checks at once, most notably:
- `strictNullChecks` — `null` and `undefined` aren't silently assignable to every type
- `noImplicitAny` — every value must have a known type, not a silent fallback to `any`

**Say this in the interview:** "`tsconfig.json` controls compiler behavior for the whole project. `strict` mode is considered a best practice for any real project because it enables checks like `strictNullChecks`, which catch a huge class of 'cannot read property of undefined' bugs before the code ever runs."

---

## I. Wrap-up

### 35. Cheat sheet — if you remember nothing else

- TypeScript = JavaScript + a compile-time type system. It compiles away completely; nothing about types exists at runtime.
- `any` disables checking (avoid it); `unknown` is the safe version that forces you to narrow first.
- `interface` → object shapes and class contracts. `type` → unions, intersections, and anything an interface can't express.
- Type guards (`typeof`, `instanceof`, `in`, custom `is` guards) are how you narrow a union inside a branch.
- Generics = one function/class/interface that works across many types, without losing type safety.
- Memorize `Partial`, `Pick`, `Omit`, `Readonly`, `Record` — they cover most real-world utility-type usage.
- `readonly` and access modifiers (`private`/`protected`) are compile-time only — they vanish in the compiled JS.
- Always enable `strict: true` in `tsconfig.json` for real projects.

---

**How to use this file for revision:** go through Sections A–D first (they're asked in almost every interview, junior to senior), then B/E for anything mid-to-senior level, then F–H if the role touches OOP-heavy code or larger codebases.