import { renderHook, act } from "@testing-library/react";
import useCounter from "./useCounter";
describe("useCounter hook", () => {
  test("should render the initial count 0", () => {
    const { result } = renderHook(useCounter);
    expect(result.current.count).toBe(0);
  });
  test("should accept and render same initial count", () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialValue: 10,
      },
    });
    expect(result.current.count).toBe(10);
  });
  test("should increment the initial count by 1", () => {
    const { result } = renderHook(useCounter);
    act(() => result.current.incrementCountHandler());
    expect(result.current.count).toBe(1);
  });
  test("should decrement the initial count by -1", () => {
    const { result } = renderHook(useCounter);
    act(() => result.current.decrementCountHandler());
    expect(result.current.count).toBeGreaterThanOrEqual(0);
  });
});
