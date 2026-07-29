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

// What are Primitive Types?

// Primitive types are the basic/simple data types used to represent single values.

let nameClass: string = "Class 6"
let userName: string = "Gull";

userName = "Ali";
userName = "Ahmed";

//  What is an Array?

// An array is a collection of multiple values stored in a single variable.

let fruits: string[] = ["apple", "mango", "banana"];
let nameStu: string[] = ["Gull","Ali","Ahmd"];

// String Array

let skill: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "TypeScript"
];

skills.push("Next.js")
console.log(skill[0]);

// push method

let skill_1 : string[] =["HTML", "CSS3"];
skill_1.push("Javascript");
console.log(skill_1);



// Number Array

let marks: number[] = [78,67,89,34,56];
marks.push(73)


// Type Inference with Arrays
// You don't always need to explicitly write the type.

let cities = ["lahore", "kasur", "Islamabad"]