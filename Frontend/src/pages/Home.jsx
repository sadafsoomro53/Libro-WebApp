import React from 'react'
import Hero from '../components/Home/hero'
import AboutUs from '../components/Home/aboutUs'
import RecentlyAdded from '../components/Home/RecentlyAdded'

const Home = () => {
  return (
    <div className="bg-light text-dark px-10 py-8">
      <Hero />
      <RecentlyAdded />
      <AboutUs />
    </div>
  )
}

export default Home
