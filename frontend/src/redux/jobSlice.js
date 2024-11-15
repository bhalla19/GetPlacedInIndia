import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:'job',
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        searchJobByText:'',
        AllAppliedJobs:[],
        searchQuery:''
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs = action.payload
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText = action.payload
        },
        setAllAppliedJobs:(state,action)=>{
            state.AllAppliedJobs = action.payload
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery = action.payload
        }
    }
})

export const {setAllJobs ,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchQuery} = jobSlice.actions
export default jobSlice.reducer