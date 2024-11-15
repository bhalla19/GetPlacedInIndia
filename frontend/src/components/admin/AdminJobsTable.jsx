import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const AdminJobsTable = () => {
    const navigate = useNavigate()
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setfilterJobs] = useState([])

    useEffect(() => {
        if (Array.isArray(allAdminJobs)) {
            const filteredJobs = allAdminJobs.filter((job) => {
                if (!searchJobByText) return true
                return (
                    job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                    job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
                )
            })
            setfilterJobs(filteredJobs)
        }
    }, [allAdminJobs, searchJobByText])

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>A list of Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                                <TableCell>{job?.title || "N/A"}</TableCell>
                                <TableCell>{job?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">Job not found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
