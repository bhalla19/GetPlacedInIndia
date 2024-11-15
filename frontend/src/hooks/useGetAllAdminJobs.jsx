import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_ENDPPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPPOINT}/get-Admin-jobs`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs))
                } else {
                    console.log("No jobs found in response")
                }
            } catch (error) {
                console.log("Error fetching jobs:", error)
            }
        }

        fetchAllAdminJobs()
    }, [])

}

export default useGetAllAdminJobs