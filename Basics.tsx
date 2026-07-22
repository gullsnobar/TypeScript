// Example

function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message: string = greet("World");
console.log(message);


// Varibales in TypeScript

let username: string = "Ali";
let age: number = 23;
let isStudent: boolean = true;
let hobbies: string[] = ["reading", "coding"];
let score: number | null = null;
let city: string = "Karachi"

// Topic 2: Data Types in TypeScript

let id: number = 567;
let nameName: string = "Snobar";
let isActive: boolean = false;
let notAssigned: undefined = undefined;
let empty: null = null;


enum Status {
  Pending,
  Approved,
  Rejected,
}

let orderStatus: Status = Status.Approved;