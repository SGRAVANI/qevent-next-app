import React from 'react'
import ArtistCard from '@/components/ArtistCard'
async function Artists() {
 let res=await fetch('https://qevent-backend.labs.crio.do/artists')
  let data=await res.json()
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto p-5  '>{
    data.map((ele,index)=>{
      return <ArtistCard key={`artist-${index}`} artistData={ele} />
    })
    
    }
      </div>
  )
}

export default Artists