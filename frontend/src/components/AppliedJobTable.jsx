import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { AllAppliedJobs } = useSelector(store => store.job)
    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full table-auto">
                <TableCaption>A list of your Applied jobs </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Date</TableHead>
                        <TableHead className="text-left">Job Role</TableHead>
                        <TableHead className="text-left">Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {AllAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center">You haven't applied any job yet.</TableCell>
                        </TableRow>
                    ) : (
                        AllAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job.title}</TableCell>
                                <TableCell>{appliedJob.job.company.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={appliedJob.status === "accepted" ? "bg-green-500" : "bg-red-500"}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
