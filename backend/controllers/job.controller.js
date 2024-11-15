import { Job } from "../models/job.model.js"

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, location, salary, jobType, experience, position, companyId } = req.body

        const userId = req.id

        console.log(req.body)

        if (!title || !description || !requirements || !location || !salary || !jobType || !experience || !position || !companyId) {
            return res.status(404).json({
                message: "Something is missing",
                success: false
            })
        }


        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            location,
            salary: Number(salary),
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        })
        return res.status(201).json({
            message: "Job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };
        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .populate({ path: "created_by" })
            .sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.log("Error in getAllJobs:", error);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};


import mongoose from "mongoose";

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid Job ID",
                success: false
            });
        }

        const job = await Job.findById(jobId).populate({
            path: 'applications'
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        })
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}