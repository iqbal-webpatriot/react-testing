import { render,screen } from "@testing-library/react"
import Greet from "./Greet"

 describe('Greet',()=>{
    test("component has title Greet",()=>{
        render(<Greet/>)
        const testExist=screen.getByText(/greet/i);
         expect(testExist).toBeInTheDocument()
    })
 })
