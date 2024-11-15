import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8 mt-8 rounded-lg">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">

                    <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
                        <h2 className="text-2xl font-bold text-white">Get Placed in India</h2>
                        <p className="mt-2">Find your dream job here!</p>
                    </div>

                    <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul>
                            <li><a href="/jobs" className="hover:underline">Jobs</a></li>
                            <li><a href="/post-job" className="hover:underline">Post a Job</a></li>
                        </ul>
                    </div>

                    <div className="w-full sm:w-1/3">
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <p>Email: contact@getplacedinIndia.com</p>
                        <p>Phone: +91 9999999999</p>
                        
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-400">
                    <p>&copy; 2024 Get Placed in India. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer
