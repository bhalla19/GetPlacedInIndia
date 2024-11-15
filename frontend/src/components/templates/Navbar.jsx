import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { User2, LogOut, Menu, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { setAuthUser } from '@/redux/authSlice'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setAuthUser(null))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div className='bg-white'>
            {/* Navbar with fade-in effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className='flex items-center justify-between mx-auto w-full md:w-4/5 h-16 px-4'>

                <div>
                    <Link to={'/'}>
                        <h1 className='text-xl md:text-2xl font-bold'>
                            Get Placed <span className='text-[#F83002]'>In India</span>
                        </h1>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-6 md:gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link to={'/admin/companies'}><li>Companies</li></Link>
                                <Link to={'/admin/jobs'}><li>Jobs</li></Link>
                            </>
                        ) : (
                            <>
                                <Link to={'/'}><li>Home</li></Link>
                                <Link to={'/jobs'}><li>Jobs</li></Link>
                                <Link to={'/browse'}><li>Browse</li></Link>
                            </>
                        )}
                    </ul>

                    {/* User Profile */}
                    {user ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-56 px-3 z-50 bg-white shadow-md rounded-md border border-gray-200"
                            >

                                <div className='flex gap-2 items-center space-y-2 px-2 py-2'>
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user.fullname}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <hr className='text-black'/>
                                <div className='flex flex-col gap-3 text-gray-600'>
                                    {user.role === 'student' && (
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Link to={'/profile'}><Button variant="link">View Profile</Button></Link>
                                        </div>
                                    )}
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant="link">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Link to={'/login'}>
                                <Button variant="outline" className='text-xs md:text-base'>Login</Button>
                            </Link>
                            <Link to={'/signup'}>
                                <Button className="bg-[#6A38C2] hover:bg-[#8756db] text-white text-xs md:text-base hover:text-white" variant="outline">Signup</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className='md:hidden'>
                    <Button onClick={toggleMobileMenu} className="p-2 text-gray-800">
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </motion.div>

            {/* Mobile Menu with slide-in effect */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className='md:hidden bg-gray-100 p-4'>
                    <ul className='flex flex-col items-center gap-4'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link to={'/admin/companies'}><li>Companies</li></Link>
                                <Link to={'/admin/jobs'}><li>Jobs</li></Link>
                            </>
                        ) : (
                            <>
                                <Link to={'/'}><li>Home</li></Link>
                                <Link to={'/jobs'}><li>Jobs</li></Link>
                                <Link to={'/browse'}><li>Browse</li></Link>
                            </>
                        )}
                        {/* Mobile User Profile */}
                        {user ? (
                            <div className='flex flex-col items-center mt-4'>
                                <Avatar className="cursor-pointer mb-2">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                                <div>
                                    <h4 className='font-medium'>{user.fullname}</h4>
                                    <p className='text-sm'>{user?.profile?.bio}</p>
                                </div>
                                {user.role === 'student' && (
                                    <div className='flex items-center gap-2 cursor-pointer'>
                                        <User2 />
                                        <Link to={'/profile'}><Button variant="link">View Profile</Button></Link>
                                    </div>
                                )}
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <LogOut />
                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center gap-4'>
                                <Link to={'/login'}>
                                    <Button variant="outline" className='text-xs md:text-base'>Login</Button>
                                </Link>
                                <Link to={'/signup'}>
                                    <Button className="bg-[#6A38C2] hover:bg-[#8756db] text-white text-xs md:text-base hover:text-white" variant="outline">Signup</Button>
                                </Link>
                            </div>
                        )}
                    </ul>
                </motion.div>
            )}
        </div>
    )
}

export default Navbar
