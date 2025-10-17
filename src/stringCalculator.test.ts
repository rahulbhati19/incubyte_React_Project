import { stringCalculator } from "../src/stringCalculator";
import { describe, test, expect } from 'vitest'

describe("String Calculator", () => {
  test("returns 0 for empty string", () => {
    expect(stringCalculator("")).toBe(0);
  });

  test("returns sum for comma-separated numbers", () => {
    expect(stringCalculator("1,2,3")).toBe(6);
  });

  test("handles newline as delimiter", () => {
    expect(stringCalculator("1\n2,3")).toBe(6);
  });

  test("supports custom delimiter", () => {
    expect(stringCalculator("//;\n1;2")).toBe(3);
  });

  test('accepts escaped newline sequences', () => {
    expect(stringCalculator('1\\n2,3')).toBe(6)
  })

  test('semicolon as default delimiter', () => {
    expect(stringCalculator('1;3')).toBe(4)
  })

  test('multi-character custom delimiter', () => {
    expect(stringCalculator('//[***]\n1***2***3')).toBe(6)
  })

  test('multiple custom delimiters', () => {
    expect(stringCalculator('//[*][%]\n1*2%3')).toBe(6)
  })

  test("throws error for negative numbers", () => {
    expect(() => stringCalculator("1,-2,3")).toThrow(
      "Negatives not allowed: -2"
    );
  });

  test("ignores numbers greater than 1000", () => {
    expect(stringCalculator("2,1001")).toBe(2);
  });
});
