import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { setAuthUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { motion } from 'framer-motion'

const UpdateProfileDialogue = ({ open, setopen }) => {
    const [Loading, setLoading] = useState(false)
    const { user } = useSelector((state) => state.auth)

    const [input, setinput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    })
    const dispatch = useDispatch()
    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('bio', input.bio)
        formData.append('skills', input.skills)
        if (input.file) {
            formData.append('file', input.file)
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user))
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
        setopen(false)
        console.log(input)

    }
    const fileHandler = (e) => {
        const file = e.target.files?.[0]
        setinput({ ...input, file })
    }

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Dialog open={open} onOpenChange={setopen}>
                    <DialogContent className='sm:max-w-[425px] w-full' onInteractOutside={() => setopen(false)}>
                        <DialogHeader>
                            <DialogTitle>Update Profile</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitHandler}>
                            <div className='grid gap-4 py-4'>
                                {/* Full Name Field */}
                                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-right'>Full name</Label>
                                    <Input
                                        id='name'
                                        name='fullname'
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        className='col-span-3'
                                    />
                                </div>

                                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='email' className='text-right'>Email</Label>
                                    <Input
                                        id='email'
                                        name='email'
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className='col-span-3'
                                    />
                                </div>

                                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='number' className='text-right'>Phone Number</Label>
                                    <Input
                                        id='number'
                                        name='phoneNumber'
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className='col-span-3'
                                    />
                                </div>

                                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='bio' className='text-right'>Bio</Label>
                                    <Input
                                        id='bio'
                                        name='bio'
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                        className='col-span-3'
                                    />
                                </div>

                                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='skills' className='text-right'>Skills</Label>
                                    <Input
                                        id='skills'
                                        name='skills'
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                        className='col-span-3'
                                    />
                                </div>

                                <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='file' className='text-right'>Resume</Label>
                                    <Input
                                        id="file"
                                        name="file"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={fileHandler}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                {
                                    Loading ? (
                                        <Button className="w-full my-4" disabled>
                                            <Loader2 className='animate-spin' /> Please wait
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="bg-[#6C63FF] w-full my-4 hover:bg-[#5b30a6] text-white hover:text-white">
                                            Update
                                        </Button>
                                    )
                                }
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </motion.div>
        </div>
    )
}

export default UpdateProfileDialogue
