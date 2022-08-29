const server = require("../code/index");
const http = require("http");

jest.mock("http", () => ({
  createServer: jest.fn(() => ({ listen: jest.fn() })),
}));

describe("http server", () => {
  it("creates a server", () => {
    expect(http.createServer).toBeCalled();
  });
});
