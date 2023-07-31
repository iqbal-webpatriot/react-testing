import React, { useEffect, useState } from 'react'
import { SkillTypes } from './skills.types'

export default function Skills({skills}:SkillTypes) {
    const [showButton,setShowButton]=useState(false);
    useEffect(()=>{
        setTimeout(() => {
            setShowButton(true)
        }, 1200);

    },[showButton])
  return (
    <>
     <ul>
        {
            skills.length>0 && skills.map((item,index)=>{
                return (
                    <li key={index}>{item}</li>
                )
            })
        }
        {showButton?<button>Start learning</button>:<button>Login</button>}
     </ul>
     
    </>
  )
}
