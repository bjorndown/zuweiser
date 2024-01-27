import React, { FunctionComponent, useMemo } from 'react'
import {
    AssignableActivity,
    AssignableParticipant,
    ParticipantsConfig
} from '../core/model'
import { MatchResult } from '../core/matcher'

type Props = {
    activity: AssignableActivity
    participantsConfig: ParticipantsConfig
    result: MatchResult
}

export const MatchedActivity: FunctionComponent<Props> = ({
    activity,
    participantsConfig,
    result
}) => {
    const participants = useMemo(
        () => activity.participantsWithExecution(),
        [activity]
    )

    const buildActivityResultHeader = (activity: AssignableActivity) =>
        `${activity.title} (${participants.length} / ${activity.limit * participantsConfig.activitiesPerPerson})`

    const getOtherAssignedActivities = (
        participant: AssignableParticipant
    ): string | undefined => {
        return participant
            .otherAssignedActivities(activity)
            .map(
                ({ activity, priority }) =>
                    `${activity.title} (Prio ${priority + 1})`
            )
            .join(', ')
    }

    return (
        <article
            key={`activity-${activity.id}`}
            className="matched-activity-container"
        >
            <h4>{buildActivityResultHeader(activity)}</h4>
            <table className="matching-result">
                <thead>
                    <tr>
                        <th>#</th>
                        {participantsConfig.otherAttributesColumns.map(
                            (attribute) => (
                                <th>{attribute}</th>
                            )
                        )}
                        <th>Priorität</th>
                        {participantsConfig.activitiesPerPerson > 1 && (
                            <th>Durchführung</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {participants.map(({ participant, execution }, index) => (
                        <tr
                            key={`participant-${participant.id}`}
                            title={
                                participantsConfig.activitiesPerPerson > 1
                                    ? `Andere Kurse: ${getOtherAssignedActivities(participant)}`
                                    : ''
                            }
                            onClick={() =>
                                console.log(
                                    'Alternativen',
                                    participant.otherPossiblePriorities(
                                        result.activities
                                    )
                                )
                            }
                        >
                            <td>{index + 1}</td>
                            {participant.otherAttributes.map((attribute, i) => (
                                <td key={`property-${i}`}>{attribute}</td>
                            ))}
                            <td className="priority-column">
                                {participant.priorities.indexOf(activity.id) +
                                    1}
                            </td>
                            {participantsConfig.activitiesPerPerson > 1 && (
                                <td>{execution}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
                table.matching-result {
                    min-width: 350px;
                    max-width: 550px;
                }

                .matched-activity-container {
                    display: block;
                }

                .priority-column {
                    text-align: center;
                }
            `}</style>
        </article>
    )
}
