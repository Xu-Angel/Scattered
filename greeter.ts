class Student {
  fullName: string;
  constructor(public firstName, public middleInitial, public lastName) {
      this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person : Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

/**
 *@argument let list: number[] = [1, 2, 3];
 */
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let list3: Array<object> =[];
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = ['10', 55]; // Error

enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;