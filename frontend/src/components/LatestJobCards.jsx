import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate()

    return (
        <motion.div
            onClick={() => navigate(`/description/${job._id}`)}
            className='flex flex-col p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl transition-shadow'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Company info */}
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.company?.location}</p>
            </div>

            <div className='my-2'>
                <h1 className='font-bold text-lg'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}</Badge>
            </div>
        </motion.div>
    )
}

export default LatestJobCards
