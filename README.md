# TypeScript Interview Questions and Notes

This file contains clean and structured notes on common TypeScript interview questions.

---

## 1. What is TypeScript?

TypeScript is an open-source programming language developed by Microsoft. It is a superset of JavaScript, which means every valid JavaScript code is also valid TypeScript.

TypeScript adds useful features such as:

- Static typing
- Interfaces
- Enums
- Generics
- Type aliases
- Better tooling like IntelliSense and autocomplete
- Compile-time error checking

TypeScript code is compiled into JavaScript before it runs in the browser or in Node.js.

### Example

```ts
let username: string = "Gull";
let age: number = 22;

console.log(username, age);
```

### Interview Tip

> TypeScript improves JavaScript by adding static type checking while staying compatible with JavaScript.

---

## 2. Why do we need TypeScript?

JavaScript is dynamically typed, so many errors are found only at runtime. TypeScript helps catch these issues earlier during development.

### JavaScript Example

```js
function add(a, b) {
  return a + b;
}

add(10, "20");
```

This gives output:

```js
1020
```

### TypeScript Example

```ts
function add(a: number, b: number): number {
  return a + b;
}

add(10, "20");
```

This produces a compiler error:

```ts
Argument of type 'string' is not assignable to parameter of type 'number'.
```

### Benefits of TypeScript

- Catches errors early
- Improves IDE support
- Makes refactoring easier
- Produces more reliable and maintainable code
- Helps in building larger applications safely

---

## 3. What is the difference between JavaScript and TypeScript?

| Feature | JavaScript | TypeScript |
|--------|-----------|------------|
| Typing | Dynamically typed | Statically typed |
| Errors | Mostly at runtime | Caught during compilation |
| Interfaces | Not supported | Supported |
| Generics | Not supported | Supported |
| Execution | Runs directly in browsers | Must be compiled to JavaScript |
| Best for | Small scripts | Medium and large applications |

### Example

#### JavaScript

```js
let age = 20;
age = "Twenty";
```

This is allowed.

#### TypeScript

```ts
let age: number = 20;
age = "Twenty";
```

This causes a compiler error.

---

## 4. What is Static Typing?

Static typing means the type of a variable is checked before the program runs.

TypeScript uses static typing to detect incorrect assignments and incompatible operations during compilation.

### Example

```ts
let price: number = 1500;
price = 2000;
```

Valid.

```ts
let price: number = 1500;
price = "Cheap";
```

This causes a compiler error.

### Why is it useful?

- Reduces runtime bugs
- Improves code quality
- Makes refactoring safer

---

## 5. What is Type Inference?

Type inference is the ability of TypeScript to automatically determine the type of a variable based on its initial value.

### Example

```ts
let city = "Lahore";
```

TypeScript infers:

```ts
let city: string;
```

Another example:

```ts
let marks = 95;
```

This is inferred as:

```ts
number
```

### Interview Tip

Use type inference when the type is obvious. Use explicit annotations for function parameters and public APIs.

---

## 6. What is the difference between any and unknown?

This is a very common TypeScript interview question.

### any

The `any` type disables type checking.

```ts
let value: any = 10;
value = "Hello";
value.toUpperCase();
```

No compiler error appears.

### unknown

The `unknown` type means the value has an unknown type. You must narrow or assert the type before using it.

```ts
let value: unknown = "Hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

### Key Difference

| Type | Behavior |
|------|----------|
| `any` | Disables type checking and allows any operation |
| `unknown` | Keeps type safety and requires narrowing |

### Interview Tip

> Use `unknown` when you do not know the type yet. Use `any` only as a last resort.

---

## 7. What is the difference between interface and type?

Both are used to define custom types in TypeScript.

### Interface

```ts
interface User {
  name: string;
  age: number;
}
```

### Type Alias

```ts
type User = {
  name: string;
  age: number;
};
```

### Main Differences

| Feature | Interface | Type Alias |
|--------|-----------|------------|
| Best for | Object shapes | Objects, unions, intersections, primitives, tuples |
| Declaration merging | Supported | Not supported |
| Extending | Can extend | Can use intersections with `&` |

### Interview Tip

Use interfaces for object contracts. Use type aliases when you need unions, intersections, or more complex type compositions.

---

## 8. What is a Superset of JavaScript?

A superset is a language that contains all the features of another language and adds more features on top.

TypeScript includes:

- All valid JavaScript syntax
- Static types
- Interfaces
- Enums
- Generics
- Advanced type system

Every JavaScript file is valid TypeScript.

### Example

#### JavaScript

```js
console.log("Hello");
```

#### TypeScript

```ts
console.log("Hello");
```

Additional TypeScript feature:

```ts
let age: number = 20;
```

---

## 9. Does TypeScript run directly in the browser?

No. Browsers understand only JavaScript.

TypeScript must first be compiled into JavaScript using the TypeScript compiler (`tsc`).

### Flow

```text
TypeScript (.ts)
  ↓
TypeScript Compiler (tsc)
  ↓
JavaScript (.js)
  ↓
Browser / Node.js
```

### Example

#### Input

```ts
let age: number = 20;
```

#### Generated JavaScript

```js
let age = 20;
```

---

## 10. What is Type Annotation?

A type annotation explicitly tells TypeScript the expected type of a variable, parameter, or return value.

### Variable

```ts
let username: string = "Gull";
```

### Function

```ts
function square(num: number): number {
  return num * num;
}
```

### Without Annotation

```ts
let username = "Gull";
```

TypeScript infers it as a string.

### When should you use annotations?

- For function parameters
- For function return types, especially in public APIs
- For complex objects
- For shared interfaces and models

For local variables with obvious initial values, type inference is often enough.

---

## 11. What is the `never` type in TypeScript?

The `never` type represents values that never occur. It is used when a function never returns normally, such as when it always throws an error or runs forever.

Unlike `void`, which means "returns nothing", `never` means the function never completes.

### Example 1: Function throws an error

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

### Example 2: Infinite loop

```ts
function infiniteLoop(): never {
  while (true) {}
}
```

### Real-world Example

```ts
function unauthorized(): never {
  throw new Error("Unauthorized User");
}
```

### Difference between `never` and `void`

| Type | Meaning |
|------|---------|
| `void` | Function completes normally but does not return a value |
| `never` | Function never completes |

### Interview Tip

> `never` is commonly used for exhaustive checks in `switch` statements and functions that always throw errors.

---

## 12. What is `void` in TypeScript?

The `void` type indicates that a function does not return any value. The function executes normally but has no return result.

### Example

```ts
function greet(name: string): void {
  console.log(`Hello ${name}`);
}
```

### Wrong Example

```ts
function greet(): void {
  return "Hello";
}
```

This causes a compiler error:

```ts
Type 'string' is not assignable to type 'void'.
```

### Real-world Example

```ts
function log(message: string): void {
  console.log(message);
}
```

### Interview Tip

> Most event handlers such as `onClick` and `onSubmit` return `void`.

---

## 13. What are Union Types?

A union type allows a variable to store multiple possible types using the `|` operator.

### Example

```ts
let id: string | number;

id = 101;
id = "EMP101";
```

### Example with Function

```ts
function printId(id: string | number) {
  console.log(id);
}
```

### Real-world Example

```ts
type UserId = number | string;
```

### Benefits

- Flexible
- Type-safe
- Reduces unnecessary use of `any`

### Interview Tip

> Before using methods specific to one type, you must narrow the union.

---

## 14. What are Literal Types?

Literal types restrict a variable to specific exact values rather than a general type.

### Example

```ts
let direction: "left" | "right";
```

Valid:

```ts
direction = "left";
direction = "right";
```

Invalid:

```ts
direction = "up";
```

### Real-world Example

```ts
type OrderStatus = "Pending" | "Delivered" | "Cancelled";
```

### Interview Tip

Literal types are commonly used with APIs and state management to prevent invalid values.

---

## 15. What is Type Assertion?

Type assertion tells the compiler that you know the type better than it does.

It does not change the runtime value; it only affects compile-time type checking.

### Using `as`

```ts
let value: unknown = "Hello";

let length = (value as string).length;
```

### Angle-bracket Syntax

```ts
let value: unknown = "Hello";

let length = (<string>value).length;
```

> In React and JSX, prefer `as` because angle brackets can conflict with JSX syntax.

### Real-world Example

```ts
const input = document.getElementById("email") as HTMLInputElement;

console.log(input.value);
```

### Interview Tip

Type assertions do not perform runtime validation. If your assumption is wrong, runtime errors can still occur.

---

## 16. What is an Enum?

An enum (short for enumeration) is a TypeScript feature that lets you define a set of named constants. It is useful when you want to give meaningful names to a fixed group of related values such as directions, roles, or status codes.

### Why do we use Enums?

Enums make code easier to read and maintain. Instead of using raw numbers or strings everywhere, you can use descriptive names.

### Numeric Enum

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction.Left); // 2
```

By default, the first value starts from `0`, and each next value increases by `1`.

### Custom Numeric Enum

```ts
enum StatusCode {
  Success = 200,
  BadRequest = 400,
  Unauthorized // 401
}
```

### String Enum

```ts
enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  User = "USER"
}
```

String enums store readable string values and are often preferred for debugging and serialization.

### Heterogeneous Enum

```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES"
}
```

This is possible, but it is usually discouraged because it can reduce clarity.

### Reverse Mapping (Numeric Enums Only)

Numeric enums generate a reverse mapping in JavaScript, which means you can access both the value and the name.

```ts
enum Status {
  Active = 1
}

console.log(Status.Active); // 1
console.log(Status[1]); // "Active"
```

### Const Enum

```ts
const enum Sizes {
  Small,
  Medium
}
```

A `const enum` is optimized for performance because TypeScript inlines the values and removes the runtime enum object.

### Advantages

- Improves readability
- Avoids magic numbers and strings
- Makes code easier to maintain

### Interview Tip

> Enums are useful for named constants, but many modern TypeScript projects prefer string literal unions or objects with `as const` because they are simpler and produce less runtime code.

---

## 17. What is a Tuple?

A tuple is a fixed-length array where each position has a predefined type.

### Example

```ts
let employee: [number, string];

employee = [101, "Gull"];
```

### Invalid Example

```ts
employee = ["Gull", 101];
```

### Real-world Example

```ts
type ApiResponse = [number, string];

const response: ApiResponse = [200, "Success"];
```

### Array vs Tuple

| Feature | Array | Tuple |
|--------|-------|-------|
| Data type | Same type usually | Different types allowed |
| Length | Variable | Fixed |
| Structure | Flexible | Strict |

---

## 18. What are Generics?

Generics allow you to write reusable and type-safe code that works with different data types while preserving type information.

### Without Generic

```ts
function getNumber(value: number) {
  return value;
}
```

### With Generic

```ts
function getValue<T>(value: T): T {
  return value;
}

getValue(10);
getValue("Hello");
getValue(true);
```

### Real-world Example

```ts
function firstElement<T>(arr: T[]): T {
  return arr[0];
}
```

### Benefits

- Reusable
- Flexible
- Type-safe

### Interview Tip

Generics preserve the type passed into them, unlike `any`, which loses type information.

---

## 19. What are Type Guards?

A type guard is a technique that narrows a variable from a broader type, such as a union, to a more specific type before you use it.

### Example using `typeof`

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

### Example using `instanceof`

```ts
class Dog {}

const pet = new Dog();

if (pet instanceof Dog) {
  console.log("Dog Object");
}
```

### Example using `in`

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}
```

### Interview Tip

Common type guards include `typeof`, `instanceof`, `in`, and user-defined type guards.

---

## 20. What are `keyof` and `typeof` in TypeScript?

### `keyof`

`keyof` creates a union of an object's property names.

```ts
type User = {
  name: string;
  age: number;
};

type Keys = keyof User;
```

`Keys` becomes:

```ts
"name" | "age"
```

### `typeof`

`typeof` gets the type of an existing variable or value.

```ts
const person = {
  name: "Gull",
  age: 22
};

type PersonType = typeof person;
```

`PersonType` becomes:

```ts
{
  name: string;
  age: number;
}
```

### Real-world Example

```ts
const config = {
  api: "/users",
  timeout: 5000
};

type Config = typeof config;
type ConfigKey = keyof Config;
```

`ConfigKey` becomes:

```ts
"api" | "timeout"
```

### Interview Tip

A common pattern is combining them to build strongly typed utility functions.

---

## 21. What are Generics in TypeScript?

### Interview Question

**Q: What are Generics in TypeScript?**

### Answer

Generics are a TypeScript feature that allows you to write reusable, flexible, and type-safe code. Instead of writing separate functions or classes for different data types, you can write one generic version that works with many types while preserving type information.

### Why do we need Generics?

Without generics, you would need separate functions for each type.

#### Without Generics

```ts
function getNumber(value: number): number {
  return value;
}

function getString(value: string): string {
  return value;
}
```

#### With Generics

```ts
function getValue<T>(value: T): T {
  return value;
}

console.log(getValue(10));
console.log(getValue("Gull"));
console.log(getValue(true));
```

One function works for every type.

### What does `<T>` mean?

`T` is called a type parameter. You can name it anything.

```ts
function identity<DataType>(value: DataType): DataType {
  return value;
}
```

### Real-world Example

```ts
function getData<T>(data: T): T {
  return data;
}

const user = getData({
  id: 1,
  name: "Gull"
});
```

TypeScript now knows that `user` has `id` and `name`.

### Generic Array

```ts
function firstElement<T>(arr: T[]): T {
  return arr[0];
}

console.log(firstElement([10, 20, 30]));
console.log(firstElement(["A", "B", "C"]));
```

### Generic Interface

```ts
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = {
  value: 100
};

const stringBox: Box<string> = {
  value: "Hello"
};
```

### Generic Class

```ts
class Storage<T> {
  constructor(public data: T) {}

  getData(): T {
    return this.data;
  }
}

const user = new Storage<string>("Gull");
console.log(user.getData());
```

### Advantages

- Code reusability
- Type safety
- Better IntelliSense
- Less duplication
- Easier maintenance

### Interview Tip

> Generics preserve the type that is passed in. Unlike `any`, they do not lose type information.

---

## 22. What are Utility Types?

### Interview Question

**Q: What are Utility Types in TypeScript?**

### Answer

Utility Types are built-in generic types provided by TypeScript to transform or derive new types from existing ones without rewriting them manually. They help reduce duplication and improve maintainability.

### Why do we need Utility Types?

Suppose we have:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
```

Now imagine a profile update form where only some fields may be sent. Instead of creating a second interface manually, you can use `Partial`.

### 1. Partial

Makes all properties optional.

```ts
interface User {
  id: number;
  name: string;
  age: number;
}

type UpdateUser = Partial<User>;
```

Equivalent to:

```ts
{
  id?: number;
  name?: string;
  age?: number;
}
```

### Example

```ts
const user: Partial<User> = {
  name: "Ali"
};
```

### 2. Required

Makes every property mandatory.

```ts
interface User {
  id?: number;
  name?: string;
}

type CompleteUser = Required<User>;
```

### 3. Readonly

Prevents modification.

```ts
interface User {
  id: number;
  name: string;
}

const user: Readonly<User> = {
  id: 1,
  name: "Gull"
};

user.name = "Ali";
```

### 4. Pick

Creates a new type by selecting specific properties.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserName = Pick<User, "name" | "email">;
```

### 5. Omit

Removes selected properties.

```ts
type PublicUser = Omit<User, "email">;
```

### 6. Record

Creates an object type with specific keys and value types.

```ts
type Students = Record<string, number>;

const marks: Students = {
  Ali: 90,
  Ahmed: 85,
  Sara: 95
};
```

### Most Used Utility Types

| Utility Type | Purpose |
|--------------|---------|
| `Partial` | Makes properties optional |
| `Required` | Makes properties required |
| `Readonly` | Makes properties read-only |
| `Pick` | Selects specific properties |
| `Omit` | Removes selected properties |
| `Record` | Creates key-value object types |

### Interview Tip

> `Partial`, `Pick`, `Omit`, and `Readonly` are the utility types you will encounter most often in real-world React and Node.js projects.

---

## 23. What are Modules?

### Interview Question

**Q: What are Modules in TypeScript?**

### Answer

A module is a file that has its own scope and contains at least one `import` or `export` statement. Modules help organize code into smaller, reusable pieces and avoid polluting the global scope. TypeScript follows the JavaScript ES Modules standard.

### Why do we need Modules?

Without modules, everything is placed in one large file, which becomes difficult to maintain.

#### With Modules

```text
User.ts
Product.ts
Order.ts
Payment.ts
```

Each file has one responsibility.

### Export

```ts
export const PI = 3.14;

export function add(a: number, b: number) {
  return a + b;
}
```

### Import

```ts
import { PI, add } from "./math";

console.log(PI);
console.log(add(10, 20));
```

### Default Export

```ts
export default function greet() {
  console.log("Hello");
}
```

Import:

```ts
import greet from "./greet";

greet();
```

### Named Export

```ts
export const city = "Lahore";
export const country = "Pakistan";
```

Import:

```ts
import { city, country } from "./location";
```

### Default vs Named Export

| Type | Description |
|------|-------------|
| Default Export | One default export per file |
| Named Export | Multiple named exports allowed |

### Real-world Project Structure

```text
src/
  models/
    User.ts
  services/
    api.ts
  utils/
    helper.ts
  components/
    Navbar.tsx
  App.tsx
```

### Advantages

- Better organization
- Reusable code
- Easier testing
- Avoids global variables
- Improves maintainability
- Supports team collaboration

### Interview Tip

> In TypeScript and modern JavaScript, any file containing a top-level `import` or `export` is treated as a module.

---

## Quick Revision Table

| Concept | Main Purpose | Common Interview Question |
|---------|--------------|----------------------------|
| Generics | Write reusable, type-safe code | Why use Generics instead of `any`? |
| Utility Types | Transform existing types | Explain `Partial`, `Pick`, `Omit`, and `Readonly` |
| Modules | Organize code using `import` and `export` | Difference between default and named exports? |

These three topics are considered intermediate-to-advanced TypeScript concepts and are asked frequently in interviews for React, Next.js, Angular, Node.js, and full-stack development roles.

