class Human {
  constructor(_name, _dob, _gender) {
    this.name = _name;
    this.age = _dob;
    this.gender = _gender;
  }
  speak() {
    console.log(`I am ${this.name} and I can speak`);
  }

  get currentAge() {
    var currentYear = new Date().getFullYear();
    return currentYear - this.age;
  }
}
class SuperHuman extends Human {
  constructor(_name, _dob, _gender, _superpower) {
    super(_name, _dob, _gender);
    this.superpower = _superpower;
  }
}
var kritica = new Human("Kritica", 1999, "female");
var demo = new Human("Demo", 2000, "male");
kritica.speak();
demo.speak();
console.log("kritica", kritica);
console.log("age", demo.currentAge);

var superHuman = new SuperHuman("xyz", 1990, "male");
console.log("SuperHuman", superHuman);

function test() {
  return "Hello World";
}
