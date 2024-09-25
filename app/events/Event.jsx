"use client";
import React, { useEffect, useState } from 'react'
import EventCard from '@/components/EventCard'
import { useSearchParams } from 'next/navigation'
 function Events() {
//console.log(data)
let searchParams=useSearchParams()
let [edata,setEventData]=useState([])



useEffect(()=>{
  async function getEvents()
  {
    let res=await fetch('https://qevent-backend.labs.crio.do/events/')
    let data=await res.json()
  //  console.log(data,"from fetching")
    let artistName=searchParams.get('artist')
    let tagName=searchParams.get('tag')
    if(!artistName && !tagName)
    {
      setEventData(data)
      return
    }
    if(artistName)
    {
       data=data.filter((ele)=>ele.artist==artistName)
    }
     if(tagName)
    {
      data=data.filter((ele)=>ele.tags?.includes(tagName))
    }
    setEventData(data)
    
  }
  getEvents()
//},[])
},[searchParams.get('tag'),searchParams.get('artist')])

return (
  <div className="min-h-screen flex justify-center items-center">
    <div className={`grid grid-cols-1  mx-auto gap-5  p-5 justify-center items-center ${edata && edata.length==1?"sm:grid-cols1 md:grid-cols-1 lg:grid-cols-1 w-[35%]" : edata && edata.length==2?"sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 w-[60%]":"sm:grid-cols-2 md:grid-cols-3 w-full"}`} >
      {
      edata.map((ele,index)=>{
      return <EventCard key={`event-${index}`} eventData={ele}/>
      }

      ) 
    }
    </div>
    </div>
  )
}

export default Events