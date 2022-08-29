const {
  fireEvent,
  getByText,
  queryByText,
  getByTestId,
} = require("@testing-library/dom");
require("@testing-library/jest-dom/extend-expect");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const { add, subtract, multiply, divide } = require("../code/calculator");

const html = fs.readFileSync(
  path.resolve(__dirname, "../code/index.html"),
  "utf8"
);
const scriptContent = fs.readFileSync(
  path.resolve(__dirname, "../code/calculator.js"),
  "utf8"
);

let dom;
let container;

describe("unit tests", () => {
  it("adds 1 and 2 to be 3", () => {
    expect(add(1, 2)).toBe(3);
  });
  it("subtracts 4 and 2 to be 2", () => {
    expect(subtract(4, 2)).toBe(2);
  });
  it("adds 1 and 2 to be 2", () => {
    expect(multiply(1, 2)).toBe(2);
  });
  it("divides 4 and 2 to be 2", () => {
    expect(divide(4, 2)).toBe(2);
  });
});

describe("index.html", () => {
  beforeEach(() => {
    dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable",
    });
    const document = dom.window.document;
    let scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);
    container = dom.window.document.body;
  });

  it("renders a heading element", () => {
    expect(container.querySelector("h1")).not.toBeNull();
    expect(getByText(container, "Calculator")).toBeInTheDocument();
  });

  it("renders a button element", () => {
    expect(container.querySelector("button")).not.toBeNull();
    expect(getByText(container, "Submit")).toBeInTheDocument();
  });

  it("does not render a paragraph element", () => {
    expect(queryByText(container, "/Incorrect/")).not.toBeInTheDocument();
    expect(queryByText(container, "/Answer/")).not.toBeInTheDocument();
  });

  it("adds 1 and 2 to be 3", () => {
    const op = getByTestId(container, "op");
    const t1 = getByTestId(container, "a");
    const t2 = getByTestId(container, "b");
    const p = container.querySelector("p");
    const button = getByText(container, "Submit");

    fireEvent.change(op, { target: { value: "+" } });
    fireEvent.change(t1, { target: { value: "1" } });
    fireEvent.change(t2, { target: { value: "2" } });

    fireEvent.click(button);

    expect(p.innerText).toBe("Answer is 3");
  });

  it("subtracts 10 and 5 to be 5", () => {
    const op = getByTestId(container, "op");
    const t1 = getByTestId(container, "a");
    const t2 = getByTestId(container, "b");
    const p = container.querySelector("p");
    const button = getByText(container, "Submit");

    fireEvent.change(op, { target: { value: "-" } });
    fireEvent.change(t1, { target: { value: "10" } });
    fireEvent.change(t2, { target: { value: "5" } });

    fireEvent.click(button);

    expect(p.innerText).toBe("Answer is 5");
  });

  it("multiplies 4 and 2 to be 8", () => {
    const op = getByTestId(container, "op");
    const t1 = getByTestId(container, "a");
    const t2 = getByTestId(container, "b");
    const p = container.querySelector("p");
    const button = getByText(container, "Submit");

    fireEvent.change(op, { target: { value: "*" } });
    fireEvent.change(t1, { target: { value: "4" } });
    fireEvent.change(t2, { target: { value: "2" } });

    fireEvent.click(button);

    expect(p.innerText).toBe("Answer is 8");
  });

  it("divides 72 and 9 to be 8", () => {
    const op = getByTestId(container, "op");
    const t1 = getByTestId(container, "a");
    const t2 = getByTestId(container, "b");
    const p = container.querySelector("p");
    const button = getByText(container, "Submit");

    fireEvent.change(op, { target: { value: "/" } });
    fireEvent.change(t1, { target: { value: "72" } });
    fireEvent.change(t2, { target: { value: "9" } });

    fireEvent.click(button);

    expect(p.innerText).toBe("Answer is 8");
  });

  it("divides 72 and 0 to be Infinity", () => {
    const op = getByTestId(container, "op");
    const t1 = getByTestId(container, "a");
    const t2 = getByTestId(container, "b");
    const p = container.querySelector("p");
    const button = getByText(container, "Submit");

    fireEvent.change(op, { target: { value: "/" } });
    fireEvent.change(t1, { target: { value: "72" } });
    fireEvent.change(t2, { target: { value: "0" } });

    fireEvent.click(button);

    expect(p.innerText).toBe("Answer is Infinity");
  });

  it("throws an error when you put text as input", () => {
    const op = getByTestId(container, "op");
    const t1 = getByTestId(container, "a");
    const t2 = getByTestId(container, "b");
    const p = container.querySelector("p");
    const button = getByText(container, "Submit");

    fireEvent.change(op, { target: { value: "+" } });
    fireEvent.change(t1, { target: { value: "a" } });
    fireEvent.change(t2, { target: { value: "b" } });

    fireEvent.click(button);

    expect(p.innerText).toBe("Incorrect input");
  });

  it("throws an error when you put wrong operator", () => {
    const op = getByTestId(container, "op");
    const t1 = getByTestId(container, "a");
    const t2 = getByTestId(container, "b");
    const p = container.querySelector("p");
    const button = getByText(container, "Submit");

    fireEvent.change(op, { target: { value: "r" } });
    fireEvent.change(t1, { target: { value: "1" } });
    fireEvent.change(t2, { target: { value: "2" } });

    fireEvent.click(button);

    expect(p.innerText).toBe("Incorrect input, please try again");
  });
});
