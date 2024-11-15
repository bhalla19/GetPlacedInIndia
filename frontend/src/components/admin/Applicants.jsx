import React, { useEffect } from 'react'
import Navbar from '../templates/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { applicant } = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicant = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, { withCredentials: true }) 
                dispatch(setAllApplicants(res.data.job))
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicant()
    }, [params.id, dispatch])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h1 className='font-bold text-xl sm:text-2xl my-5 text-center sm:text-left'>
                    Applicants ({applicant?.applications?.length})
                </h1>
                <div className="overflow-x-auto">
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants
