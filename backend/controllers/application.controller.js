import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"

export const applyJob = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id


        const ExistingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (ExistingApplication) {
            return res.status(400).json({
                message: 'You already applied to this Job',
                success: false
            })
        }

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })
        job.applications.push(newApplication._id)
        await job.save()
        return res.status(200).json({
            message: "Job applied successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
            .populate({
                path: "applications",
                populate: {
                    path: "applicant", // Populate applicant details within each application
                },
                options: { sort: { createdAt: -1 } }
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
        res.status(500).json({ message: "Server error" });
    }
};



export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const applicationId = req.params.id

        if (!status) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }

        // find application by applicant id
        const application = await Application.findOne({ _id: applicationId })
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }

        // update the status
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: "Status Updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}