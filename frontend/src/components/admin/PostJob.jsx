import React, { useState } from 'react'
import Navbar from '../templates/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_ENDPPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setinput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })
    const [loading, setloading] = useState()
    const navigate = useNavigate()
    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const { companies } = useSelector(store => store.company)

    const handleSelectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value)
        setinput({ ...input, companyId: selectedCompany._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setloading(true)
            const res = await axios.post(`${JOB_API_ENDPPOINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        finally {
            setloading(false)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-full my-5 px-4 sm:px-8 md:px-12'>
                <form onSubmit={submitHandler} className='w-full max-w-4xl p-6 sm:p-8 border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input
                                type="text"
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Position</Label>
                            <Input
                                type="number"
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                    </div>
                    {
                        companies.length >= 0 && (
                            <div className="mt-4">
                                <Label>Company</Label>
                                <Select onValueChange={handleSelectChangeHandler}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                            {company.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )
                    }
                    {
                        loading ? (
                            <Button className="w-full my-4 flex justify-center items-center gap-2">
                                <Loader2 className='animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 hover:bg-[#5b30a6] text-white hover:text-white">
                                Post Job
                            </Button>
                        )
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>Please register a company first then post a job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob
