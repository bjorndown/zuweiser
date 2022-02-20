import React, { FunctionComponent } from 'react'

type Props = {
    fulfilledPriorities: number[]
    totalParticipants: number
}
export const BarChart: FunctionComponent<Props> = ({
    fulfilledPriorities,
    totalParticipants
}) => {
    return (
        <>
            <ol>
                {fulfilledPriorities.map((fulfilledPriority, index) => (
                    <li key={`priority-${index}`}>
                        Priorität{' '}
                        <progress
                            value={fulfilledPriority}
                            max={totalParticipants}
                        />{' '}
                        {fulfilledPriority}
                    </li>
                ))}
            </ol>
        </>
    )
}
