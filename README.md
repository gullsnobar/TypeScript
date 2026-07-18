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

An enum is a way to define a set of named constants, making code easier to read and maintain.

### Numeric Enum

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

console.log(Direction.Left);
```

### String Enum

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER"
}
```

### Real-world Example

```ts
enum OrderStatus {
  Pending,
  Processing,
  Delivered
}
```

### Advantages

- Improves readability
- Prevents magic numbers and strings
- Improves maintainability

### Interview Tip

Modern TypeScript projects often prefer string literal unions over enums in many cases because they generate less runtime code.

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

## Summary of Questions 11–20

1. What is `never`?
2. What is `void`?
3. What are Union Types?
4. What are Literal Types?
5. What is Type Assertion?
6. What is an Enum?
7. What is a Tuple?
8. What are Generics?
9. What are Type Guards?
10. What are `keyof` and `typeof`?

These topics cover many of the concepts that appear repeatedly in TypeScript interviews and form the foundation for more advanced topics such as utility types, conditional types, mapped types, and React with TypeScript.
