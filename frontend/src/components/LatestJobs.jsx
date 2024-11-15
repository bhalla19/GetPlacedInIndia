import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion' // Import Framer Motion

const LatestJobs = () => {
  useGetAllJobs()
  const { allJobs } = useSelector(store => store.job)

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <motion.h1
        className='text-4xl font-bold'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className='text-[#6A38C2]'>Latest</span> Job Openings
      </motion.h1>

      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1 
            }
          }
        }}
      >
        {allJobs.length <= 0 ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No jobs Found
          </motion.span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <motion.div key={job._id} variants={itemVariants}>
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  )
}

export default LatestJobs
