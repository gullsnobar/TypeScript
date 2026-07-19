# TypeScript Interview Notes

These notes are written to be practical, interview-focused, and useful for revision. They focus on the concepts that are most commonly asked and most important in real TypeScript projects.

---

## 1. What is TypeScript?

TypeScript is a superset of JavaScript developed by Microsoft. It adds static typing and better tooling on top of JavaScript.

### Why it matters

- Catch errors earlier during development
- Improve code clarity and maintainability
- Make large applications easier to manage
- Provide better IntelliSense and autocomplete in editors

### Example

```ts
let name: string = "Gull";
let age: number = 22;
```

### Interview answer

> TypeScript is JavaScript with extra features like type checking, interfaces, enums, and generics. It helps you write safer and more maintainable code.

---

## 2. Why do we need TypeScript?

JavaScript is dynamically typed, so many mistakes are found only at runtime. TypeScript helps catch them during development.

### Example

```js
function add(a, b) {
  return a + b;
}

add(10, "20"); // returns "1020"
```

```ts
function add(a: number, b: number): number {
  return a + b;
}

add(10, "20"); // error
```

### Key benefit

TypeScript prevents many basic mistakes before the code runs.

---

## 3. JavaScript vs TypeScript

| Feature | JavaScript | TypeScript |
|--------|-----------|------------|
| Typing | Dynamic | Static |
| Errors | Mostly runtime | Mostly compile-time |
| Tooling | Basic | Strong editor support |
| Scalability | Harder in large apps | Better for large apps |

### Interview answer

> JavaScript runs directly in the browser, while TypeScript must be compiled to JavaScript. TypeScript adds type safety and better developer experience.

---

## 4. What is Type Annotation?

A type annotation tells TypeScript the expected type of a value.

```ts
let username: string = "Gull";
let age: number = 22;

function greet(name: string): string {
  return `Hello, ${name}`;
}
```

### Why it is important

It makes code more predictable and helps prevent bugs.

---

## 5. What is Type Inference?

Type inference means TypeScript automatically detects the type of a value from its initialization.

```ts
let city = "Lahore"; // inferred as string
let marks = 95; // inferred as number
```

### Interview answer

> Type inference saves time by automatically assigning types when the value is obvious. Still, explicit annotations are better for function parameters and public APIs.

---

## 6. What are the basic types in TypeScript?

Common built-in types:

```ts
let isActive: boolean = true;
let score: number = 100;
let name: string = "Ali";
let values: string[] = ["a", "b"];
let userInfo: object = { name: "Gull" };
```

### Important note

Use specific types instead of `any` whenever possible.

---

## 7. What is the difference between `any`, `unknown`, and `never`?

### `any`

Disables type checking.

```ts
let value: any = 10;
value = "Hello";
```

### `unknown`

Represents an unknown type. You must narrow it before use.

```ts
let value: unknown = "Hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

### `never`

Represents values that never occur.

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

### Interview answer

> `any` is unsafe, `unknown` is safe but requires narrowing, and `never` means a function will never return normally.

---

## 8. What is the difference between `interface` and `type`?

Both define custom types, but they are used in slightly different ways.

### Interface

```ts
interface User {
  name: string;
  age: number;
}
```

### Type alias

```ts
type User = {
  name: string;
  age: number;
};
```

### Interview answer

> Use `interface` for object shapes and contracts. Use `type` when you need unions, intersections, tuples, or more advanced type composition.

---

## 9. What are Union Types?

A union type allows a value to be one of several types.

```ts
let id: string | number;

id = 101;
id = "EMP101";
```

### Interview answer

> Union types are useful when a value can be more than one type, such as an API response that may return either a number or a string.

---

## 10. What are Literal Types?

Literal types allow only specific values.

```ts
let direction: "left" | "right";

direction = "left";
// direction = "up"; // error
```

### Interview answer

> Literal types are very useful when you want to restrict a variable to a predefined set of valid values.

---

## 11. What is Type Assertion?

Type assertion tells TypeScript that you know the type better than it does.

```ts
let value: unknown = "Hello";
let length = (value as string).length;
```

### Important note

It does not change the runtime value. It only affects compile-time checking.

### Interview answer

> Type assertions are useful when you are sure about the type, but they should be used carefully because they can hide real runtime errors.

---

## 12. What are Type Guards?

Type guards help narrow a union type to a more specific type.

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

### Common type guards

- `typeof`
- `instanceof`
- `in`

### Interview answer

> Type guards are essential when working with unions because they help TypeScript understand which branch of the union you are currently using.

---

## 13. What are Enums?

An enum is a way to define a set of named constants.

### Numeric enum

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}
```

### String enum

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER"
}
```

### Interview answer

> Enums make code more readable by giving meaningful names to values. They are useful for roles, directions, and statuses, but many modern projects prefer string literal unions for simplicity.

---

## 14. What is a Tuple?

A tuple is an array with a fixed length and known types at each position.

```ts
let employee: [number, string] = [101, "Gull"];
```

### Interview answer

> Tuples are useful when you want a fixed structure, such as a response format like `[statusCode, message]`.

---

## 15. What are Generics?

Generics allow you to write reusable and flexible code while preserving type safety.

```ts
function identity<T>(value: T): T {
  return value;
}

const num = identity(10);
const text = identity("Hello");
```

### Why they are important

- Reusable code
- Strong type safety
- Better IntelliSense

### Interview answer

> Generics let you write one function, class, or interface that works with many types without losing type information.

---

## 16. What are Utility Types?

Utility types are built-in generic types that help transform existing types.

### Common ones

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UpdateUser = Partial<User>;
type UserSummary = Pick<User, "name" | "email">;
type ReadOnlyUser = Readonly<User>;
```

### Interview answer

> Utility types are very common in real-world TypeScript because they reduce duplication and help shape types for forms, APIs, and state management.

---

## 17. What are Modules?

Modules help split code into separate files with clear boundaries.

```ts
// math.ts
export function add(a: number, b: number) {
  return a + b;
}

// app.ts
import { add } from "./math";
```

### Interview answer

> Modules are used to organize code into reusable files. They avoid global scope pollution and improve maintainability.

---

## 18. What is `strict` mode in TypeScript?

Strict mode enables stronger type checking.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Why it is important

It helps catch more bugs earlier and makes the codebase safer.

---

## 19. What are classes and access modifiers?

Classes are used to model objects and behavior.

```ts
class Person {
  public name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

### Common modifiers

- `public` - accessible everywhere
- `private` - accessible only inside the class
- `protected` - accessible inside class and subclasses

### Interview answer

> Classes are the object-oriented way to structure TypeScript code, and access modifiers control how data is exposed.

---

## 20. What is `async/await` and `Promise`?

These are used for asynchronous operations.

```ts
async function fetchData(): Promise<string> {
  return "done";
}
```

### Interview answer

> `Promise` represents a future value, and `async/await` makes asynchronous code easier to read and manage.

---

## 21. What is the `tsconfig.json` file?

It is the TypeScript configuration file that controls how the compiler behaves.

### Important options

- `target` - which JavaScript version to compile to
- `module` - module system to use
- `strict` - enables strict type checking
- `include` / `exclude` - control which files are compiled

### Interview answer

> `tsconfig.json` is the main configuration file for TypeScript. It controls compiler behavior and project rules.

---

## 22. Important interview tips

- Prefer `unknown` over `any`.
- Use explicit return types for functions, especially public ones.
- Prefer `interface` for object contracts.
- Use `type` for unions, intersections, and utility types.
- Use `readonly` and `private` where appropriate.
- Learn `Partial`, `Pick`, `Omit`, `Readonly`, and `Record` well.
- Understand the difference between compile-time and runtime behavior.

---

## Quick revision summary

If you remember only a few things, remember these:

- TypeScript adds type safety to JavaScript.
- `any` is unsafe, `unknown` is safer.
- `interface` is best for object shapes.
- `type` is better for unions and complex types.
- Generics make code reusable and type-safe.
- Utility types are very common in real-world apps.
- `strict` mode is important for professional TypeScript projects.

