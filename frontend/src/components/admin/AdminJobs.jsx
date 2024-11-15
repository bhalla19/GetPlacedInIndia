import React, { useEffect, useState } from 'react'
import Navbar from '../templates/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input, setinput] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])

  const navigate = useNavigate()

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 my-5'>
          <Input
            className='w-full sm:w-auto'
            placeholder="Filter by name"
            onChange={(e) => setinput(e.target.value)}
          />
          <Button onClick={() => navigate('/admin/jobs/create')} className='w-full sm:w-auto'>
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs
