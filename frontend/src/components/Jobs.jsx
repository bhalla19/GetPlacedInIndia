import React, { useEffect, useState } from 'react'
import Navbar from './templates/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector(store => store.job)
  const [filterJob, setFilterJob] = useState([])

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(job.salary).toLowerCase().includes(searchQuery.toLowerCase()) // Convert salary to a string
      )
      setFilterJob(filteredJobs)
    } else {
      setFilterJob(allJobs)
    }
  }, [allJobs, searchQuery])

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5 px-4'>
        <div className='flex flex-col lg:flex-row gap-5'>
          <motion.div
            className='lg:w-1/4 w-full'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}>
            <FilterCard />
          </motion.div>
          
          {
            filterJob && filterJob.length <= 0 ? (
              <motion.div
                className="w-full flex justify-center items-center mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                <span className="text-xl text-gray-500">Job not found</span>
              </motion.div>
            ) : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <motion.div
                  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}>
                  {
                    filterJob.map((job, index) => (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}>
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </motion.div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs
