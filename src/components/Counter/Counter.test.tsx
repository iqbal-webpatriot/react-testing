import {render,screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import Counter from './Counter'

describe('Counter',()=>{
    test("render successfully",async () => {
        render(<Counter/>)
    })
})