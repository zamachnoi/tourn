import { CompetitionProps } from '@/components/CompetitionInList'

export default function CompetitionView(props: CompetitionProps) {
    const { data } = props
    // TODO CREATE COMPETITION VIEW
    return (
        <div>
            <h1>{JSON.stringify(data)}</h1>
        </div>
    )
}
