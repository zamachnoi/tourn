'use client'
import React, { useState } from 'react'
import Modal from '@/components/Modal'
import { CompetitionProps } from './CompetitionInList'

interface CreateCompetitionProps {
    onCompetitionCreated: (newCompetition: CompetitionProps['data']) => void
}

const CreateCompetition: React.FC<CreateCompetitionProps> = ({
    onCompetitionCreated,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    return (
        <div className="z-0">
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault()
                    handleOpenModal()
                }}
                className="ease ring-green-indigo-200 group relative z-30 m-4 box-border inline-flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-md bg-green-500 px-8 py-3 font-bold text-white ring-1 ring-green-300 ring-offset-2 transition-all duration-300 hover:ring-offset-green-500 focus:outline-none"
            >
                <span className="absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-8 translate-x-1 rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0"></span>
                <span className="absolute left-0 top-0 -ml-12 -mt-1 h-8 w-20 -translate-x-1 -rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0"></span>
                <span className="relative z-20 flex items-center text-sm">
                    <svg
                        className="relative mr-2 h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                    </svg>
                    Create
                </span>
            </a>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onModalClose={handleCloseModal}
                    onCompetitionCreated={onCompetitionCreated}
                />
            )}
        </div>
    )
}

export default CreateCompetition
