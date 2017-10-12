// Wrap everything in an immidiately-invoked anonymous function
// so we don't pollute global scope
(function() {
  /**
     * Add a class to inputs when they have text entered
     * so we can style them
     */
  const selectors = ["text", "email"]
    .map(sel => `input[type="${sel}"]`)
    .join(",");
  [...document.querySelectorAll(selectors)].forEach(input => {
    input.addEventListener("blur", _ => {
      input.className = input.value ? "used" : "";
    });
  });
})();
