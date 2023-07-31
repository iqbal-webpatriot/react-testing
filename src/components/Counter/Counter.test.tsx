import {render,screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import Counter from './Counter'

describe('Counter',()=>{
    test("render successfully",async () => {
        render(<Counter/>)
        const counterElement= screen.getByRole('heading',{level:1});
        expect(counterElement).toBeInTheDocument()
    })
    test("render with default value of 0",async () => {
        render(<Counter/>)
        const counterElement= screen.getByRole('heading',{level:1});
        expect(counterElement).toHaveTextContent('0')
    })
    test("render an increment button ",async () => {
        render(<Counter/>)
        const incrementButtonElement= screen.getByRole('button',{
            name:'Increment'
        });
        expect(incrementButtonElement).toBeInTheDocument()
    })
    test("render with incremented value of 1 after increment button clicked",async () => {
        user.setup()
        render(<Counter/>)
        const incrementButtonElement= screen.getByRole('button',{name:'Increment'});
         await user.click(incrementButtonElement)
         const counterElement= screen.getByRole('heading',{level:1});
         expect(counterElement).toHaveTextContent('1')
    })
})