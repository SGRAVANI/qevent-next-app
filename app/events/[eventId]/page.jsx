"use client";
import React from 'react'
import { useParams } from 'next/navigation';
import { useState,useEffect } from 'react';
import Tag from '@/components/Tag';
function EventDetail() {
    let params=useParams()
    let [event,setEvent]=useState(null)
   // console.log(params.eventId)
    useEffect(()=>{
        async function  getEventData(){
            let res=await fetch(`https://qevent-backend.labs.crio.do/events/${params.eventId}`)
            let data=await res.json()
            //console.log(data)
            setEvent(data)
        }
        getEventData()
    },[])
    
  return (
    <div className='w-[90%] md:w-[80%] mx-auto p-5 py-10 text-justify sm:text-left'>
     {event?
     
     <div>
        <img src={event.image} className=' w-[80%] md:w-[60%] lg:w-[40%] mx-auto '/>
         <div className='pb-8 text-center sm:text-left'>
        <h1 className='pt-5 text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent'>{event.name}</h1>
        <h2 className="text-xl font-bold max-sm:text-lg bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
                  {event.location}
                </h2>
                <h2 className="text-xl font-bold max-sm:text-lg bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
                  {event.artist}
                </h2>
                <div className="flex gap-2 items-center justify-center sm:justify-start">
            {event.tags?.map((ele) => (
              <Tag text={ele} key={ele} />
            ))}
          </div>
          </div>
          <p>{event.description}</p>
          <div className='flex items-center justify-between'>
          <h1 className='py-5 text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent'>${event.price}</h1>
          
        
        <button className='text-white bg-red-600 px-4 py-2 rounded-md hover:opacity-70'> Buy Tickets</button>
        </div>
     </div>
     :""}


     
    </div>
  )
}

export default EventDetail;