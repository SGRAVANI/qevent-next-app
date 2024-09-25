"use client";
import React, { useEffect,useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MultiSelect } from 'react-multi-select-component';
import {v4 as uuidv4} from 'uuid' 
function CreateEventPage() {
    let session=useSession()
    let router=useRouter()
    const [artists,setArtists]=useState([])
    const [tags,setTags]=useState([])
    const [selecetedTags,setSelecetdTags]=useState([])
    useEffect(()=>{
   if(!session.data)
   {
    router.replace("/events")
   }
    },[])

 useEffect(()=>{
const fetchArtists=async ()=>{
    let res=await  fetch('https://qevent-backend.labs.crio.do/artists')
    let data=await res.json()
    setArtists(data)
}
const fetchTags= async ()=>{
    let res= await fetch('https://qevent-backend.labs.crio.do/tags')
    let data=await res.json()
    setTags(data.map((tag)=>{
       return { label:tag.name,
        value:tag.name}
    }))
}
Promise.all([fetchArtists(),fetchTags()])
.then(()=>{
   // console.log('Data fetched')

})
.catch(err=>{
    alert("Event Creation Failed")
    throw new Error (err)
})
 },[])
const handleEventCreate=async (e)=>{
    e.preventDefault()
    let val=Math.floor(Math.random()*100)
    const payload={
        id:uuidv4(),
        name:e.target.elements["name"].value,
        description:e.target.elements["description"].value,
        location:e.target.elements["location"].value,
        date:e.target.elements["date"].value,
        time:e.target.elements["time"].value,
        tags:selecetedTags.map((tag)=>tag.value),
        image:`https://randomuser.me/api/portraits/men/${val}.jpg`,
        artist:e.target.elements['artist'].value,
        price:e.target.elements['price'].value,
    }
    let res=await fetch('https://qevent-backend.labs.crio.do/events',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
    })
    let data=await res.json()
    //console.log(data)
    router.replace("/events")
}
  return (
    <section className='h-[calc(100vh-6rem)] p-2 mx-auto flex justify-center w-full'>
        <form className='w-[40%] flex flex-col gap-3 h-full p-5 justify-center' onSubmit={handleEventCreate}>
        <input
        className='bg-slate-300 p-3 text-black rounded-sm'
        placeholder='Event Name'
        type='text'
        name="name"
        id="name"
        required
        />
        <textarea
        rows={10}
        className='bg-slate-300 p-3 text-black rounded-sm'
        placeholder='Event Descrption'
        name="description"
        id="description"
        required
        />
        <input type="text"
        className='bg-slate-300 p-3 text-black rounded-sm'
        placeholder='Event Location'
        name="location"
        id="location"
        required
        />
        <select
        className='bg-slate-300 p-3 text-black rounded-sm'
        placeholder="Select Artist"
        name="artist"
        id="artist"
        required
        >
        <option value="">Select Artist</option>
        {artists.map((ele)=>{return <option value={ele.name} key={ele.name}>{ele.name}</option>})}
        </select>
        <MultiSelect 
        options={tags}
        value={selecetedTags}
        onChange={setSelecetdTags}
                
        />
        <input type="date"
        
        placeholder='Event Date'
        className='bg-slate-300 p-3 text-black rounded-sm'
        name="date"
        id="date"
        required
        
        />
        <input type="time"
        placeholder='Event Time'
        className='bg-slate-300 p-3 text-black rounded-sm'
        name="time"
        id="time"
        required
         />
         <input type="number"
         placeholder='Enter Price'
         className='bg-slate-300 p-3 text-black rounded-sm'
         name="price"
         id="price"
         required
         />
         <input type="submit" className= 'bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70 w-[180px] mx-auto' value="Add Event"/>
        </form>
    </section>
  )
}

export default CreateEventPage;np