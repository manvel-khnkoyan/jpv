const { validate, nullable, strict } = require("../dist/index.js");

// Using Jest as test framework
test("Nullable: positive case with null value", () => {
  const pattern = nullable(/^[A-Z]/);
  expect(validate(null, pattern)).toBe(true);
});

test("Nullable: positive case with string value", () => {
  const pattern = nullable(/^[A-Z]/);
  expect(validate("Hello", pattern)).toBe(true);
});

test("Nullable: negative case with string value", () => {
  const pattern = nullable(/^[A-Z]/);
  expect(validate("hello", pattern)).toBe(false);
});

test("Nullable: positive case with object value", () => {
  const pattern = nullable({
    name: /^[A-Z]/,
    age: (x) => typeof x === "number" && x > 0,
  });
  const value = { name: "John", age: 25 };
  expect(validate(value, pattern)).toBe(true);
});

test("Nullable: negative case with object value", () => {
  const pattern = nullable({
    name: /^[A-Z]/,
    age: (x) => typeof x === "number" && x > 0,
  });
  const value = { name: "john", age: 25 };
  expect(validate(value, pattern)).toBe(false);
});

test("Nullable: positive case with undefined value", () => {
  const pattern = nullable(/^[A-Z]/);
  expect(validate(undefined, pattern)).toBe(true);
});

test("Nullable: positive case with strict value", () => {
  const pattern = {
    address: nullable(
      strict({
        street: /^[\w\s]+$/,
        city: /^[\w\s]+$/,
        country: /^[\w\s]+$/,
      })
    ),
  };

  expect(
    validate(
      {
        address: null,
      },
      pattern
    )
  ).toBe(true);

  expect(
    validate(
      {
        address: {
          street: "Main Street",
          city: "New York",
          country: "USA",
        },
      },
      pattern
    )
  ).toBe(true);
});
