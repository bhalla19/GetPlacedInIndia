import { setAllAppliedJobs } from '@/redux/jobSlice'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAppliedJob = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAppliedJobs = async()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`,{withCredentials:true})
                if(res.data.success ){
                    dispatch(setAllAppliedJobs(res.data.application))
                }

            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        }
        fetchAppliedJobs()
    }, [])
    
}

export default useGetAllAppliedJob