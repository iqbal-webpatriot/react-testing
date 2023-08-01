import { render,screen} from '@testing-library/react'
import Skills from './Skills'
export const dummySkills=['Nodejs',"Reactjs"]
describe("Skills",()=>{
    test('renders successfully',()=>{
        render(
        
            <Skills skills={dummySkills}/>
        )
    })
    test('renders a list of skill items',()=>{
        render(
        
            <Skills skills={dummySkills}/>
        );
        const listElement= screen.getByRole('list');
        expect(listElement).toBeInTheDocument()
        const listItemElement= screen.getAllByRole('listitem');
        expect(listItemElement).toHaveLength(dummySkills.length)
    })
    test('render the login  button',()=>{
        render(<Skills skills={dummySkills}/>)
        const loginButtonElement= screen.queryByRole("button",{name:"Login"})
        expect(loginButtonElement).toBeInTheDocument()
    })
    test('not render the start learning button',()=>{
        render(<Skills skills={dummySkills}/>)
        //!this queryByRole method is used to check if the element is not rendered in vdom so far
        const startLearningButtonElement= screen.queryByRole("button",{name:"Start learning"})
        expect(startLearningButtonElement).not.toBeInTheDocument()
    })
    test('render the start learning button eventually', async()=>{
        render(<Skills skills={dummySkills}/>)
        //!this findByRole method returns a promise and   used to check if the element is found withing a default time of 1sec   in vdom s
        const startLearningButtonElement=  await screen.findByRole("button",{name:"Start learning"},{
            timeout:2000 //custom time to wait for the element
        })
        expect(startLearningButtonElement).toBeInTheDocument()
    })
})