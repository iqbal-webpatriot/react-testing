import React, { useState } from 'react'
import { initialState } from './useCounter.types';

export default function useCounter({initialValue=0}:initialState={}) {
    const [count,setCount]=useState(initialValue);
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
