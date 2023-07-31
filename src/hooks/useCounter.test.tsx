import {renderHook} from "@testing-library/react"
import useCounter from "./useCounter";
describe("useCounter hook",()=>{
        test('should render the initial count 0',()=>{
            const {result }=renderHook(useCounter);
            expect(result.current.count).toBe(0)
        });
        test('should accept and render same initial count  ',()=>{
            const {result }=renderHook(useCounter,{
                initialProps:{
                    initialValue:10
                }
            });
            expect(result.current.count).toBe(10)
        });
      
})