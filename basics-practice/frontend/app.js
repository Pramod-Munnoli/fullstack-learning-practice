// constructor
// function Person(name,age){
//    this.name=name;
//    this.age=age;
//    console.log(this);
// }

// Person.prototype.talk = function(){
// console.log(`my nme is ${this.name}`);
// }

// let p1= new Person("pramod",21);
// let p2= new Person("mallu",21);

class Person{
    constructor(name,age){
        console.log("Person class Constructer");
        this.name=name;
        this.age=age;
    }
talk(){
    console.log(`hi, i am ${this.name}`);
}
}

class Student extends Person {
   constructor(name,age,marks){
    console.log("Student class Constructer");
    super(name,age);
   this.marks=marks;
}
}
  
 
class Teacher extends Person {
   constructor(name,age,subject){
    console.log("Teacher class Constructer");
    super(name,age);
   this.subject=subject;
}
}
 