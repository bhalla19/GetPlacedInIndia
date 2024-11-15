import React, { useEffect, useState } from 'react'
import Navbar from '../templates/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector((store) => store.auth.loading)
  const {user} = useSelector((store) => store.auth)
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0]
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    // calling api for sending data into database
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("password", input.password)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("role", input.role)
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
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
      <h1 className="font-bold text-2xl mb-5 text-center">Sign up</h1>

      <div className="my-2">
        <Label>Full Name</Label>
        <Input
          className="my-1 w-full"
          type="text"
          value={input.fullname}
          name="fullname"
          onChange={changeEventHandler}
          placeholder="Enter your full name"
        />
      </div>

      <div className="my-2">
        <Label>Email</Label>
        <Input
          className="my-1 w-full"
          type="email"
          placeholder="Enter your Email"
          name="email"
          onChange={changeEventHandler}
          value={input.email}
        />
      </div>

      <div className="my-2">
        <Label>Password</Label>
        <Input
          className="my-1 w-full"
          type="password"
          placeholder="Enter your Password"
          name="password"
          onChange={changeEventHandler}
          value={input.password}
        />
      </div>

      <div className="my-2">
        <Label>Phone Number</Label>
        <Input
          className="my-1 w-full"
          type="number"
          placeholder="Enter your Phone Number"
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={changeEventHandler}
        />
      </div>

      <div className="my-4">
        <Label className="block">Role</Label>
        <RadioGroup className="flex flex-wrap gap-4">
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

      <div className="my-4">
        <Label>Profile Picture</Label>
        <Input
          accept="image/*"
          type="file"
          className="w-full cursor-pointer my-2"
          onChange={changeFileHandler}
        />
      </div>

      {loading ? (
        <Button className="w-full my-4 flex justify-center items-center gap-2">
          <Loader2 className="animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button 
          type="submit" 
          className="bg-[#6C63FF] w-full my-4 hover:bg-[#5b30a6] text-white"
        >
          Sign Up
        </Button>
      )}

      <div className="text-center mt-4">
        <span className="text-sm">
          Already have an account? 
          <Link to="/login" className="text-[#6C63FF] hover:underline">
            Login
          </Link>
        </span>
      </div>
    </form>
  </div>
</div>

  )
}

export default Signup
