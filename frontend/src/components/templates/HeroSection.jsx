import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'

const HeroSection = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchQuery(query))
        navigate('/browse')
    }

    return (
        <div className='text-center px-4 sm:px-6 lg:px-12'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className='flex flex-col gap-5 my-10'>

                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    No.1 Job hunting website
                </motion.span>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className='text-3xl sm:text-4xl md:text-5xl font-bold'>
                    Search, Apply & <br />Get your <span className='text-[#6A38C2]'> Dream job</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className='text-sm sm:text-base md:text-lg'>
                    <span className='text-[#F83002] font-semibold'>Looking for your next big career move?</span> <br />
                    <span className='text-[#6A38C2]'>We bring together the best jobs, expert advice,</span><br />
                    and <span className='text-[#F83002] font-semibold'>personalized support</span> to help you find your dream role.
                </motion.p>


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className='flex flex-col sm:flex-row justify-center items-center w-full max-w-lg mx-auto gap-4 mt-5'>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex w-full sm:w-[70%] lg:w-[70%] shadow-xl border border-gray-200 pl-3 rounded-full items-center gap-4'>
                        <input
                            type="text"
                            placeholder='Find your dream job'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full px-4 py-2'
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="rounded-r-full bg-[#6A38C2] hover:bg-[#8756db]">
                            <Search className='h-5 w-5 sm:h-4 sm:w-4' />
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default HeroSection
