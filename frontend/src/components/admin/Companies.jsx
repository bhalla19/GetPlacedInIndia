import React, { useEffect, useState } from 'react'
import Navbar from '../templates/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies()
    const [input, setinput] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input])

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-5">
                    <Input
                        className="w-full sm:w-auto"
                        placeholder="Filter by name"
                        onChange={(e) => setinput(e.target.value)}
                    />
                    <Button className="w-full sm:w-auto" onClick={() => navigate('/admin/companies/create')}>
                        New Company
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies
