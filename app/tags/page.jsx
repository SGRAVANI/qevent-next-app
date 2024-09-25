import Tag from '@/components/Tag'
import React from 'react'

async function Tags() {
  let res= await fetch('https://qevent-backend.labs.crio.do/tags')
  let data=await res.json()

  return (
    <div className='flex w-full p-10  mx-auto items-center justify-center gap-5 flex-wrap sm:px-4 md:px-10 lg:px-40'>{
     data.map((ele,i)=><Tag text={ele.name} key={ele.id} />) 
    }</div>
  )
}

export default Tags