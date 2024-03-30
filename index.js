const parent = document.body.querySelector(".parent");

const addChild = document.body.querySelector("#add-child");
const removeChild = document.body.querySelector("#remove-child");
addChild.addEventListener("click", () => {
  if (parent.childNodes.length > 1) return;
  const child = document.createElement("div");
  child.classList.add("child");
  child.textContent = "child1";
  parent.appendChild(child);
});

removeChild.addEventListener("click", () => {
  //removeChild
  const child = document.body.querySelector(".child");
  parent.removeChild(child);
});

// async operation
//API
// fetch, axios
// callbacks, promises, async await
// how does it handle blocking code
// event loops
//callback que, microtask que
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Asia/Kolkata",
  timeZoneName: "short",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", options);
const formattedDate = dateFormatter.format(now);
console.log(formattedDate);
