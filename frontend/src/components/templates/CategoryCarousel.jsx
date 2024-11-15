import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Data science",
    "Graphic Designer",
    "Automation Tester",
    "Software Developer"
]

const CategoryCarousel = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query))
        navigate('/browse')
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <Carousel className="flex items-center w-full max-w-xl mx-auto my-10 md:my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="md:basis-1/2 lg:basis-1/3 px-2 mb-4"
                            >
                                <Button 
                                    onClick={() => searchJobHandler(cat)}  
                                    variant="outline" 
                                    className="w-full rounded-full py-2 text-center text-sm sm:text-base">
                                    {cat}
                                </Button>
                            </motion.div>
                        ))
                    }
                </CarouselContent>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <CarouselPrevious className="bg-gray-200 rounded-full p-2" />
                    </motion.div>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    >
                        <CarouselNext className="bg-gray-200 rounded-full p-2" />
                    </motion.div>
                </div>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
