import React, { useEffect, useState } from 'react'
import Navbar from '../templates/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_ENDPPOINT, USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser, setLoading } from '@/redux/authSlice'
import { Loader2, User } from 'lucide-react'

const Login = () => {
    const [input, setinput] = useState({
        email: "",
        password: "",
        role: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loading = useSelector((store) => store.auth.loading)
    const { user } = useSelector((store) => store.auth)

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user))
                navigate('/')
                toast(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-full px-4 py-6">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-sm p-6 my-10 border-2 rounded-3xl border-gray-600 bg-white shadow-lg"
                >
                    <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>

                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            className="my-1 w-full"
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Enter your Email"
                        />
                    </div>

                    <div className="my-2">
                        <Label>Password</Label>
                        <Input
                            className="my-1 w-full"
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="my-4">
                        <Label className="block">Role</Label>
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label>Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label>Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {loading ? (
                        <Button className="w-full my-4 flex justify-center items-center gap-2">
                            <Loader2 className="animate-spin" />
                            Please Wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="bg-[#6C63FF] w-full my-4 hover:bg-[#5b30a6] text-white"
                        >
                            Login
                        </Button>
                    )}

                    <div className="text-center mt-4">
                        <span className="text-sm">
                            Don't have an account?
                            <Link to={'/signup'} className="text-[#6C63FF] hover:underline">
                                SignUp
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
