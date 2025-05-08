// const parent = document.body.querySelector(".parent");

// const addChild = document.body.querySelector("#add-child");
// const removeChild = document.body.querySelector("#remove-child");
// addChild.addEventListener("click", () => {
//   if (parent.childNodes.length > 1) return;
//   const child = document.createElement("div");
//   child.classList.add("child");
//   child.textContent = "child1";
//   parent.appendChild(child);
// });

// removeChild.addEventListener("click", () => {
//   //removeChild
//   const child = document.body.querySelector(".child");
//   parent.removeChild(child);
// });

// async operation
//API
// fetch, axios
// callbacks, promises, async await
// how does it handle blocking code
// event loops
//callback que, microtask que
// const now = new Date();
// const options = {
//   hour: "numeric",
//   minute: "numeric",
//   second: "numeric",
//   timeZone: "Asia/Kolkata",
//   timeZoneName: "short",
// };

// const dateFormatter = new Intl.DateTimeFormat("en-US", options);
// const formattedDate = dateFormatter.format(now);
// console.log(formattedDate);
// function add(a, b) {
//   return a + b;
// }
// const arr = [1, 2, 3, 4];

// const updatedDaTA = arr.map((item) => item * 2);

// impure function
//can produce diff output
// side effects, external state

// let store = 0;

// function add(num) {
//   store = store + num;
//   return store;
// }
// function to change into string

// let count = 0;

// function increase() {
//   return count++;
// }
// this.name = "xyz";
// const obj = {
//   name: "kritica",
//   test: function () {
//     console.log("fn1", this.name);
//   },
//   arrow: () => {
//     console.log("arr", this.name);
//   },
// };
// obj.test();
// obj.arrow();

// function test1() {
//   console.log("hii");
// }
// console.log(test1);

// test();
// arrow();
// function test() {
//   console.log("hiii");
// }
// const arrow = () => {
//   console.log("arrrow");
// };

// function test() {
//   console.log(a);
//   {
//     var a = 10;
//   }
// }
// test();
//1. function cam as values
//2. passed as args
//3. return fn
function test() {
  return function () {
    console.log("hello worl");
  };
}
const test1 = test();
//100000lines

test1();
console.log(test1());
