import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'

function Home() {
  return (
    <>
    <Navbar/>

    <div className='container mx-auto'>
      <NoteCard/>
    </div>
    </>
  )
}

export default Home
