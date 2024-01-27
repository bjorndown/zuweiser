import { ActivitiesConfig } from '../core/model'
import _range from 'lodash/range'
import { ParticipantsConfigWithData } from './Participants'
import { FunctionComponent } from 'react'

type Props = {
    activitiesConfig: ActivitiesConfig
    participantsConfig: ParticipantsConfigWithData
}

export const PriorityDistribution: FunctionComponent<Props> = ({
    participantsConfig,
    activitiesConfig
}: Props) => {
    const count = (priority: number, activityId: string): number =>
        participantsConfig.participants.reduce(
            (count, participant) =>
                participant.priorities[priority] === activityId
                    ? count + 1
                    : count,
            0
        )

    return (
        <div>
            <h2>Verteilung der Prioritäten pro Kurs</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titel</th>
                        <th>Minimum</th>
                        <th>Maximum</th>
                        {_range(
                            1,
                            participantsConfig.participants[0].priorities
                                .length + 1
                        ).map((_, index) => (
                            <th key={`prio${index}`}>
                                Anzahl Prio {index + 1}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {activitiesConfig.activities.map((activity) => (
                        <tr key={`activity${activity.id}`}>
                            <td>{activity.id}</td>
                            <td>{activity.title}</td>
                            <td>{activity.minimum}</td>
                            <td>{activity.limit}</td>
                            {_range(
                                0,
                                participantsConfig.participants[0].priorities
                                    .length
                            ).map((priority, index) => (
                                <td key={`prio${index}`}>
                                    {count(priority, activity.id)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
