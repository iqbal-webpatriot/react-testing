import React, { useState } from 'react'

export default function useCounter() {
    const [count,setCount]=useState(0);
    const incrementCountHandler=()=>{
        setCount(prev=>prev+1)
    }
    const decrementCountHandler=()=>{
        setCount((prev)=>{
            if(prev>0){
            return prev-1
            }
            return prev
        })
    }
  return{ count,incrementCountHandler,decrementCountHandler}
}
