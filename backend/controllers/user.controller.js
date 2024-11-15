import { User } from '../models/user.model.js'
import bcrypt from "bcryptjs"
import { raw } from 'express'
import jwt from "jsonwebtoken"
import getDataUri from '../utils/dataUri.js'
import cloudinary from '../utils/cloundinary.js'


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;

        if (!fullname || !email || !phoneNumber || !password || !role || !file) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        // check role is correct or not

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't Exist with current role"
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = jwt.sign(tokenData, process.env.SECRETKEY, { expiresIn: '1d' })

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).clearCookie("token").json({
            message: "Logout successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body
        const file = req.file

        // Ensure file is present
        if (!file) {
            return res.status(400).json({
                message: "File is missing",
                success: false
            })
        }

        // Convert file to Data URI
        const fileUri = getDataUri(file);

        // If skills are provided, split into array
        let skillsArray
        if (skills) {
            skillsArray = skills.split(",").map(skill => skill.trim()) // Ensure no spaces around skills
        }

        const userId = req.id

        // Fetch the user by ID
        let user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        // Update user details if provided
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skillsArray) user.profile.skills = skillsArray

        // Upload file to Cloudinary and update resume URL
        try {
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw",
                folder: "resumes"
            });
            
            
            if (cloudResponse) {
                user.profile.resume = cloudResponse.secure_url ;
                user.profile.resumeOriginalName = file.originalname; 
            }



        } catch (error) {
            console.error("Cloudinary error", error)
            return res.status(500).json({
                message: "Failed to upload file",
                success: false
            })
        }

        // Save updated user to the database
        await user.save()

        // Prepare user data for response
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }

        // Send success response
        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            success: true
        })

    } catch (error) {
        console.error("Update profile error", error)
        return res.status(500).json({
            message: "An error occurred while updating profile",
            success: false
        })
    }
}