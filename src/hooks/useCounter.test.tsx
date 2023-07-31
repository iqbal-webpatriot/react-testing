import {renderHook} from "@testing-library/react"
import useCounter from "./useCounter";
describe("useCounter hook",()=>{
        test('should render the initial count 0',()=>{
            const {result }=renderHook(useCounter);
            expect(result.current.count).toBe(0)
        });
      
})