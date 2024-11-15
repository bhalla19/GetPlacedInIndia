import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ['Delhi NCR', "Banglore", 'Hyderabad', 'Pune', 'Mumbai']
  },
  {
    filterType: "Industry",
    array: ['FrontEnd Developer', "Backend Developer", 'Full stack Developer', 'Data Scientist', 'Graphic Designer', 'Automation Tester', 'Sales', 'Software Developer']
  },
  {
    filterType: "Salary",
    array: ['0-20k', "21-40k", '41-60k', '61-80k', '81-100k']
  }
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue))
  }, [selectedValue, dispatch])

  return (
    <div className='w-full bg-white p-4 rounded-md shadow-md'>
      <h1 className='font-bold text-xl py-2 px-3 mb-4'>Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className='font-semibold text-lg py-2'>{data.filterType}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3'>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`
                return (
                  <div key={idx} className='flex items-center space-x-2'>
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="text-sm">{item}</Label>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard
