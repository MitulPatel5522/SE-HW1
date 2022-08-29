function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function submit() {
  let input_ = document.getElementById("op").value;
  let a = parseFloat(document.getElementById("a").value);
  let b = parseFloat(document.getElementById("b").value);
  let p = document.getElementById("ans");

  if (isNaN(a) || isNaN(b)) {
    p.innerText = "Incorrect input";
    return;
  }

  if (input_ === "+" || input_ === "1") {
    p.innerText = `Answer is ${add(a, b)}`;
    return;
  } else if (input_ === "-" || input_ === "2") {
    p.innerText = `Answer is ${subtract(a, b)}`;
    return;
  } else if (input_ === "*" || input_ === "3") {
    p.innerText = `Answer is ${multiply(a, b)}`;
    return;
  } else if (input_ === "/" || input_ === "4") {
    p.innerText = `Answer is ${divide(a, b)}`;
    return;
  } else {
    p.innerText = "Incorrect input, please try again";
    return;
  }
}

module.exports = { add, subtract, multiply, divide };
