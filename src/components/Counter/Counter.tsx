import React, { useState } from 'react'

export default function Counter() {
    const [count,setCount]=useState(0)
  return (
   <>
   <h1>Count : {count}</h1>
   </>
  )
}