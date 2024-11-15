import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { PopoverContent } from '@radix-ui/react-popover';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicant } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(
                `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
                { status },
                { withCredentials: true }
            );
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>A list of your applications</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicant && applicant.applications.map((item) => (
                        <motion.tr
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <TableCell>{item.applicant.fullname}</TableCell>
                            <TableCell>{item.applicant.email}</TableCell>
                            <TableCell>{item.applicant.phoneNumber}</TableCell>
                            <TableCell>
                                <a href={item.applicant.profile.resume} target="_blank" rel="noopener noreferrer">
                                    {item.applicant.profile.resumeOriginalName || "No Resume Found"}
                                </a>
                            </TableCell>
                            <TableCell>{item.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <MoreHorizontal />
                                        </motion.div>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-32'>
                                        {shortListingStatus.map((status, index) => (
                                            <div
                                                key={index}
                                                onClick={() => statusHandler(status, item._id)}
                                                className='flex w-fit items-center my-2 cursor-pointer'
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
