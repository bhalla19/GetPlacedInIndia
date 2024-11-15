import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: 'company',
    initialState: {
        singleCompany: null,
        companies: [],
        searchCompanyByText: ''
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        setAllCompany: (state, action) => {
            state.companies = action.payload
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload
        }
    }
})

export const { setSingleCompany, setAllCompany ,setSearchCompanyByText} = companySlice.actions
export default companySlice.reducer