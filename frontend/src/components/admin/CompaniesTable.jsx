import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const CompaniesTable = () => {
    const navigate = useNavigate()
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setfilterCompany] = useState(companies)

    useEffect(() => {
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) return true
            return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setfilterCompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>A list of Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">Company not found</TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell className="py-2">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage
                                            src={company.logo}
                                            alt={company.name}
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="whitespace-nowrap">{company.name}</TableCell>
                                <TableCell className="whitespace-nowrap">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="flex items-center gap-2 w-fit cursor-pointer"
                                            >
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable
