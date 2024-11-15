import React, { useEffect } from 'react'
import Navbar from './templates/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'

const Browse = () => {
    useGetAllJobs()
    const { allJobs } = useSelector(store => store.job)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(''))
        }
    }, [dispatch])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <motion.h1 
                    className='font-bold text-xl my-10'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Search Result ({allJobs.length})
                </motion.h1>
                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {
                        allJobs.map((job) => (
                            <motion.div
                                key={job._id}
                                className='transition-transform transform hover:scale-105 duration-300 ease-in-out hover:shadow-lg hover:shadow-[#6A38C2]'
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>
        </div>
    )
}

export default Browse
