// What is Type Annotation

// Type Annotation ka matlab hai TypeScript ko pehle hi batana ke is variable mein kis type ki value hi store hogi.

// colon kay bad hum type define karty hain.

// TS static type ha.

let studentname: string = "Snobar";
let isLoggedIn: boolean = true;
let myage: number = 67;


console.log(studentname);

studentname = "Muhammad Tayyyab";
myage = 23;



// TypeScript

// Run se pehle error dikha do

// Isi wajah se TypeScript ko safer language kehte hain.


// TypeScript: Type Inference


// Type Inference ka matlab hai TypeScript khud automatically determine kar leti hai ke kisi variable ki type kya hai, bina humein explicitly type likhne ki zaroorat ke.


let nameStudent = "Dadood"


// Practical example

let studentName = "Gull";
let ageStudent = 22;
let cgpa = 6.8;
let isGraduated = true;
let university = "University of Education"
let skills = ["Html","CSS","JS","React"]

let student = {
  name: "Gull",
  age: 22,
  isGraduated: true,
};

console.log(studentName);
console.log(cgpa);
console.log(skills);
console.log(student);


// Tuples in TypeScript

// A Tuple in TypeScript is a special type of array where you define:

// How many elements it should contain
// What type each element should have
// The order of those types

let user: [string, number];

user = ["Gull", 22]; // Correct



