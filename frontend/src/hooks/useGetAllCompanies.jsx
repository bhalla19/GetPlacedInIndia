import { setAllCompany } from '@/redux/companySlice'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllCompany(res.data.companies))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllCompanies()
    }, [])

}

export default useGetAllCompanies