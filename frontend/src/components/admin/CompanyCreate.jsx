import React, { useState } from 'react'
import Navbar from '../templates/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const [CompanyName, setCompanyName] = useState("")
    const dispatch = useDispatch()

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, { companyName: CompanyName }, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto p-4 sm:p-6 md:p-10'>
                <div className='my-6'>
                    <h1 className='font-bold text-xl sm:text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500 text-sm sm:text-base'>What would you like to give your company name? You can change it later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type='text'
                    placeholder='Your Company Name'
                    className='my-2 w-full'
                    value={CompanyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                
                <div className='flex flex-col sm:flex-row items-center gap-4 my-6'>
                    <Button onClick={() => navigate('/admin/companies')} variant="outline" className='w-full sm:w-auto'>Cancel</Button>
                    <Button onClick={registerNewCompany} className='w-full sm:w-auto'>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
