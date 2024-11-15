import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setSingleJob } from '@/redux/jobSlice'
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPPOINT } from '@/utils/constant'
import { toast } from 'sonner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)
    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const cleanJobId = jobId.replace(/[{}]/g, '');
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${cleanJobId}`, { withCredentials: true })
            console.log('response message', res.data)
            if (res.data.success) {
                setIsApplied(true) // update the local state
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        if (jobId) {
            const cleanJobId = jobId.replace(/[{}]/g, '');
    
            const fetchSingleJobs = async () => {
                try {
                    const res = await axios.get(`${JOB_API_ENDPPOINT}/get/${cleanJobId}`, { withCredentials: true });
    
                    if (res.data.success) {
                        dispatch(setSingleJob(res.data.job));
                        setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id) );
                    } else {
                        console.log("No jobs found in response");
                    }
                } catch (error) {
                    console.log("Error fetching jobs:", error);
                }
            };
    
            fetchSingleJobs();
        }
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-6xl mx-auto my-10 px-4'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <h1 className='font-bold text-2xl sm:text-xl'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant={'ghost'}>{singleJob?.position}</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant={'ghost'}>{singleJob?.salary}</Badge>
                    </div>
                </div>
                <div>
                    <Button
                        disabled={isApplied}
                        onClick={isApplied ? null : applyJobHandler}
                        className={`mt-4 sm:mt-0 rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#6A38C2] hover:bg-[#8756db]'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.description}</h1>

            <div className='my-4'>
                <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location : <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description : <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Salary : <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'>Experience : <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
                <h1 className='font-bold my-1'>Total Applicant : <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date : <span className='pl-4 font-normal text-gray-800'>{new Date(singleJob?.createdAt).toLocaleDateString()}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
