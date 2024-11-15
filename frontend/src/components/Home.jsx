import React, { useEffect } from 'react'
import Navbar from './templates/Navbar'
import HeroSection from './templates/HeroSection'
import CategoryCarousel from './templates/CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './templates/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
const Home = () => {
  useGetAllJobs()
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if(user?.role === 'recruiter'){
      navigate('/admin/companies')
    }
  }, [])
  
  return (
    <>
        <Navbar />
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </>
  )
}

export default Home