import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_ENDPPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const {searchQuery} = useSelector(store=>store.job)
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPPOINT}/get?keyword=${searchQuery}`, {
                    headers: {
                        "Content-Type": "application/json", 
                    },
                });
                
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                } else {
                    console.log("No jobs found in response")
                }
            } catch (error) {
                console.log("Error fetching jobs:", error)
            }
        }

        fetchAllJobs()
    }, [])

}

export default useGetAllJobs