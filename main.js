// Wrap everything in an immidiately-invoked anonymous function
// so we don't pollute global scope
// (function() {
/**
 * Add a class to inputs when they have text entered
 * so we can style them, and also collect info in an object
 */
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const startDate = document.querySelector('input[name="start-date"]');
const endDate = document.querySelector('input[name="end-date"]');
const data = {};
const setUsed = i => (i.className = i.value || i.type === "date" ? "used" : "");
[...document.querySelectorAll("input")].forEach(input => {
  input.addEventListener("change", function(ev) {
    if (this.parentNode.className.includes("material-this")) {
      setUsed(this);
    }
    console.log(`${this.name}: ${data[this.name]} ${this.value}`);
    data[this.name] = this.value;
    computeState();
  });
  // run once for elements with prefilled values to display correctly
  setUsed(input);
});

function computeState() {
  const stayLength =
    (new Date(data["end-date"]) - new Date(data["start-date"])) / ONE_DAY_IN_MS;
  console.log(stayLength);

  if (Number.isNaN(stayLength)) {
  }
  let perNightCost;
  if (data.room === "standard") {
    perNightCost = 100;
  } else if (data.room === "spacious") {
    perNightCost = 120;
  } else if (data.room === "luxury") {
    perNightCost = 150;
  }
  if (data.meals) {
    perNightCost += 40;
  }
  if (data.pool) {
    perNightCost == 20;
  }
  // For more than 3 children/room, charge $10 extra per child
  if (data.children > 3) {
    perNightCost += (data.children - 3) * 10;
  }
  const total = stayLength * perNightCost * 1.13;
  document.querySelector("#total").innerHTML = Number.isNaN(total)
    ? ""
    : `Total: $${total.toFixed(2)}`;
}
// })();
