//Asynchronous JS
// console.log("Start");
// setTimeout(() => {
//   console.log("Hi from setTimeout");
// });
// console.log("End");
//start, end, hii

// Callbacks, promises, async await

// Callbacks -> function passed as an args

// function test(callback) {
//   setTimeout(() => {
//     callback("Dtaa sendingg");
//   }, 1000);
//   // Pyramid of doom
// }

// test((data) => console.log(data));

// promises
//promise chainug
// multiple async operationds
// .then .catch
// const pr = new Promise((res, rej) =>
//   setTimeout(() => {
//     console.log("hii");
//     res("Hii I am resolved"), 100;
//   })
// );
// pr.then((val) => console.log("value", val)).catch((err) =>
//   console.log("err", err)
// );

// console.log("pr", pr);

// Promise chaing

const stepOne = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("Step one completed");
      res(1);
    }, 1000);
  });
};

const stepTwo = (res1) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("step2");
      res(res1 * 2);
    }, 1000);
  });
};

const step3 = (res2) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("This is step 3");
      res(res2 * 3);
    });
  });
};

// stepOne()
//   .then((res1) => stepTwo(res1))
//   .then((res2) => step3(res2))
//   .then((val) => console.log("final result", val))
//   .catch((err) => console.log("error", err));

//Async await

const result = async () => {
  try {
    const result1 = await stepOne();
    const result2 = await stepTwo(result1);
    const finalResult = await step3(result2);
    console.log("final result", finalResult);
  } catch (err) {
    console.log("error", err);
  }
};
result();

const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const email = "axy@gmail.com";
console.log(typeof regex);
console.log(regex.test(email));

// const el = doc.getelemnt ("")
el.setAttribute("class", "xuyz");
const val = el.getAttribute("class");
//val -> xyz
