import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface ModalProps {
    isOpen: boolean
    onModalClose: () => void
}

const handleCreateCompetition = (
    name: string,
    teamSize: number,
    numTeams: number,
    numSubs: number,
    closeModal: () => void
) => {
    fetch('/api/competitions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            teamSize: teamSize,
            numTeams: numTeams,
            numSubs: numSubs,
        }),
    })
        .then((response) => {
            if (response.ok) {
                closeModal() // Close the modal on successful API response
            }
            // Handle non-successful responses
        })
        .catch((error) => {
            console.error('Error creating competition:', error)
            // Handle error
        })
    // on success, close the modal
}
// TODO: VALIDATION AND REMOVE CLICKY THING
const Modal: React.FC<ModalProps> = ({ isOpen, onModalClose }) => {
    const cancelButtonRef = useRef(null)

    // State for input fields
    const [name, setName] = useState('')
    const [teamSize, setTeamSize] = useState(0)
    const [numTeams, setNumTeams] = useState(0)
    const [numSubs, setNumSubs] = useState(0)

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

                            {/* Input fields */}
                            <div className="mt-4">
                                <label
                                    htmlFor="name"
                                    className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Competition Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Swag beasts"
                                    className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 outline-none outline-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-xs"
                                />
                                <label
                                    htmlFor="team-size"
                                    className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Team Size
                                </label>
                                <input
                                    type="number"
                                    value={teamSize}
                                    onChange={(e) =>
                                        setTeamSize(
                                            e.target.value === ''
                                                ? 0
                                                : parseInt(e.target.value)
                                        )
                                    }
                                    placeholder="5"
                                    className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 outline-none outline-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-xs"
                                />
                                <label
                                    htmlFor="team-size"
                                    className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Number of Teams{' '}
                                    <span className="text-xs font-light text-gray-400">
                                        (leave blank to fit everyone)
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    value={numTeams}
                                    onChange={(e) =>
                                        setNumTeams(
                                            e.target.value === ''
                                                ? 0
                                                : parseInt(e.target.value)
                                        )
                                    }
                                    placeholder="12"
                                    className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 outline-none outline-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-xs"
                                />
                                <label
                                    htmlFor="num-subs"
                                    className="mb-1 block text-sm font-medium text-gray-900 outline-none dark:text-white"
                                >
                                    Number of Subs
                                </label>
                                <input
                                    type="number"
                                    value={numSubs}
                                    onChange={(e) =>
                                        setNumSubs(
                                            e.target.value === ''
                                                ? 0
                                                : parseInt(e.target.value)
                                        )
                                    }
                                    placeholder="1"
                                    className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 outline-none outline-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-xs"
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none"
                                        onClick={() =>
                                            handleCreateCompetition(
                                                name,
                                                teamSize,
                                                numTeams,
                                                numSubs,
                                                onModalClose
                                            )
                                        }
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
