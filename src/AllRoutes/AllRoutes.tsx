import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Application from '../components/Application/Application'
import Skills from '../components/Skills/Skills'
import { dummySkills } from '../components/Skills/Skills.test'
import Counter from '../components/Counter/Counter'

export default function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Application/>}/>
        {/* <Route path='/skills' element={<Skills skills={dummySkills}/>}/> */}
        <Route path='/counter' element={<Counter/>}/>
    </Routes>
    </>
  )
}
