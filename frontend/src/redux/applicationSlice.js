import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicant: { // Make sure this aligns with the data structure you're using in Applicants component
            applications: [],
        },
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicant = action.payload; // Set the job data as the applicant
        },
    },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
