// Wrap everything in an immidiately-invoked anonymous function
// so we don't pollute global scope
(function() {
  /**
   * Add a class to inputs when they have text entered
   * so we can style them, and also collect info in an object
   */
  const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
  const today = new Date();
  const startDate = document.querySelector('input[name="start-date"]');
  const endDate = document.querySelector('input[name="end-date"]');
  const setUsed = i =>
    (i.className = i.value || i.type === "date" ? "used" : "");
  [...document.querySelectorAll(".material-input input")].forEach(input => {
    input.addEventListener("change", function(ev) {
      setUsed(this);
    });
    // run once for elements with prefilled values to display correctly
    setUsed(input);
  });

  startDate.setAttribute(
    "min",
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  );

  startDate.addEventListener("change", () =>
    endDate.setAttribute("min", startDate.value)
  );

  const data = new Proxy(
    {},
    (handler = {
      get: (target, name) => {
        const el = document.forms[0].elements[name];
        return el.type === "checkbox" ? el.checked : el.value;
      }
    })
  );
  function computeState() {
    let bill = [];
    const stayLength =
      (new Date(data["end-date"]) - new Date(data["start-date"])) /
      ONE_DAY_IN_MS;
    if (stayLength <= 0) {
      alert("Departure date must be after arrival date.");
      return;
    }
    let perNightCost;
    if (data.room === "standard") {
      perNightCost = 100;
    } else if (data.room === "spacious") {
      perNightCost = 120;
    } else if (data.room === "luxury") {
      perNightCost = 150;
    }
    bill.push(
      `${data.room.charAt(0).toUpperCase() +
        data.room.slice(1)} Room&Tab;$${perNightCost} / night`
    );
    if (data.meals) {
      perNightCost += 40;
      bill.push("Meals&Tab;&Tab;$40 / night");
    }
    if (data.pool) {
      perNightCost == 20;
      bill.push("Pool View&Tab;$20 / night");
    }

    // For more than 3 children/room, charge $10 extra per child
    if (data.children > 3) {
      perNightCost += (data.children - 3) * 10;
      bill.push(`Child Fee&Tab;$${(data.children - 3) * 10} / night`);
    }

    bill.push("");
    bill.push(
      `$${perNightCost} × ${stayLength} days&Tab;$${stayLength * perNightCost}`
    );
    bill.push(`HST&Tab;&Tab;$${(stayLength * perNightCost * 0.13).toFixed(2)}`);
    const total = stayLength * perNightCost * 1.13;
    bill.push("----------------------------");
    bill.push(`<span id="total">Total:&Tab;&Tab;$${total.toFixed(2)}</span>`);

    document.querySelector("#bill pre").innerHTML = bill.join("\n");
  }
  document.querySelector("#form").addEventListener("submit", () => {
    computeState();
  });
})();
