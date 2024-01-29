import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { CompetitionProps } from './CompetitionCard'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

type CompetitionValues = CompetitionProps['data']

interface ModalProps {
    isOpen: boolean
    onModalClose: () => void
    onCompetitionCreated: (newCompetition: CompetitionValues) => void
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onModalClose,
    onCompetitionCreated,
}) => {
    const cancelButtonRef = useRef(null)

    const initialValues: CompetitionValues = {
        competitionId: '',
        name: '',
        teamSize: 0,
        numTeams: 0,
        creatorId: '',
        numSubs: 0,
        creatorName: '',
        creatorProfilePic: '',
        clerkId: '',
        playerCount: 0,
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Competition name is required')
            .min(1, 'Competition name must be at least 1 character')
            .max(32, 'Competition name cannot exceed 32 characters'),
        teamSize: Yup.number()
            .required('Team size is required')
            .min(1, 'Team size must be greater than 0'),
        numTeams: Yup.number().min(0, 'Number of teams cannot be negative'),
        numSubs: Yup.number().min(0, 'Number of subs cannot be negative'),
    })

    const handleSubmit = async (values: CompetitionValues) => {
        try {
            const response = await fetch('/api/competitions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (response.ok) {
                const newCompetition = await response.json()
                onCompetitionCreated(newCompetition)
                onModalClose()
            } else {
                console.error(
                    'Failed to create competition:',
                    await response.text()
                )
            }
        } catch (error) {
            console.error('Error creating competition:', error)
        }
    }

    return (
        <Transition.Root appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={isOpen}
                onClose={onModalClose}
                ref={cancelButtonRef}
            >
                <div className="min-h-screen px-4 text-center">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-full"
                    >
                        <div className="relative my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                            <XMarkIcon
                                className="absolute right-3 top-3 h-6 w-6 cursor-pointer text-white"
                                onClick={onModalClose}
                                aria-hidden="true"
                            />

                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-white"
                            >
                                Create Competition
                            </Dialog.Title>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    {/* Input fields */}
                                    <div className="mt-4">
                                        <div className="mb-2">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Competition Name1
                                            </label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Swag1"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 outline-none outline-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-xs"
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="p"
                                                className="mt-1 text-red-500"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="teamSize"
                                                className="block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Team Size
                                            </label>
                                            <Field
                                                type="number"
                                                id="teamSize"
                                                name="teamSize"
                                                placeholder="5"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 outline-none outline-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-xs"
                                            />
                                            <ErrorMessage
                                                name="teamSize"
                                                component="p"
                                                className="mt-1 text-red-500"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="numTeams"
                                                className="block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Number of Teams{' '}
                                                <span className="text-xs font-light text-gray-400">
                                                    (leave blank to fit
                                                    everyone)
                                                </span>
                                            </label>
                                            <Field
                                                type="number"
                                                id="numTeams"
                                                name="numTeams"
                                                placeholder="12"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 outline-none outline-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-xs"
                                            />
                                            <ErrorMessage
                                                name="numTeams"
                                                component="p"
                                                className="mt-1 text-red-500"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="numSubs"
                                                className="block text-sm font-medium text-gray-900 outline-none dark:text-white"
                                            >
                                                Number of Subs
                                            </label>
                                            <Field
                                                type="number"
                                                id="numSubs"
                                                name="numSubs"
                                                placeholder="1"
                                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 outline-none outline-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-xs"
                                            />
                                            <ErrorMessage
                                                name="numSubs"
                                                component="p"
                                                className="mt-1 text-red-500"
                                            />
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
